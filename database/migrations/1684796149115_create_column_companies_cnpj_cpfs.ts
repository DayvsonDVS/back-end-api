import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'companies'

  public async up() {
    this.schema.table(this.tableName, (table) => {
      table.string('cnpj').nullable().unique()
      table.string('cpf').nullable().unique()
    })
  }

  public async down() {
    this.schema.table(this.tableName, (table) => {
      table.dropColumn('cnpj')
      table.dropColumn('cpf')
    })
  }
}
