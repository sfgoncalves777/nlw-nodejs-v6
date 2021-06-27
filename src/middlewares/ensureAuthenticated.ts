import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'

interface IPayload {
  sub: string 
}

export function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
  const authToken = request.headers.authorization
  if (!authToken) return response.status(401).end()
  const [Bearer, token] = authToken.split(' ')
  if(!Bearer) return response.status(401).end()
  try {
    const { sub: id } = verify(token, '17d7ff1c6968a8eba9533879a98a9816') as IPayload
    request.user_id = id
    next()
  } catch (err) {
    return response.status(401).end()
  }
}
