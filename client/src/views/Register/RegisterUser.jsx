import React, { useEffect,useState } from "react";
import { useFormik } from "formik";
import { getUsers, registerUser,updateUserFromAdmin } from '../../utils/axios-instance';
import { useDispatch, useSelector } from "react-redux";
import { setRole } from "../../redux/actions/roleAction";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { setLoader } from "../../redux/actions/appActions";
import Loader from "../../components/common/Loader";
import { userSchema,userSchemaAdmin } from '../../schemas';


const RegisterUser = ({ isFromAdmin = false, userData }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuth } = useSelector((state) => state.role);
  const { loader } = useSelector((state) => state.app);

  const [users, setUsers] = useState([]);

  let initialValuesUser = {
    name: "",
    email: "",
    password: "",
    cpassword: "",
  };

  let initialValuesAdmin = {
    name: "",
    email: "",
    password: "",
  };

  const {
    values,
    errors,
    touched,
    handleChange,
    handleSubmit,
    handleBlur,
    handleReset,
  } = useFormik({
    initialValues: !isFromAdmin ? initialValuesUser : initialValuesAdmin,
    validationSchema: !isFromAdmin ? userSchema : userSchemaAdmin,
    onSubmit,
  });

  userData?.name !== "" && !values.name
    ? (values.name = userData?.name) && (userData.name = "")
    : null;

  userData?.email !== "" && !values.email
    ? (values.email = userData?.email) && (userData.email = "")
    : null;

  userData?.password !== "" && !values.password
    ? (values.password = userData?.password) && (userData.password = "")
    : null;

  async function onSubmit(values) {
    const { name, email, password } = values;

    if (isFromAdmin && userData) {
      try {
        dispatch(setLoader(true));
        const { success, data, error } = await updateUserFromAdmin(
          userData?.id,
          {
            name: values.name.trim(),
            email: values.email,
            password: values.password.trim(),
          }
        );
        if (success) {
          toast.success("Updation Successfull");
          handleReset();
          navigate("/admin-users");
        } else {
          toast.error("Failed to update user");
        }
      } catch (error) {
        console.log(error);
      } finally {
        dispatch(setLoader(false));
      }
      return;
    }

    const emailExistsInUsers = users.findIndex(
      (user) => user.email === values.email
    );


    if (emailExistsInUsers === -1 ) {
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
        dispatch(setLoader(true));
        const { success, data, error } = await registerUser(userObj);
        if (success) {
          !isFromAdmin && dispatch(setRole("user", userObj));
          handleReset();
          toast.success("User registered successfully");
          !isFromAdmin ? navigate("/") : navigate("/admin-users");
        } else {
          toast.error(
            "Failed to register user."
          );
        }
      } catch (error) {
        console.log( error);
      } finally {
        dispatch(setLoader(false));
      }
    } else {
      toast.error("User already exists!!");
      handleReset();
    }
  }

  useEffect(() => {
    if (!isFromAdmin) {
      isAuth ? navigate("/") : null;
    }

    (async () => {
      const {
        success: usersSuccess,
        data: usersData,
        error: userError,
      } = await getUsers();
     

      setUsers(usersData);

    })();
  }, []);

  if (loader) {
    return <Loader />;
  }

  return (
    <div className="lg: m-10">
      <div>
        <h3 className="text-center text-3xl font-bold ">
          {userData
            ? "Update User"
            : isFromAdmin
            ? "Add User"
            : "Register User"}
        </h3>
        <div>
          <form
            onSubmit={handleSubmit}
            onReset={handleReset}
            className="relative border border-gray-100 space-y-3 max-w-screen-md mx-auto rounded-md bg-white p-6 shadow-xl lg:p-10"
          >
            <div className="flex flex-col">
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

              {touched.name && errors.name ? (
                <p className="text-[14px] text-red-700">{errors.name}</p>
              ) : (
                <p className="text-[14px] opacity-0">null</p>
              )}
            </div>

            <div className="flex flex-col">
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
              {touched.email && errors.email ? (
                <p className="text-[14px] text-red-700">{errors.email}</p>
              ) : (
                <p className="text-[14px] opacity-0">null</p>
              )}
            </div>

            <div className="flex flex-col">
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

              {touched.password && errors.password ? (
                <p className="text-[14px] text-red-700 w-[min(24rem,85vw)]">
                  {errors.password}
                </p>
              ) : (
                <p className="text-[14px] opacity-0">null</p>
              )}
            </div>

            {!isFromAdmin && (
              <div className="flex flex-col relative">
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
                  
                
                {touched.cpassword && errors.cpassword ? (
                  <p className="text-[14px] text-red-700">{errors.cpassword}</p>
                ) : (
                  <p className="text-[14px] opacity-0">null</p>
                )}
              </div>
            )}

            <div className="flex justify-between gap-2">
              <button
                type="submit"
                className="mt-5 w-30 rounded-md bg-[#D88552] p-2 text-center font-semibold text-white"
                disabled={
                  errors.name || errors.password || errors.email ? true : false
                }
              >
                {!userData ? "SUBMIT" : "UPDATE"}
              </button>

              {!isFromAdmin ? (
                <button
                  type="reset"
                  className="mt-5 w-30 rounded-md bg-[#D88552] p-2 text-center font-semibold text-white"
                >
                  RESET
                </button>
              ) : (
                <button
                  type="button"
                  className="mt-5 w-30 rounded-md bg-[#D88552] p-2 text-center font-semibold text-white"
                  onClick={() => navigate("/admin-users")}
                >
                  BACK
                </button>
              )}
            </div>

            {!isFromAdmin && (
              <div className="pt-5">
                <p>
                  Already have an account?{" "}
                  <NavLink
                    to="/login"
                    className="text-[#0295db]  border-[#0295db] hover:border-b-[1px]"
                    onClick={() => window.scrollTo({ top, behavior: "smooth" })}
                  >
                    Login here
                  </NavLink>
                </p>
              </div>
            )}
          </form>  
        </div>
      </div>
    </div>
  );
};

export default RegisterUser;
