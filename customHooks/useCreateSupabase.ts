'use client'
import {createClient} from '@supabase/supabase-js'

function useSupabase(){
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_SERVICE_KEY;
    if(supabaseUrl && supabaseKey){
        console.log('생성됨');
        return createClient(supabaseUrl, supabaseKey);
    }
    return null;
}

export default useSupabase;