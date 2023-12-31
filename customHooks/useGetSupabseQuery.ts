import useSupabase from "./useCreateSupabase";
import {useSuspenseQuery} from '@tanstack/react-query'

const QUERY_BOOKS_KEY = 'BOOKS';

const fetcher = async () => {
    const supabase = useSupabase();
    const {data: table, error} = await supabase.from('/table').select('*');

    if(error){
        console.log('error 발생 :>> ', error);
        return null;
    }
    console.log('data :>> ', table);
    return table;
}

const useGetSupabaseQuery = () => {
    return useSuspenseQuery({
        queryKey: [QUERY_BOOKS_KEY],
        queryFn: fetcher,
    })
}

export default useGetSupabaseQuery;