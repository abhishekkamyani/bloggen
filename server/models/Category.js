const mongoose = require('mongoose');
const { Schema } = mongoose;


const categorySchema = new Schema({
    name: {type: String, required: true, unique: true},
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post'
        }
    ]
})

const Category = mongoose.model('Category', categorySchema);
module.exports = Category;