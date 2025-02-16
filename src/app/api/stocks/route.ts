import path from "path";
import * as fs from "fs";

export async function GET() {
  const filePath = path.join(process.cwd(), "public", "stock_predictions.json");
  try {
    const contents = await fs.readFileSync(filePath, "utf8");
    const json = JSON.parse(contents);
    return new Response(JSON.stringify(json));
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Error reading JSON file" }), {
      status: 500,
    });
  }
}
