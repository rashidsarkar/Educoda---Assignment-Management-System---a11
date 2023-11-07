import axios from "axios";
import useAuthProvider from "../FireBase/useAuthProvider";

const axiosInstance = axios.create({
  baseURL: "https://educoda-server.vercel.app", // Your API base URL
  withCredentials: true,
});
function useAxiosSecure() {
  const navigate = useNavigate();
  const { logOut } = useAuthProvider();
  useEffect(() => {
    axiosSecure.interceptors.response.use(
      (res) => {
        return res;
      },
      (err) => {
        console.log("error tract ", err.response);
        if (err.response.status === 401 || err.response.status === 403) {
          console.log("log Out The User");
          logOut()
            .then(() => {
              navigate("/login");
            })
            .catch((error) => console.log(error));
        }
      }
    );
  }, [logOut, navigate]);
  return axiosSecure;
}

export default axiosInstance;

// import axios from "axios";
// import { useEffect } from "react"; // Import useEffect from React
// import { useNavigate } from "react-router-dom"; // Import useNavigate from the appropriate package
// import useAuthProvider from "../FireBase/useAuthProvider";

// const axiosInstance = axios.create({
//   baseURL: "https://educoda-server.vercel.app", // Your API base URL
//   withCredentials: true,
// });

// function useAxiosInstance() {
//   const navigate = useNavigate();
//   const { logOut } = useAuthProvider();

//   useEffect(() => {
//     axiosInstance.interceptors.response.use(
//       (res) => {
//         return res;
//       },
//       (err) => {
//         console.log("error track ", err.response);
//         if (err.response.status === 401 || err.response.status === 403) {
//           console.log("Log Out The User");
//           logOut()
//             .then(() => {
//               navigate("/Login");
//             })
//             .catch((error) => console.log(error));
//         }
//       }
//     );
//   }, [logOut, navigate]);

//   return axiosInstance; // Return the configured axiosInstance
// }

// export default useAxiosInstance; // Export the function
