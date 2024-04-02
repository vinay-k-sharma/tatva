import React, { useState, useEffect } from 'react';
import { loginSchema } from '../../schemas';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../../utils/axios-instance';
import { setRole } from '../../redux/actions/roleAction';
import { useFormik } from 'formik';
import { NavLink, useNavigate } from 'react-router-dom';

const roleValues = {
  role: 'user',
  email: '',
  password: '',
};

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuth } = useSelector((state) => state.role);
  const [users, setUsers] = useState([]);

  const { values, errors, touched, handleChange, handleSubmit, handleBlur, handleReset } = useFormik({
    initialValues: roleValues,
    validationSchema: loginSchema,
    onSubmit,
  });

  async function onSubmit(values) {
    const { role, email, password } = values;
    if (role === 'user') {
      let user = users.find((user) => user.email === email);
      if (user && user.password === password) {
        dispatch(setRole(role, user));
        console.log('user logged in');
        navigate('/');
      }
    }
    if (role === 'admin') {
      const admin = { email, password };
      if (email === 'admin@gmail.com' && password === 'Admin@123') {
        dispatch(setRole(role, admin));
        navigate('/admin');
      }
    }
    handleReset();
  }

  useEffect(() => {
    isAuth ? navigate('/') : null;

    (async () => {
      const { success: usersSuccess, data: usersData, error: userError } = await getUsers();

      setUsers(usersData);
    })();
  }, []);

  return (
    <div className="lg:m-10">
      <form onSubmit={handleSubmit} onReset={handleReset} className="relative border border-gray-100 space-y-3 max-w-screen-md mx-auto rounded-md bg-white p-6 shadow-xl lg:p-10">
        <h1 className="mb-6 text-xl font-semibold lg:text-2xl">Login</h1>

        <div>
          <label htmlFor="role">Select Role</label>
          <select
            name="role"
            id="role"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.role}
            className="mt-2 h-12 w-full rounded-md bg-gray-100 px-3"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
            placeholder="Enter Email"
            className="mt-2 h-12 w-full rounded-md bg-gray-100 px-3"
          />
          {errors.email && touched.email ? <p>{errors.email}</p> : null}
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
            placeholder="Enter Password"
            autoComplete="off"
            className="mt-2 h-12 w-full rounded-md bg-gray-100 px-3"
          />
          {errors.password && touched.password ? <p>{errors.password}</p> : null}
        </div>

        <button type="submit" className="mt-5 w-full rounded-md bg-[#D88552] p-2 text-center font-semibold text-white">
          Login
        </button>
      </form>

      <p className="mt-3">
        Don't have an account?{' '}
        <NavLink to="/register" className="text-blue-600">
          Register
        </NavLink>
      </p>
    </div>
  );
};

export default LoginPage;
