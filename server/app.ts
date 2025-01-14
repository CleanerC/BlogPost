import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { blogsRoute } from './routes/blogs'
import { serveStatic } from 'hono/bun'

const app = new Hono()
app.use(logger())

const apiroutes = app.basePath("/api").route("/blogs", blogsRoute)

app.get('*', serveStatic({root: './frontend/dist'}))
app.get('*', serveStatic({path: './frontend/dist/index.html'}))
 
export default app
export type ApiRoutes = typeof apiroutes