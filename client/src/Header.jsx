import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./UserContext";
export default function Header(){
  const {user}= useContext(UserContext);
    return (
      <div>
        <header className='p-4 flex justify-between'>
          <Link to={'/'} className="flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 -rotate-90">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
            </svg>
            <span className='font-bold text-xl'>Airbnb</span>
          </Link>
          <div className='flex gap-2 border border-gray-100 rounded-full py-2 px-4 shadow-md shadow-gray-300'>
            <div>Anywhere</div>
            <div className='border-l border-gray-300 '></div>
            <div>Any week</div>
            <div className='border-l border-gray-300 '></div>
            <div>Add guest</div>
            <div className='border-l border-gray-300 '></div>
            <button className='bg-primary rounded-full text-white p-1'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="m15.75 15.75-2.489-2.489m0 0a3.375 3.375 0 1 0-4.773-4.773 3.375 3.375 0 0 0 4.774 4.774ZM21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>

            </button>
          </div>
          <Link to={user?'/account':'/login'} className='flex items-center gap-2 border border-gray-100 rounded-full py-2 px-4'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            <div className='bg-gray-100 rounded-full p-1 border overflow-hidden'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              </svg>
            </div>
            {!!user &&(
              <div>
                {user.name}
              </div>
            )}
          </Link>
        </header>
      </div>
    )
}