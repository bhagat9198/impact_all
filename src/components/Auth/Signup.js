import React from 'react'
import { useFormik } from "formik";
import { signupSchema } from './../../services/schemas'

export default function Signup() {
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
      username: '',
      password: '',
      startDate: '',
      endDate: '',
    },
    validationSchema: signupSchema,
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
      <div className='mb-3'>
        <div className='flex mb-1 items-end' >
          <label htmlFor='username' className='whitespace-nowrap pr-4' style={{ width: '50%' }}>Username</label>
          <input value={values.username} onChange={(e) => { console.log(e); handleChange(e)}} onBlur={handleBlur} id="username" style={{ width: '70%' }}
            className={`bg-transparent outline-none text-lg border-b-2 border-white w-full ${errors.username && touched.username ? "border-red-600" : ""}`} />
        </div>
        <div className='flex justify-end text-xs' >
          {errors.username && touched.username && <p className="text-red-600">{errors.username}</p>}
        </div>
      </div>
      <div className='mb-3'>
        <div className='flex mb-1 items-end' >
          <label htmlFor='password' className='whitespace-nowrap pr-4' style={{ width: '50%' }}>Password</label>
          <input value={values.password} onChange={handleChange} onBlur={handleBlur} id="password" style={{ width: '70%' }}
            className={`bg-transparent outline-none text-lg border-b-2 border-white w-full ${errors.password && touched.password ? "border-red-600" : ""}`} />
        </div>
        <div className='flex justify-end text-xs' >
          {errors.password && touched.password && <p className="text-red-600">{errors.password}</p>}
        </div>
      </div>
      <div className='mb-3'>
        <div className='flex mb-1 items-end' >
          <label htmlFor='startDate' className='whitespace-nowrap pr-4' style={{ width: '50%' }}>License Start Date</label>
          <input value={values.startDate} onChange={handleChange} onBlur={handleBlur} style={{ width: '70%' }} type='date' id='startDate'
            className={`bg-transparent outline-none text-lg border-b-2 border-white w-full ${errors.startDate && touched.startDate ? "border-red-600" : ""}`} />
        </div>
        <div className='flex justify-end text-xs' >
          {errors.startDate && touched.startDate && <p className="text-red-600">{errors.startDate}</p>}
        </div>
      </div>
      <div className='mb-3'>
        <div className='flex mb-1 items-end' >
          <label htmlFor='endDate' className='whitespace-nowrap pr-4' style={{ width: '50%' }}>License End Date</label>
          <input value={values.endDate} onChange={handleChange} onBlur={handleBlur} style={{ width: '70%' }} type='date' id='endDate'
            className={`bg-transparent outline-none text-lg border-b-2 border-white  w-full ${errors.endDate && touched.endDate ? "border-red-600" : ""}`} />
        </div>
        <div className='flex justify-end text-xs' >
          {errors.endDate && touched.endDate && <p className="text-red-600">{errors.endDate}</p>}
        </div>
      </div>
      <div className='mx-4 mt-8 mb-4'>
        <button disabled={isSubmitting} type='submit' className='bg-orange-500 text-lg text-sky-600 w-full py-2 rounded-md font-bold'>SignUp</button>
      </div>
    </form>
  )
}
