"use client"

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useEffect, useState } from "react"
import { DataTable } from "./notes/data-table"
import { Note, columns } from "./notes/columns"

export default function Home({ serverNotes }: { serverNotes: any }) {
  const [notes, setNotes] = useState<Note[]>([])

  const supabase = createClientComponentClient()

  useEffect(() => {
    setNotes(serverNotes)
  }, [serverNotes])

  useEffect(() => {
    const channel = supabase
      .channel("*")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "notes" },
        (payload) => setNotes((notes: any) => [...notes, payload.new]),
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [supabase, serverNotes])

  return (
    <div className="m-8">
      <DataTable columns={columns} data={notes} />
    </div>
  )
}

