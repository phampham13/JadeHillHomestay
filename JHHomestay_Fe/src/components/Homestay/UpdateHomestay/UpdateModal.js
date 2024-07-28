import { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";

import CreateForm from "../../Homestay/CreateHomestay/CreateForm.js";
// import CreateForm from "./CreateForm"

function UpdateModal (props){
    const [isOpen, setIsOpen] = props.openProp;
    const _id=props._id
    const [reload,setReload] = props.reload
    const [initialData, setIntitalData] = useState({})
    const [infor, setInfor] = useState({})
    const [amenities, setAmenities] = useState([])
    const [services, setServices] = useState([])
    const [generalServices, setGeneralServices] = useState([])
    const [imageSelected, setImageSelected]=useState([])
    const [oldImages, setOldImages]=useState([])

    const { token } = useSelector((state) => state.authReducer);

    const closeModal = () =>{
        setIsOpen(false);
        setAmenities(initialData.amenities)
        setServices(initialData.services)
        setGeneralServices(initialData.generalServices)
        setInfor(initialData.infor)
        setOldImages(initialData.photos)
    }

    useEffect(() => {
        const fetchData = async() => {
            try {
                const {data: response} = await axios.get(`http://localhost:8000/homestays/information/${_id}`, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: "Bearer " + token,
                    }
                });
                setInfor(response.content.homestay)
                setServices(response.content.homestay.services)
                setAmenities(response.content.homestay.amenities)
                setGeneralServices(response.content.homestay.generalServices)
                setOldImages(response.content.homestay.photos)                
                setIntitalData({
                    infor: response.content.homestay,
                    amenities: response.content.homestay.amenities,
                    services: response.content.homestay.services,
                    generalServices: response.content.homestay.generalServices,
                    photos: response.content.homestay.photos
                })
            } 
            catch (error) {
                console.error(error.message);
              }
        }
        fetchData()
      }, [isOpen])

    const updateSubmit = (e) =>{
        e.preventDefault();

        const formData = new FormData();
        formData.append("_id", _id)
        for(let i = 0; i < imageSelected?.length; i++) {
            formData.append("files", imageSelected[i])
        }
        formData.append("name", infor.name)
        formData.append("province", infor.province)
        formData.append("district", infor.district)
        formData.append("address", infor.address)
        formData.append("type", infor.type)
        formData.append("price", infor.price)
        formData.append("adminId", infor.admin)
        formData.append("area", infor.area)
        formData.append("description", infor.description)
        formData.append("amenities", JSON.stringify(amenities))
        formData.append("services", JSON.stringify(services))
        formData.append("generalServices", JSON.stringify(generalServices))
        formData.append("photos", JSON.stringify(oldImages))

        if (infor.name === "" || infor.name===undefined) {
            toast.error("Chưa điền Tên homestay")
          } else 
          {
            axios
            .put('http://localhost:8000/homestays/update', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: "Bearer " + token,
                }
            })
            .then (() => {
                toast.success("Cập nhật thông tin Homestay thành công")
                setIsOpen(false)
                setAmenities(amenities)
                setServices(services)
                setGeneralServices(generalServices)
                setInfor(infor)
                setOldImages(oldImages)
                setReload(true)
                console.log(_id)
            })
            .catch (err => {
                toast.error("Opps! Có lỗi xảy ra. Hãy thử lại")
                console.log(err.message)
            })
        }
    }
    return (
        <div>
            <Transition appear show={isOpen} as={Fragment}>
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
                        <div className="
                            inline-block w-3/5 p-6 my-8 overflow-hidden text-left 
                            align-middle transition-all transform bg-white shadow-xl rounded-2xl"
                            >
                            <div className="relative">
                                <Dialog.Title
                                    as="h3"
                                    className="text-xl font-bold leading-6 text-gray-900 text-center"
                                >
                                    Cập nhật thông tin Homestay
                                </Dialog.Title>
                                <button
                                    className="absolute top-0 right-0 rounded-full transition ease-in-out duration-400 hover:bg-gray-200"
                                    onClick={() => {
                                    closeModal()}}
                                >
                                    <XIcon className="w-6 h-6" />
                                </button>
                            </div>
                            
                            <div className="my-4 border-t border-b max-h-xl overflow-x-hidden">
                                <div class="h-4 mt-3 text-gray-500 text-xs leading-8 text-right">
                                    <span class="text-red-400 mr-1">*</span> 
                                    Các trường bắt buộc phải điền
                                </div>
                                <CreateForm 
                                    inforProps={[infor, setInfor]}
                                    state="update"
                                    amenityProps={[amenities, setAmenities]}
                                    generalProps={[generalServices, setGeneralServices]}
                                    serviceProps={[services, setServices]}
                                    imageProps={setImageSelected}
                                    oldImages={oldImages}
                                    setNewOldImages={setOldImages}
                                />
                               
                            </div>

                            <div className="text-center">
                                <button 
                                    className="
                                        inline-flex justify-center px-4 py-2 text-md font-medium shadow-md 
                                        text-white bg-green-600 border border-transparent rounded-md 
                                        focus:cursor-pointer hover:bg-green-700 text-lg text-center"
                                    onClick={(e) => {
                                        updateSubmit(e);
                                        }}
                                    >
                                Xác nhận
                                </button>
                            </div>
                        </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>
        </div>
    )
}

export default UpdateModal;
