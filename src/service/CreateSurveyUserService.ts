import { getCustomRepository } from "typeorm"
import AppError from "../errors/AppError"
import SurveysRepository from "../repositories/SurveysRepository"
import SurveyUsersRepository from "../repositories/SurveyUsersRepository"
import UsersRepository from "../repositories/UsersRepository"
import SendMailService from "./SendMailService"
import path from 'path'

interface Request{
  email:string;
  survey_id:string;
}
interface Response{
  id:string;
  user_id:string;
  survey_id:string;
  created_at:Date;
  title:string;
  description:string;
  exists?:boolean;
  user:object;
  survey:object;
}


export default class CreateSurveyUserService{
  async execute({email,survey_id}:Request):Promise<Response>{
    const usersRepository = getCustomRepository(UsersRepository)
    const surveysRepository = getCustomRepository(SurveysRepository)
    const surveyUsersRepository =getCustomRepository(SurveyUsersRepository)

    
 
    const userAlreadyExists = await usersRepository.findOne({where:{email}})
 
    if(!userAlreadyExists){
     throw new AppError('User does not exist')
    }
    
 
    const surveyAlreadyExists = await surveysRepository.findOne({where:{id:survey_id}})
 
    if(!surveyAlreadyExists){
     throw new AppError('User does not exist')
    }
    
    const answerAlreadyExists = await surveyUsersRepository
    .findOne({where:{user_id:userAlreadyExists.id,value:null},
    relations:['user','survey']
  })

    if(answerAlreadyExists){
      const npspath = path.resolve(__dirname,"..","views","emails","npsMail.hbs")
      await SendMailService.execute(email,surveyAlreadyExists.title, {name:email, title:surveyAlreadyExists.title,description:surveyAlreadyExists.description,id:answerAlreadyExists.id,link:process.env.URL_MAIL},npspath)  
      return {...answerAlreadyExists, title: surveyAlreadyExists.title,description:surveyAlreadyExists.description,exists:true}

    }
 
    const surveyUser = surveyUsersRepository.create({
      user_id:userAlreadyExists.id,
      survey_id
    })
 
    await surveyUsersRepository.save(surveyUser)
    

    return {...surveyUser, title: surveyAlreadyExists.title,description:surveyAlreadyExists.description}
  }
}