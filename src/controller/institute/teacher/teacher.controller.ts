import { Request, Response } from "express";
import sequelize from "../../../database/connection";
import IExtendedRequest from "../../../globals/indes";

const createTeacher = async (req:IExtendedRequest, res:Response)=>{
  const instituteNumber = req.user?.currentInstituteNumber
  const {teacherName, teacherEmail, teacherPhoneNumber, teacherExpertise, joinedDate, salary} = req.body 
  if(!teacherName || !teacherEmail || !teacherPhoneNumber || !teacherExpertise || !joinedDate || !salary){
    res.status(400).json({
      message : "Please provide teacherName, teacherEmail, teacherPhoneNumber, teacherExpertise, joinedDate and salary."
    })
    return
  }
  const returnedData = await sequelize.query(`INSERT INTO course_${instituteNumber}(teacherName, teacherEmail, teacherPhoneNumber, teacherExpertise, joinedDate, salary) VALUES(?,?,?,?,?)`,{
    replacements:[teacherName, teacherEmail, teacherPhoneNumber, teacherExpertise, joinedDate, salary]
  })
  console.log("returned data : ", returnedData)
  res.status(200).json({
    message : "Teacher created successfully."
  })
}

const deleteTeacher = async (req: IExtendedRequest, res:Response)=>{
  const instituteNumber = req.user?.currentInstituteNumber
  const teacherId = req.params.id
  const [teacherData] = await sequelize.query(`SELECT *FROM course_${instituteNumber} where id=${teacherId}`) 
  if(teacherData.length == 0){
    return res.status(404).json({
      message : "No teacher found with that id."
    })
    return
  }
  await sequelize.query(`DELETE FROM course_${instituteNumber} WHERE id = ${teacherId}`)
  res.status(200).json({
    message :"Teacher deleted successfully."
  })
}

const getAllTeachers = async (req:IExtendedRequest,res:Response) =>{
  const instituteNumber = req.user?.currentInstituteNumber
  const [allTeacherData] = await sequelize.query(`SELECT * FROM course_${instituteNumber}`)
  if(allTeacherData.length == 0){
    return res.status(404).json({
      message : "There are no teachers."
    })
    return
  }
  res.status(200).json({
    message : "All teachers retrieved.",
    courses: allTeacherData || []
  }) 
}

const getSingleTeacher = async (req:IExtendedRequest,res:Response) =>{
  const instituteNumber = req.user?.currentInstituteNumber
  const teacherId = req.params.id
  const [teacherData] = await sequelize.query(`SELECT *FROM course_${instituteNumber} WHERE id= ${teacherId}`)
  if(teacherData.length == 0){
    return res.status(404).json({
      message :  "No teacher found with that id."
    })
    return
  }
  res.status(200).json({
    message : "Single teacher fetched.",
    courses: teacherData || []
  }) 
}

export {
  createTeacher,
  deleteTeacher,
  getAllTeachers,
  getSingleTeacher
}