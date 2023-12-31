"use client"

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { PlusIcon } from "lucide-react"
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

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const formSchema = z.object({
  note: z
    .string()
    .min(20, {
      message: "A note must be at least 20 characters.",
    })
    .max(300, {
      message: "A note must be less than or equal to 300 characters.",
    }),
  client_id: z.string(),
})

// AddNoteDialog
export function AddNoteDialog() {
  let [open, setOpen] = useState(false)

  const supabase = createClientComponentClient()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      note: "",
      client_id: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // ✅ Type-safe and validated.
    await supabase.from("notes").insert(values)
    console.log(values)
    form.reset()
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <PlusIcon className="mr-1 p-1" /> New Note
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add a note</DialogTitle>
          <DialogDescription>
            Create new notes here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="client_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Client</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a client for this note" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="5d904c4a-105f-40ae-84a4-5ad49477f527">
                        Aquaman
                      </SelectItem>
                      <SelectItem value="9c551c16-098e-40a0-ac71-9766ebbbc533">
                        Batman
                      </SelectItem>
                      <SelectItem value="17744141-773c-4f10-9f76-71fac04607b4">
                        Superman
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
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
              <Button type="submit">Save</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
