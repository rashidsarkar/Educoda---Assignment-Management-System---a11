import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faEdit,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import useAuthProvider from "../../FireBase/useAuthProvider";

function AssignmentCard({ assignment }) {
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

  return (
    <div className="flex mb-4 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
      <img
        className="object-cover w-1/4 h-96 md:h-auto"
        src={thumbnail}
        alt={title}
      />
      <div className="w-3/4 p-4">
        <h2 className="mb-2 text-3xl italic font-bold text-gray-900 dark:text-white">
          {title}
        </h2>
        <p className="mb-3 text-sm text-gray-700 dark:text-gray-400">
          <span className="font-bold">Difficulty Level:</span> {difficulty}
        </p>
        <p className="mb-3 text-sm text-gray-700 dark:text-gray-400">
          <span className="font-bold">Marks:</span> {marks}
        </p>
        <p className="mb-3 text-sm text-gray-700 dark:text-gray-400">
          <span className="font-bold">Due Date:</span> {dueDate}
        </p>
        <p className="text-sm text-gray-700 dark:text-gray-400">
          <span className="font-bold">Description:</span> {description}
        </p>
        <div className="flex mt-4 space-x-4">
          <Link to="/assignment-details">
            <button className="flex items-center px-4 py-2 text-white transition duration-300 bg-blue-500 rounded-md hover:bg-blue-600">
              <FontAwesomeIcon icon={faCheckCircle} className="w-5 h-5 mr-2" />
              Take Assignment
            </button>
          </Link>
          <Link to={`/updateassignment/${_id}`}>
            <button className="flex items-center px-4 py-2 text-white transition duration-300 bg-green-500 rounded-md hover-bg-green-600">
              <FontAwesomeIcon icon={faEdit} className="w-5 h-5 mr-2" />
              Update Assignment
            </button>
          </Link>
          <Link>
            <button className="flex items-center px-4 py-2 text-white transition duration-300 bg-red-500 rounded-md hover:bg-red-600">
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
