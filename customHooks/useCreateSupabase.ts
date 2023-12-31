import {createClient} from '@supabase/supabase-js'

function useSupabase(){
    const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
    const supabaseKey = process.env.REACT_APP_SUPABASE_SERVICE_KEY;
    if(supabaseUrl && supabaseKey){
        return createClient(supabaseUrl, supabaseKey);
    }
    return null;
}

export default useSupabase;