import { useState,useEffect } from "react";
import Unassign from "./Unassign";

function EachHomestay(props){
    const _idAdmin = props._idAdmin
    const homestay = props.homestay
    const [reload,setReload] = props.reload
    const [unassignForm,setUnassignForm] = useState(false)
    useEffect(()=>{},[reload])
    return(
        <tr key={homestay._id} className="break-all">
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                    <div className="text-base font-medium text-gray-900 truncate">{homestay.name}</div>
                </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-base text-gray-900">{homestay.address}</div>
                
            </td>
            <td className="px-3 py-4 whitespace-nowrap text-center text-base font-medium">
                <button 
                    className="text-red-600 hover:text-red-900"
                    onClick={()=> setUnassignForm(true)}
                >
                Gỡ Homestay khỏi Admin
                </button>
            </td>
            <Unassign 
                openProp = {[unassignForm,setUnassignForm]} 
                _idAdmin = {_idAdmin} 
                _idHomestay ={homestay._id} 
                reload={[reload,setReload]}/>
        </tr>
    )
}

export default EachHomestay