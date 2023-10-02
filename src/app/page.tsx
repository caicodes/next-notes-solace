import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import RealtimeNotes from "./realtime/realtime-notes"

export const revalidate = 0

export default async function Home() {
  const supabase = createClientComponentClient()
  const { data } = await supabase.from("notes").select()
  return <RealtimeNotes serverNotes={data ?? []} />
}
