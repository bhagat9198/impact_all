import React from 'react'
import { useFormik } from "formik";
import { toast } from 'react-toastify';
import { signupSchema } from './../../services/schemas'
import { signupUser } from './../../services/auth';
import { useUserStore } from './../../services/store';

export default function Signup(props) {
  // const { setUserAuthenticated } = props;
  const userAuthenticated = useUserStore(state => state.userAuthenticated);
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
      username: '',
      password: '',
      coursename: '',
      startDate: '',
      endDate: '',
    },
    validationSchema: signupSchema,
    onSubmit,
  });

  async function onSubmit(values, actions) {
    const res = await signupUser(values)
    if (!res.status) {
      toast.error(res.message);
      return
    }
    toast.success(res.message)
    localStorage.setItem('impact_user', res.token)
    updateUserDetails(res.data)
    updateAuthState(true)

    actions.resetForm();
  }

  return (
    <form onSubmit={handleSubmit} autoComplete="off" >
      <div className='mb-3'>
        <div className='flex mb-1 items-end' >
          <label htmlFor='username' className='whitespace-nowrap pr-4' style={{ width: '50%' }}>Username</label>
          <input value={values.username} onChange={(e) => { handleChange(e) }} onBlur={handleBlur} id="username" style={{ width: '70%' }}
            className={`bg-transparent outline-none text-lg border-b-2 border-white w-full ${errors.username && touched.username ? "border-red-600" : ""}`} />
        </div>
        <div className='flex justify-end text-xs' >
          {errors.username && touched.username && <p className="text-red-600">{errors.username}</p>}
        </div>
      </div>
      <div className='mb-3'>
        <div className='flex mb-1 items-end' >
          <label htmlFor='password' className='whitespace-nowrap pr-4' style={{ width: '50%' }}>Password</label>
          <input value={values.password} onChange={handleChange} onBlur={handleBlur} id="password" type='password' style={{ width: '70%' }}
            className={`bg-transparent outline-none text-lg border-b-2 border-white w-full ${errors.password && touched.password ? "border-red-600" : ""}`} />
        </div>
        <div className='flex justify-end text-xs' >
          {errors.password && touched.password && <p className="text-red-600">{errors.password}</p>}
        </div>
      </div>
      <div className='mb-3'>
        <div className='flex mb-1 items-end' >
          <label htmlFor='coursename' className='whitespace-nowrap pr-4' style={{ width: '50%' }}>Course Name</label>
          <input value={values.coursename} onChange={(e) => { handleChange(e) }} onBlur={handleBlur} id="coursename" style={{ width: '70%' }}
            className={`bg-transparent outline-none text-lg border-b-2 border-white w-full ${errors.coursename && touched.coursename ? "border-red-600" : ""}`} />
        </div>
        <div className='flex justify-end text-xs' >
          {errors.coursename && touched.coursename && <p className="text-red-600">{errors.coursename}</p>}
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
        <button disabled={isSubmitting} type='submit' className='bg-orange-500 text-lg text-sky-600 w-full py-2 rounded-md font-bold'>{isSubmitting ? 'Submiting...' : 'SignUp/Add Course'}</button>
      </div>
    </form>
  )
}
