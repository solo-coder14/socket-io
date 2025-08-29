const Product = require("../models/Product");

async function getItems(req, res) {
    try {
        const products = await Product.find({})
        res.status(200).json({
            products,
        });
    } catch (err) {
        res.status(500).json({
            errors: {
                common: {
                    msg: "Unknows error occured!",
                },
            },
        });
    }
}

async function createItem(req, res) {
    try {
        const newProduct = new Product({
            name: req.body.item
        });

        const result = await newProduct.save();

        global.io.emit("textObject", {
            data: result
        });
        
        res.status(200).json({
            msg: "success",
        });
    } catch (err) {
        res.status(500).json({
            errors: {
                common: {
                    msg: "Unknows error occured!",
                },
            },
        });
    }
}

module.exports = {
    getItems,
    createItem
};