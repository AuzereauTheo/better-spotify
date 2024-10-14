'use client'

import { useRouter } from "next/navigation";
import { BiSearch } from "react-icons/bi";
import { HiHome } from "react-icons/hi";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { twMerge } from "tailwind-merge";

import Button from "./Button";

interface HeaderProps {
    children: React.ReactNode,
    className?: string,
}

const Header: React.FC<HeaderProps> = ({
    children, 
    className,
}) => {
    const router = useRouter();
    const handleLogout = () => {
        //handle logout
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
                    <>
                        <div>
                            <Button 
                                className="bg-transparent text-neutral-300 font-medium"
                                onClick={() => {}}
                            >
                                Sign Up
                            </Button>
                        </div>
                        <div>
                            <Button 
                                className="bg-white px-6 py-2"
                                onClick={() => {}}
                            >
                                Log In
                            </Button>
                        </div>
                    </>
                </div>
            </div>
            {children}
        </div>
    )
}

export default Header;