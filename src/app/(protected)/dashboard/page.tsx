"use client";
import { LoadingScreen } from "@/app/Components/LoadingScreen";
import { StockChart } from "@/app/Components/StockChart";
import { StockData } from "@/app/Types/Stock";
import { Stocks } from "@/app/Util/Stocks";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { ResponsiveContainer } from "recharts";

const StockEntry = ({ ticker, data }: { ticker: string; data: StockData }) => {
  const latestPrice = data["Actual Future Prices"].at(-1)!;

  return (
    <div
      key={ticker}
      className="w-full h-12 px-3 grid grid-cols-4 items-center rounded-xl border-2 border-neutral-100"
    >
      <span className="font-bold">{ticker}</span>
      <span className="">${latestPrice.toFixed(2)}</span>
      <span className="font-bold">
        <ResponsiveContainer width={150} height="100%">
          <StockChart ticker={ticker} data={data} />
        </ResponsiveContainer>
      </span>
      <div className="flex justify-end h-full py-2">
        <Link href={`/stocks/${ticker}/analysis`}>
          <button className="h-full px-5 text-white text-sm bg-neutral-950 rounded-md active:scale-95 transition-transform duration-150">
            View
          </button>
        </Link>
      </div>
    </div>
  );
};

export default function Home() {
  const stocksQuery = useQuery({
    queryKey: ["stocks"],
    queryFn: Stocks.fetchStocks,
  });

  if (stocksQuery.isLoading || !stocksQuery.data) {
    return <LoadingScreen />;
  }

  return (
    <div>
      <div className="w-full grid grid-cols-2 gap-x-2 gap-y-2 px-5 py-5">
        {Object.entries(stocksQuery.data).map(([ticker, data]) => (
          <StockEntry key={ticker} ticker={ticker} data={data} />
        ))}
      </div>
    </div>
  );
}
