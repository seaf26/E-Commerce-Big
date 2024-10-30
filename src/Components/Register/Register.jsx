import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react'
import * as Yup from 'yup';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Link, useNavigate } from 'react-router-dom';
import {Helmet} from "react-helmet";
import"./register.css"
export default function Register() {

  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const navigate = useNavigate()



  let {   handleSubmit , values , handleChange , touched , handleBlur , errors } = useFormik({
    initialValues:{
      "name":"",
      "email":"",
      "password":"",
      "rePassword":"",
      "phone":""
    },
    onSubmit:register,
    validationSchema: Yup.object({
      name : Yup.string().required("name is required").min(3,"name length must be more than 2 ").max(20,"name length must be less than 20 "),
      email : Yup.string().required("email is required").email("enter valid email"),
      password : Yup.string().required("password is required").matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,"minimum 8 chars, at least 1 letter, 1 number and 2 special char"),
      rePassword : Yup.string().required("rePassword is required").oneOf([Yup.ref("password")]),
      phone : Yup.string().required("phone is required")
    })
  })

  async function register() {
    setSuccessMsg("")
    setErrorMsg("")
    setIsLoading(true);


    let { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup", values).then(({data}) => {
      setIsLoading(false);
      console.log(data);
      setSuccessMsg(data.message);
      setTimeout(()=>{
        navigate("/login")
      },500)
     
    }).catch((err)=>{
      setIsLoading(false);
      console.log(err.response.data.message);
      setErrorMsg(err.response.data.message)
      
    })
  }

  return (
    <>
     <Helmet>
        <title>Register</title>
      </Helmet>
    <div className="min-h-screen    flex items-center w-full  justify-center">
    <div className="w-full md:w-1/2 lg:w-1/3 mx-auto registerscreen  bg-white dark:bg-gray-800 rounded-lg shadow-md px-8 py-10 flex flex-col items-center">
    <h1 className="text-xl font-bold text-center text-gray-700 dark:text-gray-200 mb-8">Welcome </h1>
    <form action="#" onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
     
      <div className="flex items-start flex-col justify-start">
        <label htmlFor="name" className="text-sm text-gray-700 dark:text-gray-200 mr-2">name:</label>
        <input onBlur={handleBlur} onChange={handleChange} value={values.name} type="text" id="name" name="name" className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"/>
      {touched.name && errors.name && <p className="text-red-500">{errors.name}</p>}
      </div>

      <div className="flex items-start flex-col justify-start">
        <label htmlFor="email" className="text-sm text-gray-700 dark:text-gray-200 mr-2">Email:</label>
        <input onBlur={handleBlur} onChange={handleChange} value={values.email} type="email" id="email" name="email" className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"/>
        {touched.email && errors.email && <p className="text-red-500">{errors.email}</p>}
      </div>

      <div className="flex items-start flex-col justify-start">
        <label htmlFor="password" className="text-sm text-gray-700 dark:text-gray-200 mr-2">Password:</label>
        <input onBlur={handleBlur} onChange={handleChange} value={values.password} type="password" id="password" name="password" className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"/>
      {touched.password && errors.password && <p className="text-red-500">{errors.password}</p>}
      </div>

      <div className="flex items-start flex-col justify-start">
        <label htmlFor="rePassword" className="text-sm text-gray-700 dark:text-gray-200 mr-2">Confirm Password:</label>
        <input onBlur={handleBlur} onChange={handleChange} value={values.rePassword} type="password" id="rePassword" name="rePassword" className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"/>
      {touched.rePassword && errors.rePassword && <p className="text-red-500">{errors.rePassword}</p>}
      </div>

      <div className="flex items-start flex-col justify-start">
        <label htmlFor="phone" className="text-sm text-gray-700 dark:text-gray-200 mr-2">phone Number:</label>
        <input onBlur={handleBlur} onChange={handleChange} value={values.phone} type="tel" id="phone" name="phone" className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"/>
      {touched.phone && errors.phone && <p className="text-red-500">{errors.phone}</p>}
      </div> 
      
      <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md shadow-sm disabled:bg-slate-500" disabled={isLoading} >Register {isLoading && <i class="fa-solid fa-spinner fa-spin-pulse"></i> }</button>
      {errorMsg && <p className='text-red-600 text-center'>{errorMsg}</p>}
      {successMsg && <p className='text-green-600 text-center'>{successMsg}</p>}
    </form>

    <div className="mt-4 text-center">
      <span className="text-sm text-gray-500 dark:text-gray-300">Already have an account? </span>
      <Link to={"/login"} className="text-blue-500 hover:text-blue-600">Login</Link>
    </div>
  </div>
    </div>
  
    </>
  )
}
