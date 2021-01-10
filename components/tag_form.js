import { useState } from 'react'
import { useRouter } from 'next/router'

export default function TagForm({ tag }) {
    const router = useRouter()
    let method, url
    tag ? (method = 'PUT', url = `/api/a/tag/${tag.slug}`) : (method = 'POST', url = '/api/a/tag/new')
    const [isLoading, setIsLoading] = useState(false)
    const [tagState, setTagState] = useState(!!tag ? tag : {
        name: '',
        slug: '',
        isPublished: true
    })
    async function submit() {
        const data = (({ name, slug, isPublished }) => ({ name, slug, isPublished }))(tagState)
        const response = await window.fetch(url, {
            method: method,
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        })
        if (response.status === 200) {
            router.push('/admin/tags')
        }
    }
    return (
        <div className="w-full h-full">
            <form>
                <div className="shadow overflow-hidden sm:rounded-md">
                    <div className="px-4 py-5 bg-white sm:p-6">
                        <div className="grid grid-cols-6 gap-6">
                            <div className="col-span-6 sm:col-span-3">
                                <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">Tag name</label>
                                <input
                                    value={tagState.name}
                                    onChange={(e) => setTagState({ ...tagState, name: e.target.value })}
                                    type='text' placeholder="Enter your input here" className="w-full mt-2 mb-6 px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-green-500" />
                            </div>
                            <div className="col-span-6 sm:col-span-3">
                                <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">Slug</label>
                                <input
                                    value={tagState.slug}
                                    onChange={(e) => setTagState({ ...tagState, slug: e.target.value })}
                                    type='text' placeholder="Enter your input here" className="w-full mt-2 mb-6 px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-green-500" />
                            </div>
                        </div>
                        <div className="flex items-center">
                            <input
                                checked={tagState.isPublished || false}
                                onChange={(e) => setTagState({ ...tagState, isPublished: e.target.checked })}
                                type="checkbox" id="checkbox-large-example" className="h-6 w-6 text-gray-700 border rounded mr-2" />
                            <label htmlFor="checkbox-large-example">Is Published?</label>

                        </div>
                        <div className="flex items-center justify-center">
                            <button
                                disabled={isLoading}
                                onClick={submit}
                                type="button" className="bg-blue-600 text-gray-200 text-lg rounded hover:bg-blue-500 px-6 py-3 focus:outline-none">Save tag</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}