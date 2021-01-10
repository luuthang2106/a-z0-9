import Post from "../../../../mongodb/post_model"
import Tag from "../../../../mongodb/tag_model"


export default async function handler(req, res) {
  const { method } = req
  switch (method) {
    case 'POST':
      // const { headers: { Authorization } } = req
      // Authorization ? console.log('c') : console.log('a')
      try {
        const post = new Post(req.body)
        await post.save()
        await Tag.findByIdAndUpdate(req.body.tag, {"$push": {"posts": entity._id}})
        res.status(200).json({success: true})
      } catch (error) {
        console.error(`Error occured: ${error}`)
        res.status(400).json({ error: error })
      }
      break;
    default:
      res.status(400).json({ success: false })
      break;
  }
}