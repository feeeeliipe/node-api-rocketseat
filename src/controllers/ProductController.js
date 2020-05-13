const mongoose = require('mongoose');

const Product = mongoose.model('Product');

module.exports = {

    // Retorna todos os registros de produto
    async findAll(req, res) {
        
        // Utilizando o recurso de desestruturação 
        const { page = 1 } = req.query;
        // Seria a mesma coisa que fazer
        //const page = req.query.page;

        const products = await Product.paginate({}, { page: page, limit: 10} );   
        return res.json(products); 
    },

    // Retorna um produto pelo id 
    async findById(req, res) {
        const product = await Product.findById(req.params.id);
        return res.json(product);
    },
    
    // Cria um novo produto no banco
    async create(req, res) {    

        // Verifica se já existe um produto com o mesmo nome  
        const productWithSameTitle = await Product.findOne({ 'title': req.body.title });
        if(productWithSameTitle) {
            return res.status(400).json({ message: 'Já existe um produto com o mesmo título'});
        } 
        
        const product = await Product.create(req.body);
        return res.json(product);
    },

    // Atualiza o produto 
    async update(req, res) {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true } );
        return res.json(product);
    },

    // Deleta o produto 
    async delete(req, res) {
        await Product.findByIdAndDelete(req.params.id);
        return res.status(204).json({});
    }


}