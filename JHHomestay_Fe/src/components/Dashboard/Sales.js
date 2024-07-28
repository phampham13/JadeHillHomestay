import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import HomestayPicker from "./sales/HomestayPicker";
import YearPicker from "./sales/YearPicker";
import HomestayChart from "./sales/HomestayChart";
import { useSelector } from "react-redux";

const year = new Date().getFullYear();
const years = Array.from(new Array(20), (val, index) => year - index);

function Sales() {
  const { token } = useSelector((state) => state.authReducer);
  const { role } = useSelector((state) => state.authReducer);
  const homestayListReducer = useSelector((state) => state.homestayReducer);

  const [isLoading, setIsLoading] = useState(true);

  /* Get homestay id */
  const [homestayList, setHomestayList] = useState([]);
  useEffect(() => {
    if (role === "super_admin") {
      setIsLoading(true);

      /* This axios use for super admin */
      axios({
        method: "GET",
        url: "http://localhost:8000/super-admins/homestays",
        headers: {
          Authorization: "Bearer " + token,
        }
      })
        .then((res) => {
          const tempHomestayList = res.data.content.map((item) => ({
            id: item._id,
            name: item.name,
          }));
          setHomestayList(tempHomestayList);
          setSelected(tempHomestayList[0]);
          setIsLoading(false);
        })
        .catch((err) => {
          toast(err.message, { type: toast.TYPE.ERROR });
          setIsLoading(false);
        });
    } else {
      const tempHomestayList = homestayListReducer.map((item) => ({
        id: item._id,
        name: item.name,
      }));
      setHomestayList(tempHomestayList);
      setSelected(tempHomestayList[0]);
      setIsLoading(false);
    }
  }, []);

  const [selected, setSelected] = useState({});
  const [yearSelected, setYearSelected] = useState(years[0]);

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center mt-6">
          <div
            className="w-16 h-16 border-8 border-green-400 rounded-full border-solid animate-spin"
            style={{ borderTop: "8px solid transparent" }}
          />
        </div>
      ) : (
        <>
          <div className="flex flex-row-reverse p-4">
            <YearPicker
              selected={[yearSelected, setYearSelected]}
              years={years}
            />
            <HomestayPicker
              homestayList={homestayList}
              selected={[selected, setSelected]}
            />
          </div>
          <HomestayChart
            selected={[selected, yearSelected]}
            setIsLoading={setIsLoading}
          />
        </>
      )}
    </>
  );
}

export default Sales;
