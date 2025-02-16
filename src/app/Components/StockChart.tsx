import { Area, AreaChart } from "recharts";
import { StockData } from "../Types/Stock";

export const StockChart = ({ data }: { ticker: string; data: StockData }) => {
  const normalized = data["Training Data (Actual)"]
    .concat(data["Actual Future Prices"])
    .map((price, i) => ({
      name: i,
      price,
    }));

  return (
    <AreaChart data={normalized}>
      <defs>
        <linearGradient id="gr" y1="0" y2="1" x1="0" x2="0">
          <stop offset="0%" stopColor="var(--purple)" stopOpacity={1} />
          <stop offset="100%" stopColor="white" stopOpacity={1} />
        </linearGradient>
      </defs>
      <Area
        type="monotone"
        dataKey="price"
        stroke="var(--purple)"
        fill="url(#gr)"
        strokeWidth={2.5}
      />
    </AreaChart>
  );
};
