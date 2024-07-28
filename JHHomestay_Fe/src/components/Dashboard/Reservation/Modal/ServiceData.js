import { useMemo } from "react";

const ServiceData = (props) => {
  const serviceList = props.serviceProps;

  const totalPrice = useMemo(() => {
    var sum = 0;
    serviceList.map((item) => (sum += item.count * item.pricePerUnit));
    return sum;
  }, []);

  return (
    <div className="mt-4">
      <h1 className="text-xl font-medium">Thông tin dịch vụ</h1>
      <div className="px-16 py-4">
        {serviceList.map((item, index) => (
          <div key={index} className="flex items-center justify-between mb-1">
            <h3 className="">{item.name}:</h3>
            <p>{item.count * item.pricePerUnit}</p>
          </div>
        ))}
        <div className="flex items-center justify-between mb-1 border-t pt-2">
            <h3 className="font-bold">Tổng cộng:</h3>
            <p>{totalPrice}</p>
          </div>
      </div>
    </div>
  );
};

export default ServiceData;
