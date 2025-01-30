import {useState, useEffect} from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  PaginationState,
  getFacetedUniqueValues,
  getFacetedRowModel,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { keepPreviousData, useQuery } from "@tanstack/react-query"


interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

import { DataTablePagination } from "./data-table-pagination"
import { DataTableViewOptions } from "./data-table-view-options"
import { fetchCountries, fetchDataset } from "@/lib/data"
import { DataTableFacetedFilter } from "./data-table-faceted-filter"
import { DebouncedInput } from "../ui/debounced-input"

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})
  const [processFilter, setProcessFilter] = useState('');
  const [countryFilter, setCountryFilter] = useState('');

  
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })

  const dataQuery = useQuery({
    queryKey: ["data", pagination, processFilter, countryFilter], // Include pagination in the query key
    queryFn: () => fetchDataset(pagination, processFilter, countryFilter), // Pass pagination to fetchData
    placeholderData: keepPreviousData, // Prevent flicker when switching pages
    staleTime: 15 * 60 * 1000, // Cache for 15 min
  })

  const [countries, setCountries] = useState<never[]>([]);


  useEffect(() => {
    async function fetchCountryData() {
      try {
        const fetchedCountriesResponse = await fetchCountries();
        if (fetchedCountriesResponse) {
          setCountries(fetchedCountriesResponse);
        } else {
          console.error("Unexpected response structure:", fetchedCountriesResponse);
        }
      } catch (error) {
        console.error("Failed to fetch countries:", error);
      }
    }

    fetchCountryData();
  }, []);

  const handleProcessNameChange = (value: string | number) => {
    console.log('Debounced input value:', value);
    if(value){
      setProcessFilter(value.toString())
    }
  };

  const table = useReactTable({
    data: dataQuery.data?.rows ?? data,
    columns,
    rowCount: dataQuery.data?.rowCount,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    manualPagination: true,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination
    },
  })

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <DebouncedInput
          placeholder="Filter processName..."
          value={processFilter || ''}
          onChange={handleProcessNameChange}
          className="max-w-sm"
        />
        <DataTableFacetedFilter
          column={table.getColumn("country")}
          title="Country"
          options={countries}
          countryFilter={setCountryFilter}
        />
        <DataTableViewOptions table={table}/>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="p-2">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
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
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
        <DataTablePagination table={table} />
    </div>
  )
}
