"use client";

import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import { DataTableViewOptions } from "./data-table-view-options";
import { priorities } from "../data";
import { Download, Search } from "lucide-react";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between ">
      <div className=" flex flex-1 items-center space-x-2">
        <div className="relative">
          <Search className="absolute left-2 top-2 h-4 w-4 text-muted-foreground" />

          <Input
            placeholder="Search by order ID..."
            value={
              (table.getColumn("orderId")?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table.getColumn("orderId")?.setFilterValue(event.target.value)
            }
            className="pl-8 h-8 w-[150px] lg:w-[250px]"
          />
        </div>
      </div>
      {isFiltered && (
        <Button
          variant="ghost"
          onClick={() => table.resetColumnFilters()}
          className="h-8 px-2 lg:px-3"
        >
          Reset
          <Cross2Icon className="ml-2 h-4 w-4" />
        </Button>
      )}
      {table.getColumn("orderDate") && (
        <DataTableFacetedFilter
          column={table.getColumn("orderDate")}
          title="sort"
          options={priorities}
        />
      )}
      <DataTableViewOptions table={table} />

      <div className="md:pl-5">
        <Download className="rounded-md border w-8 h-8 p-1" />
      </div>
    </div>
  );
}
