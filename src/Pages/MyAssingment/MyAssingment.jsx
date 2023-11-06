import { useQuery, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../../AxiosAPI/axiosInstance";
import useAuthProvider from "../../FireBase/useAuthProvider";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faCheckCircle,
  faEdit,
  faTrash,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import MyAssingmentCard from "./MyAssingmentCard";
import CustomLoading from "../../Components/CustomLoading";
function MyAssingment() {
  const queryClient = useQueryClient();
  const { user } = useAuthProvider();
  // console.log(user.email);
  const getData = async () => {
    const myData = await axiosInstance.get(
      // `/api/user/my-submitted-assignments?email=${user.email}`
      `/api/user/my-submitted-assignments?examineeEmail=${user.email}`
    );
    return myData.data;
  };

  const {
    data: myAssignments,
    isLoading,
    error,
    refetch, // Get the refetch function
  } = useQuery({
    queryFn: getData,

    onSuccess: queryClient.invalidateQueries("Submitted-assignments"),
  }); // Corrected the queryKey placement

  if (isLoading) {
    return <CustomLoading></CustomLoading>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const { title, marks, feedback, obtainmarks, thumbnail } = myAssignments;
  // console.log(myAssignments);
  return (
    <div className="pt-[150px]">
      <div className="assignment-nav-wrap">
        <ul
          className="flex justify-between nav nav-pills"
          id="pills-tab-1"
          role="tablist"
        >
          <li className="nav-item">
            <button className="nav-link active">My Assignments</button>
          </li>
        </ul>
      </div>
      <div>
        {myAssignments.length > 0 ? (
          myAssignments.map((assignment) => (
            <MyAssingmentCard assignment={assignment} key={assignment._id} />
          ))
        ) : (
          <p>No assignments available.</p>
        )}
      </div>
    </div>
  );
}

export default MyAssingment;
