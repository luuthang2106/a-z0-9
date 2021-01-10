import TagForm from "../../../components/tag_form"
import LayoutAdmin from "../../../components/layout_admin"
import Tag from "../../../mongodb/tag_model"

export async function getServerSideProps(context) {
    try {
        const { slug } = context.query
        const tag = await Tag.findOne({ slug: slug }).exec()
        return {
            props: {
                tag: JSON.parse(JSON.stringify(tag))
            }, // will be passed to the page component as props
        }
    } catch (error) {
        return {
            props: {}
        }
    }
}
export default function TagEdit({ tag }) {
    return <TagForm tag={tag} />
}
TagEdit.Layout = LayoutAdmin