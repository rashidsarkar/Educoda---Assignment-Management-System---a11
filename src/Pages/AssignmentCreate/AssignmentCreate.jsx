import "./assignmentCreate.css";

function AssignmentCreate() {
  return (
    <div className="pt-[200px]">
      <div className="assignment-nav-wrap">
        <ul className="nav nav-pills" id="pills-tab-1" role="tablist">
          <li className="nav-item" role="presentation">
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
              <input type="text" placeholder="Enter Your Name" />
            </div>
            <div className="col-xl-6 col-lg-6 col-sm-12 col-12">
              <input
                type="text"
                id="datepicker"
                placeholder="Due Date mm/dd/yyyy"
                className="hasDatepicker"
              />
            </div>
            <div className="col-xl-6 col-lg-6 col-sm-12 col-12">
              <input type="email" placeholder="webinfo@gmail.com" />
            </div>
            <div className="col-xl-6 col-lg-6 col-sm-12 col-12">
              <div className="input-file-upload position-relative">
                <input type="file" />
                <img src="assets/images/icon/upload-icon-2.png" alt="" />
                <span>Assignment Files Upload</span>
              </div>
            </div>
            <div className="col-xl-6 col-lg-6 col-sm-12 col-12">
              <input type="text" placeholder="Subject Name" />
            </div>
            <div className="col-xl-6 col-lg-6 col-sm-12 col-12">
              <input type="text" placeholder="School Name" />
            </div>
            <div className="col-xl-10 col-lg-9 col-sm-12 col-12">
              <input type="text" placeholder="Message" />
            </div>
            <div className="col-xl-2 col-lg-3 col-sm-12 col-12">
              <div className="text-center assignment-btn-wrap">
                <button type="submit" className="assignment-btn">
                  Let’s start +
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
