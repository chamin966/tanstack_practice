import useSupabase from "./useCreateSupabase";
import {useInfiniteQuery, useQuery, useSuspenseQuery} from '@tanstack/react-query'

export interface IBook {
    serialNumber: string,
    title: string,
    author: string,
    createdAt: string,
    publisher: string,
}

const QUERY_BOOKS_INFINITE_KEY = 'INFINITY_BOOKS';

const fetcher = async (start: any, fetchSize: number) => {
    console.log('start부터 시작:>> ', start);
    const supabase = useSupabase();
    const {data, error} = await supabase.from('/table').select('*').range(start, start + fetchSize);

    if(error){
        console.log('error 발생 :>> ', error);
        return [];
    }
    return data;
}

const useGetInfiniteSupabaseQuery = () => {
    const fetchSize = 8;
    return useInfiniteQuery({
        queryKey: [QUERY_BOOKS_INFINITE_KEY],
        queryFn: ({pageParam}) => fetcher(pageParam, fetchSize),
        initialPageParam: 0,
        getNextPageParam: (lastPages, allPages) => lastPages.length !== 0 ?  allPages.length * fetchSize : undefined,
    })
}

export default useGetInfiniteSupabaseQuery;