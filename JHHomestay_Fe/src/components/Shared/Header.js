import { Fragment, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { UserCircleIcon } from "@heroicons/react/outline";
import { ChevronDownIcon } from "@heroicons/react/solid";

import LogoutModal from "./LogoutModal";

const user = {
  name: "User Name",
};
const userNavigation = [
  { name: "Thông tin cá nhân", href: "#", id: "Profile" },
  { name: "Đăng xuất", href: "#", id: "Logout" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Header = (props) => {
  let [isOpen, setIsOpen] = useState(false);

  function openModal(id) {
    console.log(id);
    if (id === "Logout") setIsOpen(true);
  }
  return (
    <div className="border-solid h-16 md:h-20 shadow flex items-center justify-end bg-gray-100">
      <div className="mx-4 h-auto flex-shrink-0 visible min-h-full">
        <Disclosure as="nav" className="bg-gray-100">
          {({ open }) => (
            <div className="max-w-7xl mx-auto px-0 lg:px-2 flex items-center my-2 justify-between h-12 md:h-16 ">
              <div className="md:block ml-4 flex items-center">
                {/* Profile dropdown */}
                <Menu as="div" className="ml-3 relastive">
                  <div>
                    <Menu.Button className="max-w-sm bg-gray-100 flex items-center rounded-full hover:bg-gray-100">
                      <UserCircleIcon className="pl-2 w-10 h-10 md:h-12 md:w-12 stroke-current test-define" />
                      <style>{`
                                            .test-define > path{
                                                stroke-width: 1;
                                            }
                                        `}</style>
                      <p className="md:text-xl text-base pl-2 w-auto text-black">
                        {props.email}
                      </p>
                      <ChevronDownIcon className="w-6 h-6 pt-1 pr-1" />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="origin-top-right absolute z-10 right-3 mt-4 md:mt-5 h-22 w-44 md:h-28 md:w-52 rounded-md shadow-lg py-1 bg-gray-100 ring-1 ring-black ring-opacity-5 focus:outline-none">
                      {userNavigation.map((item) => (
                        <Menu.Item key={item.name}>
                          {({ active }) => (
                            <button
                              className={classNames(
                                active ? "bg-gray-100 font-semibold" : "",
                                "block px-4 py-1 md:py-3 md:text-xl text-base text-gray-700"
                              )}
                              onClick={() => openModal(item.id)}
                            >
                              {item.name}
                            </button>
                          )}
                        </Menu.Item>
                      ))}
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          )}
        </Disclosure>
      </div>
      <LogoutModal logoutProp={[isOpen, setIsOpen]} />
    </div>
  );
};

export default Header;
