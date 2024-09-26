import React from 'react'
import {Link,useNavigate} from 'react-router-dom'
import ErrorAlienSpaceship from "/dashboard/ErrorPage/ErrorAlienSpaceship.png"
const PageNotFound = () => {
  return (
    <div className='flex flex-col justify-center items-center h-screen'>
       <img src={ErrorAlienSpaceship} alt="" className='h-40 w-80' /> 
       <h1 className='font-bold text-gray-900  text-6xl mt-14'>Page Not Found</h1>
       <p className='text-gray-800 text-lg text-center mt-3'>The page you are looking for might have been <br />removed had its name changed or is temporarily <br /> unavailable.</p>
       <Link to="/dashboard" className='bg-customErrorGreen px-6 py-3 rounded-3xl mt-6 text-white'>Home Page</Link>
       
    </div>
  )
}

export default PageNotFound
