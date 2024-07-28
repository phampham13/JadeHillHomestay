import React, { useState, useEffect } from "react";
import ReactDatePicker from "react-datepicker";

function InformationForm(props){
    const [admin, setAdmin] = props.inforProps;
    const showPassword = props.showPassword;
    const [dateWork,setDateWork] = useState(new Date());
    const [dateBirth,setDateBirth] = useState(new Date());
     
    const handleInput = (e) => {
        const newAdmin = {...admin}
        newAdmin[e.target.name] = e.target.value 
        setAdmin(newAdmin)
        
    };
    useEffect(()=>{
        const tempAdmin = {...admin,dateAtWork:dateWork,dateAtBirth: dateBirth}
        setAdmin(tempAdmin)
        console.log(admin)
    },[dateWork,dateBirth])

    return (
        <div>
            <label htmlFor="name"  className="flex flex-col p-2">
                <div class="font-bold h-6 text-gray-600 text-sm leading-8 uppercase">
                    <span class="text-red-400 mr-1">*</span> 
                    Tên admin
                </div>
                <input
                    required
                    className="border px-4 py-2 rounded-md focus:outline-none"
                    id="name"
                    type="text"
                    name="name"
                    value={admin.name}
                    onChange = {(e) => handleInput (e)}
                />
            </label>

            <label htmlFor="address" className="flex flex-col p-2">
                <div class="font-bold h-6 mt-3 text-gray-600 text-sm leading-8 uppercase">
                <span class="text-red-400 mr-1">*</span>
                    Địa chỉ
                </div>
                <input
                    required
                    className="border px-4 py-2 rounded-md focus:outline-none"
                    id="address"
                    type="text"
                    name="address"
                    value={admin.address}
                    onChange = {(e) => handleInput (e)}
                />
            </label>

            <label htmlFor="email" className="flex flex-col p-2">
                <div class="font-bold h-6 mt-3 text-gray-600 text-sm leading-8 uppercase">
                    <span class="text-red-400 mr-1">*</span> 
                    Email
                </div>
                <input
                    required
                    className="border px-4 py-2 rounded-md focus:outline-none"
                    id="email"
                    type="text"
                    name="email"
                    value={admin.email}
                    onChange = {(e) => handleInput (e)}
                />
            </label>

            { showPassword &&
            <label htmlFor="password" className="flex flex-col p-2">
                <div class="font-bold h-6 mt-3 text-gray-600 text-sm leading-8 uppercase">
                <span class="text-red-400 mr-1">*</span>
                    Password
                </div>
                <input
                    className="border px-4 py-2 rounded-md focus:outline-none"
                    id="password"
                    type="text"
                    name="password"
                    value={admin.password}
                    onChange = { (e) => handleInput(e) }
                />
            </label>
            }

            <label htmlFor="phone" className="flex flex-col p-2">
                <div class="font-bold h-6 mt-3 text-gray-600 text-sm leading-8 uppercase">
                <span class="text-red-400 mr-1">*</span>
                    Số điện thoại
                </div>
                <input
                    className="border px-4 py-2 rounded-md focus:outline-none"
                    id="phone"
                    type="number"
                    name="phone"
                    value={admin.phone}
                    onChange = {(e) => handleInput (e)}
                />
            </label>

            <label htmlFor="type" className="flex flex-col p-2">
                <div class="font-bold h-6 mt-3 text-gray-600 text-sm leading-8 uppercase">
                <span class="text-red-400 mr-1">*</span>
                    Giới Tính
                </div>
                <input
                    required
                    className="border px-4 py-2 rounded-md focus:outline-none"
                    id="gender"
                    type="text"
                    name="gender"
                    list="genderList"
                    value={admin.gender}
                    onChange = {(e) => handleInput (e)}
                />
                <datalist id = "genderList">
                    <option value="Male"/>
                    <option value="Female"/>
                </datalist>
            </label>

            <label htmlFor="area" className="flex flex-col p-2">
                <div class="font-bold h-6 mt-3 text-gray-600 text-sm leading-8 uppercase">
                <span class="text-red-400 mr-1">*</span>
                    CCCD
                </div>                
                <input
                required
                    className="border px-4 py-2 rounded-md focus:outline-none"
                    id="identification"
                    type="text"
                    name="identification"
                    value={admin.identification}
                    onChange = {(e) => handleInput (e)}
                />
            </label>
            
            <label  className="flex flex-col p-2">
                <div class="font-bold h-6 mt-3 text-gray-600 text-sm leading-8 uppercase">
                <span class="text-red-400 mr-1">*</span>
                    Ngày sinh
                </div>                
                <ReactDatePicker
                    required
                    className="border px-4 py-2 rounded-md focus:outline-none"
                    selected={dateBirth}
                    isClearable
                    placeholderText="I have been cleared!"
                    onChange = {(e) => setDateBirth(e)}
                />
            </label>

            <label  className="flex flex-col p-2">
                <div class="font-bold h-6 mt-3 text-gray-600 text-sm leading-8 uppercase">
                <span class="text-red-400 mr-1">*</span>
                    Ngày bắt đầu làm việc
                </div>                
                <ReactDatePicker
                    required
                    isClearable
                    placeholderText="I have been cleared!"
                    className="border px-4 py-2 rounded-md focus:outline-none"
                    selected= {dateWork}
                    onChange = {(e) => setDateWork (e)}
                />
            </label>
        </div>
    )
}
export default InformationForm;
