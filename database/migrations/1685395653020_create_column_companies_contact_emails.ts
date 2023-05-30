import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'companies'

  public async up() {
    this.schema.table(this.tableName, (table) => {
      table.string('email')
      table.string('contact')
    })
  }

  public async down() {
    this.schema.table(this.tableName, (table) => {
      table.dropColumn('email')
      table.dropColumn('contact')
    })
  }
}
