
import { Route, Routes } from 'react-router-dom'
import './App.css'
import IndexPages from './pages/IndexPage'
import LoginPage from './pages/LoginPage'
import Layout from './Layout'
import RegisterPage from './pages/RegisterPage'
import axios from 'axios'
import { UserContextProvider } from './UserContext'
import AccountPage from './pages/AccountPage'
import PlacesFormPage from './pages/PlacesFormPage'

axios.defaults.baseURL='http://127.0.0.1:4000'
axios.defaults.withCredentials=true;
function App() {

  return (
    <UserContextProvider>
      <Routes>
        <Route path='/' element={<Layout/>}>
        <Route index element={<IndexPages/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/register' element={<RegisterPage/>}/>
        <Route path='/account/:subpage?' element={<AccountPage/>}/>
        <Route path='/account/:subpage/:action' element={<AccountPage/>}/>
        {/* <Route path='/account/places' element={<AccountPage/>}/> */}
        <Route path="/account/places/new" element={<PlacesFormPage />} />
          <Route path="/account/places/:id" element={<PlacesFormPage />} />
        </Route>
        
      </Routes>
      
    </UserContextProvider>
  )
}

export default App
