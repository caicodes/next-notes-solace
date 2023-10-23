"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import moment from "moment"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { EditNoteDialog } from "@/components/EditNoteDialog"
import DeleteNoteButton from "@/components/DeleteNoteButton"

// This type is used to define the shape of the notes data.
export type Note = {
  id: string
  note: string
  created_at: string
  client_id: string
}

export const columns: ColumnDef<Note>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "note",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Note
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "client_id",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Client
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => {
      return (
        <div className="flex justify-end">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Created
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )
    },
    cell: ({ row }) => {
      const date_created: string = row.getValue("created_at")
      return (
        <div className="text-right font-medium">
          {moment(date_created).format("dddd, MMMM Do YYYY hh:mm a")}
        </div>
      )
    },
  },
  {
    accessorKey: "updated_at",
    header: ({ column }) => {
      return (
        <div className="flex justify-end">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Last Updated
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )
    },
    cell: ({ row }) => {
      const date_created: string = row.getValue("updated_at")
      return (
        <div className="text-right font-medium">
          {moment(date_created).format("dddd, MMMM Do YYYY hh:mm a")}
        </div>
      )
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const note: Note = row.original

      return (
        <div className="flex justify-end">
          <EditNoteDialog {...note} />
          <DeleteNoteButton {...note} />
        </div>
      )
    },
  },
]
