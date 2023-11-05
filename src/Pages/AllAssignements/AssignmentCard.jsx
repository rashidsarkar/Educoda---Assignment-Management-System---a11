import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Tooltip as ReactTooltip } from "react-tooltip";

import {
  faCheckCircle,
  faEdit,
  faTrash,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import useAuthProvider from "../../FireBase/useAuthProvider";
import Swal from "sweetalert2";
import axiosInstance from "../../AxiosAPI/axiosInstance";
import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

function AssignmentCard({ assignment }) {
  const queryClient = useQueryClient();
  const { user } = useAuthProvider();
  const {
    title,
    difficulty,
    marks,
    thumbnail,
    description,
    dueDate,
    email,
    _id,
  } = assignment;

  const isCurrentUser = email === user?.email;

  const updateButtonStyle = {
    flex: "1",
    display: "flex",
    alignItems: "center",
    padding: "8px 16px",
    color: "white",
    transition: "background 0.3s",
    backgroundColor: isCurrentUser ? "green" : "gray",
    borderRadius: "4px",
  };
  const deleteButtonStyle = {
    flex: "1",
    display: "flex",
    alignItems: "center",
    padding: "8px 16px",
    color: "white",
    transition: "background 0.3s",
    backgroundColor: isCurrentUser ? "red" : "gray",
    borderRadius: "4px",
  };
  const { mutateAsync } = useMutation({
    mutationFn: async (id) => {
      const res = await axiosInstance.delete(
        `/api/delete-my-assignments/${id}`
      );
      return res.data;
    },
    // mutationKey: ["bookingData"],

    onSuccess: () => {
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Assignment has been deleted successfully.",
      });
      // QueryClient.invalidateQueries(["create-assignments"]);
      queryClient.invalidateQueries("create-assignments");
    },
  });

  const handleDelete = (itemId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        // Trigger the mutation to delete the assignment
        mutateAsync(itemId);
      }
    });
  };
  let tooltipContent = "You are not the creator of this assignment";
  if (isCurrentUser) {
    tooltipContent = null; // No content if the user is the creator
  }
  return (
    <div className="flex mb-4 bg-white border border-gray-200 rounded-lg shadow hover-bg-gray-100 dark-border-gray-700 dark-bg-gray-800 dark-hover-bg-gray-700">
      <img
        className="object-cover w-1/4 h-96 md:h-auto"
        src={thumbnail}
        alt={title}
      />
      <div className="w-3/4 p-4">
        <h2 className="mb-2 text-3xl italic font-bold text-gray-900 dark-text-white">
          {title}
        </h2>
        <p className="mb-3 text-sm text-gray-700 dark-text-gray-400">
          <span className="font-bold">Difficulty Level:</span> {difficulty}
        </p>
        <p className="mb-3 text-sm text-gray-700 dark-text-gray-400">
          <span className="font-bold">Marks:</span> {marks}
        </p>
        <p className="mb-3 text-sm text-gray-700 dark-text-gray-400">
          <span className="font-bold">Due Date:</span> {dueDate}
        </p>
        <p className="text-sm text-gray-700 dark-text-gray-400">
          <span className="font-bold">Description:</span> {description}
        </p>
        <div className="flex mt-4 space-x-4">
          <Link to={`/assignmentDetails/${_id}`}>
            <button className="flex items-center px-4 py-2 text-white transition duration-300 bg-[#4A07DA] rounded-md hover-bg-blue-600">
              <FontAwesomeIcon icon={faEye} className="w-5 h-5 mr-2" />
              View Assignment
            </button>
          </Link>
          <Link
            className="tooltip"
            data-tip={tooltipContent}
            to={`/updateassignment/${_id}`}
          >
            <button disabled={!isCurrentUser} style={updateButtonStyle}>
              <FontAwesomeIcon icon={faEdit} className="w-5 h-5 mr-2" />
              Update Assignment
            </button>
          </Link>
          <Link className="tooltip" data-tip={tooltipContent}>
            <button
              onClick={() => handleDelete(_id)}
              disabled={!isCurrentUser}
              style={deleteButtonStyle}
            >
              <FontAwesomeIcon icon={faTrash} className="w-5 h-5 mr-2" />
              Delete Assignment
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AssignmentCard;
