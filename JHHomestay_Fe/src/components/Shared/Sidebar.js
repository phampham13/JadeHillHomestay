import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import logo from "../../public/logo.svg";

const sidebarVar = [
  {
    path: "/dashboard/sales",
    title: "Revenue",
    icon: <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>,
    authorize: "all",
  },
  {
    path: "/dashboard/reservation-management",
    title: "Reservation",
    icon: <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
      />
    </svg>,
    authorize: "admin",
  },
  {
    path: "/dashboard/homestay-management",
    title: "Homestay",
    icon:  <svg
    viewBox="0 0 512 512"
    fill="currentColor"
    height="1em"
    width="1em"
  >
    <path d="M261.56 101.28a8 8 0 00-11.06 0L66.4 277.15a8 8 0 00-2.47 5.79L63.9 448a32 32 0 0032 32H192a16 16 0 0016-16V328a8 8 0 018-8h80a8 8 0 018 8v136a16 16 0 0016 16h96.06a32 32 0 0032-32V282.94a8 8 0 00-2.47-5.79z" />
    <path d="M490.91 244.15l-74.8-71.56V64a16 16 0 00-16-16h-48a16 16 0 00-16 16v32l-57.92-55.38C272.77 35.14 264.71 32 256 32c-8.68 0-16.72 3.14-22.14 8.63l-212.7 203.5c-6.22 6-7 15.87-1.34 22.37A16 16 0 0043 267.56L250.5 69.28a8 8 0 0111.06 0l207.52 198.28a16 16 0 0022.59-.44c6.14-6.36 5.63-16.86-.76-22.97z" />
  </svg>,
    authorize: "all",
  },
  {
    path: "/dashboard/user-management",
    title: "User",
    icon: <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
      />
    </svg>,
    authorize: "super_admin",
  },
  {
    path: "/dashboard/discount-management",
    title: "Discount",
    icon: <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
      />
    </svg>,
    authorize: "admin",
  },
];

function Sidebar() {
  const { role } = useSelector((state) => state.authReducer);

  let location = useLocation();
  const sidebarList = sidebarVar.map((item) => {
    if (item.authorize === "all" || (item.authorize === role))
      if (location.pathname === item.path)
        return (
          <li style={{border: '6px solid rgba(0, 0, 0, 0.05)'}} className="flex items-center mx-12 my-5 md:text-xl text-auto cursor-pointer text-gray-600 transform hover:scale-125 hover:text-green-700" >
            {item.icon}
            <Link
              to={item.path}
              className="ml-2 text-green-600 font-bold md:text-2xl text-auto"

            >
              {item.title}
            </Link>
          </li>
        );
      // có focus
      else
        return (
          <li className="flex items-center mx-12 my-5 md:text-xl text-auto cursor-pointer text-gray-600 transform hover:scale-125 hover:text-green-700">
            {item.icon}
            <Link to={item.path} className="ml-2">
              {item.title}
            </Link>
          </li>
        ); // không focus
  });

  const sidebarClass =
    "flex items-center mx-12 my-5 md:text-xl text-auto cursor-pointer text-gray-600 transform hover:scale-125 hover:text-green-700";
  return (
    <div className="w-full h-full flex flex-no-wrap">
      {/* Sidebar starts */}
      <div className="absolute lg:relative w-full h-screen shadow bg-gray-100 flex flex-col lg:block">
        <div>
          <img className="mx-auto mt-5 h-24 w-auto" src={logo} alt="Logo" />
        </div>
        <ul className="py-6" aria-orientation="vertical">
          {sidebarList}
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
