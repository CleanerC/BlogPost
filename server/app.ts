import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { blogsRoute } from './routes/blogs'
import { serveStatic } from 'hono/serve-static'

const app = new Hono()
app.use(logger())

app.route("/api/blogs", blogsRoute)
 
export default app