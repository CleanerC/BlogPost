import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { blogsRoute } from './routes/blogs'

const app = new Hono()
app.use(logger())

app.get('/test', (c) => {
    return c.json({"message": "test"})
})

app.route("/api/blogs", blogsRoute)

export default app