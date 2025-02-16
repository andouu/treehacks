import { StockRecord } from "../Types/Stock";

export class Stocks {
  static fetchStocks = async (): Promise<StockRecord> => {
    try {
      const data = await fetch("/api/stocks", { method: "GET" });
      return await data.json();
    } catch (err) {
      console.error(err);
      return {};
    }
  };
}
