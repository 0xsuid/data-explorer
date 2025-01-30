"use client"

import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"
 
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChemicalData } from "@/lib/definitions"
import { DataTableColumnHeader } from "./data-table-column-header"
import Link from "next/link"


export const columns: ColumnDef<ChemicalData>[] = [
  {
    accessorKey: "processName",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Process Name"/>
  },
  {
    accessorKey: "flowName",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Flow Name"/>
  },
  {
    accessorKey: "type",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Type"/>
  },
  {
    accessorKey: "declaredUnit",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Unit"/>
  },
  {
    accessorKey: "country",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Country"/>
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const chemicalData = row.original
 
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem><Link href={`/dataset/${chemicalData.internalUuid.toString()}`}>View details</Link></DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
