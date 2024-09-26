import {useEffect,React} from "react";
import { Toaster, toast } from "sonner";
import { useDispatch, useSelector } from 'react-redux'
import {userLogin} from "../redux/slices/authSlice"
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";

const LogIn = () => {
  const { loading, error,userInfo } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate(); 
  const submitForm = (data) => {
    dispatch(userLogin(data)).then(() => {
      navigate('/dashboard');
    })
  }

  // const onSubmit = async (data) => {
  //   try {
  //     const response = await Axios.post("http://localhost:3000/auth/login", data);
  //     if (response.data.status) {
  //       toast.success(response.data.message);
  //       setTimeout(() => navigate("/dashboard"), 800);
  //     } else {
  //       toast.error(response.data.message);
  //     }
  //   } catch (err) {
  //     console.error(err);
  //     toast.error("An error occurred while logging in.");
  //   }
  // };

  return (
    <div className="flex">
      <Toaster richColors position="top-right" />
      <div className="first-section w-full  flex lg:w-1/2   ">
        <div className="flex flex-1 flex-col justify-center p-2  items-center ">  
          <form onSubmit={handleSubmit(submitForm)} className="rounded-lg font-opensans text-md lg:text-lg">
            <div className="text-center md:text-start">
            <h2 className="mb-3 text-2xl md:text-3xl font-bold bg-gradient-to-r  from-green-800 via-green-500 to-green-700 inline-block text-transparent bg-clip-text">
              Welcome Back!
            </h2>
            <p className="text-md mb-12 ">
              Enter your credentials to access your account
            </p>
            </div>
            <div className="mb-8">
              <div className="grid grid-cols-2 mb-2">
                <label htmlFor="email" className="text-md">
                  Email address
                </label>
                <p className="text-end text-sm mt-2">
                  <Link to="/checkemail" className="text-customGreen hover:text-green-700">
                    Forget Password?
                  </Link>
                </p>
              </div>
              <input
                className={`border-2 rounded-lg w-full p-2 ${errors.email ? 'border-red-500' : ''}`}
                type="email"
                id="email"
                {...register("email", { required: "Email is required" })}
                placeholder="enter your email"
              />
              {errors.email && <p className="text-red-500">{errors.email.message}</p>}
            </div>

            <div className="mb-12">
              <div className="mb-2">
                <label htmlFor="password" className="text-md">
                  Password
                </label>
              </div>
              <input
                className={`border-2 rounded-lg w-full p-2 ${errors.password ? 'border-red-500' : ''}`}
                type="password"
                id="password"
                {...register("password", { required: "Password is required" })}
                placeholder="password"
              />
              {errors.password && <p className="text-red-500">{errors.password.message}</p>}
            </div>
            <button 
              type="submit"
              className="bg-customGreen hover:bg-green-950 mb-14 text-md p-2 w-full rounded-xl text-white"
            >
              Log In
            </button>
            <div className="sub flex mb-10 justify-center items-center gap-2">
              <div className="bg-gray-200 w-1/2 h-1"></div>
              <p className="">or</p>
              <div className="bg-gray-200 w-1/2 h-1"></div>
            </div>
            <div className="signin mb-10 lg:grid lg:grid-cols-2 gap-4 items-center text-sm md:text-md ">
            <button className="border-2 p-2 w-full rounded-xl flex px-3 justify-center gap-2 mb-4 lg:mb-0">
                <img src="/google.png" alt="" className="h-6" />
                <p className="  ">Sign in with Google</p>
              </button>
              <button className="border-2 p-2 rounded-xl flex px-3 w-full justify-center gap-2">
                <img src="/apple.png" alt="" className="h-6" />
                <p className="   ">Sign in with Apple</p>
              </button>
            </div>
            <p className="text-center">
              Don't Have an Account?{" "}
              <Link to="/signup" className="hover:text-blue-400 text-blue-500 ml-2 text-md">
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      </div>
      <div className="last-section lg:block lg:w-1/2 hidden ">
        <img src="/halfground.png" alt="" className=" w-full h-screen" />
      </div>
    </div>
  );
};

export default LogIn;
