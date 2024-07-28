import React, { useState, useEffect, } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import ModalCreate from "../Discounts/CreateDiscount/ModalCreate"
import axios from 'axios';
import DiscountTable from '../Discounts/DiscountTable';


function Discount() {
    const { token, userId } = useSelector((state) => state.authReducer);
    console.log(token, userId);
    const [isCreate, setIsCreate] = useState(false)
    const [discount, setDiscount] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [reload, setReload] = useState()
    useEffect(() => {
        axios({
            method: 'GET',
            url: 'http://localhost:8000/admins/discounts',
            headers: {
                Authorization: "Bearer " + token
            }
        }).then((res) => {
            setDiscount(res.data.content)
            setIsLoading(false)
            setReload(false)
        }).catch((err) => {
            console.log(err)
        })
    }, [reload])
    return (
        <div>
            <div>
                <button
                    className="
                    mx-2 my-2 px-3 py-2
                    border-2 border-gray-200 
                    rounded-lg
                    text-sm
                    transition duration-150 ease-in-out 
                    hover:border-gray-300"
                    onClick={() => setIsCreate(true)}
                >
                    + Thêm Discount
                </button>
                <ModalCreate openCreate={[isCreate, setIsCreate]} reload={[reload, setReload]} />
            </div>
            {isLoading ? (
                <div className="flex justify-center mt-6">
                    <div
                        className="w-16 h-16 border-8 border-green-400 rounded-full border-solid animate-spin"
                        style={{ borderTop: "8px solid transparent" }}
                    />
                </div>
            ) : (
                <div className='pb-10'>
                    <DiscountTable
                        discountProps={[discount, setDiscount]}
                        reload={[reload, setReload]}
                    />
                </div>
            )}
        </div>
    )

}

export default Discount;