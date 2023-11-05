import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ButtonCustom from "../../Components/ButtonCustom";
import "./assignmentCreate.css";
import useAuthProvider from "../../FireBase/useAuthProvider";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../AxiosAPI/axiosInstance";
import { format, parse } from "date-fns";
import swal from "sweetalert";
import Swal from "sweetalert2";

function AssignmentCreate() {
  const { user } = useAuthProvider();
  // console.log(user.email);
  let email = user.email;
  const [dueDate, setDueDate] = useState(null);
  const handleDateChange = (date) => {
    setDueDate(date); // Update dueDate when the date changes
    console.log(dueDate);
  };

  const { mutateAsync } = useMutation({
    mutationFn: async (postData) => {
      const result = await axiosInstance.post(
        "/api/create-assignments",
        postData
      );
      console.log(result.data);
      return result.data;
    },
    mutationKey: ["create-assignments"],
    onSuccess: () => {
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Assignments has been made successfully.",
      });
    },
  });
  const handleSubAssignment = async (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const title = form.get("title");
    const difficulty = form.get("difficulty");
    const marks = form.get("marks");
    const thumbnail = form.get("thumbnail");
    const description = form.get("description");
    const assignmentInfo = {
      title,
      difficulty,
      marks,
      thumbnail,
      description,
      dueDate,
      email,
    };
    try {
      await mutateAsync(assignmentInfo);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="pt-[200px]">
      <div className="assignment-nav-wrap">
        <ul className="nav nav-pills" id="pills-tab-1" role="tablist">
          <li className="nav-item" role-presentation>
            <button
              className="nav-link active"
              id="pills-five-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-five"
              // type="button"
              role="tab"
              aria-controls="pills-five"
              aria-selected="true"
            >
              Create Assignments
            </button>
          </li>
        </ul>
      </div>
      <div className="p-8 assignment-form-wrap bg-[#DCDAE7]">
        <form onSubmit={handleSubAssignment}>
          <div className="row">
            <div className="col-xl-6 col-lg-6 col-sm-12 col-12">
              <label htmlFor="title">Title:</label>
              <input
                type="text"
                id="title"
                required
                name="title"
                className="block w-full mt-1"
                placeholder="Title"
              />
            </div>

            {/* Other input fields */}
            <div className="col-xl-6 col-lg-6 col-sm-12 col-12">
              <label htmlFor="difficulty">Difficulty Level:</label>
              <select
                id="difficulty"
                name="difficulty"
                className="block w-full mt-1 h-[50px] pl-6 rounded text-[#777777]"
              >
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>
            {/* Other input fields */}
            <div className="col-xl-6 col-lg-6 col-sm-12 col-12">
              <label htmlFor="marks">Marks:</label>
              <input
                type="text"
                id="marks"
                name="marks"
                required
                className="block w-full mt-1"
                placeholder="Marks"
              />
            </div>
            <div className="col-xl-6 col-lg-6 col-sm-12 col-12">
              <label htmlFor="thumbnail">Thumbnail Image URL:</label>
              <input
                id="thumbnail"
                name="thumbnail"
                required
                className="block w-full mt-1"
                placeholder="Thumbnail Image URL"
              />
            </div>
            <div className="col-xl-100 col-xl-6 col-lg-9 col-sm-12 col-12">
              <label htmlFor="description">Description:</label>
              <input
                type="text"
                id="description"
                required
                name="description"
                className="block w-full mt-1"
                placeholder="Description"
              />
            </div>
            <div className="flex flex-wrap col-xl-6 col-lg-6 col-sm-12 col-12">
              <label htmlFor="datepicker">Due Date:</label>
              <DatePicker
                id="datepicker"
                name="dueDate"
                required
                dateFormat="dd/MM/yyyy"
                selected={dueDate}
                onChange={handleDateChange}
                className="block w-full mt-1"
                placeholderText="Due Date"
              />
            </div>
            <div className="flex items-center justify-end w-full col-xl-2 col-lg-3 col-sm-12 col-12">
              <div className="text-center assignment-btn-wrap">
                <button type="submit" className=" assignment-btn">
                  Submit
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AssignmentCreate;
