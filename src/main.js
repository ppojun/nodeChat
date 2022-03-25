// template enginee : pug
// css framework : tailwind

const Koa = require('koa')
const Pug = require('koa-pug')
const path = require('path')
const route = require('koa-route')
const serve = require('koa-static')
const websockify = require('koa-websocket')
const mount = require('koa-mount')

const app = websockify(new Koa())

new Pug({
  viewPath: path.resolve(__dirname, './views'),
  app,
})

app.use(mount('/public', serve('src/public')))

app.use(async (ctx) => {
  await ctx.render('main')
})

app.ws.use(
  route.all('/ws', (ctx) => {
    ctx.websocket.on('message', (data) => {
      if (typeof data !== string) {
        return
      }
      const { nickname, message } = JSON.parse(data)

      ctx.websocket.send(
        JSON.stringify({
          nickname,
          message,
        })
      )
    })
  })
)

app.listen(5000)
