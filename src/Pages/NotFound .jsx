import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  const errorBgStyle = {
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1600 900'%3E%3Cpolygon fill='%23f0b608' points='957 450 539 900 1396 900'/%3E%3Cpolygon fill='%23e6d710' points='957 450 872.9 900 1396 900'/%3E%3Cpolygon fill='%23e7af05' points='-60 900 398 662 816 900'/%3E%3Cpolygon fill='%23e7d808' points='337 900 398 662 816 900'/%3E%3Cpolygon fill='%23d8a408' points='1203 546 1552 900 876 900'/%3E%3Cpolygon fill='%23f1e213' points='1203 546 1552 900 1162 900'/%3E%3Cpolygon fill='%23f0b607' points='641 695 886 900 367 900'/%3E%3Cpolygon fill='%23e4d506' points='587 900 641 695 886 900'/%3E%3Cpolygon fill='%23eab822' points='1710 900 1401 632 1096 900'/%3E%3Cpolygon fill='%23e8da14' points='1710 900 1401 632 1365 900'/%3E%3Cpolygon fill='%23e8b008' points='1210 900 971 687 725 900'/%3E%3Cpolygon fill='%23edde14' points='943 900 1210 900 971 687'/%3E%3C/svg%3E")`,
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-fixed bg-indigo-500 bg-bottom bg-cover error-bg"
      style={errorBgStyle}
    >
      <div className="container">
        <div className="row">
          <div className="text-center col-sm-8 offset-sm-2 text-gray-50 -mt-52">
            <div className="relative ">
              <h1 className="relative font-sans font-bold text-9xl tracking-tighter-less text-shadow">
                <span>4</span>
                <span>0</span>
                <span>4</span>
              </h1>
              <span className="absolute top-0 -ml-12 font-semibold text-gray-300">
                Oops!
              </span>
            </div>
            <h5 className="-mt-3 -mr-10 font-semibold text-gray-300">
              Page not found
            </h5>
            <p className="mt-2 mb-6 text-gray-100">
              We are sorry, but the page you requested was not found
            </p>
            <Link
              to="/"
              className="px-5 py-3 text-sm font-medium tracking-wider bg-green-400 rounded-full shadow-sm text-gray-50 hover:shadow-lg"
            >
              Go to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
