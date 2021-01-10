import mongoose from 'mongoose'
const { Schema } = mongoose
import './db'

const tagSchema = new Schema({
    name: String,
    slug: String,
    isPublished: Boolean,
    posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }]
})
const Tag  = mongoose.models.Tag || mongoose.model('Tag', tagSchema);
export default Tag