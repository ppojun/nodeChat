// template enginee : pug
// css framework : tailwind

const Koa = require("koa")
const path = require("path")
const Pug = require("koa-pug")
const websockify = require("koa-websocket")
const route = require("koa-route")

const app = websockify(new Koa())

new Pug({
  viewPath: path.resolve(__dirname, "./views"),
  app,
})

app.use(async (ctx) => {
  ctx.body = "Hello World"
  await ctx.render("main")
})

app.ws.use(
  route.all("/test/:id", (ctx) => {
    ctx.websocket.send("Hello World")
    ctx.websocket.on("message", (message) => {
      console.log(message)
    })
  })
)

app.listen(3000)
