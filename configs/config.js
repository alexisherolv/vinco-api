var config = require("../dbconfig"); //instanciamos el archivo dbconfig
const sql = require("mssql"); //necesitamos el paquete sql

async function getExpiration(){
    try{
        let pool = await sql.connect(config);
        let generalParameters = await pool.request()
            .input('pvOptionCRUD', sql.VarChar, "R")
            .execute('spCat_General_Parameters_CRUD_Records')
        return generalParameters.recordsets[0][6].Value
    }catch(error){
        console.log(error)
    }
}

async function getSecret(){
    try{
        let pool = await sql.connect(config);
        let generalParameters = await pool.request()
            .input('pvOptionCRUD', sql.VarChar, "R")
            .execute('spCat_General_Parameters_CRUD_Records')
        return generalParameters.recordsets[0][5].Value
    }catch(error){
        console.log(error)
    }
}

module.exports = {
    getExpiration: getExpiration,
    getSecret: getSecret,
}