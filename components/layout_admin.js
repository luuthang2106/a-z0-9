import WithAuthed from "./with_authed";
import Link from 'next/link'
import { useRouter } from 'next/router'
export default function LayoutAdmin({ children }) {
    const router = useRouter()
    // if (router.pathname === href) {
    //     console.log(href, router.pathname)
    //   }
    const activeLink = 'flex items-center px-4 py-2 my-3 rounded hover:bg-gray-900 hover:text-gray-400 bg-gray-900 text-gray-400'
    const inactiveLink = 'flex items-center px-4 py-2 my-3 rounded hover:bg-gray-900 hover:text-gray-400'
    return (
        <WithAuthed>
            <div className="h-screen">
                <div className="flex flex-1 h-full">

                    <div className="bg-gray-800 p-6 w-64">
                        <ul>
                            <li>
                                <Link href="/admin/tags">
                                    {/* bg-gray-900 text-gray-400 */}
                                    <a className={router.pathname == "/admin/tags" ? activeLink : inactiveLink}>
                                        <svg className="h-4" viewBox="0 0 24 24">
                                            <path
                                                fill="currentColor"
                                                d="M19,20H5V4H7V7H17V4H19M12,2A1,1 0 0,1 13,3A1,1 0 0,1 12,4A1,1 0 0,1 11,3A1,1 0 0,1 12,2M19,2H14.82C14.4,0.84 13.3,0 12,0C10.7,0 9.6,0.84 9.18,2H5A2,2 0 0,0 3,4V20A2,2 0 0,0 5,22H19A2,2 0 0,0 21,20V4A2,2 0 0,0 19,2Z"
                                            />
                                        </svg>
                                        <span className="ml-2">Tag</span>
                                    </a>
                                </Link>
                            </li>
                            <li>
                                <Link href="/admin/posts">
                                    <a className={router.pathname == "/admin/posts" ? activeLink : inactiveLink}>
                                        <svg className="h-4" viewBox="0 0 24 24">
                                            <path
                                                fill="currentColor"
                                                d="M16,15H9V13H16V15M19,11H9V9H19V11M19,7H9V5H19V7M3,5V21H19V23H3A2,2 0 0,1 1,21V5H3M21,1A2,2 0 0,1 23,3V17C23,18.11 22.11,19 21,19H7A2,2 0 0,1 5,17V3C5,1.89 5.89,1 7,1H21M7,3V17H21V3H7Z"
                                            />
                                        </svg>
                                        <span className="ml-2">Post</span>
                                    </a>
                                </Link>
                            </li>

                        </ul>
                    </div>
                    <div className="flex-1 overflow-y-scroll overflow-x-hidden">
                        <div className="p-8">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </WithAuthed>
    )
}