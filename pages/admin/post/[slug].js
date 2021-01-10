import PostForm from "../../../components/post_form"
import LayoutAdmin from "../../../components/layout_admin"
import Post from "../../../mongodb/post_model"
import Tag from "../../../mongodb/tag_model"

export async function getServerSideProps(context) {
    try {
        const { slug } = context.query
        const post = await Post.findOne({ slug: slug })
        const tags = await Tag.find({ isPublished: true })
        console.log(post, tags)
        return {
            props: {
                post: JSON.parse(JSON.stringify(post)),
                tags: JSON.parse(JSON.stringify(tags))
            }, // will be passed to the page component as props
        }
    } catch (error) {
        return {
            props: {}
        }
    }
}
export default function PostEdit({ post, tags }) {
    return <PostForm tags={tags} post={post} />
}
PostEdit.Layout = LayoutAdmin