import { useEffect, useState } from 'react'
import Loading from './loading'
export default function WithAuthed({children}) {
    const [isAuthed, setIsAuthed] = useState(false)
    useEffect(() => {
        setTimeout(() => {
            setIsAuthed(true)
        }, 2000);
    })
    // useEffect
    return isAuthed ? children : <div className="h-screen w-screen"><Loading/></div>
}