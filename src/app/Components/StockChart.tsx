import { Line, LineChart, YAxis } from "recharts";
import { StockData } from "../Types/Stock";

export const StockChart = ({
  ticker,
  data,
}: {
  ticker: string;
  data: StockData;
}) => {
  const normalized = data["Actual Future Prices"].map((price, i) => ({
    name: i,
    price,
  }));
  console.log(ticker);

  return (
    <LineChart data={normalized}>
      <YAxis />
      <Line type="monotone" dataKey="name" stroke="red" />
    </LineChart>
  );
};
