import { Fragment, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import axios from "axios";
import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import InformationForm from "../UpdateAdmin/InformationForm";

function UpdateAdmin (props){
    const _id = props._id
    const [updateForm, setUpdateForm] = props.openProp;
    const [reload,setReload] = props.reload
    const closeModal = () => setUpdateForm(false);
    const [infor, setInfor] = useState({})
    const { token } = useSelector((state) => state.authReducer);
    
    useEffect(()=>{
        const fetchData = async() => {
        try {
            const {data: response} = await axios.get(`http://localhost:8000/super-admins/get/admin/${_id}`, 
            {
                headers:{
                    Authorization: "Bearer " + token
                }
            })
            setInfor(response.content)
        } catch(err) {
            console.log(err.message)
            }   
        }
        fetchData()
    }, [])

    const handleSubmit = (e) =>{
        e.preventDefault();
        if (infor.name === "") {
            toast.error("Chưa điền Tên Admin");
        } else if (infor.address === "") {
            toast.error("Chưa điền địa chỉ Admin");
        } else if(infor.email === ""){
            toast.error("Chưa điền email Admin")
        } else if(infor.phone === ""){
            toast.error("Chưa điền số điện thoại")
        } else if(infor.gender ===""){
            toast.error("Chưa điền giới tính")
        } else if(infor.identification === ""){
            toast.error("Chưa điền căn cước công dân")
        } else 
        try {
            axios.put('http://localhost:8000/super-admins/update/admins', {
                id: _id,
                name: infor.name,
                address: infor.address,
                role: "admin",
                email: infor.email,
                password: infor.password,
                phone: infor.phone,
                status: 1,
                gender: infor.gender,
                identification: infor.identification,
                avatarUrl: infor.avatarUrl,
                dateAtWork: infor.dateAtWork,
                dateAtBirth: infor.dateAtBirth,
                homestays: [""]
            },
            {
                headers:{
                    Authorization: "Bearer " + token
                }
            })
            toast.success("Update Admin thành công!")
            setReload(true)
            setUpdateForm(false)
        } catch(err) {
            console.log(err.message)
        }    
        
    }

    return(
        <div>
            <Transition appear show={updateForm} as={Fragment}>
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
                                    Chỉnh Sửa Thông Tin 
                                </Dialog.Title>
                                <button
                                    className="absolute top-0 right-0 rounded-full transition ease-in-out duration-400 hover:bg-gray-200"
                                    onClick={closeModal}
                                >
                                    <XIcon className="w-6 h-6" />
                                </button>
                            </div>
                            
                            <div className="my-4 border-t border-b max-h-xl overflow-x-hidden">
                                <InformationForm inforProps = {[infor,setInfor]} showPassword = {false}></InformationForm>
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

export default UpdateAdmin