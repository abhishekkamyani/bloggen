const Category = require("../models/Category");

exports.categories = async (req, res) => {
    try {

        const totalItems = await Category.estimatedDocumentCount();
        const pageSize = req.query.pageSize || totalItems;
        const page = parseInt(req.query.page) || 1;
        const startIndex = (page - 1) * pageSize;
        const totalPages = Math.ceil(totalItems / pageSize);
        
        const categories = await Category.find({}, {_id:1, name: 1})
        .skip(startIndex)
        .limit(pageSize);

        res.json({
            categories,
            currentPage: page,
            pageSize,
            totalPages,
            totalItems,
        });
    } catch (error) {
        console.log(error);
        res.status(404).json({ error: "Categories not found" });
    }
}


exports.categoriesInfo = async (req, res) => {
    try {
        const categoryIds = req.params.ids;

        console.log(categoryIds.split(","));
        
        const categories = await Category.find({_id: {$in: categoryIds.split(",")}}, {posts: 0});
        
        console.log(categories);
        return res.json(categories); 
    } catch (error) {
        console.log(error);
        return res.status(404).json({ error});
    }       
}