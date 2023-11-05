import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../AxiosAPI/axiosInstance";
import CustomLoading from "../../Components/CustomLoading";
import AssignmentCard from "./AssignmentCard";

function AllAssignments() {
  const {
    data: allAssignments,
    isLoading,
    error,
  } = useQuery({
    queryFn: async () => {
      const res = await axiosInstance.get("/api/all-assignments");
      return res.data;
    },
    queryKey: ["all-assignments"],
  });

  if (error) {
    return error.message;
  }

  if (isLoading) {
    return <CustomLoading></CustomLoading>;
  }

  return (
    <div className="min-h-screen pt-[200px]">
      <div>
        {allAssignments.map((assignment) => (
          <AssignmentCard assignment={assignment} key={assignment._id} />
        ))}
      </div>
    </div>
  );
}

export default AllAssignments;
