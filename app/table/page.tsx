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
  return (
    <section>
      <Suspense fallback={<Loading />}>
        <BooksTable />
      </Suspense>
    </section>
  );
}

export default Table;
