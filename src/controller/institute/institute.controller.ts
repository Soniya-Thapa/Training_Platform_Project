import { Request, Response } from "express";
import sequelize from "../../database/connection";
import generateInstituteNumber from "../../services/random.institute.number";
import { AutoIncrement } from "sequelize-typescript";

class InstituteController {
  static async createInstitute(req: Request, res: Response) {
    const { instituteName, instituteEmail, institutePhoneNumber, instituteAddress } = req.body
    const instituteVatNo = req.body.instituteVatNo || null
    const institutePanNo = req.body.institutePanNo || null

    if (!instituteName || !instituteEmail || !institutePhoneNumber || !instituteAddress) {
      res.status(400).json({
        message: "Please provide instituteName, instituteEmail, institutePhoneNumber, instituteAddress"
      })
      return
    }
    const instituteNumber = generateInstituteNumber()
    //else ma institute create garna paryo 
    await sequelize.query(`
      CREATE TABLE IF NOT EXISTS institute_${instituteNumber}(
      id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
      instituteName VARCHAR(255) NOT NULL,
      instituteEmail VARCHAR(255) NOT NULL UNIQUE,
      institutePhoneNumber VARCHAR(255) NOT NULL UNIQUE,
      instituteAddress VARCHAR(255) NOT NULL,
      instituteVatNo VARCHAR(255),
      institutePanNo VARCHAR(255),
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `)
    await sequelize.query(`
    INSERT INTO institute_${instituteNumber} (instituteName, instituteEmail, institutePhoneNumber, instituteAddress , institutePanNo ,instituteVatNo) VALUES (?,?,?,?,?,?)`, {
      replacements: [instituteName, instituteEmail, institutePhoneNumber, instituteAddress, institutePanNo, instituteVatNo]
    })
    res.status(200).json({
      message: "Institute Created"
    })
  }
}
  const createTeacherTable = async (req: Request, res: Response) => {
    // await sequelize.query(`
    //   CREATE TABLE teacher_${instituteNumber}(
    //   id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    //   teacherName VARCHAR(255),
    //   teacherEmail VARCHAR(255),
    //   teacherPhoneNumber VARCHAR(255)
    //   )`)

  }


export default InstituteController