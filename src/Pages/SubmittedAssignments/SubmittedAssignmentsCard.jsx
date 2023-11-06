import React, { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import MarkAssignmentModal from "./MarkAssignmentModal";
import Swal from "sweetalert2";
import axiosInstance from "../../AxiosAPI/axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function SubmittedAssignmentsCard({ submittedAssignments }) {
  const { title, marks, thumbnail, status, examineeName, _id } =
    submittedAssignments;
  const queryClient = useQueryClient();
  const modalRef = useRef(null);

  const { mutateAsync } = useMutation({
    mutationFn: async (postData) => {
      const result = await axiosInstance.put(
        `/api/user/marked-assignments/${_id}`,
        postData
      );
      console.log(result.data);
      if (result.data.modifiedCount) {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Assignment has been updated successfully.",
        });
        // navigate("/assignments");
      }
      return result.data;
    },
    mutationKey: ["Submitted-assignments"],
    onSuccess: queryClient.invalidateQueries("Submitted-assignments"),
  });
  const handleGiveMark = async (assignmentInfo) => {
    console.log(assignmentInfo);
    try {
      await mutateAsync(assignmentInfo);
    } catch (err) {
      console.log(err);
    }
    modalRef.current.close();
    console.log("Assignment marked:", assignmentInfo);
  };
  // Handle giving a mark here
  // Make sure to handle the mutation and marking the assignment here

  console.log(_id);
  return (
    <div className="bg-white rounded-lg shadow-lg w-96">
      <figure>
        <img src={thumbnail} alt={title} className="object-cover w-full h-40" />
      </figure>
      <div className="p-4">
        <h2 className="text-xl font-semibold">{title}</h2>
        <div className="flex justify-between text-lg text-gray-600">
          <p>
            <span className="font-semibold">Marks:</span> {marks}
          </p>
          <span className="mx-2">| |</span>
          <p className="text-right">
            <span className="font-semibold">Status:</span>{" "}
            <span className="capitalize">{status}</span>
          </p>
        </div>
        <p className="text-lg">Examinee: {examineeName}</p>
        <div className="flex justify-end mt-4">
          <button
            onClick={() =>
              document.getElementById(`my_modal_${_id}`).showModal()
            }
            className="text-white bg-blue-500 border-none outline-none btn btn-secondary hover-bg-blue-600"
          >
            <FontAwesomeIcon icon={faCheck} className="mr-2" />
            Give Mark
          </button>
          <MarkAssignmentModal
            handleGiveMark={handleGiveMark}
            viewAssignment={submittedAssignments}
          ></MarkAssignmentModal>
        </div>
      </div>
    </div>
  );
}

export default SubmittedAssignmentsCard;
