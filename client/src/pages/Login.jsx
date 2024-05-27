import { Link } from "react-router-dom";
import { useContext } from "react";
import GlobalContext from "../GlobalContexts";

export default function Login() {
  const { login } = useContext(GlobalContext);

  const handleLogin = ({ nativeEvent, target }) => {
    nativeEvent.preventDefault();
    const [email, password] = new FormData(target).values();
    login(email, password);
  };

  return (
    <>
      <div className="d-flex flex-1 flex-column align-items-center justify-content-center px-6 py-12">
        <h2 className="mt-10 text-center font-bold">Sign in to your account</h2>

        <form className="border rounded p-2 my-6" onSubmit={handleLogin}>
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
            <button type="submit" className="btn btn-success mx-auto">
              Sign in
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Not a member? <Link to="/signup">Create Account</Link>
        </p>
      </div>
    </>
  );
}
