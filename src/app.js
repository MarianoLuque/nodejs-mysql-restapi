import express from 'express'
import indexRoutes from './routes/index.routes.js'
import employeesRoutes from './routes/employees.routes.js'

const app = express()

app.use(express.json())
app.get('/', (req, res) => {res.send('Hola mundo')})
app.use(employeesRoutes)
app.use(indexRoutes)
app.use((req, res, next) => {
    res.status(404).json({
        message: 'endpoint not found'
    })
})

export default app