import express from 'express';
import { initializeDatabase } from './config/database.js';
import { Products } from './models/products.js';

const app = express()
const port = 3000
app.use(express.json());

await initializeDatabase();

app.post('/products', async (req, res) => {
    try {
        const product = await Products.create({
            name: req.body.name,
            ingredients: req.body.ingredients,
            price: req.body.price
        })

        return res.status(201).json(product);
    } catch(err) {
        res.status(500).json(err);
    }
})

app.get('/products', async (req, res) => {
    try {
        const products = await Products.findAll();

        return res.status(200).json(products);
    } catch(error) {
        res.status(500).json(error);
    }
})

app.put('/products/:id', async (req, res) => {
    try {
        await Products.update({ 
            name: req.body.name, 
            ingredients: req.body.ingredients,
            price: req.body.price
        }, {where: { id: req.params.id } })

        res.status(200).json();
    }   catch(error) {
        res.status(500).json(error);
    }
})

app.delete('/products/:id', async (req, res) => {
    try {
        await Products.destroy({
            where: { id: req.params.id }
        })

        res.status(200).json();
    }   catch(error) {
        res.status(500).json(error);
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})