"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "./data-table-column-header";
import { Transaction } from "../data";

export const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "orderId",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Order ID" />
    ),
    cell: ({ row }) => (
      <div className="w-[80px] text-blue-500">#{row.getValue("orderId")}</div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "orderDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Order Date" />
    ),
    cell: ({ row }) => (
      <div className="text-right pr-5  ">{row.getValue("orderDate")}</div>
    ),
  },
  {
    accessorKey: "orderAmount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Order Amount" />
    ),
    cell: ({ row }) => (
      <div className=" text-right">₹{row.getValue("orderAmount")}</div>
    ),
    enableSorting: false,
  },
  {
    accessorKey: "transactionFee",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Transaction Fees" />
    ),
    cell: ({ row }) => (
      <div className="text-right">₹{row.getValue("transactionFee")}</div>
    ),
    enableSorting: false,
  },
];
