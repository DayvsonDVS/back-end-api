import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Login from 'App/Models/Login'

export default class LoginController {
  public async store({ request, response }: HttpContextContract) {
    const body = request.body()

    const login = await Login.create(body)

    response.status(201)

    return {
      message: 'login created successfully!',
      data: login,
    }
  }

  public async index() {
    const login = await Login.all()

    return {
      data: login,
    }
  }

  public async show({ params }: HttpContextContract) {
    const login = await Login.findOrFail(params.id)

    return {
      data: login,
    }
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

    await login.save()

    return {
      message: 'Successfully updated login',
      data: login,
    }
  }
}
