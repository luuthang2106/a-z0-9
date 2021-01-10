import { useState, useRef } from 'react'
import { useRouter } from 'next/router'
import slugify from 'slugify'
import SunEditor, { buttonList } from 'suneditor-react'
import 'suneditor/dist/css/suneditor.min.css' // Import Sun Editor's CSS File


export default function PostForm({ post, tags }) {
    const editorRef = useRef()
    const router = useRouter()
    let method, url
    post ? (method = 'PUT', url = `/api/a/post/${post.slug}`) : (method = 'POST', url = '/api/a/post/new')
    const [isLoading, setIsLoading] = useState(false)
    const [postState, setPostState] = useState(!!post ? post : {
        title: '',
        slug: '',
        description: '',
        body: '',
        viewCount: 0,
        isPublished: true,
        tag: ''
    })
    const options = {
        height: '900',
        buttonList: buttonList.complex,

    }
    const listOptionTag = tags ? tags.map((tag, index) => {
        return <option className="py-1" key={index} value={tag._id}>{tag.name}</option>
    }) : ''
    async function submit() {
        const { current: { editor } } = editorRef
        const newPostState = {
            ...postState,
            body: editor.getContents()
        }
        console.log(newPostState)
        const data = (({ title, slug, description, body, viewCount, isPublished, tag }) => ({ title, slug, description, body, viewCount, isPublished, tag }))(newPostState)
        const response = await window.fetch(url, {
            method: method,
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        })
        if (response.status === 200) {
            router.push('/admin/posts')
        }
    }
    return <div className="w-full h-full">
        <form>
            <div className="shadow overflow-hidden sm:rounded-md">
                <div className="px-4 py-5 bg-white sm:p-6">
                    <div className="grid grid-cols-12">
                        <div className="col-span-12">
                            <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">Title</label>
                            <input
                                value={postState.title}
                                onChange={(e) =>
                                    setPostState({
                                        ...postState,
                                        title: e.target.value,
                                        slug: slugify(`${e.target.value} ${Date.now()}`)
                                    })
                                }
                                type='text' placeholder="Enter your input here" className="w-full mt-2 mb-6 px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-green-500" />
                        </div>
                        <div className="col-span-6 mt-2 mb-6">
                            <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">Tag</label>
                            <select
                                value={postState.tag}
                                onChange={(e) => {
                                    setPostState({ ...postState, tag: e.target.value })
                                }}
                                className="w-full border bg-white rounded px-3 py-2 outline-none">
                                <option className="py-1" key="null">--choose tag--</option>
                                {listOptionTag}
                            </select>
                        </div>
                        <div className="col-span-12">
                            <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">Slug</label>
                            <input
                                value={postState.slug}
                                disabled={true}
                                type='text' placeholder="Slug will be generated automatically" className="w-full mt-2 mb-6 px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-green-500" />
                        </div>
                        <div className="col-span-12">
                            <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">Description</label>
                            <textarea
                                value={postState.description}
                                onChange={(e) => setPostState({ ...postState, description: e.target.value })}
                                type='text' placeholder="Enter your input here" className="w-full mt-2 mb-6 px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-green-500" />
                        </div>
                        <div className="col-span-12 flex items-center mt-2 mb-6">
                            <input
                                checked={postState.isPublished || false}
                                onChange={(e) => setPostState({ ...postState, isPublished: e.target.checked })}
                                type="checkbox" id="checkbox-large-example" className="h-6 w-6 text-gray-700 border rounded mr-2" />
                            <label htmlFor="checkbox-large-example">Is Published?</label>
                        </div>
                        <div className="col-span-12 ">
                            <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">Body</label>
                            <SunEditor setOptions={options} ref={editorRef} setContents={post ? post.body : ''}/>
                        </div>
                    </div>

                    <div className="flex items-center justify-center mt-3">
                        <button
                            disabled={isLoading}
                            onClick={submit}
                            type="button" className="bg-blue-600 text-gray-200 text-lg rounded hover:bg-blue-500 px-6 py-3 focus:outline-none">Save tag</button>
                    </div>
                </div>
            </div>
        </form>
    </div>
}