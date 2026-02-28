import { NextResponse } from "next/server";
import { siteConfig } from "@/lib/constants/site";

export async function GET() {
  // Redirect to the main llms.txt route
  return NextResponse.redirect(`${siteConfig.url}/llms.txt`, 301);
}
