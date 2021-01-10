import mongoose from 'mongoose'
const { Schema } = mongoose
import './db'
const postSchema = new mongoose.Schema({
    title: String,
    slug: String,
    description: String,
    body: String,
    isPublished: Boolean,
    viewCount: Number,
    tag: { type: Schema.Types.ObjectId, ref: 'Tag' }
})
const  Post = mongoose.models.Post || mongoose.model('Post', postSchema);
export default Post