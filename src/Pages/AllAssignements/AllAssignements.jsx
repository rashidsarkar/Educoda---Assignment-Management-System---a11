import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../AxiosAPI/axiosInstance";
import CustomLoading from "../../Components/CustomLoading";
import AssignmentCard from "./AssignmentCard";

function AllAssignments() {
  const [selectedDifficulty, setSelectedDifficulty] = useState("All"); // Initialize with "all"

  const difficultyOptions = ["All", "Easy", "Medium", "Hard"];

  const getData = async () => {
    if (selectedDifficulty === "All") {
      const myData = await axiosInstance.get(`/api/all-assignments`);
      return myData.data;
    } else {
      const myData = await axiosInstance.get(
        `/api/all-assignments?difficulty=${selectedDifficulty}`
      );
      return myData.data;
    }
  };

  const {
    data: allAssignments,
    isLoading,
    error,
    refetch, // Get the refetch function
  } = useQuery({
    queryFn: getData, // Call the function
    queryKey: ["all-assignments", selectedDifficulty], // Include selectedDifficulty in the query key
  });

  const handleDifficultyChange = (newDifficulty) => {
    setSelectedDifficulty(newDifficulty);
    // Call the refetch function to fetch data with the new difficulty
    refetch();
  };

  if (error) {
    return error.message;
  }

  if (isLoading) {
    return <CustomLoading></CustomLoading>;
  }
  // console.log(allAssignments);

  return (
    <div className="min-h-screen pt-[200px]">
      <div className="assignment-nav-wrap">
        <ul
          className="flex justify-between nav nav-pills"
          id="pills-tab-1"
          role="tablist"
        >
          <li className="nav-item">
            <button className="text-left nav-link active">
              ALL Assignments
            </button>
          </li>
          <li className="flex items-center justify-between">
            <p className="nav-link active">Filter by Difficulty:</p>
            <select
              id="difficultyFilter"
              className="py-1 border rounded-md lg:px-2  lg:w-auto w-[50px]"
              value={selectedDifficulty}
              onChange={(e) => handleDifficultyChange(e.target.value)}
            >
              {difficultyOptions.map((option) => (
                <option className="" key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </li>
        </ul>
      </div>
      <div>
        {allAssignments.length > 0 ? (
          allAssignments.map((assignment) => (
            <AssignmentCard assignment={assignment} key={assignment._id} />
          ))
        ) : (
          <p>No assignments available.</p>
        )}
      </div>
    </div>
  );
}

export default AllAssignments;
