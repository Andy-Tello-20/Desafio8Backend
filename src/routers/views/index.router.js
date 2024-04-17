import { Router } from 'express';
import ProductsManager from '../../dao/products.mannager.js'
const router = Router();


//req.session.counter es una propiedad específica de la sesión. En este caso, se está utilizando para realizar un seguimiento del número de veces que se ha realizado una solicitud a la ruta especificada ('/')

router.get('/', (req, res) => {
  if (!req.session.counter) {
    req.session.counter = 1;
  } else {
    req.session.counter++;
  }
  
  res.render('index', { title: 'Hello People 🖐️', counter: req.session.counter });
});

router.get('/profile', async (req, res) => {

  //Esto quiere decir: Si no hay un usuario autenticado o session.user no tiene asociada ninguna informacion de usuario. no muestra la ruta profile
  if (!req.session.user) {
    return res.redirect('/login');
  }

  const products = await ProductsManager.get()

  res.render('profile', { title: 'Hello People 🖐️', user: req.session.user, listProducts: products.map(p => p.toJSON()) });
});

router.get('/login', (req, res) => {
  res.render('login', { title: 'Hello People 🖐️' });
});

router.get('/register', (req, res) => {
  res.render('register', { title: 'Hello People 🖐️' });
});

export default router;