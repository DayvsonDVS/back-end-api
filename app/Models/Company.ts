import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Company extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public status: string

  @column()
  public cnpj: string

  @column()
  public cpf: string

  @column()
  public validity_pcmso: DateTime

  @column()
  public contract_date: DateTime

  @column()
  public alert: string

  @column()
  public email: string

  @column()
  public contact: string

  @column()
  public scheduling: string

  @column()
  public signed_contract: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
