"use client";
import { LoadingScreen } from "@/app/Components/LoadingScreen";
import { StockData } from "@/app/Types/Stock";
import { useQuery } from "@tanstack/react-query";
import { use } from "react";

import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
} from "recharts";
import PromptWindow from "./Components/PromptWindow";

const CustomTooltip = ({ active, payload }: TooltipProps<number, number>) => {
  if (active && payload && payload.length) {
    return (
      <div className="px-5 py-1 bg-neutral-950 rounded-lg text-white">
        ${payload[0].payload.price.toFixed(2)}
      </div>
    );
  }

  return null;
};

const AnalysisColumn = ({
  ticker,
  data,
}: {
  ticker: string;
  data: StockData;
}) => {
  const latestPrice = data["Actual Future Prices"].at(-1)!;
  const normalized = data["Training Data (Actual)"]
    .concat(data["Actual Future Prices"])
    .map((price, i) => ({
      name: i,
      price,
    }));

  return (
    <div className="flex-1 overflow-y-auto p-8 pt-12">
      <div className="w-full flex justify-between items-baseline mb-8">
        <span className="text-5xl">{ticker}</span>
        <div>
          <span className="text-4xl">${latestPrice.toFixed(2)}</span>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={normalized}>
          <defs>
            <linearGradient id="gr" y1="0" y2="1" x1="0" x2="0">
              <stop offset="0%" stopColor="var(--purple)" stopOpacity={1} />
              <stop offset="100%" stopColor="white" stopOpacity={1} />
            </linearGradient>
          </defs>
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="price"
            stroke="var(--purple)"
            fill="url(#gr)"
            strokeWidth={2.5}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default function Analysis({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const dataQuery = useQuery({
    queryKey: ["stocks", id],
    queryFn: async () => {
      const data = await fetch(`/api/stocks/${id}`, { method: "GET" });
      return await data.json();
    },
  });

  if (dataQuery.isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div
      className="w-full h-full grid grid-cols-2 overflow-hidden"
      style={{ gridTemplateColumns: "1fr auto" }}
    >
      <AnalysisColumn ticker={id} data={dataQuery.data} />
      <PromptWindow />
    </div>
  );
}
