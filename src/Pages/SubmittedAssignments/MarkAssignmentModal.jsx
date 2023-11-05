import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../AxiosAPI/axiosInstance";
import Swal from "sweetalert2";
import useAuthProvider from "../../FireBase/useAuthProvider";
import { Document, Page, pdfjs } from "react-pdf";

// Ensure that pdfjs.workerSrc is set correctly
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const MarkAssignmentModal = ({ viewAssignment }) => {
  const { user } = useAuthProvider();
  const [marks, setMarks] = useState(0);
  const [feedback, setFeedback] = useState("");
  const { notes, pdf } = viewAssignment || {};

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   // Perform your assignment marking logic here using the 'marks' and 'feedback' state values.
  //   // You can use the 'useMutation' hook to send the data to your API.

  //   try {
  //     // Use 'axiosInstance' to send your data to the server
  //     const response = await axiosInstance.post("/api/mark-assignment", {
  //       assignmentId: viewAssignment._id,
  //       marks,
  //       feedback,
  //     });

  //     // Handle successful marking
  //     Swal.fire(
  //       "Assignment marked!",
  //       "Assignment has been successfully marked.",
  //       "success"
  //     );

  //     // Close the modal
  //     closeMarkModal();
  //   } catch (error) {
  //     // Handle errors
  //     Swal.fire(
  //       "Error",
  //       "An error occurred while marking the assignment.",
  //       "error"
  //     );
  //   }
  // };

  const closeMarkModal = () => {
    // Implement the logic to close the modal here
    // You can hide the modal by updating its state or using a state management library.
  };

  return (
    <div>
      <dialog id="my_modal_5" className="modal modal-center">
        <div className="p-6 bg-white border rounded-lg modal-box">
          <h3 className="text-lg font-bold">Mark Assignment</h3>
          <div className="py-4">
            <Document
              file="./sample-8bb8af10_2.pdf"
              onLoadSuccess={console.log("PDF loaded successfully")}
            >
              <Page pageNumber={1} />
            </Document>
          </div>
          <form>
            <div className="mb-4">
              <label className="block mb-2 font-bold">Marks:</label>
              <input
                type="number"
                name="marks"
                required
                placeholder="Enter marks"
                value={marks}
                onChange={(e) => setMarks(e.target.value)}
                className="w-full max-w-sm input input-bordered"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2 font-bold">Feedback:</label>
              <textarea
                name="feedback"
                placeholder="Enter feedback"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
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
            <button
              className="btn btn-secondary bg-[#E5E6E6] outline-none border-none hover:bg-[#D4D5D5] text-black"
              onClick={closeMarkModal}
            >
              <FontAwesomeIcon icon={faTimes} className="mr-2" />
              Close
            </button>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default MarkAssignmentModal;
