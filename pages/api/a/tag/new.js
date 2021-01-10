import Tag from "../../../../mongodb/tag_model"

export default async function handler(req, res) {
  const { method } = req
  console.log(req.body)
  switch (method) {
    case 'POST':
      // const { headers: { Authorization } } = req
      // Authorization ? console.log('c') : console.log('a')
      try {
        const tag = new Tag(req.body)
        await tag.save()
        // console.log(entity)
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