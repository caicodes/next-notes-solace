"use client"

import * as React from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { AddNoteDialog } from "@/components/AddNoteDialog"
import { Trash2 } from "lucide-react"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  )
  const [rowSelection, setRowSelection] = React.useState({})

  const supabase = createClientComponentClient()

  async function deleteNote(id: string, noteId: string) {
    const { error } = await supabase.from("notes").delete().eq("id", noteId)
    if (error) console.log(error, id)
    setRowSelection({ id: false })
  }

  interface SelectedNotes {
    id: string
    original: {
      id: string
    }
  }

  function deleteSelectedRows(rows: SelectedNotes[]) {
    rows.forEach((element) => {
      deleteNote(element.id, element.original.id)
    })
  }

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      rowSelection,
    },
  })

  return (
    <div className="animate-in">
      <div className="flex py-4 justify-between">
        <div className="flex place-items-center w-1/2">
          <div className="text-2xl font-thin font-display mx-4">
            Solace Notes
          </div>
          <Input
            placeholder="Search notes..."
            value={(table.getColumn("note")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("note")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
            type="search"
          />

          <Select
            value={
              (table.getColumn("client_id")?.getFilterValue() as string) ?? ""
            }
            onValueChange={
              (event) => table.getColumn("client_id")?.setFilterValue(event)
              // console.log("event", event)
            }
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a client" />
            </SelectTrigger>
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
        </div>
        <AddNoteDialog />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between space-x-2 py-4">
        <div className="flex text-sm text-muted-foreground place-items-center">
          <div className="ml-4">
            {table.getFilteredSelectedRowModel().rows.length} of{" "}
            {table.getFilteredRowModel().rows.length} row(s) selected.
          </div>
          {table.getFilteredSelectedRowModel().rows.length > 0 && (
            <Button
              variant={"outline"}
              size="sm"
              className="ml-2"
              onClick={() =>
                deleteSelectedRows(
                  table.getFilteredSelectedRowModel().rows as SelectedNotes[],
                )
              }
            >
              <Trash2 className="p-1 mr-1 text-destructive" />
              Delete {table.getFilteredSelectedRowModel().rows.length} selected
              notes.
            </Button>
          )}
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
