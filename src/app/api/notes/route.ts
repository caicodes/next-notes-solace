import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { NextResponse } from "next/server"
import { cookies } from "next/headers"

import type { Database } from "@/lib/database.types"

export const dynamic = "force-dynamic"

export async function GET(request: Request) {
  const supabase = createRouteHandlerClient<Database>({ cookies })
  const { data } = await supabase.from("notes").select()
  return NextResponse.json(data)
}
