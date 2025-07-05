import {Sequelize} from "sequelize-typescript"
import {config} from "dotenv" //config is function given by dotenv
config()

const sequelize = new Sequelize({
  database : process.env.DB_DATABASE, 
  username : process.env.DB_USERNAME, 
  password : process.env.DB_PASSWORD, 
  host : process.env.DB_HOST,
  dialect : "mysql",     // k database use garna aateko bhanney kura
  port : Number(process.env.DB_PORT),  // port number hunu parxa tara process.env garexi string ma basxa. so we need to convert
  models : [__dirname + "/models"] //current location + models location
})

sequelize.authenticate()
.then(()=>{
  console.log("database connected")
})
.catch((error)=>{
  console.log(error)
})

sequelize.sync({
  force : false
})
.then(()=>{
  console.log("migrate successfully")
})
export default sequelize