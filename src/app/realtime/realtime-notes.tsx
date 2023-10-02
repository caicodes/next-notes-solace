"use client"

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useEffect, useState } from "react"
import { DataTable } from "@/app/notes/data-table"
import { Note, columns } from "@/app/notes/columns"
import { toast } from "@/components/ui/use-toast"

export default function RealtimeNotes({
  serverNotes,
}: {
  serverNotes: Note[]
}) {
  const [notes, setNotes] = useState(serverNotes)

  const supabase = createClientComponentClient()

  useEffect(() => {
    const channel = supabase
      .channel("realtime notes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "notes",
        },
        (payload) => {
          console.log({ payload })
          if (payload.eventType === "INSERT") {
            setNotes([...notes, payload.new as Note])
            toast({
              title: "New note added...",
            })
          }
          if (
            payload.eventType === "DELETE" ||
            payload.eventType === "UPDATE"
          ) {
            getNotes()
            toast({
              title: `Note ${
                payload.eventType === "DELETE" ? "deleted" : "updated"
              } on server...`,
            })
          }
        },
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }

    async function getNotes() {
      const { data } = await supabase.from("notes").select()
      if (data) setNotes(data)
    }
  }, [notes, setNotes, serverNotes, supabase])

  return (
    <div className="m-4">
      <DataTable columns={columns} data={notes} />
    </div>
  )
}
