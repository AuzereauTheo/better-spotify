import { Song } from "@/types"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"


const getSongsByUserId = async ():Promise<Song[]> => {
    const supabase = createServerComponentClient({
        cookies: cookies,
    })

    const { 
        data: sessionData,
    } = await supabase.auth.getSession();

    console.log("s", sessionData.session)

    if (sessionData.session === null) return []

    const{ data, error} = await supabase   
        .from('songs')
        .select('*')
        .eq('user_id', sessionData.session?.user.id)
        .order('created_at', {ascending: false});
    
    if (error) console.log("error when supabase from songs * where user_id = sesion.user.id", error.message)

    return (data as any) || []
}

export default getSongsByUserId;