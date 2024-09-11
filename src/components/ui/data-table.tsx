import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { Label } from "~/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Button } from "~/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { Checkbox } from "~/components/ui/checkbox";

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "~/components/ui/context-menu";

import { Table as TableType, Row as RowType } from "@tanstack/react-table";
import { toast } from "sonner";

export type DataTableProps<T, K> = {
  columns: ColumnDef<T, K>[];
  data: T[];
  onSelectionHook: React.Dispatch<React.SetStateAction<T[]>>;
};

export const DataTable = <T, K>({
  columns,
  data,
  onSelectionHook,
}: DataTableProps<T, K>) => {
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const processedColumns = [
    {
      id: "select",
      header: ({ table }: { table: TableType<T> }) => (
        <Checkbox
          checked={
            table.getIsAllRowsSelected()

            // || (table.getIsSomeRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => {
            table.toggleAllRowsSelected(!!value);
          }}
          aria-label="Select all"
        />
      ),
      cell: ({ row }: { row: RowType<T> }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => {
            row.toggleSelected(!!value);
          }}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    ...columns,
  ];

  const table = useReactTable({
    data,
    columns: processedColumns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      columnVisibility,
      rowSelection,
    },
    initialState: {
      pagination: {
        pageSize: 12,
      },
    },
  });

  useEffect(() => {
    onSelectionHook(() => [
      ...table.getFilteredSelectedRowModel().rows.map((row) => row.original),
    ]);
  }, [rowSelection, onSelectionHook, table]);

  return (
    <div className="">
      <div className="flex items-center py-4 rounded-md">
        <Label className="w-[6rem]">Page Size: </Label>

        <Select
          onValueChange={(val) => table.setPageSize(parseInt(val.valueOf()))}
        >
          <SelectTrigger className="text-sm w-[10rem]">
            <SelectValue placeholder="12" />
          </SelectTrigger>
          <SelectContent className="bg-offwhite dark:text-space">
            <SelectItem value="8">8</SelectItem>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="12">12</SelectItem>
            <SelectItem value="14">14</SelectItem>
          </SelectContent>
        </Select>

        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto text-space">
              Columns
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="overflow-y-auto bg-offwhite max-h-[20rem] dark:text-space"
          >
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
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
                  );
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
                    <TableCell
                      key={cell.id}
                      onDoubleClick={() => {
                        if (cell.id !== "select") {
                          navigator.clipboard.writeText(
                            cell.getValue() as string,
                          );
                        }

                        toast.success("Cell text copied to clipboard");
                      }}
                    >
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="overflow-hidden cursor-pointer h-[1.5rem] w-[5rem]">
                              <ContextMenu>
                                <ContextMenuTrigger>
                                  {flexRender(
                                    cell.column.columnDef.cell,
                                    cell.getContext(),
                                  )}
                                </ContextMenuTrigger>
                                <ContextMenuContent>
                                  <ContextMenuItem className="cursor-pointer">
                                    Profile
                                  </ContextMenuItem>
                                  <ContextMenuItem className="cursor-pointer">
                                    Billing
                                  </ContextMenuItem>
                                </ContextMenuContent>
                              </ContextMenu>
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="p-2 break-words shadow-md bg-offwhite max-w-[12rem] dark:text-space">
                              {JSON.stringify(
                                cell.getContext().renderValue(),
                              ).replace(/"/g, "")}
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
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

      <div className="flex justify-end items-center py-4 space-x-2">
        <div className="flex-1 text-sm text-space">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <Button
          variant="outline"
          size="sm"
          className="text-space"
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
          className="text-space"
        >
          Next
        </Button>
      </div>
    </div>
  );
};
