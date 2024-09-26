import {React,useEffect} from "react";
import { useNavigate, Link } from "react-router-dom";
import { Toaster, toast } from 'sonner';
import {useDispatch,useSelector} from "react-redux"
import { useForm } from "react-hook-form";
import {registerUser} from "../redux/slices/authSlice"

const SignUp = () => {
  // const { register, handleSubmit, formState: { errors } } = useForm();
  // const navigate = useNavigate();

  // const onSubmit = async (data) => {
  //   try {
  //     const response = await Axios.post("http://localhost:3000/auth/signup", data);
  //     if (response.data.status) {
  //       toast.success(response.data.message);
  //       setTimeout(() => navigate("/login"), 1000); 
  //     } else {
  //       toast.error(response.data.message);
  //     }
  //   } catch (err) {
  //     console.error(err);
  //     toast.error("An error occurred while signing up.");
  //   }
  // };
  const { loading, userInfo, error, success } = useSelector(
    (state) => state.auth
  )
  const dispatch = useDispatch()
  const { register, handleSubmit, formState: { errors } } = useForm()
  const navigate = useNavigate()
  useEffect(() => {
    if (success) navigate('/login')
  }, [navigate, userInfo, success])
  const submitForm = (data) => {
    data.email = data.email.toLowerCase()
    dispatch(registerUser(data))
  }

  return (
    <div className="flex">
      <Toaster position="top-right" richColors />
      <div className="first-section w-full lg:w-1/2 flex">
        <div className="flex flex-1 flex-col p-2  justify-center items-center">
          <form onSubmit={handleSubmit(submitForm)} className="rounded-lg font-opensans text-md lg:text-lg">
            <div className="flex justify-center md:justify-start">
            <h2 className=" mb-12 text-2xl md:text-3xl font-bold bg-gradient-to-r from-green-800 via-green-500 to-green-700 inline-block text-transparent bg-clip-text">
              Get Started Now!
            </h2>
            </div>
            <div className="mb-8">
              <div className="mb-1">
                <label htmlFor="username" className="text-md">Username</label>
              </div>
              <input
                className="border-2 rounded-lg w-full p-2"
                type="text"
                id="username"
                {...register("username", { required: "Username is required" })}
                placeholder="username"
              />
              {errors.username && <p className="text-red-500">{errors.username.message}</p>}
            </div>
            <div className="mb-8">
              <div className="mb-1">
                <label htmlFor="email" className="text-md">Email address</label>
              </div>
              <input
                className="border-2 rounded-lg w-full p-2"
                type="email"
                id="email"
                {...register("email", { required: "Email is required" })}
                placeholder="enter your email"
              />
              {errors.email && <p className="text-red-500">{errors.email.message}</p>}
            </div>
            <div className="mb-12">
              <div className="mb-1">
                <label htmlFor="password" className="text-md">Password</label>
              </div>
              <input
                className="border-2 rounded-lg w-full p-2"
                type="password"
                id="password"
                {...register("password", { required: "Password is required" })}
                placeholder="password"
              />
              {errors.password && <p className="text-red-500">{errors.password.message}</p>}
            </div>
            <button
              type="submit"
              className="bg-customGreen hover:bg-green-950 mb-14 text-lg p-2 w-full rounded-xl text-white"
            >
              Sign Up
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
              {" "}Have an Account?{" "}
              <Link to="/login" className="hover:text-blue-400 text-blue-500 ml-2 text-md">
                Log In
              </Link>
            </p>
          </form>
        </div>
      </div>
      <div className="last-section lg:w-1/2 hidden lg:block">
        <img src="/halfground.png" alt="" className="h-screen w-full" />
      </div>
    </div>
  );
};

export default SignUp;
