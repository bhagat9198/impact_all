import React from 'react'
import { useFormik } from "formik";
import {toast} from 'react-toastify';
import { signinSchema } from './../../services/schemas'
import { signinUser } from '../../services/auth';
import { useUserStore } from './../../services/store';

export default function Signin() {
  const updateAuthState = useUserStore(state => state.updateAuthState);
  const updateUserDetails = useUserStore(state => state.updateUserDetails);

  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: signinSchema,
    onSubmit,
  });

  async function onSubmit(values, actions) {
    console.log(values);
    const res = await signinUser(values);
    if(!res.status) {
      toast.error(res.message);
      return
    }
    localStorage.setItem('impact_user', res.token)
    updateAuthState(true)
    updateUserDetails(res.data)
    actions.resetForm();
  }

  return (
    <form onSubmit={handleSubmit} autoComplete="off" >
      <div className='mb-10 h-2'></div>
      <div className='mb-3'>
        <div className='flex mb-1 items-end' >
          <label htmlFor="username">Username</label>
          <span className='flex-grow'></span>
          <input value={values.username} onChange={handleChange} onBlur={handleBlur} id='username'
            className={`bg-transparent outline-none text-lg border-b-2 border-white ${errors.username && touched.username ? "border-red-600" : ""}`} />
        </div>
        <div className='flex justify-end text-xs' >
          {errors.username && touched.username && <p className="text-red-600">{errors.username}</p>}
        </div>
      </div>
      <div className='mb-10 h-2'></div>
      <div className='mb-3'>
        <div className='flex mb-1 items-end' >
          <label htmlFor="password" >Password</label>
          <span className='flex-grow'></span>
          <input value={values.password} onChange={handleChange} onBlur={handleBlur} id='password' type='password'
            className={`bg-transparent outline-none text-lg border-b-2 border-white ${errors.password && touched.password ? "border-red-600" : ""}`} />
        </div>
        <div className='flex justify-end text-xs' >
          {errors.password && touched.password && <p className="text-red-600">{errors.password}</p>}
        </div>
      </div>
      <div className='mb-10 h-2'></div>
      <div className='mx-4 mt-8 mb-4'>
        <button disabled={isSubmitting} type='submit' className='bg-orange-500 text-lg text-sky-600 w-full py-2 rounded-md font-bold'>SignIn</button>
      </div>
    </form>
  )
}
