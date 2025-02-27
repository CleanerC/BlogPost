import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { blogsRoute } from './routes/blogs'
import { serveStatic } from 'hono/bun'

const app = new Hono()
app.use(logger())

app.route("/api/blogs", blogsRoute)

app.use('/*', serveStatic({ root: './frontend/dist' }))
app.get('*', serveStatic({path: './frontend/dist/index.html'}))
 
export default app