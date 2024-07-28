import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/solid";
import { Fragment } from "react";
import UserData from "./Modal/UserData";
import DatetimeData from "./Modal/DatetimeData";
import ServiceData from "./Modal/ServiceData";
import axios from "axios";
import { toast } from "react-toastify";

const UpdateModal = (props) => {
  const [isOpen, setIsOpen] = props.editProps;
  const closeModal = () => setIsOpen(false);

  const [modalData, setModalData] = props.editDataProps;
  const { id } = props.status;
  const token = props.token;
  const setIsEdited = props.setIsEdited;
  const setIsConfirmOpen = props.setIsConfirmOpen;

  const handleRejectClick = () => {
    // Call API remove bill from database
    setIsConfirmOpen(true);
    closeModal();
  };

  const handleAcceptClick = () => {
    if (id === 1) {
      // Call API - Move this Bill from Accepted to Paid
      toast("Đang chờ...", { type: toast.TYPE.INFO });
      axios({
        method: "PUT",
        url: "http://localhost:8000/admins/update/bills",
        data: {
          ...modalData,
          homestayId: modalData.homestay,
          status: 3,
        },
        headers: {
          Authorization: "Bearer " + token,
        },
      })
        .then(() => {
          toast("Thành công", { type: toast.TYPE.SUCCESS });
          setIsEdited(true);
        })
        .catch((err) => toast(err.message, { type: toast.TYPE.ERROR }));
    } else {
      // Call API - Move this Bill from Pending to Accepted
      toast("Đang chờ...", { type: toast.TYPE.INFO });
      axios({
        method: "PUT",
        url: "http://localhost:8000/admins/update/bills",
        data: {
          ...modalData,
          homestayId: modalData.homestay,
          status: 1,
        },
        headers: {
          Authorization: "Bearer " + token,
        },
      })
        .then(() => {
          toast("Thành công", { type: toast.TYPE.SUCCESS });
          setIsEdited(true);
        })
        .catch((err) => toast(err.message, { type: toast.TYPE.ERROR }));
    }
    closeModal();
  };

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto backdrop-filter backdrop-blur-sm"
          onClose={closeModal}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block max-w-2xl w-2/3 p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <div className="relative">
                  <Dialog.Title
                    as="h3"
                    className="text-xl font-bold leading-6 text-gray-900 text-center"
                  >
                    Thông tin chi tiết
                  </Dialog.Title>
                  <button
                    className="absolute top-0 left-0 rounded-full transition ease-in-out duration-400 hover:bg-gray-200"
                    onClick={closeModal}
                  >
                    <XIcon className="w-6 h-6" />
                  </button>
                </div>

                <div className="my-4 border-t border-b max-h-xl overflow-y-auto overflow-x-hidden">
                  <div className="m-4">
                    <UserData
                      userData={modalData.customer}
                      accompanyData={modalData.customerTogether}
                    />
                    <DatetimeData
                      timedateProps={[modalData, setModalData]}
                      id={id}
                    />
                    <ServiceData serviceProps={modalData.servicesPerBill} />
                  </div>
                </div>

                {id === 3 ? null : (
                  <div className="mt-4 flex flex-row justify-around">
                    <button
                      type="button"
                      className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-900 bg-gray-100 border border-transparent rounded-md hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                      onClick={handleRejectClick}
                    >
                      {id === 1 ? "Từ chối" : "Hủy đơn"}
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center px-4 py-2 text-sm font-medium text-green-900 bg-green-100 border border-transparent rounded-md hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                      onClick={handleAcceptClick}
                    >
                      {id === 1 ? "Chấp nhận" : "Xác nhận"}
                    </button>
                  </div>
                )}
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default UpdateModal;
