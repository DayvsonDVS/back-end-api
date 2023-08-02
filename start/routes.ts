/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/', async () => {
    return { hello: 'world' }
  })

  Route.resource('/logins', 'LoginController').apiOnly()
  Route.resource('/companies', 'CompanyController').apiOnly()
  Route.resource('/lots', 'BatchController').apiOnly()
  Route.resource('/batchManagement', 'BatchManagementController').apiOnly()
  Route.resource('/historic', 'HistoricsController').apiOnly()
  Route.resource('/subsidiaries', 'SubsidiariesController').apiOnly()
}).prefix('/api')
