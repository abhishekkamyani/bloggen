const model = require("../models/User");
const User = model.User;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");
const publicKey = fs.readFileSync(path.join(__dirname, "../keys/public.key"), "utf8");

const secret = process.env.PRIVATE_KEY;
const expiresInMinutes = 60 * 24;
exports.registration = async (req, res) => {

    try {
        const user = new User(req.body);
        await user.save();

        const token = jwt.sign({ email: user.email, id: user._id }, secret, { algorithm: 'RS256', expiresIn: expiresInMinutes * 60 });

        res
        .status(201)
        .cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            expires: new Date(Date.now() + expiresInMinutes * 60 * 1000)
        }).json({
            email: user.email,
            _id: user._id,
            firstName: user.firstName,
            avatar: user.avatar
        })
    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({ error: "Email is already registered", });
        }
        res.status(500).json(error);
    }
}


exports.login = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ error: "Invalid email or password" });
        }

        const isAuth = bcrypt.compareSync(password, user.password);
        console.log(isAuth);

        if (!isAuth) {
            return res.status(404).json({ error: "Invalid email or password" });
        }


        const token = jwt.sign({ email: user.email, id: user._id }, secret, { algorithm: 'RS256', expiresIn: expiresInMinutes * 60 });

        res
            .cookie("token", token, {
                httpOnly: true,
                secure: true,
                sameSite: 'strict',
                expires: new Date(Date.now() + expiresInMinutes * 60 * 1000)
            })
            .json({
                email: user.email,
                _id: user._id,
                firstName: user.firstName,
                avatar: user.avatar
            })

        // res.status(200).json({ message: "Login successfully" });

    } catch (error) {
        console.log(error);
        res.json(error);
    }
}

exports.logout = (req, res) => {
    try {
        res.clearCookie("token").json({ message: "Logout successfully" });
    } catch (error) {
        res.json(error);
    }
}

exports.identity = async (req, res) => {
    try {
        const { token } = req.cookies;

        if (!token) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        const auth = jwt.verify(token, publicKey);

        if (!auth) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        const user = await User.findById(auth.id, { _id: 1, email: 1, avatar: 1 });
        // console.log(user);

        return res.json(user);

    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}