import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  CartesianGrid,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const defaultData = [
  { name: "T1", uv: 0 },
  { name: "T2", uv: 0 },
  { name: "T3", uv: 0 },
  { name: "T4", uv: 0 },
  { name: "T5", uv: 0 },
  { name: "T6", uv: 0 },
  { name: "T7", uv: 0 },
  { name: "T8", uv: 0 },
  { name: "T9", uv: 0 },
  { name: "T10", uv: 0 },
  { name: "T11", uv: 0 },
  { name: "T12", uv: 0 },
];

const HomestayChart = (props) => {
  const [homestay, year] = props.selected;

  console.log(homestay);

  const [data, setData] = useState(defaultData);
  const [isLoading, setIsLoading] = useState(false);

  /* Get homestay revenue */
  useEffect(() => {
    setIsLoading(true);
    axios({
      method: "GET",
      url: "http://localhost:8000/super-admins/revenue/homestay",
      params: {
        year: year,
        homestayId: homestay.id,
      },
    })
      .then((res) => {
        const tempData = data.map((item, index) => ({
          ...item,
          uv: res.data.content.revenuePerMonth[index + 1],
        }));
        setData(tempData);
        setIsLoading(false);
      })
      .catch((err) => {
        toast(err.message, { type: toast.TYPE.ERROR });
        setIsLoading(false);
      });
  }, [homestay, year]);

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
        <div className="flex items-center flex-col">
          <div className="ml-8">
            <LineChart width={1200} height={400} data={data}>
              <Line type="monotone" dataKey="uv" stroke="#8884d8" />
              <CartesianGrid stroke="#ccc" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
            </LineChart>
          </div>
          <h1 className="text-3xl font-light mt-6">{homestay.name}</h1>
        </div>
      )}
    </>
  );
};

export default HomestayChart;
