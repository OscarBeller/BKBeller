import { Router } from 'express'
import ProductManager from '../productManager.js';
const router = Router ();

router.get('/', (req,res)=>{
    const {limit} = req.query;
    const p = new ProductManager();
    return res.json({ productos: p.getProducts(limit)});
});

router.get("/products/:pid", (req,res) =>{
    const {pid} = req.params;
    const p = new ProductManager;
    return res.json({ producto : p.getProductsById(Number(pid))});
});

router.post('/'  , (req,res) => {
    const{title, descprition, price, thuimnails, code, stock, category, status} = req.body;
    const p = new ProductManager();
    const result = p.addProduct(title, descprition, price, thuimnails, code, stock, category, status);
    return res.json({result})
});

export default router;
