import * as Yup from "yup"

export const userSchema = Yup.object({
    name: Yup.string().min(2,"Enter atleast 2 characters").max(25).required("Please enter your name").trim(),
    email : Yup.string().email("Enter valid email").required("Please enter your email").trim(),
    password: Yup.string().min(6).required("Please enter password"),
    confirm_password : Yup.string().required().oneOf([Yup.ref("password"),null] , "Password must match !")
})

export const userSchemaAdmin = Yup.object({
    name: Yup
      .string()
      .required("*required")
      .min(2, "*Name must contain atleast 2 characters")
      .max(15, "*Name must not contain more than 15 characters")
      .trim(),
    email: Yup.string().required("*required").email("*Email is not valid").trim(),
    password: Yup.string().min(6).required("Please enter password")
  });

export const loginSchema = Yup.object({
    role: Yup
    .string().required().oneOf(["user","admin"]),
    email: Yup.string().trim(),
    password: Yup.string().trim()
})

export const ProductSchema = Yup.object({
  name: Yup.string().required('Product name is required'),
  description: Yup.string().required('Description is required'),
  long_description: Yup.string().required('Long Description is required'),
  price: Yup.number().required('Price is required').positive('Price must be a positive number'),
  discount: Yup.number().min(0, 'Discount percentage must be 0 or greater').max(100, 'Discount percentage cannot be greater than 100'),
  stock: Yup.number().required('Stock is required').integer('Stock must be an integer').min(0, 'Stock must be 0 or greater'),
  brand: Yup.string().required("Brand Name is required"),
  category: Yup.string().required('Category is required'),
});

export const CategorySchema = Yup.object({
  name:Yup.string().required('Category name is required')
})
