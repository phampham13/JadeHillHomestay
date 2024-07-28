import React, { useState} from "react";
import UpdateDiscount from "../Discounts/UpdateDiscount/UpdateModal";
import DeleteDiscount from "./DeleteDiscount/DeleteModal";

function DiscountCard (props){
    const discount = props.detail;
    const [reload,setReload] = props.reload
    const [deleteForm, setDeleteForm] = useState(false);
    const [updateForm, setUpdateForm] = useState(false);
    return (
        <tr key={discount._id} className="break-all">
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                    <div className="text-base font-medium text-gray-900 truncate">{discount._id}</div>
                </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-base text-gray-900">{discount.name}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-base text-gray-900">{discount.code}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-base text-gray-900">{discount.value}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-base text-gray-900">{new Date(discount.startDate).toLocaleDateString('en-GB')}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-base text-gray-900">{new Date(discount.expiredDate).toLocaleDateString('en-GB')}</div>
            </td>
            <td className="px-3 py-4 whitespace-nowrap text-center text-base font-medium">
                <button 
                    className="text-indigo-600 hover:text-indigo-900"
                    onClick={() => setUpdateForm(true)}
                >
                Cập nhật
                </button>
            </td>
            <td className="px-3 py-4 whitespace-nowrap text-center text-base font-medium">
                <button 
                    className="text-red-600 hover:text-red-900"
                    onClick={()=> setDeleteForm(true)}
                >
                Xóa
                </button>
            </td>
            <UpdateDiscount
                openProp ={ [updateForm, setUpdateForm]}
                _id = {discount._id}
                reload = {[reload,setReload]}
            />
             <DeleteDiscount 
                openProp = {[deleteForm, setDeleteForm]} 
                _id = {discount._id}
                reload = {[reload,setReload]}
            /> 

            {/* <Homestay
                openProp = {[assignForm,setAssignForm]}
                _id = {admin._id}   
            />

           


            <DeleteAdmin 
                openProp = {[deleteForm, setDeleteForm]} 
                _id = {admin._id}
                reload = {[reload,setReload]}
            /> */}
            
            
        </tr>
    )
}
export default DiscountCard