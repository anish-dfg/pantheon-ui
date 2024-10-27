import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
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
import { Input } from "./input";

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
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnToFilter, setColumnToFilter] = useState<string | null>(null);

  const processedColumns = [
    {
      id: "select",
      header: ({ table }: { table: TableType<T> }) => (
        <Checkbox
          className="mr-6"
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
      sorting,
      columnFilters,
    },
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
  });

  useEffect(() => {
    onSelectionHook(() => [
      ...table.getFilteredSelectedRowModel().rows.map((row) => row.original),
    ]);
  }, [rowSelection, onSelectionHook, table]);

  return (
    <div className="">
      <div className="flex items-center py-4 rounded-md">
        <div className="flex justify-between items-center w-full">
          <div className="flex gap-4 items-center">
            <Label className="w-[6rem]">Page Size: </Label>

            <Select
              onValueChange={(val) =>
                table.setPageSize(parseInt(val.valueOf()))
              }
            >
              <SelectTrigger className="text-sm outline-none focus:ring-0 w-[10rem] border-lightgray dark:border-mediumgray">
                <SelectValue placeholder="10" />
              </SelectTrigger>
              <SelectContent className="border-lightgray bg-offwhite dark:border-mediumgray dark:bg-space dark:text-offwhite">
                <SelectItem value="8" className="cursor-pointer">
                  8
                </SelectItem>
                <SelectItem value="10" className="cursor-pointer">
                  10
                </SelectItem>
                <SelectItem value="12" className="cursor-pointer">
                  12
                </SelectItem>
                <SelectItem value="14" className="cursor-pointer">
                  14
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-2 items-center">
            <Label className="w-[6rem]">Filter</Label>
            <Select
              // onValueChange={(val) => table.setPageSize(parseInt(val.valueOf()))}
              onValueChange={(val) => setColumnToFilter(val.valueOf())}
            >
              <SelectTrigger className="text-sm outline-none focus:ring-0 w-[10rem] border-lightgray dark:border-mediumgray">
                <SelectValue placeholder="Filter..." />
              </SelectTrigger>
              <SelectContent className="border-lightgray bg-offwhite dark:border-mediumgray dark:bg-space dark:text-offwhite">
                {columns.map((column) => {
                  return (
                    <SelectItem
                      key={
                        (column as ColumnDef<T, K> & { accessorKey: string })
                          .accessorKey
                      }
                      value={
                        (column as ColumnDef<T, K> & { accessorKey: string })
                          .accessorKey
                      }
                      className="cursor-pointer"
                    >
                      {
                        (column as ColumnDef<T, K> & { accessorKey: string })
                          .accessorKey
                      }
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>

            <div className="flex items-center py-4">
              <Input
                placeholder={
                  columnToFilter
                    ? `Filter ${columnToFilter}`
                    : "Select a column to filter"
                }
                value={
                  columnToFilter
                    ? (table
                        .getColumn(columnToFilter)
                        ?.getFilterValue() as string)
                    : ""
                }
                onChange={(event) =>
                  table
                    .getColumn(columnToFilter!)
                    ?.setFilterValue(event.target.value)
                }
                className="max-w-sm"
                disabled={!columnToFilter}
              />
            </div>
          </div>

          <div>
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="ml-auto hover:duration-300 text-space dark:text-offwhite dark:bg-space dark:hover:bg-offwhite dark:hover:text-space hover:text-offwhite hover:bg-space"
                >
                  Columns
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="overflow-y-auto bg-offwhite max-h-[20rem] text-space border-lightgray dark:text-offwhite dark:bg-space dark:border-mediumgray"
              >
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => {
                    return (
                      <DropdownMenuCheckboxItem
                        key={column.id}
                        className="capitalize cursor-pointer"
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
        </div>
      </div>

      <div className="rounded-md border border-lightgray dark:border-offwhite">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="border-lightgray dark:border-offwhite"
              >
                {headerGroup.headers.map((header, j) => {
                  return (
                    <TableHead
                      key={header.id}
                      className={
                        j === 0
                          ? "border-r border-r-lightgray dark:border-r-offwhite"
                          : j === table.getFlatHeaders().length - 1
                            ? "border-l border-l-lightgray dark:border-l-offwhite"
                            : "border-x border-x-lightgray dark:border-x-offwhite"
                      }
                    >
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
                  className="border-lightgray dark:border-offwhite"
                >
                  {row.getVisibleCells().map((cell, i) => (
                    <TableCell
                      className={
                        i === 0
                          ? "border-r border-r-lightgray dark:border-r-offwhite"
                          : i === table.getFlatHeaders().length - 1
                            ? "border-l border-l-lightgray dark:border-l-offwhite"
                            : "border-x border-x-lightgray dark:border-x-offwhite"
                      }
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
                      {cell.column.id !== "select" ? (
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div className="overflow-hidden cursor-pointer h-[1.5rem] w-[5rem]">
                                <ContextMenu>
                                  <ContextMenuTrigger>
                                    {flexRender(
                                      cell.column.id !== "select" &&
                                        cell.column.columnDef.cell,
                                      cell.getContext(),
                                    )}
                                  </ContextMenuTrigger>
                                  <ContextMenuContent>
                                    <ContextMenuItem className="cursor-pointer">
                                      Unimplemented
                                    </ContextMenuItem>

                                    <ContextMenuItem className="cursor-pointer">
                                      Unimplemented
                                    </ContextMenuItem>
                                  </ContextMenuContent>
                                </ContextMenu>
                              </div>
                            </TooltipTrigger>

                            <TooltipContent>
                              <p className="p-2 break-words rounded-sm shadow-md bg-offwhite max-w-[12rem] dark:text-space">
                                {JSON.stringify(
                                  cell.getContext().renderValue(),
                                ).replace(/"/g, "")}
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      ) : (
                        flexRender(
                          cell.column.id !== "select" ? (
                            cell.getValue() ? (
                              cell.column.columnDef.cell
                            ) : (
                              <span className="text-mediumgray">
                                &lt;null&gt;
                              </span>
                            )
                          ) : (
                            cell.column.columnDef.cell
                          ),
                          cell.getContext(),
                        )
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

      <div className="flex justify-end items-center py-4 space-x-2">
        <div className="flex-1 text-sm text-space dark:text-offwhite">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <Button
          variant="outline"
          size="sm"
          className="hover:duration-300 text-space dark:text-offwhite dark:bg-space dark:hover:bg-offwhite dark:hover:text-space hover:bg-space hover:text-offwhite"
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
          className="hover:duration-300 text-space dark:text-offwhite dark:bg-space dark:hover:bg-offwhite dark:hover:text-space hover:bg-space hover:text-offwhite"
        >
          Next
        </Button>
      </div>
    </div>
  );
};
