import axios from "axios";
import { useEffect, useState } from "react";

export type Indicatior = {
  name: string;
  hour: string;
  value: number | string;
  change: number;
  theMost: number;
};

// export const data = [
//   {
//     name: "شاخص یک",
//     hour: "15:30",
//     value: 265256532,
//     change: 0.45,
//     theMost: 103596684,
//   },
//   {
//     name: "شاخص دو",
//     hour: "15:30",
//     value: 265256532,
//     change: 0.45,
//     theMost: 103596684,
//   },
//   {
//     name: "شاخص سه",
//     hour: "15:30",
//     value: 265256532,
//     change: 0.45,
//     theMost: 103596684,
//   },
//   {
//     name: "شاخص چهار",
//     hour: "15:30",
//     value: 2652532,
//     change: 0.45,
//     theMost: 10384,
//   },
//   {
//     name: "شاخص پنج",
//     hour: "15:30",
//     value: 2532,
//     change: 0.45,
//     theMost: 1684,
//   },
// ];

const useFetchData = () => {
  const [data, setData] = useState<Indicatior[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = () => {
      axios
        .get(
          "https://cdn.tsetmc.com/api/Index/GetIndexB1LastAll/SelectedIndexes/1"
        )
        .then((response) => {
          const data = response.data.indexB1.map((item: any) => ({
            name: item.lVal30,
            hour: formatHour(item.hEven),
            value: parseFloat(item.xDrNivJIdx004), // Ensure value is a number
            change: item.indexChange,
            theMost: item.xPhNivJIdx004,
          }));
          setData(data);
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          setLoading(false);
        });
    };

    // Polling interval of 5 seconds
    const interval = setInterval(fetchData, 5000);

    fetchData();

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, []);

  
  const formatHour = (hEven: number) => {
    // Assuming hEven is in HHMMSS format, you can format it as required
    const hour = Math.floor(hEven / 10000);
    const minute = Math.floor((hEven % 10000) / 100);
    const second = hEven % 100;
    return `${hour}:${minute}:${second}`;
  };

  return { data, loading };
};

export default useFetchData