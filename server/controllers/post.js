const Post = require('../models/Post');
const { User } = require('../models/User');
const Category = require('../models/Category');
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");
const slugify = require("slugify");
const uploadFileOnAzure = require('../utils/uploadFileOnAzure');
const publicKey = fs.readFileSync(path.join(__dirname, "../keys/public.key"), "utf8");

exports.createPost = async (req, res) => {
    try {
        const { token } = req.cookies;

        if (!token) {
            return res.status(401).json({ error: "Unauthorized access" });
        }

        const { id } = jwt.verify(token, publicKey);

        if (!id) {
            return res.status(401).json({ error: "Unauthorized access" });
        }

        const data = JSON.parse(req.body.data);
        const blogCover = req.file;
        const content = req.body.content;

        delete data.blogCover;

        const user = await User.findById(id);
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
        console.log(post);
        res.json(post);

    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }

}

exports.getAllPosts = async (req, res) => {
    try {
        
        const slug = req.query.category;
        const category = await Category.findOne({slug}, {_id: 1});
        console.log(category);
        // const totalItems = await Post.estimatedDocumentCount({slug: "title-hai-yeh-humhara-1712947002032"});

        let totalItems = 0;

        if (category) {
            totalItems = await Post.countDocuments({categories: {$in: category._id}});
        } else {
            totalItems = await Post.estimatedDocumentCount();
        }

        // totalItems = await Post.countDocuments({categories: {$in: category.id}});
        const pageSize = parseInt(req.query.pageSize) || totalItems;
        const page = parseInt(req.query.page) || 1;
        const startIndex = (page - 1) * pageSize;
        const totalPages = Math.ceil(totalItems / pageSize);

        if (page > totalPages) {
            return res.status(404).json({ error: "Page is out of bounds" });
        }

        const filter = category && {categories: {$in: category._id}}

        const posts = await Post.find(filter)
            .populate({ path: 'author', select: "firstName lastName _id email avatar" })
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

exports.getCategoryPosts = async (req, res) => {
    try {
        const slug = req.query.category;
        console.log(slug);
        const category = await Category.findOne({ slug }, {posts: 1}).populate("posts").posts;
        res.json(category);

    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}