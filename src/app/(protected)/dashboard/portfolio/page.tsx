"use client";
import ForceGraph2D from "react-force-graph-2d";
import AutoSizer from "react-virtualized-auto-sizer";

const SAMPLE_PORTFOLIO = [
  "SBUX",
  "MCD",
  "GS",
  "PYPL",
  "F",
  "AAPL",
  "COST",
  "MMM",
  "HD",
  "ADBE",
  "TMO",
  "DHR",
];

const HOLD_COLOR = "royalblue";
const SHORT_COLOR = "crimson";

const POSITION_HOLD = ["SBUX", "MCD", "GS", "PYPL", "F", "AAPL"];
const POSITION_SHORT = ["COST", "MMM", "HD", "ADBE", "TMO", "DHR"];

const CUT_EDGES = [
  { source: "SBUX", target: "COST" },
  { source: "SBUX", target: "MMM" },
  { source: "MCD", target: "COST" },
  { source: "MCD", target: "HD" },
  { source: "GS", target: "ADBE" },
  { source: "GS", target: "TMO" },
  { source: "PYPL", target: "MMM" },
];

const ALL_EDGES = [
  ...CUT_EDGES,
  { source: "MCD", target: "GS" },
  { source: "MCD", target: "F" },
  { source: "F", target: "PYPL" },
  { source: "PYPL", target: "AAPL" },
  { source: "COST", target: "DHR" },
  { source: "DHR", target: "COST" },
];

const DISPLAYED_EDGES = ALL_EDGES;

const Legend = () => {
  return (
    <div className="z-20 absolute top-5 right-5">
      <div className="w-72 min-h-72 bg-neutral-800 rounded-xl p-4 text-white">
        <span className="text-lg font-bold">Your Portfolio</span>
        <div className="mt-2 mb-4 flex flex-wrap gap-1">
          {SAMPLE_PORTFOLIO.map((ticker) => (
            <div
              key={ticker}
              className="w-fit px-3 py-1 text-sm bg-neutral-700 font-bold text-neutral-100 rounded-lg"
            >
              {ticker}
            </div>
          ))}
        </div>
        <div className="flex items-center gap-1">
          <div
            className="w-4 h-4 rounded"
            style={{ backgroundColor: "royalblue" }}
          />
          <span className="text-lg font-bold">Suggested Hold</span>
        </div>
        <div className="mt-2 mb-4 flex flex-wrap gap-1">
          {POSITION_HOLD.map((ticker) => (
            <div
              key={ticker}
              className="w-fit px-3 py-1 text-sm bg-neutral-700 font-bold text-neutral-100 rounded-lg"
            >
              {ticker}
            </div>
          ))}
        </div>
        <div className="flex items-center gap-1">
          <div
            className="w-4 h-4 rounded"
            style={{ backgroundColor: "crimson" }}
          />
          <span className="text-lg font-bold">Suggested Short</span>
        </div>
        <div className="mt-2 flex flex-wrap gap-1">
          {POSITION_SHORT.map((ticker) => (
            <div
              key={ticker}
              className="w-fit px-3 py-1 text-sm bg-neutral-700 font-bold text-neutral-100 rounded-lg"
            >
              {ticker}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const NODES = SAMPLE_PORTFOLIO.map((ticker) => ({
  id: ticker,
  position: POSITION_HOLD.includes(ticker) ? "HOLD" : "SHORT",
}));

export default function Portfolio() {
  return (
    <div className="relative w-full h-full">
      <Legend />
      <AutoSizer>
        {({ width, height }) => (
          <ForceGraph2D
            width={width}
            height={height}
            graphData={{
              nodes: NODES,
              links: DISPLAYED_EDGES,
            }}
            nodeLabel={(node) => node.id}
            nodeVal={5}
            nodeColor={(node) =>
              node.position === "HOLD" ? HOLD_COLOR : SHORT_COLOR
            }
            linkWidth={5}
            linkColor={(link) =>
              CUT_EDGES.find(
                (e) => e.source === link.source && e.target === link.target
              )
                ? "limegreen"
                : "lightgray"
            }
            linkLineDash={(link) =>
              CUT_EDGES.find(
                (e) => e.source === link.source && e.target === link.target
              )
                ? [5, 5]
                : [0, 0]
            }
            backgroundColor="white"
          />
        )}
      </AutoSizer>
    </div>
  );
}
