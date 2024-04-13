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
            post.blogCover = url;
        }

        user.posts.push(post._id);
        post.author.push(user._id);

        categories = categories.map(category => {
            category.posts.push(post._id)
            post.categories.push(category._id);
            return category;
        });

        await post.save();
        await user.save();
        await Category.bulkSave(categories);

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