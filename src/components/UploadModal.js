import { useForm } from 'react-hook-form';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import uniqid from 'uniqid'
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useNavigate } from 'react-router-dom';

import useUploadModal from '../hooks/useUploadModal.tsx';
import Modal from './Modal';
import Input from './Input.js';
import { useUser } from '../hooks/useUser.tsx'

const UploadModal = () => {
  const { onClose, isOpen } = useUploadModal();
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useUser();
  const supabaseClient = useSupabaseClient();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: {
      author: '',
      title: '',
      song: null,
      image: null,
    },
  });

  const onChange = (event) => {
    if (event.type === 'click') {
      reset();
      onClose();
    }
  };


  const onSubmit = async (values) => {
    try {
      setIsLoading(true);

      const imagesFile = values.image?.[0];
      const songFile = values.song?.[0];

      if (!imagesFile || !songFile || !user) {
        toast.error('Missing fields');
        return;
      }

      const uniqueID = uniqid();


      // Upload Song
      const {
        data: songData,
        error: songError,
      } = await supabaseClient.storage.from('songs').upload(`songs-${values.title}-${uniqueID}`, songFile, {
        cacheControl: '3600',
        upsert: false
      })

      if (songError) {
        setIsLoading(false);
        return toast.error('Failed song Upload.')
      }

      //Upload Image
      const {
        data: imageData,
        error: imageError,
      } = await supabaseClient.storage.from('images').upload(`image-${values.title}-${uniqueID}`, imagesFile, {
        cacheControl: '3600',
        upsert: false
      })

      if(imageError){
        setIsLoading(false);
        return toast.error('Failed image upload');
      }

      const {
        error: supabaseError
      } = await supabaseClient.from('songs').insert({
        user_id:user.id,
        title: values.title,
        author: values.author,
        image_path:imageData.path,
        song_path:songData.path
      });

      if(supabaseError){
        setIsLoading(false)
        return toast.error(supabaseError.message);
      }
      navigate('/library' , { replace: true });
      setIsLoading(false);
      toast.success("Song Created!");
      reset();
      onClose();
      // setTimeout(() => {
      //   window.location.reload();
      // }, 2000)


    } catch (error) {
      toast.error("Something went wrong");
    }
    finally {
      setIsLoading(false);
    }
  };


  return (
    <Modal
      title='Add a Song'
      description='Upload an mp3 file'
      isOpen={isOpen}
      onChange={onChange}
    >
      <form onSubmit={handleSubmit(onSubmit)} className=''>
        <Input
          id='title'
          disabled={isLoading}
          {...register('title', { required: true })}
          placeholder='Song title'
        />
        <Input
          id='author'
          disabled={isLoading}
          {...register('author', { required: true })}
          placeholder='Song author'
        />
        <div>
          <div className=' my-1 mx-2'>
            select a song file
          </div>
          <Input
            id='song'
            type='file'
            disabled={isLoading}
            accept='.mp3'
            {...register('song', { required: true })}
          />
        </div>
        <div>
          <div className=' my-1 mx-2'>
            select an image
          </div>
          <Input
            id='image'
            type='file'
            disabled={isLoading}
            accept='image/*'
            {...register('image', { required: true })}
          />
        </div>
        <div className='text-center'>
          <button disabled={isLoading} type="submit" className="btn" style={{ width: '200px',backgroundColor: '#DC1354' ,borderRadius: '50px', marginTop: '4px', border:'none' }}>Create</button>
        </div>
      </form>
    </Modal>
  );
};

export default UploadModal;
