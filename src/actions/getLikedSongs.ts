import { createClient } from '@supabase/supabase-js';

import { Song } from '../types.ts';

const getLikedSongs = async (): Promise<Song[]> => {

  const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
  const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

  try {

    const supabase = createClient(supabaseUrl, supabaseAnonKey)


    const {
      data:{
      session
    }} = await supabase.auth.getSession();

    const { data, error } = await supabase.from('liked_songs').select('*, songs(*)').eq('user_id',session?.user?.id).order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching songs:', error.message);
      return [];
    }

    if(!data){
      return [];
    }

    return data.map((item) =>({
      ...item.songs
    }))

  } catch (error) {
    console.error('Unexpected error while fetching songs:', error.message);
    throw error;
  }
};

export default getLikedSongs;
