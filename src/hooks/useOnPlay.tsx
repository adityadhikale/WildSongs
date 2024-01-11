import {Song } from '../types.ts'
import usePlayer from './usePlayer.tsx'
import useAuthModal from './useAuthModal.tsx'
import {useUser} from './useUser.tsx'

const useOnPlay = (songs: Song []) => {
    const player = usePlayer();
    const authModal = useAuthModal();
    const {user} = useUser();

    const onPlay = (id: string) =>{
        if(!user){
            return authModal.onOpen();
        }

        player.setId(id);
        player.setIds(songs.map((song) => song.id.toString()));
    };

    return onPlay;
}

export default useOnPlay;