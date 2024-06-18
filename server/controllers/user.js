const model = require("../models/User");
const User = model.User;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");
const publicKey = fs.readFileSync(
  path.join(__dirname, "../keys/public.key"),
  "utf8"
);
// const uploadFileOnAzure = require("../utils/uploadFileOnAzure");
const { uploadOnCloudinary } = require("../utils/cloudinary");
exports.profile = async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id, {
      password: 0,
      likedPosts: 0,
    }).populate({
      path: "posts",
      options: { sort: { likers: -1 }, limit: 3 },
      select: "title slug blogCover summary createdAt _id",
    });
    res.json(user);
  } catch (error) {
    // console.log("profile", error);
    next({ status: 404, error: "User not found" });
  }
};

exports.updateProfile = async (req, res, next) => {
  try {
    const userId = req.userId;

    let { user: userData, password } = req.body;
    userData = JSON.parse(userData);

    const user = await User.findById(userId);

    if (!bcrypt.compareSync(password, user.password)) {
      return next({ status: 401, error: "Incorrect Password 😥" });
    }
    delete user.password;
    // const serverUrl = req.protocol + "://" + req.get("host");

    if (req.files.avatar) {
      console.log(req.files.avatar[0].path);
      const response = await uploadOnCloudinary(req.files.avatar[0].path, user.avatar);
      userData.avatar = response.url;
    }

    if (req.files.cover) {
      const response = await uploadOnCloudinary(req.files.cover[0].path, user.cover);
      userData.cover = response.url;
    }

    delete userData.email;
    delete userData.dateJoined;

    // console.log();

    const result = await user.updateOne(userData);

    // console.log(user);

    // console.log(result);

    res.json({ message: "Profile updated successfully." });

    // if (req.files.avatar) {
    //     deleteFile(user.avatar);
    // }
  } catch (error) {
    console.log(error);
    return next({});
  }
};

exports.addCategories = async (req, res, next) => {
  try {
    const userId = req.userId;

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
      userId,
      { categories: categories },
      { new: true, select: "categories" }
    );

    res.json(updatedUserData);
  } catch (error) {
    console.log(error);
    next({});
  }
};
