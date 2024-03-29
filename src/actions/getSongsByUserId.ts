import { createClient } from '@supabase/supabase-js';

import { Song } from '../types.ts';

const getSongsByUserId = async (): Promise<Song[]> => {

    const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
    const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

  const supabase = createClient(supabaseUrl, supabaseAnonKey)

const {
    data : sessionData,
    error: sessionError
} = await supabase.auth.getSession();

if(sessionError){
    console.log(sessionError.message);
    return [];
}

const {data,error} = await  supabase.from('songs').select('*').eq('user_id', sessionData.session?.user.id).order('created_at', {ascending:false});

if(error){
    console.log(error.message);
}

return (data as any) || [];

};

export default getSongsByUserId;
