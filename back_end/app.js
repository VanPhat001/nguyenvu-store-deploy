const express = require('express')
const cors = require('cors')
const indexRouter = require('./src/routes/index.route')
const ApiError = require('./src/api-error')

const app = express()
app.use(cors())
app.use(express.json())

app.use('/api', indexRouter)

app.use((req, res, next) => {
    return next(new ApiError(404, "Resources not found"))
})

app.use((err, req, res, next) => {
    res.status(err.statusCode || 500).send({
        message: err.message || "External server error..."
    })
})

module.exports = app