"use client"

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { PencilIcon } from "lucide-react"
import type { Note } from "@/app/notes/columns"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

const formSchema = z.object({
  note: z
    .string()
    .min(20, {
      message: "A note must be at least 20 characters.",
    })
    .max(300, {
      message: "A note must be less than or equal to 300 characters.",
    }),
})

// EditNoteDialog
export function EditNoteDialog(note: Note) {
  let [open, setOpen] = useState(false)

  const supabase = createClientComponentClient()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      note: `${note.note}`,
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { data, error } = await supabase
      .from("notes")
      .update({
        note: values.note,
        updated_at: new Date().toISOString().toLocaleString(),
      })
      .eq("id", note.id)
      .select()
    if (error) console.log(error, data)
    form.reset()
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <PencilIcon className="mr-1 p-1" /> Edit Note
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit note: </DialogTitle>
          <DialogDescription>
            Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="note"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Note</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Add a note..."
                      {...field}
                      maxLength={300}
                    />
                  </FormControl>
                  <FormMessage />
                  <FormDescription className="text-right text-xs opacity-60">
                    {form.watch("note")
                      ? 300 - form.watch("note").length
                      : "300"}{" "}
                    Characters remaining
                  </FormDescription>
                </FormItem>
              )}
            />
            <div className="flex justify-end gap-2">
              <Button
                variant={"outline"}
                type="reset"
                onClick={() => {
                  form.clearErrors()
                  form.reset()
                  setOpen(false)
                }}
              >
                Cancel
              </Button>
              <Button type="submit">Submit</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
