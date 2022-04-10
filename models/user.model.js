import mongoose from 'mongoose';
import { postSchema } from './post.model.js';

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: String,
    username: {
        type: String,
        unique: true,
        trim: true,
        minLength: 3
    },
    password: String,
    fullname: String,
    profile: String,
    meta: {
        followers: [String],
        following: [String],
        posts: [postSchema]
    }
}, {
    timestamps: true,
});

export const User = mongoose.models.User || mongoose.model('User', userSchema);

// module.exports = {
//     User: User,
//     UserSchema: userSchema
// }