import { storageService } from "./async-storage.service"
import { utilService } from "./util.service"

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
    getLabelList
}

function query(filterBy = getDefaultFilter(),sortby= getDefaultSort()) {
    return storageService.query(TOY_KEY)
}

function getById(toyId) {
    return storageService.get(TOY_KEY, toyId)
}

function remove(toyId) {
    return storageService.remove(TOY_KEY, toyId)
}
function save(toy) {
    if (toy._id) {
        return storageService.put(TOY_KEY, toy)
    } else {
        return storageService.post(TOY_KEY, toy)
    }
}

function getEmptyToy() {
    return {
        name: '',
        price: '',
        labels: [],
        inStock: true
    }
}

function getDefaultFilter() {
    return { name: '', stock: true, labels: [], }
}
function getDefaultSort() {
    return { name: 1, price: 0, createdAt: 0 }
}

function getLabelList(){
    return labels
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