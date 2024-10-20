'use client'

import { useEffect, useState } from "react";

import AuthModal from "@/components/AuthModal";
import UplaodModal from "@/components/UploadModal";


const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() =>{
        setIsMounted(true)
    }, []);

    if (!isMounted) return null;

    return (
        <>
            <AuthModal />
            <UplaodModal />
        </>
    );
} 

export default ModalProvider;