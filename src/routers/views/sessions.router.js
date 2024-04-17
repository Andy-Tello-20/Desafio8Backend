import { Router } from 'express';
import UserModel from '../../dao/models/user.model.js';
import { isValidPassword,createHash } from '../../utils.js'


const router = Router();


  

router.post('/sessions/login', async (req, res) => {

    const { email, password } = req.body

    //validacion de campos
    if (!email || !password) {

        return res.render('error', { title: 'Hello People 🖐️', messageError: 'Todos los campos son requeridos.' })
    }

    //buscamos un usuario basado en su email, es decir obtenemos toda la info del usuario
    const user = await UserModel.findOne({ email })

    //validacion de que exista el user (email)
    if (!user) {

        //return res.status(401).json({ message: 'Correo o contraseña invalidos.' });

        return res.render('error', { title: 'Hello People 🖐️', messageError: 'Usuario no registrado.' })
    }

    // console.log('BODY DATA', email , password)
    // console.log(isValidPassword(password,user.password))

    //por medio del modelo/esquema de UserModel. estamos verificando que la contraseña ingresada en el Post session/login sea igual a la que existe en la base de datos cuando nos registramos (session/register)
    if (!isValidPassword(password,user.password)) {

        //return res.status(401).json({ message: 'Correo o contraseña invalidos.' });

        return res.render('error', { title: 'Hello People 🖐️', messageError: 'Correo o contraseña invalidos.' })
    }

    // req.session.user permite almacenar datos de sesión entre solicitudes, Cuando un usuario se autentica correctamente, su información (como nombre de usuario, ID, roles, u otros datos relevantes) se almacena en req.session.user. De esta manera, la aplicación puede recordar y asociar esa información específica con ese usuario durante su sesión.
    const {first_name,last_name,age,role,} = user;


    req.session.user = {first_name,last_name,email,age,role,}

    // Esperamos a que la sesión se guarde antes de enviar la respuesta
    req.session.save((err) => {
        if (err) {
            console.error(err);

            // return res.status(500).json({ message: 'Error al guardar la sesión' })

            return res.render('error', { title: 'Hello People 🖐️', messageError: 'Error al guardar la sesión.' })
        }
        //res.status(200).json({ message: 'session iniciada correctamente' });

        res.redirect('/profile')
    });




})

router.post('/sessions/register', async (req, res) => {
    const {
        body: {
            first_name,
            last_name,
            email,
            password,
            age,
        },
    } = req;


    let user

    //validacion de campos
    if (!first_name || !last_name || !email || !password) {


        //return res.status(400).json({ message: ' todos los campos son obligatorios' })

        return res.render('error', { title: 'Hello People 🖐️', messageError: 'Todos los campos son requeridos.' })
       
    } 
    
    if( email == 'adminCoder@coder.com' && password == 'adminCod3r123'){

        user = await UserModel.create({
            first_name,
            last_name,
            email,
            password:createHash(password),
            age,
            role:'admin',
        })
        
    }else{
        user = await UserModel.create({
            first_name,
            last_name,
            email,
            password:createHash(password),
            age,
            role:'usuario',
        })
    }


     

    res.status(201).json(user)

})

router.get('/sessions/profile', (req, res) => {

    if (!req.session.user) {
        return res.status(401).json({ message: 'no estas auntenticado' })
    }

    res.status(200).json(req.session.user)
})

router.get('/sessions/logout', (req, res) => {
    req.session.destroy((error) => {
        if (error) {
            return res.status(401).json({ message: 'ha ocurrido un error' });
        }

  
        return res.redirect('/login')
    });
})

 


export default router