const model = require("../models/User");
const User = model.User;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");
const publicKey = fs.readFileSync(path.join(__dirname, "../keys/public.key"), "utf8");
const uploadFileOnAzure = require("../utils/uploadFileOnAzure");
// const deleteFile = require("../utils/deleteFile");
// const path = require("path");
exports.profile = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findById(id, { password: 0, likedPosts: 0 });
        res.json(user);
    } catch (error) {
        // console.log("profile", error);
        res.status(404).json({ error: "User not found" });
    }
}

exports.updateProfile = async (req, res) => {
    try {
        const { token } = req.cookies;

        if (!token) {
            return res.status(401).json({ error: "Unauthorized -> token" });
        }

        const { id } = jwt.verify(token, publicKey);

        if (!id) {
            return res.status(401).json({ error: "Unauthorized -> auth" });
        }

        let { user: userData, password } = req.body;
        console.log(password);

        userData = JSON.parse(userData);

        const user = await User.findById(id);

        if (!bcrypt.compareSync(password, user.password)) {
            return res.status(401).json({ error: "Unauthorized -> password" });
        }
        const serverUrl = req.protocol + '://' + req.get('host');

        if (req.files.avatar) {
            const file = req.files.avatar[0];
            const url = await uploadFileOnAzure(file, user.avatar);
            const avatar = serverUrl + "/" + file.path;
            userData.avatar = avatar;

            setTimeout(async () => {
                console.log("time to update avatar");
                const result = await user.updateOne({ avatar: url });
                console.log(result);
            }, 5 * 60 * 1000);
        }

        if (req.files.cover) {
            const file = req.files.cover[0];
            const url = await uploadFileOnAzure(file, user.cover);
            const cover = serverUrl + "/" + file.path;
            userData.cover = cover;

            setTimeout(async () => {
                console.log("time to update cover");
                const result = await user.updateOne({ cover: url });
                console.log(result);
            }, 5 * 60 * 1000);
        }

        delete userData.email;
        delete userData.dateJoined;

        // console.log();

        const result = await user.updateOne(userData);

        // console.log(user);

        console.log(result);

        res.json({ message: "Updated successfully" });

        // if (req.files.avatar) {
        //     deleteFile(user.avatar);
        // }
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
};

exports.addCategories = async (req, res) => {
    try {
        const { token } = req.cookies;

        if (!token) {
            return res.status(401).json({ error: "Unauthorized access" });
        }

        const { id } = jwt.verify(token, publicKey);

        if (!id) {
            return res.status(401).json({ error: "Unauthorized access" });
        }

        const { categories } = req.body;

        // const user = await User.findById(id);
        // user.categories.addToSet(...categories);



        // const updatedUserData = await user.save();


        // const updatedUserData = await User.findByIdAndUpdate(
        //     id,
        //     { $addToSet: { categories: {$each : categories}}},
        //     { new: true, select: 'categories' }
        // );

        
        const updatedUserData = await User.findByIdAndUpdate(
            id,
            { categories: categories},
            { new: true, select: 'categories' }
        );

        

        res.json(updatedUserData);

    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}