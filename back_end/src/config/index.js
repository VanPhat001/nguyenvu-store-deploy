const dbName = 'nguyenvuStore'

const config = {
    app: {
        port: process.env.PORT || 3000
    },
    db: {
        // uri: process.env.MONGODB_URI || `mongodb://localhost:27017/${dbName}`
        uri: `mongodb+srv://admin:He8SXOUyRVdNmAvt@cluster0.c9re2w6.mongodb.net/${dbName}?retryWrites=true&w=majority`
    }
}

module.exports = config