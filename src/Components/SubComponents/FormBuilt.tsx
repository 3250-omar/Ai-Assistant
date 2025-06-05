import { HiOutlineCube } from "react-icons/hi";
import { FaGoogle } from "react-icons/fa6";
import { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import InputBtns from "./InputBtns";
import { googleSignIn, logIn, registerUser } from "../../utils/auth";
import { useNavigate, type NavigateFunction } from "react-router";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters long")
    .required("Password is required"),
});

const FormBuilt = () => {
  const [signUp, setSignUp] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const navigate: NavigateFunction = useNavigate();

  // Handle form submission for both sign up and log in
  const handleSubmit = async (
    values: { email: string; password: string },
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    setError("");
    try {
      const { user, error: authError } = await (signUp
        ? registerUser(values.email, values.password)
        : logIn(values.email, values.password));

      if (authError) {
        setError(authError);
        return;
      }
      if (user) {
        navigate("/chat");
      }
    } catch (error: any) {
      setError(error);
      setSubmitting(false);
    }
  };

  const handleGoogleSign = async () => {
    setError("");
    try {
      const { user, error: authError } = await googleSignIn();
      if (user) {
        navigate("/chat");
      }
      if (authError) {
        setError(authError);
      }
    } catch (error: any) {
      setError(error.message);
    }
  };
  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {({ isSubmitting }: { isSubmitting: boolean }) => (
        <div className="flex flex-col gap-4 w-full max-w-md max-sm:max-w-[350px] justify-center items-center rounded-2xl shadow-lg bg-gray-800 overflow-hidden ">
          <div
            className=" flex flex-col items-center justify-center bg-gradient-to-r from-blue-600 to-indigo-600
    w-full rounded-t-2xl py-14 max-sm:py-8 "
          >
            <HiOutlineCube
              className="text-4xl text-blue-200 p-2 bg-[rgba(0,0,0,0.3)] rounded-lg"
              size={60}
            />
            <h1 className="text-3xl font-bold text-gray-300">
              {signUp ? "Create Account" : "Welcome Back"}
            </h1>
            <p className=" text-gray-300">
              {signUp
                ? "Join our community of developers"
                : "Sign in to continue coding"}
            </p>
            {/* Error message */}
            {error && <p className="text-red-500 text-sm mt-2 ">{error}</p>}
          </div>
          <InputBtns signUp={signUp} isSubmitting={isSubmitting} />
          <div className=" w-full flex items-center justify-center p-4 flex-col gap-3">
            <p className="text-center relative text-gray-400 before:w-[150%] before:h-[0.5px] before:bg-[rgba(255,255,255,0.2)] before:content-[''] before:absolute before:left-full  before:top-1/2 before:inline-block  after:w-[150%] after:h-[0.5px] after:bg-[rgba(255,255,255,0.2)] after:content-[''] after:absolute after:right-full after:inline-block after:top-1/2 text-sm ">
              Or continue with
            </p>
            <button
              className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl
                             border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-900/50
                             text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800
                             focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200
                             hover:border-blue-500 dark:hover:border-blue-400 transform hover:-translate-y-0.5
                             font-medium"
              onClick={handleGoogleSign}
            >
              <FaGoogle className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <span className="text-gray-300  font-semibold">
                Continue with Google
              </span>
            </button>
          </div>
          <p className="text-gray-500 pb-10">
            {signUp ? "Already have an account?" : "Don't have an account?"}
            {"  "}
            <span
              className="font-bold text-blue-400 cursor-pointer transition-all duration-300 transform hover:text-red-700 hover:-translate-y-1 inline-block"
              onClick={() => setSignUp(!signUp)}
            >
              {signUp ? "Sign In" : "Create one"}
            </span>
          </p>
        </div>
      )}
    </Formik>
  );
};

export default FormBuilt;
