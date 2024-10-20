'use client'

import uniqid from "uniqid";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import toast from "react-hot-toast";

import Input from "./Input";
import Modal from "./Modal";
import Button from "./Button";

import useUploadModal from "@/hooks/useUploadModal";
import { useUser } from "@/hooks/useUser";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";

const UplaodModal = ( ) => {
    const [isLoading, setIsLoading] = useState(false)
    const uploadModal = useUploadModal();
    const { user }= useUser();
    const supaseClient = useSupabaseClient();
    const router = useRouter();

    const {register, handleSubmit, reset} = useForm<FieldValues>({
        defaultValues: {
            author: '',
            title: '',
            song: null,
            image: null,
        }
    });

    const onChange = (open: boolean) => {
        if(!open) {
            reset();
            uploadModal.onClose();
        }
    }

    const onSubmit:SubmitHandler<FieldValues>  = async (values) => {
        try {
            setIsLoading(true);
            const imageFile = values.image?.[0]
            const songFile = values.song?.[0]
             
            if (!imageFile || !songFile || !user) {
                toast.error('Missing Fields');
                return;
            }

            const uniqueID = uniqid();

            //upload song
            const {
                data: songData,
                error: songError,
            } = await supaseClient.storage
                .from('songs')
                .upload(`song-${values.title}-${uniqueID}`, songFile, {
                    cacheControl: '3600', upsert: false
                });
            
            if (songError) {
                setIsLoading(false);
                return toast.error('Failed to upload the song')
            }

            //upload image
            const {
                data: imageData,
                error: imageError,
            } = await supaseClient.storage
                .from('images')
                .upload(`image-${values.title}-${uniqueID}`, imageFile, {
                    cacheControl: '3600', upsert: false
                });

            if (imageError) {
                setIsLoading(false);
                return toast.error('Failed to upload the image')
            }

            const {
                error: supabaseError
            } = await supaseClient
                .from('songs')
                .insert({
                    user_id: user.id,
                    title: values.title,
                    author: values.author,
                    image_path: imageData.path,
                    song_path: songData.path
                });

                if(supabaseError) {
                    setIsLoading(false)
                    return toast.error(supabaseError.message)
                }

                router.refresh();
                setIsLoading(false)
                toast.success('Song created & Added')
                reset();
                uploadModal.onClose();

        } catch (error){
            toast.error('Something went wrong during upload');
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Modal
            title='Add a song'
            description='Upload an mp3 file'
            isOpen={uploadModal.isOpen}
            onChange={onChange}
        >
            <form 
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-y-4"
            >
                <Input 
                    id='title'
                    disabled={isLoading}
                    {...register('title', {required: true})}
                    placeholder='Song title'
                />
                <Input 
                    id='author'
                    disabled={isLoading}
                    {...register('author', {required: true})}
                    placeholder='Song author'
                />
                <div>
                    <div className="pb-1">
                        Select song
                    </div>
                    <Input 
                        id='song'
                        type="file"
                        disabled={isLoading}
                        accept=".mp3"
                        {...register('song', {required: true})}
                        className="hover:bg-neutral-600 hover:cursor-pointer"
                    />
                </div>
                <div>
                    <div className="pb-1">
                        Select an icon
                    </div>
                    <Input 
                        id='image'
                        type="file"
                        disabled={isLoading}
                        accept="image/*"
                        {...register('image', {required: true})}
                        className="hover:bg-neutral-600 hover:cursor-pointer"
                    />
                </div>
                <Button
                    disabled={isLoading}
                    type='submit'
                >
                    Create
                </Button>
            </form>
        </Modal>
    );
};

export default UplaodModal;