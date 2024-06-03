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
const uploadFileOnAzure = require("../utils/uploadFileOnAzure");
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
    const serverUrl = req.protocol + "://" + req.get("host");

    if (req.files.avatar) {
      const file = req.files.avatar[0];
      // const url = await uploadFileOnAzure(file, user.avatar);
      const avatar = serverUrl + "/" + file.path;
      userData.avatar = avatar;

      // setTimeout(async () => {
      //   console.log("time to update avatar");
      //   const result = await user.updateOne({ avatar: url });
      //   console.log(result);
      // }, 5 * 60 * 1000);
    }

    if (req.files.cover) {
      const file = req.files.cover[0];
      // const url = await uploadFileOnAzure(file, user.cover);
      const cover = serverUrl + "/" + file.path;
      userData.cover = cover;

      // setTimeout(async () => {
      //   console.log("time to update cover");
      //   const result = await user.updateOne({ cover: url });
      //   console.log(result);
      // }, 5 * 60 * 1000);
    }

    delete userData.email;
    delete userData.dateJoined;

    // console.log();

    const result = await user.updateOne(userData);

    // console.log(user);

    console.log(result);

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
