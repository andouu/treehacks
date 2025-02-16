import { Line, LineChart, YAxis } from "recharts";
import { StockData } from "../Types/Stock";

export const StockChart = ({ data }: { ticker: string; data: StockData }) => {
  const normalized = data["Actual Future Prices"].map((price, i) => ({
    name: i,
    price,
  }));

  return (
    <LineChart data={normalized}>
      <YAxis />
      <Line type="monotone" dataKey="name" stroke="red" />
    </LineChart>
  );
};
