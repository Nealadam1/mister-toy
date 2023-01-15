const MongoClient = require('mongodb').MongoClient
const config = require('../config')
const loggerService = require('./logger.service')

module.exports = {
    getCollection
}

var dbConn = null

async function getCollection(collectionName) {
    try {
        const db = await connect()
        const collection = await db.collection(collectionName)
        return collection
    } catch (err) {
        loggerService.error('Failed to get Mongo colletion', err)
        throw err

    }
}

async function connect() {
    if (dbConn) return dbConn
    try {
        const client = await MongoClient.connect(config.dbURL, { useNewUrlParser: true, useUnifiedTopology: true })
        const db = client.db(config.dbName)
        return db
    } catch (err) {
        loggerService.error('Cannot connect to DB', err)
        throw err
    }
}