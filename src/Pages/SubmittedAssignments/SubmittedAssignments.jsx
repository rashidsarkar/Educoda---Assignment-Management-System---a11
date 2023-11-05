import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../AxiosAPI/axiosInstance";
import SubmittedAssignmentsCard from "./SubmittedAssignmentsCard";

function SubmittedAssignments() {
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
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <div className="min-h-screen py-[150px]">
      <div className="grid lg:grid-cols-3">
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
