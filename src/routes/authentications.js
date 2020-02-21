const express = require('express');
const router = express.Router();
// const csrf = require('csurf'); //sirve para la encriptacion de la contraseña el registarse
const passport = require('passport');
const {isLoggedIn, isNotLoggedIn} = require('../lib/auth')
const db = require('../database');

// const csrfProteccion = csrf(); //sirve para la encriptacion de la contraseña el registarse
// router.use(csrfProteccion); //sirve para la encriptacion de la contraseña el registarse

//////////////////REGISTRO//////////////////////////////////

//renderizar el formulario

router.get('/signup', isNotLoggedIn, (req, res) => {
    res.render('user/signup');
    // res.render('user/signup', {csrfToken: req.csrfToken()}); //sirve para la encriptacion de la contraseña el registarse
});

//recibir datos del formulario
router.post('/signup', isNotLoggedIn, passport.authenticate('local.signup', {
    // successRedirect: '/profile',
    failureRedirect: '/signup',
    failureFlash: true,
    session: true
}), (req, res, next) => {
    if (req.session.oldUrl) {
        const oldUrl = req.session.oldUrl;
        req.session.oldUrl = null;
        res.redirect(oldUrl);
    } else {
        res.redirect('/profile');
    }
});

////////////////LOGIN///////////////////////

////renderizar el formulario
router.get('/signin', isNotLoggedIn,(req, res) => {
    res.render('user/signin'); 
    // res.render('user/signin', {csrfToken: req.csrfToken()}); //sirve para la encriptacion de la contraseña el registarse
});

//recibir datos del formulario
router.post('/signin',isNotLoggedIn,  passport.authenticate('local.signin', {
    // successRedirect: '/profile',
    failureRedirect: '/signin',
    failureFlash: true
}), (req, res, next) => {
    if (req.session.oldUrl) {
        const oldUrl = req.session.oldUrl;
        req.session.oldUrl = null;
        res.redirect(oldUrl);
    } else {
        res.redirect('/profile');
    }
});

//perfil
router.get('/profile',isLoggedIn, (req, res) =>{
    var datosCliente = req.user //datos del cliente
    res.render('user/profile', {datosCliente})
});

router.post('/profile/:id', isLoggedIn, async (req, res) => {
    try {
        const {id} = req.user;
        const datosUser = req.body;
        await db.query("UPDATE usuarios SET nombre = '" + datosUser.nombre + "', apellido = '" + datosUser.apellido + "', direccion ='" + datosUser.direccion + "',  pass ='" + datosUser.pass + "', telefono ='" + datosUser.telefono + "' WHERE id = '" + id + "' ");    
        req.flash('success', 'Datos Actualizado correctamente');
        res.redirect('/');
    } catch (e) {
        console.log(e)
    }
    
});

// //cierra la sesion actual
router.get('/logout', isLoggedIn, (req, res) =>{
    req.logOut();
    res.redirect('/');
});



module.exports = router;