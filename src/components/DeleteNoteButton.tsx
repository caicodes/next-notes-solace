import { Trash2 } from "lucide-react"
import { Button } from "./ui/button"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import type { Note } from "@/app/notes/columns"

const DeleteNoteButton = (note: Note) => {
  const supabase = createClientComponentClient()

  async function deleteNote() {
    const { error } = await supabase.from("notes").delete().eq("id", note.id)
    if (error) console.log(error)
  }

  return (
    <Button
      onClick={() => deleteNote()}
      variant={"ghost"}
      size="icon"
      className="hover:bg-destructive hover:text-white"
    >
      <Trash2 className="p-1" />
    </Button>
  )
}

export default DeleteNoteButton
