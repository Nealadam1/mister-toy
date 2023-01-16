import { json } from "react-router-dom"
import { storageService } from "./async-storage.service"
import { httpService } from "./http.service"
import { utilService } from "./util.service"
import { userService } from "./user.service"

const TOY_KEY = 'toyDB'
const BASE_URL = 'Toy/'
const labels = ["On wheels", "Box game", "Art", "Baby", "Doll", "Puzzle", "Outdoor", "Battery Powered"]

_createDemoData()

export const toyService = {
    query,
    getById,
    save,
    remove,
    getEmptyToy,
    getDefaultFilter,
    getDefaultSort,
    getLabelList,
    countLabelsMap,
    addToyMsg,
}

function query(filterBy = getDefaultFilter(), sortby = getDefaultSort()) {
    console.log(filterBy)
    const labels = JSON.stringify(filterBy.labels)
    const queryParams = `?name=${filterBy.name}&inStock=${filterBy.stock}&labels=${labels}`
    return httpService.get(BASE_URL + queryParams)
}

function getById(toyId) {
    return httpService.get(BASE_URL + toyId)
}

function remove(toyId) {
    return httpService.delete(BASE_URL + toyId)
}
function save(toy) {
    if (toy._id) {
        return httpService.put(BASE_URL, toy)
    } else {
        return httpService.post(BASE_URL, toy)
    }
}

function getEmptyToy() {
    return {
        name: '',
        price: '',
        labels: [],
        inStock: true,
        msgs:[]
    }
}

function getDefaultFilter() {
    return { name: '', stock: true, labels: '', }
}
function getDefaultSort() {
    return { name: 1, price: 0, createdAt: 0 }
}

function getLabelList() {
    return labels
}

async function addToyMsg(toyId, msg) {
	try {
		console.log('msg:', msg)
		const savedMsg = await httpService.post(`toy/${toyId}/msg`,  msg )
		return savedMsg
	} catch (err) {
		console.log('Cannot add msg to toy:', err)
	}
}


function _createDemoData() {
    let demoData = utilService.loadFromStorage(TOY_KEY)
    if (!demoData) {
        demoData = [
            {
                "_id": "t101",
                "name": "Lego batman",
                "price": 200,
                "labels": ["Box game", "Puzzel"],
                "createdAt": 1631031801011,
                "inStock": true
            },
            {
                "_id": "t102",
                "name": "Talking Doll",
                "price": 123,
                "labels": ["Doll", "Battery Powered", "Baby"],
                "createdAt": 1631031801011,
                "inStock": true
            },
            {
                "_id": "t103",
                "name": "Remote car",
                "price": 500,
                "labels": ["On wheels", "Battery Powered", "Outdoor"],
                "createdAt": 1631031801011,
                "inStock": true
            }

        ]
        utilService.saveToStorage(TOY_KEY, demoData)
    }
}

function countLabelsMap(toys) {
    const labelCounts = labels.map(label => {
        let count = 0;
        toys.forEach(toy => {
            if (toy.labels.includes(label)) count++

        })
        return count

    })

    return labelCounts

}
