var config = require("../dbconfig");
const sql = require("mssql");
var jwt = require('jsonwebtoken');
var config2 = require('../configs/config.js');

var fs = require('fs');
var sha256 = require('js-sha256').sha256;

//Get an user by id
async function getUserId(params){
    try{
        let pool = await sql.connect(config);
        let user = await pool.request()
            .input('pvOptionCRUD', sql.VarChar, "R")
            .input('pvIdUser', sql.VarChar, params)
            .execute('spSecurity_Users_CRUD_Records')
        return user.recordsets
    }catch(error){
        console.log(error)
    }
}

//Log In
async function iniciarSesion(req) {
    var pass = sha256(req.pvPassword)
    try{
        let pool = await sql.connect(config);
        let userLogin = await pool.request()
            .input('pvOptionCRUD', sql.VarChar, "VA")
            .input('pvIdUser', sql.VarChar, req.pvIdUser)
            .input('pvPassword', sql.VarChar, pass)
            .execute('spSecurity_Users_CRUD_Records')

        var response = {}
        if(userLogin.recordsets[0][0].Code_Type === "Error")
        {
            response = {
                Code_Type: "Error",
                Code_Message_User: "El usuario no tiene acceso, valide",
                token: ""
            }
        }
        else {
            var expiration = await config2.getExpiration()
            var secret = await config2.getSecret()

            const today = new Date();
            const exp = new Date(today);
            exp.setDate(today.getDate() + parseInt(expiration, 10));

            const token = jwt.sign({
                id: req.pvIdUser,
                username: req.pvPassword,
                exp: parseInt(exp.getTime() / 1000),
            }, secret);

            response = {
                Code_Type: "Success",
                Code_Message_User: "El usuario es válido",
                token: token
            }
        }

        return response;
    }catch(error){
        console.log(error)
    }
}

module.exports = {
    iniciarSesion: iniciarSesion,
    getUserId: getUserId,
}