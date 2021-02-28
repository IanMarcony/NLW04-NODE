import { Request, Response } from "express";
import CreateSurveyUserService from "../service/CreateSurveyUserService";
import SendMailService from "../service/SendMailService";
import path from 'path'



export default class SendEmailController {
  static async execute(req: Request, res: Response) {
    const {email,survey_id}=req.body
      
    const createSurveyUserService = new CreateSurveyUserService()

    const {title,description, exists,user,survey,id} = await createSurveyUserService
    .execute({email,survey_id})
    if(!exists){
      const npspath = path.resolve(__dirname,"..","views","emails","npsMail.hbs")
      await SendMailService.execute(email,title, {name:email, title,description,id,link:process.env.URL_MAIL},npspath)  
    }
    return res.status(200).json({id,user,survey})
  }
}
