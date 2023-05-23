import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'companies'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.setNullable('cnpj')
      table.setNullable('cpf')
    })
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('cnpj').notNullable().unique()
      table.string('cpf').notNullable().unique()
    })
  }
}
