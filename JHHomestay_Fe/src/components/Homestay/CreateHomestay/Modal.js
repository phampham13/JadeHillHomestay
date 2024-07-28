import { Fragment, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";

import CreateForm from "./CreateForm";

function Modal (props){
    const [isOpen, setIsOpen] = props.openProps;
    const [reload,setReload] = props.reload;
    const closeModal = () => {
        setIsOpen(false);
        setInfor({})
        setAmenities([])
        setServices([])
        setGeneralServices([])
        setImageSelected('')
    }
    const { token } = useSelector((state) => state.authReducer);

    const [amenities, setAmenities]= useState([])
    const [generalServices, setGeneralServices] = useState([])
    const [services, setServices] = useState([])
    const [infor, setInfor] = useState(
        {
            name: "" ,
            province: "",
            district : "",
            address : "",
            type: "",
            area: "",
            description: "",
            price : 0,
            adminId:""
        }, null
    )
    const [imageSelected, setImageSelected]=useState([''])

    const handleSubmit = (e) =>{
        e.preventDefault();

        const formData = new FormData();
        console.log("image1 ", imageSelected)
        for(let i = 0; i < imageSelected?.length; i++) {
            formData.append("files", imageSelected[i])
        }
        formData.append("name", infor.name)
        formData.append("province", infor.province)
        formData.append("district", infor.district)
        formData.append("address", infor.address)
        formData.append("type", infor.type)
        formData.append("price", infor.price)
        formData.append("adminId", infor.adminId)
        formData.append("area", infor.area)
        formData.append("description", infor.description)
        formData.append("amenities", JSON.stringify(amenities))
        formData.append("services", JSON.stringify(services))
        formData.append("generalServices", JSON.stringify(generalServices))

        if (infor.name === "" || infor.name===undefined) {
            toast.error("Chưa điền Tên homestay")
        } else 
        {
            axios
            .post('http://localhost:8000/super-admins/create/homestays', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: "Bearer " + token,
                }
            })
            .then (res => {
                toast.success("Thêm mới Homestay thành công!")
                setIsOpen(false)
                setReload(true)
                setAmenities([])
                setGeneralServices([])
                setServices([])
                setInfor({
                    name: "" ,
                    province: "",
                    district : "",
                    address : "",
                    type: "",
                    area: "",
                    description: "",
                    price : 0,
                    adminId:""
                }, null)
                setImageSelected('')
                console.log("image2 ", imageSelected)
            })
            .catch(err=> {
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
                                    Tạo Homestay mới
                                </Dialog.Title>
                                <button
                                    className="absolute top-0 right-0 rounded-full transition ease-in-out duration-400 hover:bg-gray-200"
                                    onClick={closeModal}
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
                                    state="create"
                                    serviceProps={[services, setServices]}
                                    amenityProps={[amenities, setAmenities]}
                                    generalProps={[generalServices, setGeneralServices]}
                                    imageProps={setImageSelected}
                                />
                               
                            </div>

                            <div className="text-center">
                                <button 
                                    className="
                                        inline-flex justify-center px-4 py-2 text-md font-medium shadow-md 
                                        text-white bg-green-600 border border-transparent rounded-md 
                                        focus:cursor-pointer hover:bg-green-700 text-lg text-center"
                                    onClick={(e) => {
                                        handleSubmit(e);
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
export default Modal;