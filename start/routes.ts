/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import { Exception } from '@adonisjs/core/exceptions'
import app from '@adonisjs/core/services/app'
import router from '@adonisjs/core/services/router'
import { readFile } from 'node:fs/promises'

router.on('/').render('pages/home').as('home')

router
  .get('/movies/:slug', async (ctx) => {

    // create the html file path
    const url = app.makeURL(`resources/movies/${ctx.params.slug}.html`)

    let movie:any
    try {
      // read the html file from the path
       movie = await readFile(url, "utf8")

    }catch(error){
      throw new Exception(`Could not find a movie called ${ctx.params.slug}`, {
        code: 'E_NOT_FOUND',
        status: 404
      })

    }
    return ctx.view.render('pages/movies/show', {
      movie
    })
  })
  .as('movies.show')
  // router.matchers.slug() will validate the slug format
  .where('slug', router.matchers.slug())
