import { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const DatetimeData = (props) => {
  const [modalData, setModalData] = props.timedateProps;
  const [checkin, setCheckin] = useState(new Date(modalData.checkinDate));
  const [checkout, setCheckout] = useState(new Date(modalData.checkoutDate));
  const id  = props.id;

  console.log(id);

  return (
    <div className="mt-4 border-b">
      <h1 className="text-xl font-medium">Thông tin đăng ký</h1>
      <div className="px-16 py-4">
        <div className="flex items-center justify-between">
          <label htmlFor="checkin" className="w-full">
            Ngày check in:
          </label>
          <DatePicker
            id="checkin"
            disabled={id === 1 || id === 3}
            popperPlacement="top-start"
            selected={checkin}
            onChange={(date) => setCheckin(date)}
            className="focus:outline-none border p-2 rounded-md text-center"
          />
        </div>
        <div className="flex items-center justify-between mt-2">
          <label htmlFor="checkout" className="w-full">Ngày check out:</label>
          <DatePicker
            id="checkout"
            disabled={id === 1 || id === 3}
            popperPlacement="top-start"
            selected={checkout}
            onChange={(date) => setCheckout(date)}
            className="focus:outline-none border p-2 rounded-md text-center"
          />
        </div>
      </div>
    </div>
  );
};

export default DatetimeData;
