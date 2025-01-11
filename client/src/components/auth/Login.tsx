import { ChangeEvent, FormEvent, useState } from "react";
import { Link } from "react-router-dom";

interface Initialvalues {
  email: string;
  password: string;
}

const Login = () => {
  const initialValues: Initialvalues = {
    email: "",
    password: "",
  };
  const [credentials, setCredentials] = useState<Initialvalues>(initialValues);
  const [formErrors, setFormErrors] = useState<Partial<Initialvalues>>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className="flex flex-col items-center justify-center w-full gap-4 h-btm-height">
      <h1 className="relative text-3xl font-medium md:text-5xl -top-16">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-btnClr via-cyan-300 to-slate-200">
          {" "}
          Yo! Welcome back...
        </span>
      </h1>
      <form className="flex flex-col gap-3 w-96" onSubmit={handleSubmit}>
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
            type="text"
            id="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            title="password"
            placeholder="Enter your password"
          />
          <p className="error">{formErrors?.password && formErrors.password}</p>
        </div>
        <button className="btn btn-primary" type="submit" disabled={isLoading}>
          Login
        </button>
        <p className="text-sm text-center">
          New to shoppy?{" "}
          <Link to="/auth/signup" className="underline cursor-pointer">
            SignUp
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
