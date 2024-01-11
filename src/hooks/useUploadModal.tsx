import { create } from "zustand";


interface useUploadModaleStore{
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
};

const useUploadModal = create<useUploadModaleStore>((set) =>({
    isOpen: false,
    onOpen: ()=> set({isOpen: true}),
    onClose : () => set({isOpen: false}),
}));

export default useUploadModal;