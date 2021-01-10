import Tag from "../../../../mongodb/tag_model"

export default async function handler(req, res) {
    const { method } = req
    const {
        query: { slug },
    } = req
    switch (method) {
        case 'PUT':
            try {
                const rs = await Tag.findOneAndUpdate({ slug: slug }, req.body)
                if ('slug' in rs) {
                    res.status(200).json({ success: true })
                } else {
                    res.status(400).json({ success: false })
                }
            } catch (error) {
                res.status(400).json({ error: error })
            }
            break
        case 'DELETE':
            try {
                const rs = await Tag.findOneAndDelete({ slug: slug }).exec()
                if ('slug' in rs) {
                    res.status(200).json({ success: true })
                } else {
                    res.status(400).json({ success: false })
                }
            } catch (error) {
                res.status(400).json({ error: error })
            }
            break
        default:
            res.status(400).json({ success: false })
            break
    }
}