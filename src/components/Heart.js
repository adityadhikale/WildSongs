import React, { useEffect, useState } from 'react';
import { useSessionContext } from '@supabase/auth-helpers-react';
import useAuthModal from '../hooks/useAuthModal.tsx'
import { useUser } from '../hooks/useUser.tsx';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import toast from 'react-hot-toast';

const Heart = ({ songId , userId}) => {
  const { supabaseClient } = useSessionContext();
  const authModal = useAuthModal();
  const user = useUser();
  const [isLiked, setIsLiked] = useState(false);



  useEffect(() => {
    if (!userId) {
      return;
    }

    const fetchData = async () => {
      const { data, error } = await supabaseClient.from('liked_songs').select('*').eq('user_id', userId).eq('song_id', songId).single();

      if (!error && data) {
        setIsLiked(true);
      }
    };

    fetchData()

  }, [songId, supabaseClient, userId]);

  const Icon = isLiked ? AiFillHeart : AiOutlineHeart


  const handleLike = async () => {
    if (!user ) {
      return authModal.onOpen();
    }

    if(isLiked){
      const {error} = await supabaseClient.from('liked_songs').delete().eq('user_id',userId).eq('song_id',songId);

      if(error){
        toast.error(error.message);
      }
      else{
        setIsLiked(false);
      }
    }
    else{
      const {error} = await supabaseClient.from('liked_songs').insert({song_id:songId,user_id:userId});

      if(error){
        toast.error(error.message);
      }
      else{
        setIsLiked(true);
        toast.success('Liked!');
      }
    }
  }

  return (
    <div className='large-font text-center top-5' >
        <Icon color={isLiked ? '#DC1354' : 'gray'} size={30} onClick={handleLike} />
    </div>
  );
};

export default Heart;
