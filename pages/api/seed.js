import nc from 'next-connect';
import { Post } from '../../models/post.model';
import db from '../../utils/db';
import data from '../../utils/data';

const handler = nc();

handler.get(async(req, res) => {
    await db.connect();
    // const posts = data.posts;
    // await Post.insertMany(posts);

    const newPost = Post({
        dp:"https://images.indianexpress.com/2022/04/rrr-jr-ntr-ram-charan.jpg",
        fullname:'Ram Charan',
        username:'@heretherc',
        description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam metus urna, aliquam vel erat ut, aliquet tristique dui.Aenean augue nibh, fermentum ut tincidunt ac, vestibulum eget augue.Phasellus convallis, nunc fringilla mattis elementum, nisl ex sodales massa, vitae mollis turpis dolor et lorem.",
        photo:'https://www.pinkvilla.com/imageresize/_rrr_postponed.jpg?width=752&format=webp&t=pvorg',
        meta: {
            likes: 423120,
            star: false
        }
    })
    newPost.save();
    await db.disconnect();
    res.send({message: "Seeded... Successfully....."});
});


export default handler; 

