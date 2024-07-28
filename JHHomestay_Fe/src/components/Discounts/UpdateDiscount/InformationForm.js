import React, { useState, useEffect } from "react";
import ReactDatePicker from "react-datepicker";

function InformationForm(props){
    const [discount, setDiscount] = props.inforProps;
    const sDate = discount.startDate? new Date(discount.startDate) : new Date;
    const eDate = discount.expiredDate? new Date(discount.expiredDate) : new Date;
    const [startDate,setStartDate] = useState(sDate);
    const [expiredDate,setExpiredDate] = useState(eDate);
     
    const handleInput = (e) => {
        const newDiscount = {...discount}
        newDiscount[e.target.name] = e.target.value 
        setDiscount(newDiscount)
        
    };
    useEffect(()=>{
        const tempDiscount = {...discount, startDate, expiredDate}
        setDiscount(tempDiscount)
        console.log(discount)
    },[startDate,expiredDate])

    return (
        <div>
            <label htmlFor="name"  className="flex flex-col p-2">
                <div class="font-bold h-6 text-gray-600 text-sm leading-8 uppercase">
                    <span class="text-red-400 mr-1">*</span> 
                    Tên Discount
                </div>
                <input
                    required
                    className="border px-4 py-2 rounded-md focus:outline-none"
                    id="name"
                    type="text"
                    name="name"
                    value={discount.name}
                    onChange = {(e) => handleInput (e)}
                />
            </label>

            <label htmlFor="address" className="flex flex-col p-2">
                <div class="font-bold h-6 mt-3 text-gray-600 text-sm leading-8 uppercase">
                <span class="text-red-400 mr-1">*</span>
                    Mã
                </div>
                <input
                    required
                    className="border px-4 py-2 rounded-md focus:outline-none"
                    id="code"
                    type="text"
                    name="code"
                    value={discount.code}
                    onChange = {(e) => handleInput (e)}
                />
            </label>
            <label  className="flex flex-col p-2">
                <div class="font-bold h-6 mt-3 text-gray-600 text-sm leading-8 uppercase">
                <span class="text-red-400 mr-1">*</span>
                    Ngày bắt đầu
                </div>                
                <ReactDatePicker
                    required
                    className="border px-4 py-2 rounded-md focus:outline-none"
                    selected={startDate}
                    onChange = {(e) => setStartDate(e)}
                />
            </label>

            <label  className="flex flex-col p-2">
                <div class="font-bold h-6 mt-3 text-gray-600 text-sm leading-8 uppercase">
                <span class="text-red-400 mr-1">*</span>
                    Ngày hết hạn
                </div>                
                <ReactDatePicker
                    required
                    className="border px-4 py-2 rounded-md focus:outline-none"
                    selected= {expiredDate}
                    onChange = {(e) => setExpiredDate (e)}
                />
            </label>

            <label htmlFor="email" className="flex flex-col p-2">
                <div class="font-bold h-6 mt-3 text-gray-600 text-sm leading-8 uppercase">
                    <span class="text-red-400 mr-1">*</span> 
                    Hệ số giảm giá (%)
                </div>
                <input
                    required
                    className="border px-4 py-2 rounded-md focus:outline-none"
                    id="value"
                    type="text"
                    name="value"
                    value={discount.value}
                    onChange = {(e) => handleInput (e)}
                />
            </label>
            <br></br><br></br><br></br><br></br>
        </div>
    )
}
export default InformationForm;
