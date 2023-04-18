import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Batch from 'App/Models/Batch'

export default class BatchController {
  public async store({ request, response }: HttpContextContract) {
    const body = request.body()

    const batch = await Batch.create(body)

    response.status(201)

    return {
      message: 'Batch created successfully!',
      data: batch,
    }
  }

  public async index() {
    const batch = await Batch.all()

    return batch
  }

  public async show({ params }: HttpContextContract) {
    const batch = await Batch.findOrFail(params.id)

    return batch
  }

  public async destroy({ params }: HttpContextContract) {
    const batch = await Batch.findOrFail(params.id)

    await batch.delete()

    return {
      message: 'Successfully deleted Batch',
      data: batch,
    }
  }

  public async update({ params, request }: HttpContextContract) {
    const body = request.body()

    const batch = await Batch.findOrFail(params.id)

    batch.name = body.name
    batch.status = body.status

    await batch.save()

    return {
      message: 'Successfully updated Batch',
      data: batch,
    }
  }
}
