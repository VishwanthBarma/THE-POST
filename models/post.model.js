import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const postSchema = new Schema({
    dp: String,
    fullname: String,
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minLength: 3
    },
    description: String,
    photo: String,
    meta: {
        likes: {
            type: Number,
            default: 0
        },
        star: {
            type: Boolean,
            default: false
        }
    }
}, {
    timestamps: true,
});


export const Post = mongoose.models.Post || mongoose.model('Post', postSchema);

// module.exports = {
//     Post: Post,
//     PostSchema: postSchema
// }