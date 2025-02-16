export type StockRecord = Record<string, StockData>;

export type StockData = {
  "Training Data (Actual)": number[];
  "Actual Future Prices": number[];
  "Predicted Future Prices": number[];
};
