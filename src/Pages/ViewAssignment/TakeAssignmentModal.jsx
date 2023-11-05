import React, { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../AxiosAPI/axiosInstance";
import Swal from "sweetalert2";

const TakeAssignmentModal = ({ viewAssignment }) => {
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

  const modalRef = useRef(null);
  const { mutateAsync } = useMutation({
    mutationFn: async (postData) => {
      const result = await axiosInstance.post(
        "/api/user/submitted-assignments",
        postData
      );
      console.log(result.data);
      return result.data;
    },
    mutationKey: ["Submitted-assignments"],
    onSuccess: () => {
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Assignments has been Submitted successfully.",
      });
    },
  });

  const handleSubmitedAssing = async (e) => {
    e.preventDefault();
    // Add your logic to submit the assignment here
    const form = new FormData(e.currentTarget);
    const pdf = form.get("pdf");
    const notes = form.get("notes");

    const submitedInfo = {
      title,
      difficulty,
      marks,
      thumbnail,
      description,
      dueDate,
      email,
      pdf,
      notes,
      status: "pending",
    };
    try {
      await mutateAsync(submitedInfo);
    } catch (err) {
      console.log(err);
    }

    // Close the modal
    modalRef.current.close();
  };

  return (
    <div>
      <dialog ref={modalRef} id="my_modal_5" className="modal modal-center">
        <div className="p-6 bg-white border rounded-lg modal-box">
          <h3 className="text-lg font-bold">Take Assignment</h3>
          <p className="py-4">
            Upload the PDF file and add any additional notes below.
          </p>
          <form onSubmit={handleSubmitedAssing}>
            <div className="mb-4">
              <label className="block mb-2 font-bold">PDF File:</label>
              <input
                type="url"
                accept=".pdf"
                name="pdf"
                required
                placeholder="Type here"
                className="w-full max-w-sm input input-bordered"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2 font-bold">Notes:</label>

              <textarea
                placeholder="Enter any additional notes related to the assignment"
                name="notes"
                className="w-full max-w-sm textarea textarea-bordered textarea-sm"
              ></textarea>
            </div>

            <div className="modal-action">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
          <form method="dialog">
            <button className="btn btn-secondary bg-[#E5E6E6] outline-none border-none hover:bg-[#D4D5D5] text-black">
              <FontAwesomeIcon icon={faTimes} className="mr-2" />
              Close
            </button>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default TakeAssignmentModal;
