import { buildRss } from "@/lib/rss";

export const dynamic = "force-static";

export function GET() {
  return buildRss("tr");
}
