// Moving the Data Load into a Module

// Your second step will be to move the loading of the JSON data into a module named init.js. This module folder (already created for you) will be called modules and will reside within the js folder. Within the init.js file, use async / await to load the JSON data and return it back into the buildGrid() function.

// General Considerations

//     Fetching the data from the module will return a Promise object. This should tell you that you’ll need to either use another async / await within the buildGrid() function or you’ll need to use .then() to process the return JSON object.
//     You will no longer be using an array. It will now be an object. So your iterative code within the buildGrid() function will be a bit different. Make sure to remove all references to arrEmployees as this array will no longer be valid.


// using fetch api for server calls
export async function init(uri) {
    try {
        const response = await fetch(uri)
        // console.log(response)

        if (!response.ok) {
            console.log('invalid uri. default initialization.')
            return defaultEmployees()
            throw new Error(`Response Status: ${response.status}`)
        }        

        // parse json into object
        const json = await response.json()
        // console.log(json);
        console.log('valid uri initialization.')
        return json

    } catch (error) {
        console.log(error.message)
    }
}

function defaultEmployees() {
    // so, this works for converting the employee array to an employee json, but it feels very 'brute force'. maybe it's correct.
    // put array data inside a parsable string
    let jsonString = '['
    for (let arr of arrEmployees) {
        // jsonString.push(`{ "id": ${value} }`)
        jsonString += `{ "id": "${arr[0]}", "name": "${arr[1]}", "extension": "${arr[2]}", "email": "${arr[3]}", "title": "${arr[4]}" },`
    }
    // remove trailing ',' since it breaks json.parse
    jsonString = jsonString.slice(0, jsonString.length - 1)
    jsonString += ']'

    let jsonEmployees = JSON.parse(jsonString)
    console.log(jsonString)
    console.log(jsonEmployees)
    return jsonEmployees
}

// CREATE AN ARRAY OF EMPLOYEES
let arrEmployees = [
    [34123413, "Zak Ruvalcaba", 3424, "zak@vectacorp.com", "Executive"],
    [23424665, "Sally Smith", 2344, "sally@vectacorp.com", "Administrative"],
    [12341244, "Mark Martin", 5352, "mark@vectacorp.com", "Sales"],
    [14545423, "Robin Banks", 7867, "robin@vectacorp.com", "Marketing"],
    [13413453, "Sue Wedge", 1235, "sue@vectacorp.com", "QA"]
]