const app = require('./app')
const config = require('./src/config');
const MongoDB = require('./src/utils/mongodb.util')

async function startServer()
{
    try {        
        await MongoDB.connect(config.db.uri)
        console.log('ket noi database thanh cong!!!');

        const PORT = config.app.port
        app.listen(PORT, () => console.log('listen http://localhost:' + PORT))        
    } catch (error) {
        console.log('ket noi database that bai!!!');
        process.exit()
    }
}

startServer()