import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { updateSeller } from '../../utils/axios-instance';
import { setRole } from '../../redux/actions/roleAction';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';

const Profile = () => {
  const dispatch = useDispatch();
  const role = useSelector((state) => state.role);
  const [readOnly, setReadOnly] = useState(true);

  const formik = useFormik({
    initialValues: role.seller,
    onSubmit: async (values) => {
      try {
        const res = await updateSeller(values);
        if (res.success) {
          dispatch(setRole("seller", values));
          toast.success("Seller Updated !!");
          return;
        } else {
          toast.error("Something went wrong. Try again later!");
          formik.resetForm();
        }
      } catch (error) {
        toast.error("Something went wrong. Try again later!");
      } finally {
        setReadOnly(!readOnly);
      }
    },
  });

  const handleCancel = () => {
    setReadOnly(!readOnly);
    formik.resetForm();
  };

  useEffect(() => {
    formik.setValues(role.seller);
  }, [role.user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Greetings {formik.values.name}</h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={formik.handleSubmit}>
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="name" >Name</label>
              <input id="name" name="name" type="text" value={formik.values.name} readOnly={readOnly} onChange={formik.handleChange} onBlur={formik.handleBlur} required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:z-10 sm:text-sm" placeholder="Name" />
            </div>
            <div>
              <label htmlFor="businessName" >businessName</label>
              <input id="businessName" name="businessName" type="text" value={formik.values.businessName} readOnly={readOnly} onChange={formik.handleChange} onBlur={formik.handleBlur}  required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:z-10 sm:text-sm" placeholder="businessName" />
            </div>
            <div>
              <label htmlFor="brand" >Brand</label>
              <input id="brand" name="brand" type="text" value={formik.values.brand} readOnly={readOnly} onChange={formik.handleChange} onBlur={formik.handleBlur}  required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:z-10 sm:text-sm" placeholder="brand" />
            </div>
            <div>
              <label htmlFor="email-address" >Email address</label>
              <input id="email-address" name="email" type="email" value={formik.values.email} readOnly={readOnly} onChange={formik.handleChange} onBlur={formik.handleBlur} autoComplete="email" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:z-10 sm:text-sm" placeholder="Email address" />
            </div>
            <div>
              <label htmlFor="password" >Password</label>
              <input id="password" name="password" type="text" value={formik.values.password} readOnly={readOnly} onChange={formik.handleChange} onBlur={formik.handleBlur} autoComplete="password" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:z-10 sm:text-sm" placeholder="Password" />
            </div>
            
         
          </div>

          <div>
            <button onClick={readOnly ? () => setReadOnly(!readOnly) : formik.handleSubmit} type="button" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#D88552]">
              {readOnly ? 'Edit' : 'Update'}
            </button>
            {!readOnly && (
              <button onClick={handleCancel} type="button" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#D88552] mt-4">
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
