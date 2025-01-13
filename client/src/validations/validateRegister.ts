import { RegisterUser } from "../components/auth/SignUp";

const validateRegister = (values: RegisterUser) => {
  const errors: Partial<RegisterUser> = {};
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

  if (!values.userName) {
    errors.userName = "Invalid name";
  }

  if (!values.email) {
    errors.email = "Email is required";
  } else if (!emailRegex.test(values.email)) {
    errors.email = "Invalid Email";
  }

  if (!values.role) {
    errors.role = "Role is required. Must be Farmer or Admin";
  }

  if (values.role === "admin" && !values.referralCode) {
    errors.referralCode = "Referral code is required";
  }

  if (!values.password) {
    errors.password = "Password is required";
  } else if (values.password.length < 6) {
    errors.password = "Weak password";
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = "Please enter password again";
  } else if (values.password !== values.confirmPassword) {
    errors.confirmPassword = "Password doesn't match";
  }

  return errors;
};

export default validateRegister;
