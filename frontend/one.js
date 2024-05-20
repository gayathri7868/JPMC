

async function getData() {
    const response = await fetch('http://localhost:2000/api/students', {
        method: 'GET',
        mode: 'cors'
    })

    const data = await response.json()

    const tableBody = document.getElementById('tb');
    tableBody.innerText = ""
    data.forEach(element => {
        const row = document.createElement('tr');

        const rollNoCell = document.createElement('td');
        rollNoCell.textContent = element._id;
        row.appendChild(rollNoCell);

        const nameCell = document.createElement('td');
        nameCell.textContent = element.name;
        row.appendChild(nameCell);

        const ageCell = document.createElement('td');
        ageCell.textContent = element.branch;
        row.appendChild(ageCell);

        const courseCell = document.createElement('td');
        courseCell.textContent = element.marks;
        row.appendChild(courseCell);

        const actionCell = document.createElement('td');
        actionCell.innerHTML = `<button onclick="editData('${element._id}')"><i class="fa-solid fa-pen-to-square"></i></button>` + `<button onclick="deleteData(${element._id})"><i class='fas fa-trash-alt' style='font-size:15px'></i></button>`
        row.appendChild(actionCell)

        tableBody.appendChild(row);
    })
}

async function createData() {
    let id = document.getElementById("id").value
    let name = document.getElementById("name").value
    let branch = document.getElementById("branch").value
    let marks = document.getElementById("marks").value
    const data1 = { id, name, branch, marks }
    console.log(data1)
    try {
        const response = await fetch('http://localhost:2000/api/students', {
            method: 'POST',
            body: JSON.stringify(data1),
            headers: { 'Content-Type': 'application/json' },
            mode: 'cors',
        })
        const data = await response.json()
        getData()
    } catch (err) {
        console.error('Err:')
    }
}


async function editData(id1) {
    console.log(id1)
    data = {}
    let rollno = document.getElementById("id").value
    if (rollno != null && rollno != '') {
        data.id = Number(rollno)
    }
    let name = document.getElementById("name").value
    if (name != null && name != '') {
        data.name = name
    }

    let branch = document.getElementById("branch").value
    if (branch != null && branch != '') {
        data.branch = branch
    }
    let marks = document.getElementById("marks").value
    if (marks != null && marks != '') {
        data.marks = marks
    }
    try {
        const response = await fetch(`http://localhost:2000/api/students/${id1}`, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' },
            mode: 'cors',
        })
        getData()
    } catch (err) {
        console.error('Err:')
    }


}

async function deleteData(id1) {
    try {
        const response = await fetch(`http://localhost:2000/api/students/${id1}`, {
            method: 'DELETE',
            mode: 'cors',
        });
        console.log("Data deleted successfully");
        getData(); // Assuming this function exists
    } catch (err) {
        console.error('Error:', err.message);
    }
}
