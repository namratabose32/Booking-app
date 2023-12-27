const express=require('express');
const cors=require('cors');
const { default: mongoose } = require('mongoose');
const User=require('./models/User')
require('dotenv').config();
const app=express();
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const cookieParser=require('cookie-parser')
const jwtSecret='namrataboseeee';
const imageDownloader=require('image-downloader')
const bcryptSalt=bcrypt.genSaltSync(10);
const multer=require('multer');
const Place=require('./models/Place')

app.use(express.json());
app.use(cookieParser(__dirname+'/uploads'));
app.use(cookieParser());
app.use(cors({
    credentials:true,
    origin:'http://localhost:5173',
}))
async function uploadToS3(path, originalFilename, mimetype) {
    const client = new S3Client({
      region: 'us-east-1',
      credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY,
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
      },
    });
    const parts = originalFilename.split('.');
    const ext = parts[parts.length - 1];
    const newFilename = Date.now() + '.' + ext;
    await client.send(new PutObjectCommand({
      Bucket: bucket,
      Body: fs.readFileSync(path),
      Key: newFilename,
      ContentType: mimetype,
      ACL: 'public-read',
    }));
    return `https://${bucket}.s3.amazonaws.com/${newFilename}`;
  }
console.log(process.env.MONGO_URL)
mongoose.connect(process.env.MONGO_URL)
.then(() => {
    console.log('Connected to MongoDB');
})
.catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});
app.get("/test",(req,res)=>{
    res.json("test ok");

});

app.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        console.log('Received data:', name, email, password);

        const hashedPassword = bcrypt.hashSync(password, bcryptSalt);

        const userDoc = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        res.status(201).json({userDoc,message:"User created"});
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'Could not register user' });
    }
});
app.post('/login', async (req, res) => {
        const { email,currentPassword } = req.body;
        
        const userDoc = await User.findOne({email});
        if(userDoc){
            const passOk=bcrypt.compareSync(currentPassword,userDoc.password);
            if(passOk){
                jwt.sign({email:userDoc.email,id:userDoc._id},jwtSecret,{},(err,token)=>{
                    if(err) throw err;
                    res.cookie('token',token).json(userDoc);

                });
            }else{
                res.status(422).json('Password is different');
            }
        }else{
            res.json('not found');
        }
});

app.get('/profile',(req,res)=>{
    const {token}=req.cookies;
    if(token){
        jwt.verify(token,jwtSecret,{},async(err,user)=>{
            if(err) throw err;
            const userDoc=await User.findById(userDoc.id)
            res.json(userDoc);
        })
    }else{
        res.json(null);
    }
    res.json({token})
})

app.post('/logout',(req,res)=>{
    res.cookie('token','').json(true);
})

app.post('/upload-by-link',async(req,res)=>{
    const {link}=req.body;
    const newName=Date.now()+'.jpg';
    await imageDownloader.image({
        url:link,
        dest: __dirname+'/uploads'+newName,
    })
    res.json(__dirname+'/uploads/'+newName);
})

const photosMiddleware = multer({dest:'uploads/'});
app.post('/upload', photosMiddleware.array('photos', 100), async (req,res) => {
  const uploadedFiles = [];
  for (let i = 0; i < req.files.length; i++) {
    const {path,originalname,mimetype} = req.files[i];
    const url = await uploadToS3(path, originalname, mimetype);
    uploadedFiles.push(url);
  }
  res.json(uploadedFiles);
});

app.post('/places', (req,res) => {
    mongoose.connect(process.env.MONGO_URL);
    const {token} = req.cookies;
    const {
      title,address,addedPhotos,description,price,
      perks,extraInfo,checkIn,checkOut,maxGuests,
    } = req.body;
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      const placeDoc = await Place.create({
        owner:userData.id,price,
        title,address,photos:addedPhotos,description,
        perks,extraInfo,checkIn,checkOut,maxGuests,
      });
      res.json(placeDoc);
    });
  });
  
app.listen(4000);