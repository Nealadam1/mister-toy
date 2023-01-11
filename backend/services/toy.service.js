const fs = require('fs')
const axios = require('axios')

var toys = require('../data/toy.json')

module.exports = {
    query,
    get,
    remove,
    save
}

function query(filterBy) {
    let filteredToys = toys
    if (filterBy.name) {
        const regex = new RegExp(filterBy.name, 'i')
        filteredToys = filteredToys.filter(toy => regex.test(toy.name))
    }
    if (filterBy.stock) {
        filteredToys = filteredToys.filter(toy => toy.stock === filterBy.stock)
    }
    if (filterBy.labels && filterBy.labels.length) {
        filteredToys = filteredToys.filter(toy => {
            return filterBy.labels.some(label => toy.labels.includes(label));
        })
    }

    return Promise.resolve(filteredToys)
}

function get(toyId) {
    const toy = toys.find(toy => toy._id === toyId)
    if (!toy) return Promise.reject('Toy not Found')
    return Promise.resolve(toy)
}

function remove(toyId) {
    const idx = toys.findIndex(toy => toy._id === toyId)
    if (idx === -1) return Promise.reject('No Such toy')
    const toy = toys[idx]
    toys.splice(idx, 1)
    return _writeToysToFile()
}
function save(toy) {
    if (toy._id) {
        const toyToUpdate = toys.find(currToy => currToy._id === toy._id)
        if (!toyToUpdate) return Promise.reject('No such toy')
        toyToUpdate.name = toy.name
        toyToUpdate.price = toy.price
        toyToUpdate.labels = toy.labels
        toyToUpdate.inStock = toy.inStock
    } else {
        toy._id = _makeId()
        toys.push(toy)
        toy.img = getDalleImg(toy.name)
    }
    return _writeToysToFile().then(() => toy)
}

function _makeId(length = 5) {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

function _writeToysToFile() {
    return new Promise((res, rej) => {
        const data = JSON.stringify(toys, null, 2)
        fs.writeFile('data/toy.json', data, (err) => {
            if (err) return rej(err)
            // console.log("File written successfully\n");
            res()
        });
    })
}

// function getDalleImg(toyName) {
//     const response = await openai.createImage({
//         prompt: "a white siamese cat",
//         n: 1,
//         size: "1024x1024",
//     })
//     const IMAGE_URL = response.data.data[0].url
//     getAndSaveImage(`${toyName}.jpg`)
//     const imagePath = `data/img/${toyName}`

//     async function getAndSaveImage(name) {
//         try {
//             const response = await axios.get(IMAGE_URL, {
//                 responseType: 'arraybuffer'
//             });
//             const image = new Buffer.from(response.data, 'binary').toString('base64');
//             const fileName = `data/img/${name}`;
//             fs.writeFileSync(fileName, image, 'base64');
//         } catch (error) {
//             console.error(error);
//         }
//     }

//     return imagePath

// }