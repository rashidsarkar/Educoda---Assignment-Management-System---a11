import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faCheckCircle } from "@fortawesome/free-regular-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import MarkAssignmentModal from "./MarkAssignmentModal";

function SubmittedAssignmentsCard({ submittedAssignments }) {
  const { title, marks, thumbnail, status, examineeName } =
    submittedAssignments;

  const handleGiveMark = () => {
    // Handle giving a mark here
  };

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
            onClick={() => document.getElementById("my_modal_5").showModal()}
            className="text-white bg-blue-500 border-none outline-none btn btn-secondary hover:bg-blue-600"
          >
            <FontAwesomeIcon icon={faCheck} className="mr-2" />
            Give Mark
          </button>
          {/* Open the modal using document.getElementById('ID').showModal() method */}
          <MarkAssignmentModal
            viewAssignment={submittedAssignments}
          ></MarkAssignmentModal>
        </div>
      </div>
    </div>
  );
}

export default SubmittedAssignmentsCard;
