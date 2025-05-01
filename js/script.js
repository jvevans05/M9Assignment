// // CREATE AN ARRAY OF EMPLOYEES
// let arrEmployees = [
//     [34123413, "Zak Ruvalcaba", 3424, "zak@vectacorp.com", "Executive"],
//     [23424665, "Sally Smith", 2344, "sally@vectacorp.com", "Administrative"],
//     [12341244, "Mark Martin", 5352, "mark@vectacorp.com", "Sales"],
//     [14545423, "Robin Banks", 7867, "robin@vectacorp.com", "Marketing"],
//     [13413453, "Sue Wedge", 1235, "sue@vectacorp.com", "QA"]
// ]
// console.log(JSON.stringify(arrEmployees[0]))
// console.log(JSON.parse(JSON.stringify(arrEmployees[0])))

import { init } from "./modules/init.js"
// console.log(init)

// GET DOM ELEMENTS
let empTable    = document.querySelector('#employees')
let empCount    = document.querySelector('#empCount')

// BUILD THE EMPLOYEES TABLE WHEN THE PAGE LOADS
buildGrid()

// DELETE EMPLOYEE
empTable.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete')) {
        // CONFIRM THE DELETE
        if (confirm('Are you sure you want to delete this employee?')) {
            // GET THE SELECTED ROWINDEX FOR THE TR (PARENTNODE.PARENTNODE)
            let rowIndex = e.target.parentNode.parentNode.rowIndex
            // REMOVE EMPLOYEE FROM ARRAY
            empTable.deleteRow(rowIndex)
        }
    }
})

// BUILD THE EMPLOYEES GRID
async function buildGrid() {
    // REMOVE THE EXISTING SET OF ROWS BY REMOVING THE ENTIRE TBODY SECTION
    empTable.lastElementChild.remove()
    // REBUILD THE TBODY FROM SCRATCH
    let tbody = document.createElement('tbody')

    // different uris for easy testing
    let uri = 
        'invalidPath';
        // './data/employees.json';
        // 'https://jsonplaceholder.typicode.com/users';

    // init file grabs data from uri source
    init(uri)
        .then(employees => {
            // console.log(employees)
            for (let employee of employees) {
                tbody.innerHTML += 
                `<tr>
                    <th>${employee.id}</th>
                    <th>${employee.name}</th>
                    <th>${employee.extension}</th>
                    <th>${employee.email}</th>
                    <th>${employee.title}</th>
                    <th><button class="btn btn-sm btn-danger delete">X</button></th>
                </tr>`
            }
            empCount.value = `(${employees.length})`
        })
        .catch(e => console.log(e.message))


    // BIND THE TBODY TO THE EMPLOYEE TABLE
    empTable.appendChild(tbody)
    // UPDATE EMPLOYEE COUNT

}