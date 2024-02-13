"use client";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Columns = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <Button
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="bg-transparent pl-0 text-left text-muted-foreground shadow-none hover:bg-transparent"
      >
        Project Name <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "tldr",
    header: "TLDR",
  },
  {
    accessorKey: "deck",
    header: "DECK",
    cell: ({ row }) => {
      return (
        <span className="text-blue-500">
          <Link href={row.getValue("deck") || `#`}>DocSend</Link>
        </span>
      );
    },
  },
  {
    accessorKey: "status",
    header: "STATUS",
    cell: ({ row }) => (
      <span
        className={`${
          row.getValue("status") == "Invested" &&
          "border-green-500  bg-green-400/50  text-green-600"
        } ${
          row.getValue("status") == "Passed" &&
          "border-blue-500  bg-blue-400/50  text-blue-600"
        } ${
          row.getValue("status") == "IC" &&
          "border-yellow-500  bg-yellow-400/50  text-red-800"
        } ${
          row.getValue("status") == "Inbound" &&
          "border-rose-500  bg-rose-400/50  text-rose-600"
        } block w-full rounded-3xl border px-3 py-1 text-center`}
      >
        {row.getValue("status")}
      </span>
    ),
  },
];
