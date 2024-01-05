"use client";
import useGetSupabase from "@/customHooks/useGetSupabseQuery";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Suspense, useEffect, useLayoutEffect, useState } from "react";
import Loading from "./loading";
import BooksTable from "@/components/booksTable";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function Table() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <section>
        <Suspense fallback={<Loading />}>
          <BooksTable />
        </Suspense>
      </section>
    </QueryClientProvider>
  );
}

export default Table;
