import React from 'react'
import { useFormik } from "formik";
import { signinSchema } from './../../services/schemas'

export default function Signin() {
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
    console.log(actions);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    actions.resetForm();
  }

  return (
    <form onSubmit={handleSubmit} autoComplete="off" >
      <div className='mb-3 opacity-0'>
        <div className='flex mb-1 items-end' >
          <label htmlFor='temp' className='whitespace-nowrap pr-4' style={{ width: '50%' }}>Password</label>
          <input id="temp" style={{ width: '70%' }} />
        </div>
        <div className='flex justify-end text-xs' >
          {errors.password && touched.password && <p className="text-red-600">{errors.password}</p>}
        </div>
      </div>
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
      <div className='mb-3 opacity-0'>
        <div className='flex mb-1 items-end' >
          <label htmlFor='temp_' className='whitespace-nowrap pr-4' style={{ width: '50%' }}>Password</label>
          <input id="temp_" style={{ width: '70%' }} />
        </div>
        <div className='flex justify-end text-xs' >
          {errors.password && touched.password && <p className="text-red-600">{errors.password}</p>}
        </div>
      </div>
      <div className='mx-4 mt-8 mb-4'>
        <button disabled={isSubmitting} type='submit' className='bg-orange-500 text-lg text-sky-600 w-full py-2 rounded-md font-bold'>SignIn</button>
      </div>
    </form>
  )
}
