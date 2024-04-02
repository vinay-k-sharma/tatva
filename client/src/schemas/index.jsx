import * as Yup from "yup"

export const userSchema = Yup.object({
    name: Yup.string().min(2,"Enter atleast 2 characters").max(25).required("Please enter your name").trim(),
    email : Yup.string().email("Enter valid email").required("Please enter your email").trim(),
    password: Yup.string().min(6).required("Please enter password"),
    confirm_password : Yup.string().required().oneOf([Yup.ref("password"),null] , "Password must match !")
})

export const loginSchema = Yup.object({
    role: Yup
    .string().required().oneOf(["user","admin"]),
    email: Yup.string().trim(),
    password: Yup.string().trim()
})