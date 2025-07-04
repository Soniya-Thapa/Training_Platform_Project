import {Table,Column,Model,DataType, PrimaryKey,} from "sequelize-typescript"
@Table({
  tableName : "users", //gui ma dekhiney table ko name
  modelName : "user", //project bhitra mathi ko table lai access gariney name
  timestamps : true
})

//class user sanga matra column banauney capacity hunna so we need to extend from model
class User extends Model{
  @Column({  //UUID ley hamro user ko id direct serially 1,2,3,4,... narakhera random kehi unpredictable rakhdinxa for security
    primaryKey : true,
    type : DataType.UUID,
    defaultValue : DataType.UUIDV4
  })
  declare id : string
  @Column({
    type : DataType.STRING
  })
  declare username : string
  @Column({
    type : DataType.STRING
  })
  declare password : string
  @Column({
    type : DataType.STRING
  })
  declare email : string

  @Column({
    type : DataType.ENUM("teacher","institute","super-admin","student"),
    defaultValue : "student"
  })
  declare role : string
}

export default User