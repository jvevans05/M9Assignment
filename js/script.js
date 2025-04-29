// CREATE AN ARRAY OF EMPLOYEES
// let arrEmployees = [
//     [34123413, "Zak Ruvalcaba", 3424, "zak@vectacorp.com", "Executive"],
//     [23424665, "Sally Smith", 2344, "sally@vectacorp.com", "Administrative"],
//     [12341244, "Mark Martin", 5352, "mark@vectacorp.com", "Sales"],
//     [14545423, "Robin Banks", 7867, "robin@vectacorp.com", "Marketing"],
//     [13413453, "Sue Wedge", 1235, "sue@vectacorp.com", "QA"]
// ]

// get employees from json
// const xhr = new XMLHttpRequest()
// xhr.responseType = 'json'
// xhr.open('GET', '../data/employees.json')
// xhr.addEventListener('readystatechange', () => {
//     if (xhr.readyState === 4 && xhr.status === 200) {
//         let employees = xhr.response
//         for (let employee of employees) {
//             tbody.innerHTML += 
//                 `<tr>
//                     <th>${employee.id}</th>
//                     <th>${employee.name}</th>
//                     <th>${employee.extension}</th>
//                     <th>${employee.email}</th>
//                     <th>${employee.title}</th>
//                     <th>&nbsp;</th>
//                 </tr>`
//         }
//     }
// })
// xhr.onerror = (e) => {console.error(e.message)}
// xhr.send()


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
function buildGrid() {
    // REMOVE THE EXISTING SET OF ROWS BY REMOVING THE ENTIRE TBODY SECTION
    empTable.lastElementChild.remove()
    // REBUILD THE TBODY FROM SCRATCH
    let tbody = document.createElement('tbody')

    // fetch('C:\Users\Jon\Documents Actual\comp690-693\comp690\M9Assignment\data\employees.json')
    fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(employees => {
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


    // LOOP THROUGH THE ARRAY OF EMPLOYEES
    // REBUILDING THE ROW STRUCTURE
    // for (let employee of arrEmployees) {
    //     tbody.innerHTML += 
    //     `
    //     <tr>
    //         <td>${employee[0]}</td>
    //         <td>${employee[1]}</td>
    //         <td>${employee[2]}</td>
    //         <td><a href="mailto:${employee[3]}">${employee[3]}</a></td>
    //         <td>${employee[4]}</td>
    //         <td><button class="btn btn-sm btn-danger delete">X</button></td>
    //     </tr>
    //     `
    // }
    // BIND THE TBODY TO THE EMPLOYEE TABLE
    empTable.appendChild(tbody)
    // UPDATE EMPLOYEE COUNT

}