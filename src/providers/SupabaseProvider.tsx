import { useState } from "react";
import React from 'react';
import { createClient } from '@supabase/supabase-js';
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { Database } from "../database.types";

interface SupabaseProviderProps {
  children: React.ReactNode;
}

const SupabaseProvider: React.FC<SupabaseProviderProps> = ({ children }) => {
  const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
  const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Supabase URL and anonymous key are required');
  }

  const supabaseClient = createClient(supabaseUrl, supabaseAnonKey);
  
  // eslint-disable-next-line
  const [auth] = useState(() => createClient<Database>(supabaseUrl, supabaseAnonKey));

  return (
    <SessionContextProvider supabaseClient={supabaseClient}>
      {children}
    </SessionContextProvider>
  );
};

export default SupabaseProvider;
