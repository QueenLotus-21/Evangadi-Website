const mysql2=require('mysql2');
//const mysql=require('mysql');
// const dbConnection=mysql2.createPool({
//     // user:"evangadi-admin",
//     // database:"evangadi-db",
//     user:process.env.R_USER,
//     database:process.env.DATABASE,
//     host:"localhost",
//     password:process.env.PASSWORD,
//     connectionLimit:10
// })

const dbConnection=mysql2.createPool({
    // user:"evangadi-admin",
    // database:"evangadi-db",
    user:"root",
    database:"evangadi_db",
    host:"localhost",
    password:"Act@1234",
    connectionLimit:10
})


//console.log(process.env.JWT_SECRET)
// dbConnection.execute("select 'success' ",(err,result)=>{
//     if (err) {
//         console.log(err.message);
//     }
//     else{
//         console.log(result);
//     }
// })

module.exports=dbConnection.promise();