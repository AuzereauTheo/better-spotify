'use client';
//component
import useAuthModal from "@/hooks/useAuthModal";
import useUploadModal from "@/hooks/useUploadModal";
import { useUser } from "@/hooks/useUser";
import { Song } from "@/types";
//LIB
import { AiOutlinePlus } from "react-icons/ai";
import { FaKey } from "react-icons/fa";
import { TbPlaylist } from "react-icons/tb";
import Button from "./Button";

interface LibraryProps {
    songs: Song[];
}

const Library: React.FC<LibraryProps>= ({
    songs
}) => {
    const authModal = useAuthModal();
    const uploadModal = useUploadModal();
    const { user } = useUser();
    
    const onClick = () => {
        //check subcription
        return uploadModal.onOpen();
    }

    return (
        <div className="flex flex-col">
            <div className="flex items-center justify-between px-5 py-4">
                <div className="inline-flex items-center gap-x-2">
                    <TbPlaylist 
                        size={26} 
                        className="text-neutral-400"
                    />
                    <p className="text-neutral-400 font-medium text-md">Your library</p>
                </div>
                {user && 
                    <AiOutlinePlus 
                        onClick={onClick} 
                        size={20} 
                        className="text-neutral-300 cursor-pointer hover:text-white transition"
                    />
                }
                
            </div>
            <div className="flex flex-col gap-y-2 mt-4 px-3">
                {songs.map((item, key) => (
                    <div key={key}>{item.title}{key}</div>
                ))}
                {
                    !user && <div className="flex justify-center">
                        <Button 
                            className="bg-green-500 px-6 py-2 w-[50%] text-white"
                            onClick={authModal.onOpen}
                        >
                            Log In
                        </Button>
                    </div>
                }
            </div>
        </div>
    )
}
export default Library;