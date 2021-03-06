const register = require('./controllers/controller_register');
const login = require('./controllers/controller_login');
// const {getUser}= require('./controllers/controller_getuser')
const {forgotPassword, changePassword}= require('./controllers/reset_password')
const {registerValidator, loginValidator, resetPassword, convertPassword} = require('./validator');
const {t_insert, t_show, t_update, t_delete} = require('./controllers/ticket/ticket');
const express = require('express');

const route = express.Router();


    route.post('/register',registerValidator, register);
    route.post('/login', loginValidator, login);
    route.put('/forgot-password', resetPassword , forgotPassword);
    route.put('/reset-password', convertPassword , changePassword);
    // route.get('/getuser',getUser);

    // tickets

route.get('/t_display', t_show)
route.post('/t_insert', t_insert)
route.put('/t_update', t_update)
route.delete('/t_delete', t_delete)


module.exports=route;

