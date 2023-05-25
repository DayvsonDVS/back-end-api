import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Company from 'App/Models/Company'

export default class CompanyController {
  public async store({ request }: HttpContextContract) {
    const body = request.body()

    if (Array.isArray(body)) {
      body.map(async (company) => {
        await Company.create(company)
      })

      return {
        message: 'Company created successfully!',
      }
    } else {
      await Company.create(body)
      return {
        message: 'Company created successfully!',
      }
    }
  }

  public async index() {
    const company = await Company.all()

    return company
  }

  public async show({ params }: HttpContextContract) {
    if (!isNaN(params.id)) {
      const company = await Company.findOrFail(params.id)

      return company
    }
  }

  public async destroy({ params }: HttpContextContract) {
    const company = await Company.findOrFail(params.id)

    await company.delete()

    return {
      message: 'Successfully deleted company',
      data: company,
    }
  }

  public async update({ params, request }: HttpContextContract) {
    const body = request.body()
    const company = await Company.findOrFail(params.id)

    company.name = body.name
    company.status = body.status
    company.cnpj = body.cnpj
    company.cpf = body.cpf
    company.validity_pcmso = body.validity_pcmso
    company.contract_date = body.contract_date
    company.alert = body.alert

    await company.save()

    return {
      message: 'Successfully updated company',
      data: company,
    }
  }
}
