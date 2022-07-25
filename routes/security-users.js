const router = require('express').Router();
const dbusers = require('../controllers/security-users')
const auth = require('./auth');

//Logger
const logger = require('../utils/logger');

//Get User By Id
router.route('/:id').get(auth, (request, response)=>{
    dbusers.getUserId(request.params.id).then(result => {
        response.json(result[0]);
    })
})

//Login
router.route('/login').post((request, response)=>{
    let userRegister = {...request.body}
    logger.info(JSON.stringify({...request.body}) + "/login - POST -")
    dbusers.iniciarSesion(userRegister, response).then(result => {
        if(result.Code_Type === "Error")
        {
            response.status(401);
        }
        response.json(result);
    })
})

module.exports = router;