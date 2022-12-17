const dbName = 'nguyenvuStore'

const config = {
    app: {
        port: process.env.PORT || 3000
    },
    db: {
        uri: process.env.MONGODB_URI || `mongodb://localhost:27017/${dbName}`
    }
}

module.exports = config