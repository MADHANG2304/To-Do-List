let addBtn = document.getElementById("addbtn");
let form = document.getElementById("reminderForm");
let saveBtn = document.getElementById("saveBtn");
// let submitBtn = document.getElementById("submitBtn");
let emptyDiv = document.getElementById("empty");
let grid = document.getElementById("grid");
let table = document.getElementById("table");
let cardContainer = document.getElementById("cardContainer");
let tableContainer = document.getElementById("tableContainer");
let tableBody = document.getElementById("tableBody");
let emptyMsg = document.getElementById("emptyTableMsg");
let searchData = document.getElementById("search-data");
const modalEl = document.getElementById("staticBackdrop");
const modal = bootstrap.Modal.getOrCreateInstance(modalEl);


let remainder = [
  {
    id: Date.now() + 1,
    title: "Walking",
    category: "Work",
    date: "11-11-2026",
    priority: "High",
    note: "Walking",
  },
  {
    id: Date.now() + 2,
    title: "Cleaning",
    category: "Home",
    date: "01-18-2026",
    priority: "Medium",
    note: "Clean the room",
  },
  {
    id: Date.now() + 3,
    title: "Running",
    category: "Work",
    date: "02-19-2026",
    priority: "High",
    note: "Morning running",
  },
  {
    id: Date.now() + 4,
    title: "Reading",
    category: "Personal",
    date: "10-01-2026",
    priority: "Medium",
    note: "Read a book",
  },

  {
    id: Date.now() + 5,
    title: "Cooking",
    category: "Personal",
    date: "12-01-2026",
    priority: "Low",
    note: "Cook lunch",
  },

  {
    id: Date.now() + 6,
    title: "Meeting",
    category: "Work",
    date: "09-10-2024",
    priority: "High",
    note: "Team meeting",
  },

  {
    id: Date.now() + 7,
    title: "Birthday",
    category: "Personal",
    date: "06-23-2026",
    priority: "Low",
    note: "My Birthday",
  },


  {
    id: Date.now() + 8,
    title: "Shopping",
    category: "Personal",
    date: "07-07-2024",
    priority: "Medium",
    note: "Buy groceries",
  },
  {
    id: Date.now() + 9,
    title: "Exercising",
    category: "Health",
    date: "04-06-2026",
    priority: "High",
    note: "Gym workout",
  },
  {
    id: Date.now() + 10,
    title: "Studying",
    category: "Education",
    date: "08-09-2024",
    priority: "High",
    note: "Study for exam",
  },

  {
    id: Date.now() + 11,
    title: "Exploring",
    category: "Leisure",
    date: "04-15-2026",
    priority: "Low",
    note: "Explore new places",
  },
  {
    id: Date.now() + 12,
    title: "Mailing",
    category: "Work",
    date: "07-27-2026",
    priority: "Low",
    note: "Send emails",
  },

];

let editIndex = null;
let editMode = false;


window.addEventListener("load", () => {
  if (remainder.length > 0) {
    cardContainer.classList.remove("d-none");
    cardContainer.classList.add("d-flex");
    tableContainer.classList.add("d-none");
    emptyMsg.classList.add("d-none");
    renderList();
  }
})


function debounce(search, delay) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      search.apply(this, ...args);
    }, delay)
  }
}

function search() {
  let data = searchData.value;
  data = data.toLowerCase();
  if (data.length <= 0) {
    localStorage.removeItem("searchArray")
    renderList()
    renderTable()
    return;
  }
  let searchRemainder = []

  remainder.forEach((val, index) => {
    if (val.title.toLowerCase().includes(data)) {
      // searchRemainder.push(remainder[index])
      searchRemainder.push(
        {
          id: val.id,
          title: val.title,
          category: val.category,
          date: val.date,
          priority: val.priority,
          note: val.note
        })
    }
  })

  if (searchRemainder.length > 0) {
    localStorage.setItem('searchArray', JSON.stringify(searchRemainder));
  }
  else {
    localStorage.removeItem("searchArray");
  }
  renderList()
  renderTable()
}

searchData.addEventListener("input", debounce(search, 1000));


addBtn.addEventListener("click", (event) => {
  editIndex = null;
  editMode = false;
});

saveBtn.addEventListener("click", (event) => {
  addNote();
  search();
  renderList();
  renderTable();
});




grid.addEventListener("click", (event) => {
  cardContainer.classList.remove("d-none");
  cardContainer.classList.add("d-flex");
  tableContainer.classList.add("d-none");
  emptyMsg.classList.add("d-none");
  grid.style.backgroundColor = "#f0f0f0";
  grid.style.color = "#000000";
  table.style.backgroundColor = "#5D688A";
  renderList();
});

table.addEventListener("click", (event) => {
  cardContainer.classList.add("d-none");
  tableContainer.classList.remove("d-none");
  tableContainer.classList.add("d-flex");
  emptyMsg.classList.add("d-none");
  table.style.backgroundColor = "#f0f0f0";
  table.style.color = "#000000";
  grid.style.backgroundColor = "#5D688A";
  renderTable();
});


function addNote() {

  let title = document.getElementById("title").value;
  let category = document.getElementById("category").value;
  let tempDate = document.getElementById("date").value;
  let date = new Date(tempDate).toLocaleDateString("en-GB");
  let priority = document.getElementById("priority").value;
  let note = document.getElementById("notes").value;

  if (editMode && editIndex != null) {
    remainder.forEach((data) => {
      if(data.id === editIndex)
      {
        data.title = title,
        data.category = category,
        data.date = date,
        data.priority = priority,
        data.note = note
      }
    })
  }
  else {
    // if(title === "")
    // {
        
    // }

    remainder.push(
      {
        id: Date.now(),
        title: title,
        category: category,
        date: date,
        priority: priority,
        note: note,
      }
    )
  }

  editIndex = null;
  editMode = false;


  renderList();
  renderTable();
  modal.hide();

  // form.reset();
}


function renderList() {
  let rem = remainder;
  const array = localStorage.getItem("searchArray");
  const searchArray = JSON.parse(array)


  if (array != null && searchArray.length > 0) {
    rem = searchArray;
  }

  cardContainer.innerHTML = "";
  rem.forEach((data, i) => {
    let card = document.createElement("div");
    card.className = `card card-${data.priority}`;

    card.innerHTML = `
    <div class="card-header">
    <h2>${data.title}</h2>
    <span class="category">${data.category}</span>
    </div>
    <span class="due-date" style="margin-left:15px">Due: ${data.date}</span>
    <p class="task-desc" style="margin-left:15px">${data.note}</p>
    <div class="card-body">
    <span class="priority ${data.priority}">${data.priority.charAt(0).toUpperCase() + data.priority.slice(1)} Priority</span>
    </div>
    <span class="status" style="margin-left:14px" id="status">Status: Pending</span>
    <div class="card-footer">
    <div class="actions">
    <button class="edit-btn btn-outline-primary rounded p-1" id="update">Edit</button>
    <button class="delete-btn btn-outline-danger rounded p-1" onclick = "deleteItem(${data.id})">Delete</button>
    <button class="undo-btn btn-outline-warning rounded p-1" >Done</button>
    </div>
    </div>
    `;

    card.classList.add("w-25")

    const doneBtn = card.querySelector(".undo-btn");
    const status = card.querySelector(".status");
    const editBtn = card.querySelector(".edit-btn");

    doneBtn.addEventListener("click", () => {
      const completed = card.classList.toggle("completed");

      if (completed) {
        doneBtn.textContent = "Redo";
        status.textContent = "Status: Completed"
      }
      else {
        card.style.opacity = 1.0
        doneBtn.textContent = "Done";
        status.textContent = "Status: Pending"
      }
    })

    editBtn.addEventListener("click", () => {
      editMode = true;
      editIndex = data.id;

      document.getElementById("title").value = data.title;
      document.getElementById("category").value = data.category;
      let currDate = new Date(data.date).toLocaleDateString("en-GB");
      document.getElementById("date").value = currDate;
      // document.getElementById("date").value = data.date;
      document.getElementById("priority").value = data.priority;
      document.getElementById("notes").value = data.note;

      modal.show();
    })

    const msec = Date.parse(data.date);
    const curr = new Date();
    const csec = Date.parse(curr);

    if (csec - msec >= 0) {
      status.textContent = "Status: Overdue"
      doneBtn.textContent = "Undo"
      card.style.opacity = 0.4;
      card.classList.toggle("completed");
    }

    // emptyDiv.style.display = "none";
    cardContainer.appendChild(card);

  })
}



function renderTable() {

  let rem = remainder;
  const array = localStorage.getItem("searchArray");
  const searchArray = JSON.parse(array)
  if (array != null && searchArray.length > 0) {
    rem = searchArray;
  }

  tableBody.innerHTML = "";

  rem.forEach((data, i) => {
    let row = document.createElement("tr");
    row.className = `row-${data.priority}`;
    row.innerHTML = `
        <td class="tbTitle">${data.title}</td>
        <td class="tbCate">${data.category}</td>
        <td>
        <span class="priority ${data.priority}">
          ${data.priority.charAt(0).toUpperCase() + data.priority.slice(1)}
        </span></td>
        <td class="tbDate">${data.date}</td>
        <td class="tbNotes">${data.note}</td>
        <td class="status">Pending</td>
        <td style="width:23%">
         <div class="actions">
            <button class="edit-btn btn-outline-primary rounded">Edit</button>
            <button class="delete-btn btn-outline-danger rounded" onclick="deleteItem(${data.id})">Delete</button>
            <button class="undo-btn btn-outline-warning rounded" >Done</button>
        </div>
        </td>

    `;

    const doneBtn = row.querySelector(".undo-btn");
    const status = row.querySelector(".status");
    const editBtn = row.querySelector(".edit-btn");

    doneBtn.addEventListener("click", () => {
      const completed = row.classList.toggle("completed");

      if (completed) {
        doneBtn.textContent = "Redo";
        status.textContent = "Completed"
      }
      else {
        row.style.opacity = 1;
        doneBtn.textContent = "Done";
        status.textContent = "Pending"
      }
    })

    editBtn.addEventListener("click", () => {
      editMode = true;
      editIndex = data.id;

      document.getElementById("title").value = data.title;
      document.getElementById("category").value = data.category;
      document.getElementById("date").value = data.date;
      document.getElementById("priority").value = data.priority;
      document.getElementById("notes").value = data.note;

      modal.show();
      // modal.style.display = "flex";
    });

    const msec = Date.parse(data.date);
    const curr = new Date();
    const csec = Date.parse(curr);

    if (csec - msec >= 0) {
      status.textContent = "OverDue"
      doneBtn.textContent = "Undo"
      row.style.opacity = 0.4;
      row.classList.toggle("completed");
    }
    emptyMsg.style.display = "none";
    tableBody.appendChild(row);
  })

}


function deleteItem(index) {
  remainder = remainder.filter(item => item.id != index);
  // localStorage.removeItem("searchArray")
  localStorage.setItem("searchArray", JSON.stringify(remainder));
  renderList();
  renderTable();
}

window.addEventListener('load', () => {
  localStorage.removeItem('searchArray');
})

