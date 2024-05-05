const Post = require('../models/Post');
const { User } = require('../models/User');
const Category = require('../models/Category');
const slugify = require("slugify");
const uploadFileOnAzure = require('../utils/uploadFileOnAzure');

exports.createPost = async (req, res) => {
    try {
        const userId = req.userId;

        const data = JSON.parse(req.body.data);
        const blogCover = req.file;
        const content = req.body.content;

        delete data.blogCover;

        const user = await User.findById(userId);
        let categories = await Category.find({ name: { $in: data.categories_names } });
        const post = new Post(data);

        post.slug = slugify(post.title) + "-" + Date.now().toString();
        post.content = content;

        if (blogCover) {
            const url = await uploadFileOnAzure(blogCover);
            const serverUrl = req.protocol + '://' + req.get('host');
            const localUrl = serverUrl + "/" + blogCover.path;
            post.blogCover = localUrl;

            setTimeout(async () => {
                post.blogCover = url;
                await post.save();
            }, 5 * 60 * 1000);
        }

        user.posts.push(post._id);
        post.author = user._id;

        categories = categories.map(category => {
            // category.posts.push(post._id)
            post.categories.push(category._id);
            return category;
        });

        await post.save();
        await user.save();
        // await Category.bulkSave(categories);

        res.status(201).json(post);
    } catch (error) {
        console.log(error);
        res.json(error);
    }
}

exports.getPost = async (req, res) => {
    try {
        const slug = req.params.slug;
        const post = await Post.findOne({ slug })
            .populate({ path: 'author', select: "firstName lastName _id email avatar" })
            .populate({ path: 'categories', select: "-posts" })

        const posts = await Post.find(
            { categories: { $in: post.categories } },
            { categories: 1, title: 1, slug: 1, summary: 1, blogCover: 1, createdAt: 1, author: 1 }
        )
        .populate({ path: 'author', select: "firstName lastName _id avatar" })
        .limit(4);

        res.json({ post, relatedPosts: posts.filter(relatedPost => relatedPost.slug !== post.slug) });

    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

exports.getAllPosts = async (req, res) => {
    try {

        const slug = req.query.category;
        const category = await Category.findOne({ slug }, { _id: 1 });
        // console.log(category);
        // const totalItems = await Post.estimatedDocumentCount({slug: "title-hai-yeh-humhara-1712947002032"});

        let totalItems = 0;

        if (category) {
            totalItems = await Post.countDocuments({ categories: { $in: category._id } });
        } else {
            totalItems = await Post.estimatedDocumentCount();
        }

        if (!totalItems) {
            return res.status(404).json({ error: "Blogs not found" });
        }

        // totalItems = await Post.countDocuments({categories: {$in: category.id}});
        const pageSize = parseInt(req.query.pageSize) || totalItems;
        const page = parseInt(req.query.page) || 1;
        const startIndex = (page - 1) * pageSize;
        const totalPages = Math.ceil(totalItems / pageSize);

        if (page > totalPages) {
            return res.status(404).json({ error: "Page is out of bounds" });
        }

        const filter = category && { categories: { $in: category._id } }

        const posts = await Post.find(filter, { title: 1, slug: 1, summary: 1, blogCover: 1, author: 1, createdAt: 1 })
            .populate({ path: 'author', select: "firstName lastName _id avatar" })
            .populate({ path: 'categories', select: "-posts" })
            .skip(startIndex)
            .limit(pageSize)
            .sort({ createdAt: -1 });


        res.json({
            totalItems,
            // pageSize,
            // page,
            totalPages,
            posts,
        });

    }
    catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

// exports.getCategoryPosts = async (req, res) => {
//     try {
//         const slug = req.query.category;
//         console.log(slug);
//         const category = await Category.findOne({ slug }, { posts: 1 }).populate("posts").posts;
//         res.json(category);

//     } catch (error) {
//         console.log(error);
//         res.status(500).json(error);
//     }
// }

exports.likePost = async (req, res) => {
    try {
        const userId = req.userId;
        const postId = req.params.id;

        await User.findByIdAndUpdate(userId, { $addToSet: { likedPosts: postId } }, { new: true });
        const post = await Post.findByIdAndUpdate(postId, { $addToSet: { likers: userId } }, { new: true, select: "likers" });

        console.log(post);

        return res.json({ likers: post.likers });

    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }

}

exports.dislikePost = async (req, res) => {
    try {
        const userId = req.userId;
        const postId = req.params.id;

        const user = await User.findByIdAndUpdate(userId, { $pull: { likedPosts: postId } }, { new: true });
        const post = await Post.findByIdAndUpdate(postId, { $pull: { likers: userId } }, { new: true, select: "likers" });


        console.log(user);
        console.log(post);

        return res.json({ likers: post.likers });

    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }

}

// exports.getRelatedPosts = 