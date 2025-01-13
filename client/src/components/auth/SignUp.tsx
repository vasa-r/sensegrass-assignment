import { ChangeEvent, FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import validateRegister from "../../validations/validateRegister";
import { toast } from "react-toastify";
import { registerUser } from "../../api/auth";

export interface RegisterUser {
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: "admin" | "farmer" | string;
  referralCode?: string;
}

const SignUp = () => {
  const initialValues: RegisterUser = {
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "farmer",
    referralCode: "",
  };

  const [credentials, setCredentials] = useState<RegisterUser>(initialValues);
  const [formErrors, setFormErrors] = useState<Partial<RegisterUser>>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const errors = validateRegister(credentials);
    setFormErrors(errors);
    if (Object.keys(errors).length === 0) {
      setIsLoading(true);
      try {
        await register();
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
        // setCredentials(initialValues);
      }
    } else {
      toast.error("Please ensure valid info is given");
    }
  };

  const register = async () => {
    try {
      const response = await registerUser(
        credentials.userName,
        credentials.email,
        credentials.role,
        credentials.password,
        credentials.referralCode
      );

      if (response.success || response.status === 201) {
        toast.success(response?.data?.message);
        setCredentials(initialValues);
        navigate("/auth/login");
      } else {
        toast.error(response?.data?.message || "Registration failed");
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred during Sign Up. Please try again later.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center flex-1 w-full gap-4">
      <h1 className="relative text-3xl font-medium md:text-5xl -top-10">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-btnClr via-cyan-300 to-slate-200">
          Get Started...
        </span>
      </h1>
      <form className="flex flex-col gap-3 w-96" onSubmit={handleSubmit}>
        <div className="">
          <label htmlFor="userName">User Name</label>
          <input
            type="text"
            id="userName"
            name="userName"
            value={credentials.userName}
            onChange={handleChange}
            title="user name"
            placeholder="Enter your name"
            autoComplete="off"
          />
          <p className="error">{formErrors?.userName && formErrors.userName}</p>
        </div>
        <div className="">
          <label htmlFor="email">Email address</label>
          <input
            type="text"
            id="email"
            name="email"
            value={credentials.email}
            onChange={handleChange}
            title="email address"
            placeholder="Enter your email"
          />
          <p className="error">{formErrors?.email && formErrors.email}</p>
        </div>
        <div className="">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            title="password"
            placeholder="Enter your password"
          />
          <p className="error">{formErrors?.password && formErrors.password}</p>
        </div>
        <div className="">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={credentials.confirmPassword}
            onChange={handleChange}
            title="confirm password"
            placeholder="Confirm your password"
          />
          <p className="error">
            {formErrors?.confirmPassword && formErrors.confirmPassword}
          </p>
        </div>

        <div className="flex flex-col w-full gap-2 md:flex-row">
          <div className="w-full">
            <label htmlFor="confirmPassword">Who are you?</label>
            <select
              value={credentials.role}
              onChange={handleChange}
              name="role"
            >
              <option value="farmer">Farmer</option>
              <option value="admin">Admin</option>
            </select>

            <p className="error">{formErrors?.role && formErrors.role}</p>
          </div>
          {credentials.role === "admin" && (
            <div className="w-full">
              <label htmlFor="confirmPassword">
                Referral Code <span className="error">*</span>
              </label>
              <input
                type="text"
                id="referralCode"
                name="referralCode"
                value={credentials.referralCode}
                onChange={handleChange}
                title="verify code"
                placeholder="Enter referral code"
              />
              <p className="error">
                {formErrors?.referralCode && formErrors.referralCode}
              </p>
            </div>
          )}
        </div>

        <button disabled={isLoading} className="btn btn-primary" type="submit">
          {isLoading ? "Signing... Wait" : "Sign Up"}
        </button>
        <p className="text-sm text-center">
          Already have an acoount?{" "}
          <Link to="/auth/login" className="underline cursor-pointer">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
