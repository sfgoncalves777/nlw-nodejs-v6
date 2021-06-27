import { Router } from 'express'
import { CreateUserController } from './controllers/CreateUserController'
import { CreateTagController } from './controllers/CreateTagController'
import { CreateComplimentController } from './controllers/CreateComplimentController'
import { AuthenticateUserController } from './controllers/AuthenticateUserController'
import { ListUserSendComplimentsController } from './controllers/ListUserSendComplimentsController'
import { ListUserReceiveComplimentsController } from './controllers/ListUserReceiveComplimentsController'
import { ensureAdmin } from './middlewares/ensureAdmin'
import { ensureAuthenticated } from './middlewares/ensureAuthenticated'
import { ListTagController } from './controllers/ListTagsController'
import { ListUsersController } from './controllers/ListUsersController'
import { Validators } from './middlewares/validator'


const createUserController = new CreateUserController()
const createTagController = new CreateTagController()
const createComplimentController = new CreateComplimentController()
const authenticateUserController = new AuthenticateUserController()
const listUserSendComplimentsController = new ListUserSendComplimentsController()
const listUserReceiveComplimentsController = new ListUserReceiveComplimentsController()
const listTagController = new ListTagController()
const listUserController = new ListUsersController()
const validators = new Validators()

const routes = Router()
routes.post('/users', validators.createUser, createUserController.handle)
routes.get('/users', listUserController.handle)
routes.post('/login', validators.login, authenticateUserController.handle)
routes.get('/tags', listTagController.handle)
routes.post('/tags', validators.createTag, createTagController.handle)
routes.post('/compliments', validators.createCompliment, ensureAuthenticated, ensureAdmin, createComplimentController.handle)
routes.get('/users/compliments/send', ensureAuthenticated, listUserSendComplimentsController.handle)
routes.get('/users/compliments/receive', ensureAuthenticated, listUserReceiveComplimentsController.handle)

export { routes }