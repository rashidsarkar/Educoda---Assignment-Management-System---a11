function MyAssingmentCard({ assignment }) {
  const { title, marks, feedback, obtainmarks, thumbnail, status } = assignment;
  const statusColor = {
    color: status === "completed" ? "green" : "yellow",
  };

  return (
    <div>
      <div className="flex mb-4 bg-gray-400 border border-gray-200 rounded-lg shadow hover-bg-gray-100 dark-border-gray-700 dark-bg-gray-800 dark-hover-bg-gray-700">
        <img
          className="object-cover w-1/4 h-96 md:h-auto"
          src={thumbnail}
          alt=""
        />
        <div className="w-3/4 p-4">
          <h2 className="mb-2 text-3xl italic font-bold text-gray-900 dark-text-white">
            {title}
          </h2>
          <div className="inline-block ">
            <div className="flex justify-between w-auto text-lg text-gray-600">
              <p>
                <span className="font-semibold">Marks:</span> {marks}
              </p>
              <span className="mx-2">| |</span>
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
