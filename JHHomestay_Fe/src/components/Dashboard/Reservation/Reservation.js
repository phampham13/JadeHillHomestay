import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import HomestayPicker from "./HomestayPicker";
import BillStatusPicker from "./BillStatusPicker";
import BillData from "./BillData";
import { toast } from "react-toastify";
import UpdateModal from "./UpdateModal";
import ConfirmModal from "./ComfirmModal";

const billStatus = [
  { id: 1, name: "Đã duyệt" },
  { id: 2, name: "Đang chờ" },
  { id: 3, name: "Đã thanh toán" },
];

function Reservation() {
  /* Token for admin action */
  const { token } = useSelector((state) => state.authReducer);

  /* Default status */
  const [status, setStatus] = useState(billStatus[1]);

  /* Handle empty array */
  const homestayList = useSelector((state) => state.homestayReducer);
  const [homestay, setHomestay] = useState(
    homestayList.length ? homestayList[0] : []
  );

  /* Loading State */
  const [isLoading, setIsLoading] = useState(false);

  /* Edit State - Use for reload data after edit */
  const [isEdited, setIsEdited] = useState(false);
  const [isRemoved, setIsRemoved] = useState(false);

  /* Data for table */
  const [data, setData] = useState([]);
  useEffect(() => {
    if (homestay === undefined) return;
    setIsLoading(true);
    setIsEdited(false);
    setIsRemoved(false);

    /* Call Data from back-end */
    axios({
      method: "GET",
      url: "http://localhost:8000/admins/bills-of-homestay",
      params: {
        status: status.id,
        id: homestay._id,
      },
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => {
        setIsLoading(false);
        setData(res.data.content);
      })
      .catch((e) => {
        console.log(e.message);
        setIsLoading(false);
        toast(e.message, { type: toast.TYPE.ERROR });
      });
  }, [homestay, status, isEdited, isRemoved]);

  /* Modal state */
  const [isOpen, setIsOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  /* Data for Modal */
  const [modalData, setModalData] = useState({});

  return (
    <>
      <div className="p-8">
        <div className="flex flex-row justify-end">
          <HomestayPicker
            homestayProp={[homestay, setHomestay]}
            homestayList={homestayList}
          />
          <BillStatusPicker statusProp={[status, setStatus]} billStatus={billStatus}/>
        </div>
        {isLoading ? (
          <div className="flex justify-center mt-6">
            <div
              className="w-16 h-16 border-8 border-green-400 rounded-full border-solid animate-spin"
              style={{ borderTop: "8px solid transparent" }}
            />
          </div>
        ) : (
          <BillData
            dataProps={[data, setData]}
            editProps={[setIsOpen, setModalData]}
            status={status}
          />
        )}
      </div>
      <UpdateModal
        editProps={[isOpen, setIsOpen]}
        editDataProps={[modalData, setModalData]}
        status={status}
        token={token}
        setIsEdited={setIsEdited}
        setIsConfirmOpen={setIsConfirmOpen}
      />
      <ConfirmModal
        confirmProps={[isConfirmOpen, setIsConfirmOpen]}
        data={modalData}
        token={token}
        setIsRemoved={setIsRemoved}
      />
    </>
  );
}

export default Reservation;
