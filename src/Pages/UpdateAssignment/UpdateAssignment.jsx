import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ButtonCustom from "../../Components/ButtonCustom";

import useAuthProvider from "../../FireBase/useAuthProvider";
import { useMutation, useQuery } from "@tanstack/react-query";
import axiosInstance from "../../AxiosAPI/axiosInstance";
import swal from "sweetalert";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
import { updateCurrentUser } from "firebase/auth";
import CustomLoading from "../../Components/CustomLoading";

function UpdateAssignment() {
  const { user } = useAuthProvider();
  const { idx } = useParams();
  console.log(idx);
  // let email = user.email;

  const {
    data: UpdatedAssignment,
    isLoading,
    error,
    refetch, // Get the refetch function
  } = useQuery({
    queryKey: ["create-assignments", idx],
    queryFn: () =>
      axiosInstance.get(`http://localhost:5000/api/updated-assignments/${idx}`),
  });

  // Assuming UpdatedAssignment contains assignment data
  const assignmentData = UpdatedAssignment?.data || {};

  const [dueDate, setDueDate] = useState(null);
  const handleDateChange = (date) => {
    setDueDate(date); // Update dueDate when the date changes
  };

  const { mutateAsync } = useMutation({
    mutationFn: async (postData) => {
      const result = await axiosInstance.put(
        `/api/updated-my-assignments/${idx}`,
        postData
      );
      console.log(result.data);
      if (result.data.modifiedCount) {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Assignment has been updated successfully.",
        });
      }
      return result.data;
    },
    mutationKey: ["create-assignments"],
    onSuccess: () => {},
  });

  const handleUpdatedAssignment = async (e) => {
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
    };
    try {
      await mutateAsync(assignmentInfo);
    } catch (err) {
      console.log(err);
    }
  };
  if (error) {
    return error.message;
  }

  if (isLoading) {
    return <CustomLoading></CustomLoading>;
  }
  let date = UpdatedAssignment?.data.dueDate;
  return (
    <div className="pt-[200px]">
      <div className="assignment-nav-wrap">
        <ul className="nav nav-pills" id="pills-tab-1" role="tablist">
          <li className="nav-item">
            <button
              className="nav-link active"
              id="pills-five-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-five"
              role="tab"
              aria-controls="pills-five"
              aria-selected="true"
            >
              Update Assignment
            </button>
          </li>
        </ul>
      </div>
      <div className="p-8 assignment-form-wrap bg-[#DCDAE7]">
        <form onSubmit={handleUpdatedAssignment}>
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
                defaultValue={assignmentData.title || ""}
              />
            </div>
            <div className="col-xl-6 col-lg-6 col-sm-12 col-12">
              <label htmlFor="difficulty">Difficulty Level:</label>
              <select
                id="difficulty"
                name="difficulty"
                className="block w-full mt-1 h-[50px] pl-6 rounded text-[#777777]"
                defaultValue={assignmentData.difficulty || "Easy"}
              >
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>
            <div className="col-xl-6 col-lg-6 col-sm-12 col-12">
              <label htmlFor="marks">Marks:</label>
              <input
                type="text"
                id="marks"
                name="marks"
                required
                className="block w-full mt-1"
                placeholder="Marks"
                defaultValue={assignmentData.marks || ""}
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
                defaultValue={assignmentData.thumbnail || ""}
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
                defaultValue={assignmentData.description || ""}
              />
            </div>
            <div className="flex flex-wrap col-xl-6 col-lg-6 col-sm-12 col-12">
              <label htmlFor="datepicker">Due Date:</label>
              <DatePicker
                id="datepicker"
                name="dueDate"
                onChange={handleDateChange}
                required
                selected={dueDate}
                className="block w-full mt-1"
                placeholderText={` ${dueDate || date}`}
                dateFormat="yyyy/MM/dd"
              />
            </div>
            <div className="flex items-center justify-end w-full col-xl-2 col-lg-3 col-sm-12 col-12">
              <div className="text-center assignment-btn-wrap">
                <button type="submit" className="assignment-btn">
                  Update
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateAssignment;
