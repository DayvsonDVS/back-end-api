import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Subsidiary from 'App/Models/Subsidiary'
import Database from '@ioc:Adonis/Lucid/Database'

export default class SubsidiariesController {
  public async store({ request }: HttpContextContract) {
    const body = request.body()

    if (Array.isArray(body)) {
      body.map(async (subsidiary) => {
        await Subsidiary.create(subsidiary)
      })

      return {
        message: 'Subsidiary created successfully!',
      }
    } else {
      const subsidiary = await Subsidiary.create(body)
      return {
        message: 'Subsidiary created successfully!',
        data: subsidiary,
      }
    }
  }

  public async index() {
    const companies = await Database.from('companies')
      .select(
        'companies.id',
        'companies.name',
        'companies.cnpj',
        'companies.validity_pcmso',
        'companies.contract_date',
        'companies.procuration'
      )
      .where('companies.status', 'active')

    const subsidiaries = await Database.from('subsidiaries').select(
      'subsidiaries.id',
      'subsidiaries.name',
      'subsidiaries.cnpj',
      'subsidiaries.validity_pcmso',
      'subsidiaries.contract_date',
      'subsidiaries.procuration'
    )

    const unionDate = [...companies, ...subsidiaries]

    return unionDate
  }

  public async show({ params }: HttpContextContract) {
    if (!isNaN(params.id)) {
      const subsidiary = await Database.from('subsidiaries')
        .select(
          'subsidiaries.id',
          'subsidiaries.company_id',
          'subsidiaries.name',
          'subsidiaries.cnpj',
          'subsidiaries.validity_pcmso',
          'subsidiaries.procuration'
        )
        .innerJoin('companies', 'subsidiaries.company_id', 'companies.id')
        .where('subsidiaries.company_id', params.id)

      return subsidiary
    }
  }

  public async update({ params, request }: HttpContextContract) {
    const body = request.body()
    const subsidiary = await Subsidiary.findOrFail(params.id)

    subsidiary.name = body.name
    subsidiary.cnpj = body.cnpj
    subsidiary.validity_pcmso = body.validity_pcmso
    subsidiary.contract_date = body.contract_date
    subsidiary.procuration = body.procuration

    await subsidiary.save()

    return {
      message: 'Successfully updated subsidiary',
      data: subsidiary,
    }
  }

  public async destroy({ params }: HttpContextContract) {
    const subsidiary = await Subsidiary.findOrFail(params.id)

    await subsidiary.delete()

    return {
      message: 'Successfully deleted subsidiary',
      data: subsidiary,
    }
  }
}
