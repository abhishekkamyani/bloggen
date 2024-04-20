const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const upload = require("../middlewares/multer.middleware");

router.get('/profile/:id', userController.profile)
router.patch('/profile/update', upload.fields([{ name: 'avatar' }, { name: 'cover' }]), userController.updateProfile)
router.patch('/add-categories/', userController.addCategories);

module.exports = router;