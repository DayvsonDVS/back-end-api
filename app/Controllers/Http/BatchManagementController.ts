import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'

import BatchManagement from 'App/Models/BatchManagement'

export default class BatchManagementController {
  public async store({ request, response }: HttpContextContract) {
    const body = request.body() as [BatchManagement]

    body.map(async (batch) => {
      await BatchManagement.create(batch)
    })

    response.status(201)

    return {
      message: 'Batch management created successfully!',
      data: body,
    }
  }

  public async index() {
    const batchManagement = await BatchManagement.all()

    return batchManagement
  }

  public async show({ params }: HttpContextContract) {
    const companiesBatch = await Database.from('companies')
      .select('companies.id', 'companies.name', 'companies.cnpj')
      .innerJoin('batch_managements', 'batch_managements.company_id', 'companies.id')
      .where('batch_managements.batch_id', params.id)

    return companiesBatch
  }

  public async destroy({ params }: HttpContextContract) {
    const batchManagement = await BatchManagement.findOrFail(params.id)

    await batchManagement.delete()

    return {
      message: 'Successfully deleted batch management',
      data: batchManagement,
    }
  }

  public async update({ params, request }: HttpContextContract) {
    const body = request.body()

    const batchManagement = await BatchManagement.findOrFail(params.id)

    batchManagement.historic = body.historic
    batchManagement.status = body.status
    batchManagement.receipt = body.receipt

    await batchManagement.save()

    return {
      message: 'Successfully updated batch management',
      data: batchManagement,
    }
  }
}
