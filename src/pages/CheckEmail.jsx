import React, { useState } from "react";
import Axios from "axios"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate,Link } from "react-router-dom";
const CheckEmail = () => {
  const [formData, setFormData] = useState({
    email: "",
  });
  const navigate = useNavigate();
  Axios.defaults.withCredentials = true;
  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.post('http://localhost:3000/auth/checkemail',formData).then(response=>{
        if(response.data.status){
        successToastMessage();
        setTimeout(()=>navigate(`/reset/${response.data.uid}`),800)}else{
            errorToastMessage();
            setTimeout(()=>navigate("/login"),800)
            
        }
    }).catch(err=>{
        console.log(err);
    })

    setFormData({
      email: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  const successToastMessage = () => {
    toast.success("email verified", {
      position: "top-center",
    });
    
  };
  const errorToastMessage = () => {
    toast.error("email not exists", {
      position: "top-center",
    });
    
  };

  return (
  
    <div className="Login-container flex h-screen bg-[url('/halfground.png')] bg-cover">
      <ToastContainer />
      {/* <img src={logo} alt="" /> */}
      <div className="flex justify-center items-center flex-1 font-opensans">
      <form onSubmit={handleSubmit} className='border-2 p-4 bg-white rounded-2xl px-10'>
         <h2 className="text-center text-4xl font-bold">Verify</h2>
        <div className='mx-2'>
          <div className='my-4'>
          <label htmlFor="email" className='text-lg'>Email</label>
          </div>
          <input className='border-2'
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className='bg-customGreen hover:bg-green-950 my-8 text-lg p-2 w-11/12 rounded-lg text-white mx-1'>Verify </button>
      </form>
    </div>
    </div>

  );
};

export default CheckEmail;

