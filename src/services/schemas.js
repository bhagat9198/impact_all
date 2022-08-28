import * as yup from "yup";

// const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
// min 5 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit.

export const signupSchema = yup.object().shape({
  username: yup.string().min(4, "Username must be atleast of 4 characters") .required("Required"),
  password: yup
    .string()
    .min(5)
    .matches(passwordRules, { message: "Please create a stronger password" }),
  startDate: yup.date().required("Required"),
  endDate: yup.date().min(yup.ref("startDate"), "End date can't be before start date").required("Required")
});

export const signinSchema = yup.object().shape({
  username: yup.string().min(4, "Username must be atleast of 4 characters") .required("Required"),
  password: yup
    .string()
    .min(5)
    .matches(passwordRules, { message: "Please create a stronger password" })
    .required("Required"),
});
