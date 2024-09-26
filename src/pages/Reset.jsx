import React, { useState } from "react";
import Axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, Link, useParams } from "react-router-dom";

const Reset = () => {
  const [formData, setFormData] = useState({
    password: "",
  });
  const navigate = useNavigate();
  const { id } = useParams();
  console.log(id);
  Axios.defaults.withCredentials = true;
  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.post(`http://localhost:3000/auth/reset/${id}`, formData)
      .then((response) => {
        if (response.data.status) {
          successToastMessage(response.data.message)
          setTimeout(()=>navigate("/login"),800)
          
        }
      })
      .catch((err) => {
        console.log(err);
      });

    setFormData({
      password: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const successToastMessage = (msg) => {
    toast.success(msg, {
      position: "top-center",
    });
    
  };
  return (
  
    <div className="Login-container flex h-screen bg-[url('/halfground.png')] bg-cover">
       <ToastContainer />
      <div className="flex justify-center items-center flex-1">
        <form onSubmit={handleSubmit} className="border-2 p-4  bg-white rounded-2xl font-opensans">
          <h2 className="text-center text-4xl font-bold ">Reset Password</h2>
          <div className="mx-2">
            <div className="my-4">
              <label htmlFor="email" className="text-lg">
                New Password
              </label>
            </div>
            <input
              className="border-2 w-full"
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button
            type="submit"
            className="bg-customGreen hover:bg-green-950 my-8 text-lg p-2 w-11/12 rounded-lg text-white mx-1"
          >
            reset
          </button>
        </form>
      </div>
    </div>
  );
};

export default Reset;
