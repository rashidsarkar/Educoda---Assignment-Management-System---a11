import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axiosInstance from "../../AxiosAPI/axiosInstance";
import CustomLoading from "../../Components/CustomLoading";
import { useQuery } from "@tanstack/react-query";
import "aos/dist/aos.css";
import AOS from "aos";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faEdit } from "@fortawesome/free-solid-svg-icons";
import TakeAssignmentModal from "./TakeAssignmentModal";

function ViewAssignment() {
  const { idx } = useParams();

  const getData = async () => {
    const myData = await axiosInstance.get(`/api/view-assignments/${idx}`);
    return myData.data;
  };

  const {
    data: viewAssignment,
    isLoading,
    error,
  } = useQuery({
    queryFn: getData,
    queryKey: ["all-assignments"],
  });

  useEffect(() => {
    AOS.init();
  }, []);

  if (error) {
    return error.message;
  }

  if (isLoading) {
    return <CustomLoading></CustomLoading>;
  }

  const {
    title,
    difficulty,
    marks,
    thumbnail,
    description,
    dueDate,
    email,
    _id,
  } = viewAssignment || {};

  return (
    <div className="min-h-screen pt-[150px] bg-gray-100">
      <div className="container mx-auto">
        <div className="flex flex-wrap">
          <div data-aos="zoom-in" className="w-full md:w-1/2">
            <img src={thumbnail} alt={title} className="w-full rounded-lg" />
          </div>
          <div data-aos="zoom-in" className="w-full p-8 md:w-1/2">
            <h2 className="text-3xl font-semibold">{title}</h2>
            <p className="text-xl font-bold text-green-600">Marks: {marks}</p>

            <div className="mt-8">
              <h3 className="text-2xl font-semibold">Service Details</h3>
              <p className="mt-4 text-gray-700">{description}</p>
              <p className="mt-4 text-gray-700">{dueDate}</p>
            </div>
            <div className="mt-8 space-x-2">
              <Link
                onClick={() =>
                  document.getElementById("my_modal_5").showModal()
                }
                className="bg-blue-500 border-none outline-none btn btn-primary hover:bg-blue-600"
              >
                <FontAwesomeIcon
                  icon={faCheckCircle}
                  className="w-5 h-5 mr-2"
                />
                Take assignment
              </Link>
              {/* Open the modal using document.getElementById('ID').showModal() method */}

              <TakeAssignmentModal
                viewAssignment={viewAssignment}
              ></TakeAssignmentModal>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewAssignment;
