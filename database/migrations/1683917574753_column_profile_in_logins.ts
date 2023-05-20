import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'logins'

  public async up() {
    this.schema.table(this.tableName, (table) => {
      table.string('profile')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
