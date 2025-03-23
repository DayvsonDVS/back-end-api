import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'

export default class HistoricsController {
  public async show({ params }: HttpContextContract) {
    const historic = await Database.from('batches')
      .select(
        'batch_managements.id',
        'batch_managements.batch_id',
        'batches.name as batch_name',
        'batch_managements.company_id',
        'companies.name as company_name',
        'companies.cnpj',
        'companies.cpf',
        'batch_managements.user',
        'batch_managements.updated_at',
        'batch_managements.created_at',
        'batch_managements.status',
        'batch_managements.historic as description',
        'batch_managements.receipt',
        'batch_managements.follow'
      )
      .innerJoin('batch_managements', 'batch_managements.batch_id', 'batches.id')
      .innerJoin('companies', 'batch_managements.company_id', 'companies.id')

      .where('batch_managements.company_id', '=', params.id)

    return historic
  }
}
