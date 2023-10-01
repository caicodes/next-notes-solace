"use client"

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useEffect, useState } from "react"
import { DataTable } from "./notes/data-table"
import { Note, columns } from "./notes/columns"

export default function Home() {
  const [notes, setNotes] = useState<Note[]>([])

  const supabase = createClientComponentClient()

  useEffect(() => {
    const getNotes = async () => {
      const { data } = await supabase.from("notes").select()
      if (data) {
        setNotes(data)
      }
    }
    getNotes()
  }, [supabase, setNotes])

  return (
    <div className="m-8">
      <DataTable columns={columns} data={notes} />
    </div>
  )
}
