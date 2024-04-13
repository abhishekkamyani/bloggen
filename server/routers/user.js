const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const upload = require("../middlewares/multer.middleware");

router.get('/profile/:id', userController.profile)
router.patch('/profile/update', upload.fields([{ name: 'avatar' }, { name: 'cover' }]), userController.updateProfile)
router.patch("/profile/s/image", upload.fields([{ name: 'avatar', maxCount: 1 }, { name: 'cover', maxCount: 1 }]), (req, res) => {
    // console.log(req.body.data);
    const { data } = req.body;
    console.log(data);
    // console.log(req.file);
    console.log(req.files); 
    return res.send("okay");
})



module.exports = router;