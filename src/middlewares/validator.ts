import { Request, Response,NextFunction } from 'express'
import * as Yup from 'yup'

class Validators {
  async createTag(request: Request, response: Response, next: NextFunction) {
    const { body } = request
    const schema = Yup.object().shape({
      name: Yup.string().required(),
    })
    const valid = await schema.isValid(body)
    if(!valid) return response.status(401).send()
    next()
  }
  async createUser(request: Request, response: Response, next: NextFunction) {
    const { body } = request
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().required(),
      admin: Yup.bool(),
    })
    const valid = await schema.isValid(body)
    if(!valid) return response.status(401).send()
    next()
  }
  async createCompliment(request: Request, response: Response, next: NextFunction) {
    const { body } = request
    const schema = Yup.object().shape({
      tag_id: Yup.string().required(),
      user_receiver: Yup.string().required(),
      message: Yup.string().required()
    })
    const valid = await schema.isValid(body)
    if(!valid) return response.status(401).send()
    next()
  }
  async login(request: Request, response: Response, next: NextFunction) {
    const { body } = request
    const schema = Yup.object().shape({
      emai: Yup.string().email().required(),
      password: Yup.string().required()
    })
    const valid = await schema.isValid(body)
    if(!valid) return response.status(401).send()
    next()
  }
}

export { Validators }