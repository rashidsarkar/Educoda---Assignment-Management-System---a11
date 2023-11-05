import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ButtonCustom from "../../Components/ButtonCustom";
import "./assignmentCreate.css";

function AssignmentCreate() {
  const [dueDate, setDueDate] = useState(null);

  const handleDateChange = (date) => {
    setDueDate(date);
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
              type="button"
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
        <form action="index.html">
          <div className="row">
            <div className="col-xl-6 col-lg-6 col-sm-12 col-12">
              <label htmlFor="title">Title:</label>
              <input
                type="text"
                id="title"
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
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
            {/* Other input fields */}
            <div className="col-xl-6 col-lg-6 col-sm-12 col-12">
              <label htmlFor="marks">Marks:</label>
              <input
                type="text"
                id="marks"
                name="marks"
                className="block w-full mt-1"
                placeholder="Marks"
              />
            </div>
            <div className="col-xl-6 col-lg-6 col-sm-12 col-12">
              <label htmlFor="thumbnail">Thumbnail Image URL:</label>
              <input
                type="email"
                id="thumbnail"
                name="thumbnail"
                className="block w-full mt-1"
                placeholder="Thumbnail Image URL"
              />
            </div>
            <div className="col-xl-100 col-xl-6 col-lg-9 col-sm-12 col-12">
              <label htmlFor="description">Description:</label>
              <input
                type="text"
                id="description"
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
                selected={dueDate}
                onChange={handleDateChange}
                className="block w-full mt-1"
                placeholderText="Due Date mm/dd/yyyy"
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
