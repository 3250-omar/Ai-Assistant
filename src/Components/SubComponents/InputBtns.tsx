import { ErrorMessage, Field, Form } from "formik";

interface InputBtnsProps {
  signUp: boolean;
  isSubmitting: boolean;
}
const InputBtns = ({ signUp, isSubmitting }: InputBtnsProps) => {
  return (
    <Form className="flex flex-col gap-4 p-4 w-full justify-center items-center relative px-5">
      <Field
        type="email"
        placeholder="Email address"
        className="input rounded-lg w-full h-12 "
        name="email"
      />
      <ErrorMessage
        name="email"
        component="div"
        className="text-red-500 text-sm mt-2 pl-1 animate-slideIn"
      />
      <Field
        type="password"
        placeholder="Password"
        className="input rounded-lg  w-full h-12 "
        name="password"
      />
      <ErrorMessage
        name="password"
        component="div"
        className="text-red-500 text-sm mt-2 pl-1 animate-slideIn"
      />
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600
                                 hover:from-blue-700 hover:to-indigo-700 text-white font-medium
                                 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                                 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:from-blue-600
                                 disabled:hover:to-indigo-600 transform hover:-translate-y-0.5
                             transition-all duration-200 shadow-lg hover:shadow-xl"
      >
        {isSubmitting ? (
          <span className="loading loading-dots loading-md"></span>
        ) : signUp ? (
          "Sign Up"
        ) : (
          "Sign In"
        )}
      </button>
    </Form>
  );
};

export default InputBtns;
