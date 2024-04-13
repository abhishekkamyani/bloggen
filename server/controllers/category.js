const Category = require("../models/Category");

exports.categories = async (req, res) => {
    try {

        const totalItems = await Category.estimatedDocumentCount();
        const pageSize = req.query.pageSize || totalItems;
        const page = parseInt(req.query.page) || 1;
        const startIndex = (page - 1) * pageSize;
        const endIndex = page * pageSize;
        const totalPages = Math.ceil(totalItems / pageSize);
        
        const categories = await Category.find()
        .skip(startIndex)
        .limit(endIndex - startIndex);

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
