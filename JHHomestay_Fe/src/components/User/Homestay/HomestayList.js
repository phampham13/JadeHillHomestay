import axios from "axios";
import { useEffect, useState } from "react";
import {useSelector} from "react-redux"
import { toast } from "react-toastify";

import EachHomestay from "./EachHomestay";

function HomestayList(props){
    const _id  = props._id
    const { token } = useSelector((state) => state.authReducer);
    const [homestayList,setHomestayList] = useState([])
    const [isLoading,setIsLoading] = useState(true)
    const [reload,setReload] = useState(false)

    useEffect(()=>{
        setHomestayList([])
        axios({
            method: "GET",
            url:`http://localhost:8000/super-admins/get/admin/${_id}`,
            headers:{
                Authorization: "Bearer " + token
            }
        }).then((res)=>{
            const idList =  res.data.content.homestays
            for(let i = 0; i <idList.length; i++){
                axios({
                    method:"GET",
                    url:`http://localhost:8000/homestays/information/${idList[i]}`,
                    headers:{
                        Authorization: "Bearer " + token
                    }
                }).then((response)=>{
                    setHomestayList((old)=>[...old,response.data.content.homestay])
                }).catch((err)=>{
                    console.log(err)
                })
            }
        }).then(()=>{
          setIsLoading(false)
        }).catch((err)=>{
            console.log(err)
            toast(err.message)
        })
    },[reload])
    return(
        <div>
          {isLoading ? (
          <div className="flex justify-center mt-6">
            <div
              className="w-16 h-16 border-8 border-green-400 rounded-full border-solid animate-spin"
              style={{ borderTop: "8px solid transparent" }}
            />
            </div>
            ) : (
            <table className="w-full divide-y divide-gray-200 table-fixed">
              <thead className="bg-gray-50">
                <tr>
                    <th
                      scope="col"
                      className="w-2/5 sticky px-6 py-3 text-left text-base font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Tên
                    </th>
                    <th
                      scope="col"
                      className="w-2/5 sticky px-6 py-3 text-left text-base font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Địa Chỉ
                    </th>
                    <th 
                      scope="col" 
                      className="w-1/5 relative px-6 py-3"
                    >
                      <span className="sr-only"> Gỡ </span>
                    </th>
                </tr>
              </thead>

              <tbody className="bg-white divide-y divide-gray-200">
                {homestayList && homestayList.length ?
                homestayList.map(homestay => (
                    <EachHomestay homestay = {homestay} _idAdmin={_id} reload={[reload,setReload]}/>
                )): <p className="text-xl text-red-500">ADMIN CHƯA QUẢN LÍ HOMESTAY NÀO</p>}
              </tbody>
            </table>
            )}
        </div>
    )
}

export default HomestayList