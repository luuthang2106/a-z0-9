import PostForm from "../../../components/post_form"
import LayoutAdmin from "../../../components/layout_admin"
import Tag from "../../../mongodb/tag_model"


export async function getServerSideProps(context) {
    try {
        const tags = await Tag.find({ isPublished: true }).exec()
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
export default function PostNew({tags}) {
    return <PostForm tags={tags} />
}
PostNew.Layout = LayoutAdmin