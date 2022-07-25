var router = require('express').Router();

//Logger
const logger = require('../utils/logger');

router.get('/', (req, res)=>{
  logger.info("welcome to VINCO API");
  res.send('welcome to VINCO API');
});

//Users
router.use('/security-users', require('./security-users.js'));

//General Parameters
router.use('/general-parameters', require('./cat-general-parameters.js'));


module.exports = router;