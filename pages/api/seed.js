import nc from 'next-connect';
import { Post } from '../../models/post.model';
import db from '../../utils/db';
import data from '../../utils/data';

const handler = nc();

handler.get(async(req, res) => {
    // await db.connect();
    // // const posts = data.posts;
    // // await Post.insertMany(posts);

    // const newPost = Post({
    //     dp:"https://yt3.ggpht.com/ytc/AKedOLTA1hPKwBcOXdK6cqkiza3R0rSQM6Tcss09a2FQWw=s900-c-k-c0x00ffffff-no-rj",
    //     fullname:'Allu Arjun',
    //     username:'@alluarjun',
    //     description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam metus urna, aliquam vel erat ut, aliquet tristique dui.Aenean augue nibh, fermentum ut tincidunt ac, vestibulum eget augue.Phasellus convallis, nunc fringilla mattis elementum, nisl ex sodales massa, vitae mollis turpis dolor et lorem.",
    //     photo:'https://www.thenewsminute.com/sites/default/files/AlluArjun_290321_1200_TNM_0.jpg',
    //     meta: {
    //         likes: 65372,
    //         star: false
    //     }
    // })
    // newPost.save();
    // await db.disconnect();
    res.send({message: "Seeded... Successfully....."});
});


export default handler; 

