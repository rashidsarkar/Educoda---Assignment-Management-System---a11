import { Link, useLocation, useNavigate } from "react-router-dom";
import { SiGoogle } from "react-icons/si";
import useAuthProvider from "../../FireBase/useAuthProvider";
import swal from "sweetalert";

function Login() {
  const { loginEmPAss, googleSing, user } = useAuthProvider();
  const navigat = useNavigate();
  const preveLocation = useLocation();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const form = new FormData(event.currentTarget);
      const email = form.get("email");
      const password = form.get("password");
      const user = await loginEmPAss(email, password);
      console.log(user.user);
      swal("Success", "Login successful!", "success");
      navigat(preveLocation?.state || "/");
    } catch (error) {
      console.error(error.message);
      swal("Error", error.message, "error");
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const user = await googleSing();
      console.log(user.user, 1);
      swal("Success", "Login successful!", "success");
      navigat(preveLocation?.state || "/");
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white py-[150px]">
      <div className="p-8 text-white bg-gray-800 rounded-lg shadow-md w-96">
        <h2 className="text-3xl font-semibold text-center mb-4 text-[#FF444A]">
          Login
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-300"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="mt-1 p-3 block w-full rounded-md bg-gray-700 text-gray-300 focus:ring focus:ring-[#FF444A] focus:ring-opacity-50"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-300"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="mt-1 p-3 block w-full rounded-md bg-gray-700 text-gray-300 focus:ring focus:ring-[#FF444A] focus:ring-opacity-50"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-[#FF444A] w-full text-white py-3 px-4 rounded-md hover:bg-[#FF3333] transition duration-300 mt-6"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-center text-gray-300">
          <span className="text-sm text-gray-400">or</span>
        </p>
        <button
          onClick={handleGoogleSignIn}
          className="mt-4 w-full bg-[#4285F4] text-white py-3 px-4 rounded-md hover:bg-[#357AE8] transition duration-300 flex items-center justify-center"
        >
          <SiGoogle className="w-6 h-6 mr-2" />
          Sign In with Google
        </button>
        <p className="mt-4 text-center text-gray-300">
          Don't have an account?{" "}
          <Link to="/signup" className="text-[#FF444A] hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
