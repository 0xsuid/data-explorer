"use client"

import { columns } from "@/components/dashboard/columns"
import { DataTable } from "@/components/dashboard/data-table"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'

export default function Page() {
  const queryClient = new QueryClient()


  return (
    <QueryClientProvider client={queryClient}>
    <div className="container mx-auto py-10 px-4 xl:px-6 2xl:px-4 max-w-[1536px]">
      <div className="mb-4">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/dataset">
                Explore Dataset
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl"><span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Explore #1</span> Dataset</h1>
        <DataTable columns={columns} data={[]} />
    </div>
    </QueryClientProvider>
  )
}
