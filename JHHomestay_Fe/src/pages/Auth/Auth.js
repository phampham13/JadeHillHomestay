import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import logo from "../../public/logo.svg";
import { LockClosedIcon } from "@heroicons/react/solid";
import { ExclamationCircleIcon, XIcon } from "@heroicons/react/outline";
import { toast } from "react-toastify";

function Auth() {
  /* State */
  const [authData, setAuthData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  /* Handler */
  const handleInputChange = (e) => {
    setAuthData({
      ...authData,
      [e.target.name]: e.target.value,
    });
  };

  const authHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (authData.email === "") {
      toast("Chưa điền địa chỉ Email", { type: toast.TYPE.ERROR });
    } else if (authData.password === "") {
      toast("Chưa điền Mật khẩu", { type: toast.TYPE.ERROR });
    } else {
      try {
        const response = await axios.post(
          "http://localhost:8000/auth/login",
          authData
        );
        dispatch({
          type: "SET",
          payload: {
            homestays: response.data.content.homestays,
          },
        });
        dispatch({
          type: "LOGIN",
          payload: {
            email: response.data.content.email,
            userId: response.data.content._id,
            token: response.data.content.token,
            role: response.data.content.role,
          },
        });
      } catch (err) {
        toast("Email hoặc Mật khẩu không đúng", { type: toast.TYPE.ERROR });
      }
    }
    setLoading(false);
  };

  return (
    <div className="relative overflow-hidden w-screen min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-md space-y-8">
        <div>
          <img className="mx-auto h-24 w-auto" src={logo} alt="Logo" />
          <h2 className="text-center text-3xl font-bold text-gray-900 pt-2">
            Đăng nhập vào tài khoản của bạn
          </h2>
        </div>
        <div className="w-full bg-white p-8 border border-gray-200 rounded-lg shadow-md">
          <form className="space-y-6" method="POST">
            <div className="rounded-lg shadow-sm">
              <div>
                <label htmlFor="email-address">Địa chỉ Email</label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 mt-1 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-green-800 focus:border-green-800 focus:z-10 sm:text-sm"
                  onChange={handleInputChange}
                />
              </div>
              <div className="mt-4">
                <label htmlFor="password">Mật khẩu</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  value={authData.password}
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 mt-1 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-green-800 focus:border-green-800 focus:z-10 sm:text-sm"
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Lưu đăng nhập
                </label>
              </div>
              <div className="text-sm">
                <a
                  href="#"
                  className="font-medium text-green-600 hover:text-green-700"
                >
                  Quên mật khẩu?
                </a>
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-700 shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-600"
                onClick={authHandler}
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  {loading ? (
                    <div className="border-top-transparent w-5 h-5 border-4 border-green-400 border-solid rounded-full animate-spin" />
                  ) : (
                    <LockClosedIcon
                      className="h-5 w-5 text-green-600 group-hover:text-green-900"
                      aria-hidden="true"
                    />
                  )}
                </span>
                Đăng nhập
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Auth;
