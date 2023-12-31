import useSupabase from "./useCreateSupabase";

async function useGetSupabase(){
    const supabase = useSupabase();
    const {data: table, error} = await supabase.from('/table').select('*');

    if(error){
        console.log('error 발생 :>> ', error);
        return null;
    }
    return table;
}

export default useGetSupabase;