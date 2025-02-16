import { readFileSync } from "fs";
import path from "path";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const filePath = path.join(process.cwd(), "public", "stock_predictions.json");
  const contents = await readFileSync(filePath, "utf8");
  const json = JSON.parse(contents);
  if (id in json) {
    return new Response(JSON.stringify(json[id]));
  } else {
    return new Response(JSON.stringify({ error: "Ticker not found" }), {
      status: 404,
    });
  }
}
