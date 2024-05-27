import { Link } from "react-router-dom";
import { useContext } from "react";
import GlobalContext from "../GlobalContexts";

export default function Signup() {
  const { signup } = useContext(GlobalContext);

  const validateData = ({ email, name, password }) => {
    if (typeof name !== "string" || !name.trim().length)
      return alert("Invalid Name");
    if (typeof email !== "string" || !email.trim().length)
      return alert("Invalid Email");
    if (typeof password !== "string" || !password.trim().length)
      return alert("Invalid Password");
    if (password.length < 8) return alert("Password must be 8 character long");
    return true;
  };
  const registerHandler = async ({ nativeEvent, target }) => {
    nativeEvent.preventDefault();
    const formData = new FormData(target);
    const userData = {
      email: formData.get("email"),
      name: formData.get("name"),
      password: formData.get("password"),
    };
    if (!validateData(userData)) return;
    signup(userData);
  };

  return (
    <>
      <div className="d-flex flex-1 flex-column align-items-center justify-content-center px-6 py-12">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Create your account
        </h2>

        <form className="p-2 border rounded" onSubmit={registerHandler}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Name
            </label>
            <div className="mt-2">
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Password
            </label>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="d-flex my-2">
            <button type="submit" className="btn btn-success  mx-auto">
              Create Account
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Already a member?{" "}
          <Link
            to="/login"
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            Login Here
          </Link>
        </p>
      </div>
    </>
  );
}
