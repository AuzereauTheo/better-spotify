'use client'
//LIB
import { useRouter } from "next/navigation";
import { BiSearch } from "react-icons/bi";
import { HiHome } from "react-icons/hi";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { twMerge } from "tailwind-merge";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { FaUserAlt } from "react-icons/fa";
//Components
import Button from "./Button";
import useAuthModal from "@/hooks/useAuthModal";
import { useUser } from "@/hooks/useUser";
import toast from "react-hot-toast";


interface HeaderProps {
    children: React.ReactNode,
    className?: string,
}

const Header: React.FC<HeaderProps> = ({
    children, 
    className,
}) => {
    const authModal = useAuthModal();
    const router = useRouter();

    const supabaseClient = useSupabaseClient();
    const { user } = useUser();

    const handleLogout =  async () => {
        const { error } = await supabaseClient.auth.signOut();
        //reset playing song
        router.refresh();
        
        if (error) {
            toast.error(error.message);
        } else {
            toast.success("You are now logged out!");
        }
    }
    return (
        <div className={twMerge(`h-fit bg-gradient-to-b from-emerald-800 p-6`, className)}>
            <div className="w-full mb-4 flex items-center justify-between">
                {/* desktop */}
                <div className="hidden md:flex gap-x-2 items-center">
                    <button className="rounded-full bg-black flex items-center justify-center hover:opacity-65 transition">
                        <RxCaretLeft 
                            size={35}
                            className="text-white"
                            onClick={() => {router.back()}}
                        />
                    </button>
                    <button className="rounded-full bg-black flex items-center justify-center hover:opacity-65 transition">
                        <RxCaretRight
                            size={35}
                            className="text-white"
                            onClick={() => {router.forward()}}
                        />
                    </button>
                </div>
                {/* desktop END*/}

                {/* mobile */}
                <div className="flex md:hidden gap-x-2 items-center">
                    <button className="rounded-full p-2 bg-white flex items-center justify-center hover:opacity-60 transition">
                        <HiHome 
                            size={20}
                            className="text-black "
                        />
                    </button>
                    <button className="rounded-full p-2 bg-white flex items-center justify-center hover:opacity-60 transition">
                        <BiSearch 
                            size={20}
                            className="text-black "
                        />
                    </button>
                </div>
                {/* mobile END*/}

                <div className="flex justify-between items-center gap-x-4">
                    {user ? (
                        <div className="flex gap-x-4 items-center">
                            <Button onClick={handleLogout} className="bg-white px-6 py-2">
                                Logout
                            </Button>
                            <Button onClick={() => router.push('/account')} className="bg-white">
                                <FaUserAlt />
                            </Button>
                        </div>
                    ): (
                        <>
                            <div>
                                <Button 
                                    className="bg-transparent text-neutral-300 font-medium"
                                    onClick={authModal.onOpen}
                                >
                                    Sign Up
                                </Button>
                            </div>
                            <div>
                                <Button 
                                    className="bg-white px-6 py-2"
                                    onClick={authModal.onOpen}
                                >
                                    Log In
                                </Button>
                            </div>
                        </>
                    )}
                </div>
            </div>
            {children}
        </div>
    )
}

export default Header;