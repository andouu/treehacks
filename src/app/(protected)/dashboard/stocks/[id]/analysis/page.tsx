"use client";
import { LoadingScreen } from "@/app/Components/LoadingScreen";
import { StockData } from "@/app/Types/Stock";
import { useQuery } from "@tanstack/react-query";
import { use } from "react";

import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
} from "recharts";
import PromptWindow from "./Components/PromptWindow";

const CustomTooltip = ({ active, payload }: TooltipProps<number, number>) => {
  if (active && payload && payload.length) {
    const actual = payload[0].payload.price.toFixed(2);
    const predicted =
      payload.length > 1 ? payload[0].payload.prediction.toFixed(2) : null;
    return (
      <div className="px-4 py-2 bg-neutral-950 rounded-xl text-white">
        <span className="block">Actual: ${actual}</span>
        {predicted && (
          <>
            <span className="block">
              Predicted: <span>${predicted}</span>
            </span>
            <span>
              Delta: $<span>{(actual - predicted).toFixed(2)}</span>
            </span>
          </>
        )}
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
  const normalized = data["Training Data (Actual)"].map((price, i) => ({
    name: i,
    price,
  }));

  const predictionZipped = [];
  for (let i = 0; i < data["Actual Future Prices"].length; i++) {
    predictionZipped.push({
      name: i + normalized.length,
      price: data["Actual Future Prices"][i],
      prediction: data["Predicted Future Prices"][i],
    });
  }

  const completeZipped = normalized.concat(predictionZipped);

  return (
    <div className="flex-1 overflow-y-auto p-8 pt-12">
      <div className="w-full flex justify-between items-baseline mb-8">
        <span className="text-5xl">{ticker}</span>
        <div>
          <span className="text-4xl">${latestPrice.toFixed(2)}</span>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={completeZipped}>
          <Tooltip content={<CustomTooltip />} />
          <Line
            type="monotone"
            dataKey="prediction"
            stroke="lightgray"
            dot={false}
            strokeWidth={2.5}
          />
          <Line
            type="monotone"
            dataKey="price"
            stroke="var(--purple)"
            dot={false}
            strokeWidth={2.5}
          />
        </LineChart>
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
