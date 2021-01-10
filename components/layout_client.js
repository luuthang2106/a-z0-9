import Link from "next/link";

export default function LayoutClient({ children }) {
    return (
        <div className="h-screen w-full flex justify-center">
            <div className="w-4/5 flex">
                <div className="w-1/4 px-8 bg-gray-400 flex flex-col justify-center">
                    <ul>
                        <li className="cursor-pointer text-center py-2 rounded hover:bg-gray-900 hover:text-gray-400">
                            <Link href="/">
                            Home
                            </Link>
                        </li>
                        <li className="cursor-pointer text-center py-2 rounded hover:bg-gray-900 hover:text-gray-400">
                        <Link href="/angular">
                            Angular
                            </Link>
                        </li>
                        <li className="cursor-pointer text-center py-2 rounded hover:bg-gray-900 hover:text-gray-400">
                        <Link href="/reactjs">
                            ReactJS
                            </Link>
                        </li>
                        <li className="cursor-pointer text-center py-2 rounded hover:bg-gray-900 hover:text-gray-400">
                        <Link href="/flutter">
                            Flutter
                            </Link>
                        </li>
                        <li className="cursor-pointer text-center py-2 rounded hover:bg-gray-900 hover:text-gray-400">
                        <Link href="/about">
                            About
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="w-3/4  bg-red-200">{children}</div>
            </div>
        </div>
    )
}