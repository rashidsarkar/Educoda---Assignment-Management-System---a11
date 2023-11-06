function MyAssingmentCard({ assignment }) {
  const { title, marks, feedback, obtainmarks, thumbnail, status } = assignment;
  const statusColor = {
    color: status === "completed" ? "green" : "black",
  };

  return (
    <div>
      <div className="grid grid-cols-[max-content] lg:flex mb-4 border border-gray-200 rounded-lg shadow hover-bg-gray-100 dark-border-gray-700 dark-bg-gray-800 dark-hover-bg-gray-700">
        <img
          className="object-cover w-1/4 lg:h-96 md:h-auto"
          src={thumbnail}
          alt=""
        />
        <div className="   inline-block p-4 w-[200px] lg:w-3/4">
          <h2 className="mb-2 text-3xl italic font-bold text-gray-900 dark-text-white">
            {title}
          </h2>
          <div className="inline-block ">
            <div className="w-auto text-lg text-gray-600 lg:flex lg:justify-between">
              <p>
                <span className="font-semibold">Marks:</span> {marks}
              </p>
              <span className="hidden mx-2 lg:block">| |</span>
              <p className="text-right">
                <span className="font-semibold">Status:</span>{" "}
                <span style={statusColor} className="capitalize">
                  {status}
                </span>
              </p>
            </div>
          </div>

          <p className="mb-3 text-sm text-gray-700 dark-text-gray-400">
            <span className="font-bold">Obtained Marks:</span>

            {obtainmarks}
          </p>
          <p className="text-sm text-gray-700 dark-text-gray-400">
            <span className="font-bold">feedback:</span> {feedback}
          </p>
          <div className="flex mt-4 space-x-4"></div>
        </div>
      </div>
    </div>
  );
}

export default MyAssingmentCard;
