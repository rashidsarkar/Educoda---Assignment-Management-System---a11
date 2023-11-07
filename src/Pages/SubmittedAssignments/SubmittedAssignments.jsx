import { useQuery } from "@tanstack/react-query";

import SubmittedAssignmentsCard from "./SubmittedAssignmentsCard";
import useAuthProvider from "../../FireBase/useAuthProvider";
import CustomLoading from "../../Components/CustomLoading";
import useAxiosInstance from "../../AxiosAPI/useAxiosInstance";
// import axiosInstance from "../../AxiosAPI/axiosInstance";

function SubmittedAssignments() {
  const axiosInstance = useAxiosInstance();

  // const axiosInstance = useAxiosInstance();
  const { user } = useAuthProvider();
  // console.log(user.email);
  const getData = async () => {
    const myData = await axiosInstance.get(
      `/api/user/all-submitted-assignments`
    );
    return myData.data;
  };

  const {
    data: submittedAssignments,
    isLoading,
    error,
    refetch, // Get the refetch function
  } = useQuery({
    queryFn: getData,
    queryKey: ["Submitted-assignments"],
  }); // Corrected the queryKey placement

  if (isLoading) {
    return <CustomLoading></CustomLoading>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <div className="min-h-screen py-[150px]">
      <div className="assignment-nav-wrap">
        <ul
          className="flex justify-between nav nav-pills"
          id="pills-tab-1"
          role="tablist"
        >
          <li className="nav-item">
            <button className="nav-link active">Submitted Assignments</button>
          </li>
        </ul>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {submittedAssignments.map((item) => (
          <SubmittedAssignmentsCard
            submittedAssignments={item}
            key={item._id}
          ></SubmittedAssignmentsCard>
        ))}
      </div>
    </div>
  );
}

export default SubmittedAssignments;
