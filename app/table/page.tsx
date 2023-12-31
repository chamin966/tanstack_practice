import useGetSupabase from "@/customHooks/useGetSupabse";

interface IBook  {
  serialNumber: string,
  title: string,
  author: string,
  createdAt: string,
  publisher: string,
}

async function Table() {
  const books: IBook[] = await useGetSupabase();
  
  return <div>테이블 연습입니다.</div>;
}

export default Table;
