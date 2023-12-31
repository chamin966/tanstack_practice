import useGetInfiniteSupabaseQuery, { IBook } from "@/customHooks/useGetInfiniteBooksQuery";
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { useEffect, useState } from "react";


function BooksTable(){
  const [books, setBooks] = useState<IBook[]>([]);
  const {data, hasNextPage, fetchNextPage} = useGetInfiniteSupabaseQuery();
  const columnHelper = createColumnHelper();


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

  const handleNewGenerate = () => {
    console.log('새로 불러옴');
    console.log('hasNextPage :>> ', hasNextPage);
    fetchNextPage();
  }

  useEffect(() => {
    if(data){
        const newPage = data.pages.flat();
        setBooks(newPage);
      }
  }, [data])

  return(
    <div className="p-3">
      <div className="h-[400px] overflow-auto ">
        <table className=" bg-red-400">
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
                  <td className="text-center h-[60px] border border-black" key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button onClick={handleNewGenerate}>새로 불러오기</button>
    </div>
  )
}

export default BooksTable