import {createClient} from '@supabase/supabase-js'

function useSupabase(){
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_SERVICE_KEY;
    const client = createClient(supabaseUrl, supabaseKey);
    const supabase = () => client;
    return supabase();
}

export default useSupabase;