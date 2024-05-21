import { storageService } from "./async-storage.service"
import { utilService } from "./util.service"

const CODE_KEY = 'codeBlockDB'
_createCodeBlocks()

export const codeBlockService = {
    query,
    getById,
}

async function query() {
    try {
        let codeblocks = await storageService.query(CODE_KEY)
        return codeblocks
    } catch (err) {
        console.log('Had issues getting code blocks', err)
    }
}

function getById(codeBlockId) {
    return storageService.get(CODE_KEY, codeBlockId)
}

function _createCodeBlocks() {
    const codeBlocks = [
        {
            _id: 'c101',
            title: 'Async case',
            code: "async function fetchData() {\n  const response = await fetch('https://api.example.com/data');\n  const data = await response.json();\n  console.log(data);\n}\n\nfetchData();"
          },
          {
            _id: 'c102',
            title: 'Promise example',
            code: "function asyncFunction() {\n  return new Promise((resolve, reject) => {\n    setTimeout(() => {\n      resolve('Resolved');\n    }, 2000);\n  });\n}\n\nasync function run() {\n  const result = await asyncFunction();\n  console.log(result);\n}\n\nrun();"
          }
    ]
    utilService.saveToStorage(CODE_KEY, codeBlocks)
}