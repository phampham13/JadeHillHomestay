import React, { useState} from "react";
import DeleteAdmin from "./DeleteAdmin/DeleteAdmin";
import UpdateAdmin from "./UpdateAdmin/UpdateAdmin";
import Homestay from "./Homestay/Homestay";

function AdminCard (props){
    const admin = props.detail;
    const [reload,setReload] = props.reload
    const [assignForm,setAssignForm] = useState(false);
    const [deleteForm, setDeleteForm] = useState(false);
    const [updateForm, setUpdateForm] = useState(false);
    return (
        <tr key={admin._id} className="break-all">
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                    <div className="text-base font-medium text-gray-900 truncate">{admin._id}</div>
                </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-base text-gray-900">{admin.name}</div>
                
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-base text-gray-900">{admin.email}</div>
                
            </td>
            <td className="px-3 py-4 whitespace-nowrap text-center text-base font-medium">
                <button 
                    className="text-indigo-600 hover:text-indigo-900"
                    onClick={() => setAssignForm(true)}
                >
                Xem
                </button>
            </td>
            <td className="px-3 py-4 whitespace-nowrap text-center text-base font-medium">
                <button 
                    className="text-indigo-600 hover:text-indigo-900"
                    onClick={() => setUpdateForm(true)}
                >
                Chi tiết Admin
                </button>
            </td>

            <td className="px-3 py-4 whitespace-nowrap text-center text-base font-medium">
                <button 
                    className="text-red-600 hover:text-red-900"
                    onClick={()=> setDeleteForm(true)}
                >
                Xóa Admin
                </button>
            </td>

            <Homestay
                openProp = {[assignForm,setAssignForm]}
                _id = {admin._id}   
            />

            <UpdateAdmin
                openProp ={ [updateForm, setUpdateForm]}
                _id = {admin._id}
                reload = {[reload,setReload]}
            />

            <DeleteAdmin 
                openProp = {[deleteForm, setDeleteForm]} 
                _id = {admin._id}
                reload = {[reload,setReload]}
            />
            
            
        </tr>
    )
}
export default AdminCard