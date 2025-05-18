const mongoclient = require('mongodb').MongoClient;

async function connecttodb() {
    const client = await mongoclient.connect(process.env.URL)
    return client;
}

module.exports=connecttodb;