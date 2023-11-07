import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { motion } from "framer-motion"; // Import motion from Framer Motion
import ButtonCustom from "../../Components/ButtonCustom";
import useAuthProvider from "../../FireBase/useAuthProvider";
import { useMutation } from "@tanstack/react-query";
import Swal from "sweetalert2";
import "./assignmentCreate.css";
import useAxiosInstance from "../../AxiosAPI/useAxiosInstance";

function AssignmentCreate() {
  const axiosInstance = useAxiosInstance();

  const { user } = useAuthProvider();
  let email = user.email;
  const [dueDate, setDueDate] = useState(null);

  const handleDateChange = (date) => {
    setDueDate(date);
  };

  const { mutateAsync } = useMutation({
    mutationFn: async (postData) => {
      const result = await axiosInstance.post(
        "/api/create-assignments",
        postData
      );
      return result.data;
    },
    mutationKey: ["create-assignments"],
    onSuccess: () => {
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Assignments have been created successfully.",
      });
    },
  });

  // Variants for animations
  const formVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  };

  const inputVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { delay: 0.2 } },
  };

  const buttonVariants = {
    hidden: { x: 20, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { delay: 0.4 } },
  };

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
    <>
      <div className="">
        <div
          className="hero min-h-screen"
          style={{
            backgroundImage:
              "url(https://i.ibb.co/bK4BWtJ/karthikeya-gs-HGn2-OIV6-Cgo-unsplash.jpg)",
          }}
        >
          <div className="hero-overlay bg-opacity-60"></div>
          <div className="hero-content text-center text-neutral-content  pt-[150px]">
            <div className="max-w-xl">
              <h1 className="mb-5 text-5xl font-bold">
                Our Mission and Vision
              </h1>
              <p className="mb-5 font-semibold lg:text-xl">
                At AssignmentHub, our mission is to connect students, educators,
                and professionals through a diverse selection of assignments. We
                envision a world where learning is accessible and engaging for
                all. Join us in this educational adventure.
              </p>
              <button className="btn btn-primary">Get Started</button>
            </div>
          </div>
        </div>
        <div className="assignment-nav-wrap">
          <ul className="nav nav-pills" id="pills-tab-1" role="tablist">
            <li className="nav-item" role="presentation">
              <button
                className="nav-link active"
                id="pills-five-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-five"
                role="tab"
                aria-controls="pills-five"
                aria-selected="true"
              >
                Create Assignments
              </button>
            </li>
          </ul>
        </div>
      </div>
      <motion.div
        className="assignment-form-wrap"
        variants={formVariants}
        initial="hidden"
        animate="visible"
      >
        <form onSubmit={handleSubAssignment}>
          <div className="grid-cols-1 gap-4 md:grid md:grid-cols-2 lg:grid-cols-3">
            <div className="mb-4">
              <motion.label htmlFor="title" variants={inputVariants}>
                Title:
              </motion.label>
              <motion.input
                type="text"
                id="title"
                required
                name="title"
                className="block w-full p-2 mt-1 border border-gray-300 rounded"
                placeholder="Title"
                variants={inputVariants}
              />
            </div>

            <div className="mb-4">
              <motion.label htmlFor="difficulty" variants={inputVariants}>
                Difficulty Level:
              </motion.label>
              <select
                id="difficulty"
                name="difficulty"
                className="block w-full p-2 mt-1 border border-gray-300 rounded"
              >
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>

            <div className="mb-4">
              <motion.label htmlFor="marks" variants={inputVariants}>
                Marks:
              </motion.label>
              <motion.input
                type="number"
                id="marks"
                name="marks"
                required
                className="block w-full p-2 mt-1 border border-gray-300 rounded"
                placeholder="Marks"
                variants={inputVariants}
              />
            </div>

            <div className="mb-4">
              <motion.label htmlFor="thumbnail" variants={inputVariants}>
                Thumbnail Image URL:
              </motion.label>
              <motion.input
                id="thumbnail"
                name="thumbnail"
                type="url"
                required
                className="block w-full p-2 mt-1 border border-gray-300 rounded"
                placeholder="Thumbnail Image URL"
                variants={inputVariants}
              />
            </div>

            <div className="mb-4">
              <motion.label htmlFor="description" variants={inputVariants}>
                Description:
              </motion.label>
              <motion.input
                type="text"
                id="description"
                required
                name="description"
                className="block w-full p-2 mt-1 border border-gray-300 rounded"
                placeholder="Description"
                variants={inputVariants}
              />
            </div>

            <div className="mb-4">
              <motion.label
                className="block"
                htmlFor="datepicker"
                variants={inputVariants}
              >
                Due Date:
              </motion.label>
              <DatePicker
                id="datepicker"
                name="dueDate"
                required
                dateFormat="dd/MM/yyyy"
                selected={dueDate}
                onChange={handleDateChange}
                className="block p-2 mt-1 border w-[-webkit-fill-available] border-gray-300 rounded lg:w-full"
                placeholderText="Due Date"
                variants={inputVariants}
              />
            </div>

            <motion.div
              className="flex items-center justify-start col-span-2"
              variants={buttonVariants}
            >
              <motion.button
                type="submit"
                className="px-4 py-2 text-white bg-blue-500 rounded"
              >
                Submit
              </motion.button>
            </motion.div>
          </div>
        </form>
      </motion.div>
    </>
  );
}

export default AssignmentCreate;
