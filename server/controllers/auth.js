const model = require("../models/User");
const User = model.User;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const secret = process.env.PRIVATE_KEY;
const expiresInMinutes = 60 * 24;
exports.registration = async (req, res, next) => {
  try {
    const user = new User(req.body);
    await user.save();

    const token = jwt.sign({ email: user.email, id: user._id }, secret, {
      algorithm: "RS256",
      expiresIn: expiresInMinutes * 60,
    });

    res
      .status(201)
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        expires: new Date(Date.now() + expiresInMinutes * 60 * 1000),
      })
      .json({
        email: user.email,
        _id: user._id,
        firstName: user.firstName,
        avatar: user.avatar,
        categories: user.categories,
      });
  } catch (error) {
    console.log(error);
    if (error.code === 11000) {
      return next({ status: 409, error: "Email is already registered" });
    }
    next({});
  }
};

exports.login = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return next({ status: 404, error: "Invalid email or password" });
    }

    const isAuth = bcrypt.compareSync(password, user.password);
    console.log(isAuth);

    if (!isAuth) {
      return next({ status: 404, error: "Invalid email or password" });
    }

    const token = jwt.sign({ email: user.email, id: user._id }, secret, {
      algorithm: "RS256",
      expiresIn: expiresInMinutes * 60,
    });

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        expires: new Date(Date.now() + expiresInMinutes * 60 * 1000),
      })
      .json({
        email: user.email,
        _id: user._id,
        firstName: user.firstName,
        avatar: user.avatar,
        categories: user.categories,
      });
  } catch (error) {
    next({});
    console.log(error);
  }
};

exports.logout = (req, res, next) => {
  try {
    res.clearCookie("token").json({ message: "Logout successfully" });
  } catch (error) {
    next({});
  }
};

exports.identity = async (req, res, next) => {
  try {
    const userId = req.userId;

    const user = await User.findById(userId, {
      _id: 1,
      email: 1,
      firstName: 1,
      avatar: 1,
      categories: 1,
    });

    const token = jwt.sign({ email: user.email, id: user._id }, secret, {
      algorithm: "RS256",
      expiresIn: expiresInMinutes * 60,
    });

    return res
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        expires: new Date(Date.now() + expiresInMinutes * 60 * 1000),
      })
      .json(user);
  } catch (error) {
    console.log(error);
    next({});
  }
};
