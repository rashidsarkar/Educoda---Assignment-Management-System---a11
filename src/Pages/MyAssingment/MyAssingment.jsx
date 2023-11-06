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
function MyAssingment() {
  const queryClient = useQueryClient();
  const { user } = useAuthProvider();
  console.log(user.email);
  const getData = async () => {
    const myData = await axiosInstance.get(
      `/api/user/my-submitted-assignments?email=${user.email}`
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
    queryKey: ["Submitted-assignments"],

    onSuccess: queryClient.invalidateQueries("Submitted-assignments"),
  }); // Corrected the queryKey placement

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const { title, marks, feedback, obtainmarks, thumbnail } = myAssignments;
  console.log(myAssignments);
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
        {myAssignments.map((assignment) => (
          <MyAssingmentCard
            assignment={assignment}
            key={assignment._id}
          ></MyAssingmentCard>
        ))}
      </div>
    </div>
  );
}

export default MyAssingment;
