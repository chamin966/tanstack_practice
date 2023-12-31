'use client'
import useGetSupabase from "@/customHooks/useGetSupabse";
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { Suspense, useEffect, useLayoutEffect, useState } from "react";

interface IBook  {
  serialNumber: string,
  title: string,
  author: string,
  createdAt: string,
  publisher: string,
}

function Table() {
  const [books, setBooks] = useState<IBook[]>([]);

  const getBooks = async () => {
    const res = await useGetSupabase();
    setBooks(res);
  }

  const columnHelper = createColumnHelper<IBook>();

  const columns = [
    columnHelper.accessor('serialNumber',{
      header: () => <div>SN</div>,
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('title',{
      header: () => <div>제목</div>,
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('author',{
      header: () => <div>작가</div>,
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('publisher',{
      header: () => <div>출판사</div>,
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('createdAt',{
      header: () => <div>출판일</div>,
      cell: info => info.getValue(),
    })
  ]

  const table = useReactTable({
    data: books,
    columns,
    getCoreRowModel: getCoreRowModel()
  })

  useEffect(()=>{
    getBooks();
  }, []);
  
  return (
    <section>
      <Suspense>
        <table>
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())
                      }
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map(row => (
              <tr key={row.id}>
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </Suspense>
    </section>
  )
}

export default Table;
