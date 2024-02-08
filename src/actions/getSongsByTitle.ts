import { createClient } from '@supabase/supabase-js';

import { Song } from '../types.ts';
import getSongs from './getSongs.ts'

const getSongsByTitle = async (title: string): Promise<Song[]> => {

  const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
  const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;


  try {

    if(!title){
      const allSongs  = await getSongs();
      return allSongs
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey)


    const { data, error } = await supabase.from('songs').select('*').ilike('title',`%${title}%`).order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching songs:', error.message);
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error('Unexpected error while fetching songs:', error.message);
    throw error;
  }
};

export default getSongsByTitle;
