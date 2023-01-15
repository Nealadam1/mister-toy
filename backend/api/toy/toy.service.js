const fs = require('fs')
const logger = require('../../services/logger.service')
const utilService = require('../../services/util.service')
const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId

var toys = require('../../data/toy.json')

module.exports = {
    query,
    getById,
    remove,
    update,
    add,
    addToyMsg,
    removeToyMsg
}

async function query(filterBy = { name: '' }) {
    try {
        const criteria = {
            name: { $regex: filterBy.name, $options: 'i' }

        }
        const collection = await dbService.getCollection('toy')
        var toys = await collection.find(criteria).toArray()
        return toys
    } catch (err) {
        logger.error('cannot find toys', err)
        throw err

    }
}
// OLD QUERY
// function query(filterBy) {
//     let filteredToys = toys
//     if (filterBy.name) {
//         const regex = new RegExp(filterBy.name, 'i')
//         filteredToys = filteredToys.filter(toy => regex.test(toy.name))
//     }
//     if (filterBy.stock) {
//         filteredToys = filteredToys.filter(toy => toy.stock === filterBy.stock)
//     }
//     if (filterBy.labels && filterBy.labels.length) {
//         filteredToys = filteredToys.filter(toy => {
//             return filterBy.labels.some(label => toy.labels.includes(label));
//         })
//     }

//     return Promise.resolve(filteredToys)
// }

async function getById(toyId) {
    try {
        const collection = await dbService.getCollection('toy')
        const toy = collection.findOne({ _id: ObjectId(toyId) })
        return toy

    } catch (err) {
        logger.error(`while finding toy ${toyId}`, err)
        throw err
    }
}

// old GETBYID
// function get(toyId) {
//     const toy = toys.find(toy => toy._id === toyId)
//     if (!toy) return Promise.reject('Toy not Found')
//     return Promise.resolve(toy)
// }

async function remove(toyId) {
    try {
        const collection = await dbService.getCollection('toy')
        const toy = collection.deleteOne({ _id: ObjectId(toyId) })
        return toy
    } catch (err) {
        logger.error(`cannot remove toy ${toyId}`, err)
        throw err
    }
}

// old remove
// function remove(toyId) {
//     const idx = toys.findIndex(toy => toy._id === toyId)
//     if (idx === -1) return Promise.reject('No Such toy')
//     const toy = toys[idx]
//     toys.splice(idx, 1)
//     return _writeToysToFile()
// }
async function add(toy) {
    try {
        const collection = await dbService.getCollection('toy')
        await collection.insertOne(toy)
        return toy
    } catch (err) {
        logger.error('cannot insert toy', err)
        throw err
    }
}

async function update(toy) {
    try {
        const toyToSave = {
            name: toy.name,
            price: toy.price,
            inStock: toy.inStock,
            labels: toy.labels
        }
        const collection = await dbService.getCollection('toy')
        await collection.updateOne({ _id: ObjectId(toy._id) }, { $set: toyToSave })
        return toy
    } catch (err) {
        logger.error(`cannot update toy ${toy._id}`, err)
        throw err
    }
}

//old save
// function save(toy) {
//     if (toy._id) {
//         const toyToUpdate = toys.find(currToy => currToy._id === toy._id)
//         if (!toyToUpdate) return Promise.reject('No such toy')
//         toyToUpdate.name = toy.name
//         toyToUpdate.price = toy.price
//         toyToUpdate.labels = toy.labels
//         toyToUpdate.inStock = toy.inStock
//     } else {
//         toy._id = _makeId()
//         toys.push(toy)
//     }
//     return _writeToysToFile().then(() => toy)
// }

// write to json if using file as db
// function _writeToysToFile() {
//     return new Promise((res, rej) => {
//         const data = JSON.stringify(toys, null, 2)
//         fs.writeFile('data/toy.json', data, (err) => {
//             if (err) return rej(err)
//             // console.log("File written successfully\n");
//             res()
//         });
//     })
// }

async function addToyMsg(toyId, msg) {
    try {
        msg.id = utilService.makeId()
        const collection = await dbService.getCollection('toy')
        await collection.updateOne({ _id: ObjectId(toyId) }, { $push: { msgs: msg } })
        return msg
    } catch (err) {
        logger.error(`cannot add toy msg ${msg.id} at ${toyId}`, err)
        throw err
    }
}

async function removeToyMsg(toyId, msgId) {
    try {
        const collection=await dbService.getCollection('toy')
        await collection.updateOne({_id: ObjectId(toyId)}, {$pull :{msgs: {id:msgId}}})
        return msgId
    } catch (err) {
        logger.error(`cannot remove car msg ${msgId} at toy ${toyId}`,err)
        throw err
    }
}