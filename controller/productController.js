const productsModels = require("../models/product");
const products = new productsModels();


module.exports = {
    createProduct: async (req,res) => {
        try{
            const id = await products.save(req.body);
            res.status(200).send({
                status:200,
                data:{
                    id
                },
                message: 'el producto fue agregado'
            }) 
        } catch (error) {
        res.status(500).send({
            status: 500,
            msg: error.message,
        });
        }   
    },

    getProducts: async (req,res) =>{
        try {
            const data = await products.getAll();
            res.render('products',{
                name: 'products',
                products: data,
            })
        } catch (error){
            res.status(500).send({
                status: 500,
                msg: error,
            });
        }
    }

}