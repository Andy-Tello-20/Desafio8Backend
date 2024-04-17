import { Router } from 'express';
import ProductsManager from '../../dao/products.mannager.js'


const router = Router();

router.get('/products', async (req, res) => {
  const products = await ProductsManager.get()
   res.status(200).json(products);
 });

 router.post('/products', async (req, res) => {
  const { body } = req;
  const products = await ProductsManager.create(body)
  res.status(201).json(products);
 });

 router.get('/products/:pid', async (req, res) => {

  const { sid } = req.params;
  const products = await ProductsManager.getById(sid)
  res.status(200).json(products);
});


 router.put('/products/:uid', async (req, res) => {
   const { uid } = req.params;
   const { body } = req;
   await ProductsManager.updateOne({ _id: uid }, { $set: body })
   res.status(204).end();
 });

 
 router.delete('/products/:uid', async (req, res) => {
   const { uid } = req.params;
   await ProductsManager.deleteOne({ _id: uid });
   res.status(204).end();
 });

export default router;