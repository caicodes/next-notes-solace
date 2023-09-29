"use client"

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useEffect, useState } from "react"
import { DataTable } from "./notes/data-table"
import { Note, columns } from "./notes/columns"

export default function Home() {
  const [notes, setNotes] = useState<any[]>([])

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
      <div className="text-3xl font-thin">notes</div>
      {notes.map((note: Note) => (
        <div key={note.id}>{note.note}</div>
      ))}

      <div>table...</div>

      <DataTable columns={columns} data={notes} />
    </div>
  )
}
