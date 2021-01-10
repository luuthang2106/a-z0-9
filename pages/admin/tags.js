import LayoutAdmin from "../../components/layout_admin"
import Link from 'next/link'
import Tag from "../../mongodb/tag_model"
import { useRouter } from 'next/router'

export async function getServerSideProps(context) {
    try {
        const tags = await Tag.find();
        return {
            props: {
                tags: JSON.parse(JSON.stringify(tags))
            }, // will be passed to the page component as props
        }
    } catch (error) {
        return {
            props: {}
        }
    }
}

export default function Tags({ tags }) {
    const router = useRouter()
    let tagRows;
    console.log(tags)
    if (tags.length > 0) {
        tagRows = tags.map((tag, index) => (
            <tr className="w-full font-light text-gray-700 bg-gray-100 whitespace-no-wrap border border-b-0" key={index}>
                <td className="px-4 py-4">{index + 1}</td>
                <td className="px-4 py-4">{tag.name}</td>
                <td className="px-4 py-4">{tag.slug}</td>
                <td className="px-4 py-4">
                    {
                        tag.isPublished ? <span className="text-sm bg-green-500 text-white rounded-full px-2 py-1">Active</span> : <span className="text-sm bg-red-500 text-white rounded-full px-2 py-1">Inactive</span>
                    }
                </td>
                <td className="px-4 py-4">
                    <Link href={`/admin/tag/${tag.slug}`}>
                        <a className="inline-block">
                            <svg className="h-9" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </a>
                    </Link>
                    <a className="inline-block cursor-pointer" onClick={() => deleteTag(tag.slug)}>
                        <svg className="h-9" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="red">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </a>
                </td>
            </tr>
        ))
    } else {
        // return 'Không có dữ liệu'
    }
    async function deleteTag(slug) {
        const response = await window.fetch(`/api/a/tag/${slug}`, { method: 'DELETE' })
        router.replace('/admin/tags')
    }
    return (
        <div className="bg-white rounded-lg shadow-lg py-6 w-full h-full">
            <div className="py-3 mx-6">
                <Link href="/admin/tag/new">
                    <button type="button" className="bg-blue-600 text-gray-200 text-lg rounded hover:bg-blue-500 px-6 py-3 focus:outline-none">Add New Tag</button>
                </Link>
            </div>
            <div className="block overflow-x-auto mx-6">
                <table className="w-full text-left rounded-lg">
                    <thead>
                        <tr className="text-gray-800 border border-b-0">
                            <th className="px-4 py-3">#</th>
                            <th className="px-4 py-3">Name</th>
                            <th className="px-4 py-3">Slug</th>
                            <th className="px-4 py-3">Published</th>
                            <th className="px-4 py-3">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tagRows}
                    </tbody>
                </table>
            </div>
        </div>
    )
    //  <div>
    //     <Link href="/admin/tag/new">
    //         <button type="button" className="bg-blue-600 text-gray-200 text-lg rounded hover:bg-blue-500 px-6 py-3 focus:outline-none">Primary</button>
    //     </Link>

    // </div>
}
Tags.Layout = LayoutAdmin