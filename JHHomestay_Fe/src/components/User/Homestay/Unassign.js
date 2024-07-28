import { Dialog, Transition } from '@headlessui/react'
import { Fragment} from 'react'
import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux'
import axios from 'axios';
import { toast } from 'react-toastify';

function Unassign(props) {
  const [unassignForm,setUnassignForm] = props.openProp
  const _idAdmin = props._idAdmin
  const _idHomestay = props._idHomestay
  const [reload,setReload] = props.reload
  const [isUnassign, setIsUnassign] = useState(false)

  function closeModal() {
    setUnassignForm(false)
  }

  const { token } = useSelector((state) => state.authReducer);

  useEffect(()=>{
      if(isUnassign){
          axios({
              method:'POST',
              url:'http://localhost:8000/super-admins/unassign-homestay',
              data:{
                adminId: _idAdmin,
                homestayId: _idHomestay
              },
              headers:{
                Authorization: "Bearer " + token
              }
          }).then((res)=>{
              toast.success("Gỡ Thành Công")
              console.log(res)
              setReload(true)
          }).catch((err)=>{
              console.log(err)
          })
      }
  },[isUnassign])
  return (
    <>
      <Transition appear show={unassignForm} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto backdrop-filter backdrop-brightness-50"
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
              <div className="inline-block max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Gỡ Homestay Khỏi Admin
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-700">
                    Thao tác này sẽ gỡ Homestay khỏi Admin. Bạn có chắc chắn không?
                  </p>
                </div>

                <div className="mt-4 flex flex-row justify-around">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-900 bg-gray-200 border border-transparent rounded-md hover:bg-gray-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    onClick={closeModal}
                  >
                    Quay lại
                  </button>
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-red-900 bg-red-200 border border-transparent rounded-md hover:bg-red-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    onClick={() => {
                      setIsUnassign(true)
                      closeModal()
                    }}
                  >
                    Gỡ
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
export default Unassign;