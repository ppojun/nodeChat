// template enginee : pug
// css framework : tailwind

const Koa = require("koa")
const app = new Koa()
const path = require("path")
const Pug = require("koa-pug")

new Pug({
  viewPath: path.resolve(__dirname, "./views"),
  app,
})

app.use(async (ctx) => {
  ctx.body = "Hello World"
  await ctx.render("main")
})

app.listen(3000)
