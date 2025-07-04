import {config} from "dotenv" //config is function given by dotenv
config()

export const envConfig = {
  portNumber : process.env.PORT
}
