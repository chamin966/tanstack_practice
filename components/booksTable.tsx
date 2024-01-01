import useGetInfiniteSupabaseQuery, { IBook } from "@/customHooks/useGetInfiniteBooksQuery";
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";


function BooksTable(){
  const [books, setBooks] = useState<IBook[]>([]);
  const {data, hasNextPage, fetchNextPage} = useGetInfiniteSupabaseQuery();
  const { ref, inView } = useInView();
  
  const columnHelper = createColumnHelper();
  const columns = [
    columnHelper.accessor('serialNumber',{
    header: () => <div>SN</div>,
    maxSize: 10,
    cell: info => info.getValue(),
    }),
    columnHelper.accessor('title',{
    header: () => <div>제목</div>,
    maxSize: 300,
    minSize: 300,
    cell: info => info.getValue(),
    }),
    columnHelper.accessor('author',{
    header: () => <div>작가</div>,
    maxSize: 100,
    cell: info => info.getValue(),
    }),
    columnHelper.accessor('publisher',{
    header: () => <div>출판사</div>,
    maxSize: 70,
    cell: info => info.getValue(),
    }),
    columnHelper.accessor('createdAt',{
    header: () => <div>출판일</div>,
    maxSize: 70,
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

  useEffect(()=> {
    if(inView && hasNextPage){
      fetchNextPage();
      console.log('다음 페이지 로드됨');
    }
  }, [inView]);

  return(
    <div className="p-3">
      <div className="h-[400px] w-full overflow-auto border border-black">
        <table className="w-full border-separate  border-spacing-0">
          <thead className="sticky top-0 h-10 ">
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id} >
                {headerGroup.headers.map(header => (
                  <th key={header.id} style={{width: header.getSize()}} className="border border-black bg-white p-3">
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())
                      }
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="bg-slate-400 pt-10 ">
            {table.getRowModel().rows.map(row => (
              <tr key={row.id}>
                {row.getVisibleCells().map(cell => (
                  <td className="text-center h-20 border border-black" key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
            {hasNextPage && <tr ref={ref}/>}
          </tbody>
        </table>
      </div>
      <button onClick={handleNewGenerate}>새로 불러오기</button>
    </div>
  )
}

export default BooksTable