import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Subsidiary extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public company_id: number

  @column()
  public name: string

  @column()
  public cnpj: string

  @column()
  public unique_cnpj_company: string

  @column()
  public validity_pcmso: DateTime

  @column()
  public contract_date: DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
