import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import BatchManagement from 'App/Models/BatchManagement'
import { string } from '@ioc:Adonis/Core/Helpers'

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
    const batchManagement = await Database.from('batch_managements')
      .select(
        'batch_managements.id',
        'batch_managements.batch_id',
        'batch_managements.company_id',
        'companies.name',
        'companies.cnpj',
        'batch_managements.status',
        'batch_managements.historic',
        'batch_managements.receipt'
      )
      .innerJoin('companies', 'batch_managements.company_id', 'companies.id')
      .where('batch_managements.batch_id', params.id)

    return batchManagement
  }

  public async destroy({ params, request }: HttpContextContract) {
    const body = request.body() as number[]

    body.map(async (id) => {
      await BatchManagement.query().where('batch_id', params.id).where('company_id', id).delete()
    })

    return {
      message: 'Successfully updated batch management',
    }
  }

  public async update({ params, request }: HttpContextContract) {
    const body = request.body()
    const file = request.file('file')

    const batchManagement = await BatchManagement.findOrFail(params.id)

    if (file) {
      const filename = `${string.generateRandom(10)}.${file.extname}`
      await file.moveToDisk(
        './',
        {
          name: filename,
          contentType: file.extname,
        },
        's3'
      )

      batchManagement.receipt = `http://s3.us-east-1.amazonaws.com/xml-produtiva-adonis/${filename}`
    }

    batchManagement.status = body.status
    batchManagement.historic = body.historic

    await batchManagement.save()
  }
}
