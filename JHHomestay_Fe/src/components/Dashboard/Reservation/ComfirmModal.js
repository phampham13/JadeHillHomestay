import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/solid";
import { Fragment } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const ConfirmModal = (props) => {
  const [isOpen, setIsOpen] = props.confirmProps;
  const closeModal = () => setIsOpen(false);

  const { _id } = props.data;
  const token = props.token;

  const setIsRemoved = props.setIsRemoved;

  const handleRemoveBill = () => {
    closeModal();
    toast("Đang chờ...", { type: toast.TYPE.INFO });
    console.log(_id);
    axios({
      method: "DELETE",
      url: `http://localhost:8000/admins/delete/bills/${_id}`,
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then(() => {
        toast("Thành công", { type: toast.TYPE.SUCCESS });
        setIsRemoved(true);
      })
      .catch((err) => {
        console.log(err);
        toast(err.message, { type: toast.TYPE.ERROR });
      });
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
              <div className="inline-block w-1/3 p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <div className="relative">
                  <Dialog.Title
                    as="h3"
                    className="text-xl font-bold leading-6 text-gray-900 text-center"
                  >
                    Bạn thật sự muốn xóa?
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
                    Việc bạn xóa đơn này có thể ảnh hưởng đến chất lượng dịch vụ
                    của Homestay.
                    <br />
                    <strong>Bạn có thực sự muốn xóa?</strong>
                  </div>
                </div>

                <div className="mt-4 flex flex-row justify-around">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-900 bg-gray-100 border border-transparent rounded-md hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    onClick={closeModal}
                  >
                    Quay lại
                  </button>
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-green-900 bg-green-100 border border-transparent rounded-md hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    onClick={handleRemoveBill}
                  >
                    Xác nhận
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default ConfirmModal;
