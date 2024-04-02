import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { getUsers, registerUser } from '../../utils/axios-instance';
import { userSchema } from '../../schemas';
import { useNavigate } from 'react-router-dom';
const initialUserValues = {
  name: '',
  email: '',
  password: '',
  confirm_password: '',
};

const Register = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate()
  useEffect(() => {
    (async () => {
      const {
        success: usersSuccess,
        data: usersData,
        error: userError,
      } = await getUsers();

      setUsers(usersData);
    })();
  }, []);

  const { values, errors, touched, handleBlur, handleChange, handleSubmit, handleReset } =
    useFormik({
      initialValues: initialUserValues,
      validationSchema: userSchema,
      onSubmit: async (values) => {
        const { name, email, password } = values;

        const emailExistsInUsers = users.findIndex((user) => user.email === values.email);

        if (emailExistsInUsers === -1) {
          let userObj = {
            id:
              users.length !== 0
                ? (parseInt(users[users.length - 1].id) + 1).toString()
                : "1",
            name: name.trim(),
            email: email.trim(),
            password,
            favouriteProducts: [],
          };
          try {
            const response = await registerUser(userObj);
            if (response.success) {
              console.log('User registered successfully');
              handleReset();
              navigate('/')
            } else {
              console.error('Failed to register user:', response.error);
            }
          } catch (error) {
            console.error('Error registering user:', error);
          }
        } else {
          console.error('User already exists');
        }
      },
    });

  return (
    <div className="lg:m-10">
      <form
        className="relative border border-gray-100 space-y-3 max-w-screen-md mx-auto rounded-md bg-white p-6 shadow-xl lg:p-10"
        onSubmit={handleSubmit}
        onReset={handleReset}
      >
        <h1 className="mb-6 text-xl font-semibold lg:text-2xl">Register</h1>

        <div>
          <label htmlFor="name">First Name</label>
          <input
            type="text"
            placeholder="Your Name"
            className="mt-2 h-12 w-full rounded-md bg-gray-100 px-3"
            name="name"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.name && touched.name ? <p>{errors.name}</p> : null}
        </div>
        <div>
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            placeholder="Info@example.com"
            className="mt-2 h-12 w-full rounded-md bg-gray-100 px-3"
            name="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.email && touched.email ? <p>{errors.email}</p> : null}
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="******"
            className="mt-2 h-12 w-full rounded-md bg-gray-100 px-3"
            name="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.password && touched.password ? <p>{errors.password}</p> : null}
        </div>
        <div>
          <label htmlFor="confirm_password">Confirm Password</label>
          <input
            type="password"
            placeholder="******"
            className="mt-2 h-12 w-full rounded-md bg-gray-100 px-3"
            name="confirm_password"
            value={values.confirm_password}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.confirm_password && touched.confirm_password ? <p>{errors.confirm_password}</p> : null}
        </div>
        <div>
          <button type="submit" className="mt-5 w-full rounded-md bg-[#7A431D] p-2 text-center font-semibold text-white">Get Started</button>
        </div>
      </form>
    </div>
  );
}

export default Register;
