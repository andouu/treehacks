"use client";
import { LoadingScreen } from "@/app/Components/LoadingScreen";
import { Stocks } from "@/app/Util/Stocks";
import { useQuery } from "@tanstack/react-query";
import { motion } from "motion/react";
import Link from "next/link";
import { Area, AreaChart, ResponsiveContainer } from "recharts";
import AutoSizer from "react-virtualized-auto-sizer";
import { FixedSizeGrid } from "react-window";
import { CSSProperties } from "react";

const COL_GAP = 8;

export default function Home() {
  const stocksQuery = useQuery({
    queryKey: ["stocks"],
    queryFn: Stocks.fetchStocks,
  });

  if (stocksQuery.isLoading || !stocksQuery.data) {
    return <LoadingScreen />;
  }

  const data = Object.entries(stocksQuery.data);

  const StockEntry = ({
    rowIndex,
    columnIndex,
    style,
  }: {
    rowIndex: number;
    columnIndex: number;
    style: CSSProperties;
  }) => {
    const index = rowIndex * 2 + columnIndex;
    if (index >= data.length) {
      return null;
    }

    const isLeft = columnIndex % 2 === 0;

    const [ticker, entry] = data[index];
    const latestPrice = entry["Actual Future Prices"].at(-1)!;
    const normalized = entry["Training Data (Actual)"]
      .concat(entry["Actual Future Prices"])
      .map((price, i) => ({
        name: i,
        price,
      }));

    const isUp = latestPrice > entry["Actual Future Prices"].at(-2)!;

    return (
      <div
        key={ticker}
        className="w-full h-12 px-3 grid grid-cols-4 items-center rounded-xl border-2 border-neutral-100"
        style={{
          ...style,
          width: `calc(${style.width}px - ${COL_GAP}px)`,
          height: 48,
          marginBottom: 10,
          marginLeft: isLeft ? 0 : COL_GAP / 2,
          marginRight: isLeft ? COL_GAP / 2 : 0,
        }}
      >
        <span className="font-bold">{ticker}</span>
        <span className="">${latestPrice.toFixed(2)}</span>
        <motion.div
          className="w-full h-full py-0.5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={normalized}>
              <defs>
                <linearGradient id="up" y1="0" y2="1" x1="0" x2="0">
                  <stop offset="0%" stopColor="limegreen" stopOpacity={1} />
                  <stop offset="100%" stopColor="white" stopOpacity={1} />
                </linearGradient>
                <linearGradient id="down" y1="0" y2="1" x1="0" x2="0">
                  <stop offset="0%" stopColor="crimson" stopOpacity={1} />
                  <stop offset="100%" stopColor="white" stopOpacity={1} />
                </linearGradient>
              </defs>
              <Area
                isAnimationActive={false}
                type="monotone"
                dataKey="price"
                stroke={isUp ? "limegreen" : "crimson"}
                fill={isUp ? "url(#up)" : "url(#down)"}
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>
        <div className="flex justify-end h-full py-2">
          <Link href={`/dashboard/stocks/${ticker}/analysis`}>
            <button className="h-full px-5 text-white text-sm bg-neutral-950 rounded-lg active:scale-95 transition-transform duration-150 font-bold">
              View
            </button>
          </Link>
        </div>
      </div>
    );
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-y-auto px-5 py-5">
      <span className="block text-2xl mb-4 ml-1 text-neutral-500">For You</span>
      <div className="flex gap-3 mb-5">
        {["AAPL", "AMZN", "GOOG", "BKNG", "CSCO"].map((ticker) => {
          const entry = stocksQuery.data[ticker];
          if (!entry) {
            console.log(ticker);
          }
          const latestPrice = entry["Actual Future Prices"].at(-1)!;
          const normalized = entry["Training Data (Actual)"]
            .concat(entry["Actual Future Prices"])
            .map((price, i) => ({
              name: i,
              price,
            }));

          const isUp = latestPrice > entry["Actual Future Prices"].at(-2)!;

          return (
            <div
              key={ticker}
              className="relative w-64 h-40 flex flex-col border-2 border-neutral-100 rounded-xl px-3 py-3"
            >
              <div className="flex items-center justify-between px-1">
                <span className="text-xl font-bold">{ticker}</span>
                <span className="font-bold">${latestPrice.toFixed(2)}</span>
              </div>
              <div className="flex-1">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={normalized}>
                    <defs>
                      <linearGradient id="up" y1="0" y2="1" x1="0" x2="0">
                        <stop
                          offset="0%"
                          stopColor="limegreen"
                          stopOpacity={1}
                        />
                        <stop offset="100%" stopColor="white" stopOpacity={1} />
                      </linearGradient>
                      <linearGradient id="down" y1="0" y2="1" x1="0" x2="0">
                        <stop offset="0%" stopColor="crimson" stopOpacity={1} />
                        <stop offset="100%" stopColor="white" stopOpacity={1} />
                      </linearGradient>
                    </defs>
                    <Area
                      isAnimationActive={false}
                      type="monotone"
                      dataKey="price"
                      stroke={isUp ? "limegreen" : "crimson"}
                      fill={isUp ? "url(#up)" : "url(#down)"}
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <Link
                href={`/dashboard/stocks/${ticker}/analysis`}
                className="absolute bottom-3 right-3 active:scale-95 transition-transform duration-150"
              >
                <button className="px-3 py-1 rounded-lg bg-neutral-950 text-white text-sm font-bold">
                  View
                </button>
              </Link>
            </div>
          );
        })}
      </div>
      <span className="block text-2xl mb-4 ml-1 text-neutral-500">
        All Stocks
      </span>
      <div className="flex-1">
        <AutoSizer>
          {({ width, height }) => (
            <FixedSizeGrid
              width={width}
              height={height}
              itemData={data}
              columnCount={2}
              columnWidth={width / 2}
              rowHeight={58}
              rowCount={Math.ceil(data.length / 2)}
            >
              {StockEntry}
            </FixedSizeGrid>
          )}
        </AutoSizer>
      </div>
    </div>
  );
}
