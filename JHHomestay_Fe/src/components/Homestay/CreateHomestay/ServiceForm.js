import React, { useState, useEffect } from "react";

const ServiceForm = (props) => {
  const [services, setServices] = props.serviceProps;
  // console.log(services)

  function addServiceHandler() {
    const tempServiceList = [...services, {
      name: null,
      pricePerUnit: null,
      personServe: 1,
    }]

    setServices(tempServiceList)
  }

  function inputHandler(e, index) {
    const tempServiceList = [...services]
    tempServiceList[index][e.target.name] = e.target.value
    setServices(tempServiceList)
  }

  function deleteHandler(index) {
    console.log(index)
    const tempServiceList = [...services]
    tempServiceList.splice(index, 1)
    setServices(tempServiceList)
  }
  return (
    <div className="p-2 border-t ">
      <div className="flex flex-row justify-between">
        <h1 className="font-bold h-6 mb-4 text-gray-600 text-sm leading-8 uppercase"> Dịch vụ đặt kèm </h1>
        <h1 className="h-6 mb-4 text-gray-600 text-sm leading-8 uppercase cursor-pointer" onClick={addServiceHandler}> Thêm dịch vụ </h1>
      </div>
      {services.map((item, index) => (
        <div className="flex flex-row">
          <input
            value={item.name}
            type="text"
            name="name"
            id="service-name"
            placeholder="Tên dịch vụ"
            className=" px-4 py-2 border mt-2 focus:ring-green-500 focus:border-green-500 w-full mr-4 shadow-sm text-md border-gray-300 rounded-md focus:outline-none"
            onChange={(e) => inputHandler(e, index)}
          />
          <input
            value={item.pricePerUnit}
            type="text"
            name="pricePerUnit"
            id="service-price"
            placeholder="Giá tiền"
            className="px-4 py-2 border mt-2 focus:ring-green-500 focus:border-green-600 w-full ml-4 shadow-sm text-md border-gray-300 rounded-md focus:outline-none"
            onChange={(e) => inputHandler(e, index)}
          />
          <div className="w-32 text-center self-center cursor-pointer">
            <h1 className="text-red-600 hover:text-red-900" onClick={() =>deleteHandler(index)}>
              Xóa
            </h1>
          </div>
        </div>
      ))}

    </div>
  );
};

export default ServiceForm;
