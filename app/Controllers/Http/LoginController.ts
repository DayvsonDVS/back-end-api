import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Login from 'App/Models/Login'

export default class LoginController {
  public async store({ request, response, auth }: HttpContextContract) {
    const user = request.input('user')
    const email = request.input('email')
    const password = request.input('password')

    if (user === undefined) {
      try {
        const token = await auth.attempt(email, password)
        const login = await Login.findByOrFail('email', email)
        const user = login.user
        const profile = login.profile

        return {
          values: { token, user, profile },
        }
      } catch {
        return response.unauthorized('Invalid credentials')
      }
    } else {
      const body = request.body()
      const login = await Login.create(body)
      response.status(201)
      return {
        message: 'login created successfully!',
        data: login,
      }
    }
  }

  public async index() {
    const login = await Login.all()

    return login
  }

  public async show({ params }: HttpContextContract) {
    const login = await Login.findOrFail(params.id)

    return login
  }

  public async destroy({ params }: HttpContextContract) {
    const login = await Login.findOrFail(params.id)

    await login.delete()

    return {
      message: 'Successfully deleted login',
      data: login,
    }
  }

  public async update({ params, request }: HttpContextContract) {
    const body = request.body()

    const login = await Login.findOrFail(params.id)

    login.email = body.email
    login.password = body.password
    login.user = body.user
    login.profile = body.profile

    await login.save()

    return {
      message: 'Successfully updated login',
      data: login,
    }
  }
}
