import { NextResponse } from "next/server"
import { PORTFOLIO_DATA } from "@/lib/data"

export async function GET() {
  return NextResponse.json(PORTFOLIO_DATA)
}
