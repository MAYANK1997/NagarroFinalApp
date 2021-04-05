// App Controls
const addBtns = document.querySelectorAll(".add-btn:not(.solid)");
const saveItemBtns = document.querySelectorAll(".solid");
const addItemContainers = document.querySelectorAll(".add-container");
const addItems = document.querySelectorAll(".add-item");
const body = document.querySelector("body");

// Item Lists
const listColumns = document.querySelectorAll(".drag-item-list");
const backlogListEl = document.getElementById("backlog-list");
const progressListEl = document.getElementById("progress-list");
const completeListEl = document.getElementById("complete-list");
const onHoldListEl = document.getElementById("on-hold-list");

// Dashboard Constants
const greeting = document.getElementById("greeting");
const logout = document.getElementById("logout");

//Heading Constants

const backlogHeader = document.querySelector(".backlog-column");
const progressHeader = document.querySelector(".progress-column");
const completeHeader = document.querySelector(".complete-column");
const onholdHeader = document.querySelector(".on-hold-column");
const tableBody = document.getElementById("table-body");
const dataTable = document.getElementById("data-table");

// Element Object

function dashboardElement(
  backlogTimestamp,
  progressTimestamp,
  completeTimestamp,
  onholdTimestamp,
  data
) {
  this.backlogTimestamp = backlogTimestamp;
  this.progressTimestamp = progressTimestamp;
  this.completeTimestamp = completeTimestamp;
  this.onholdTimestamp = onholdTimestamp;
  this.data = data;
}

// Heading Events

body.addEventListener("click", (e) => {
  e.stopPropagation();
  dataTable.style.visibility = "hidden";
});

backlogHeader.addEventListener("click", (e) => {
  e.stopPropagation();
  console.table(backlogListArray);

  tableBody.innerHTML = "";

  backlogListArray.forEach((row) => {
    const tr = document.createElement("tr");

    Object.keys(row).forEach(function (key, idx) {
      console.log(key + ": " + row[key]);
      const td = document.createElement("td");
      if (row[key] === "") {
        td.textContent = "none";
      } else {
        td.textContent = row[key];
      }
      tr.appendChild(td);
    });

    tableBody.appendChild(tr);
    dataTable.style.visibility = "visible";
  });
});

progressHeader.addEventListener("click", (e) => {
  e.stopPropagation();
  console.table(progressListArray);
  tableBody.innerHTML = "";
  progressListArray.forEach((row) => {
    const tr = document.createElement("tr");

    Object.keys(row).forEach(function (key, idx) {
      console.log(key + ": " + row[key]);
      const td = document.createElement("td");
      if (row[key] === "") {
        td.textContent = "none";
      } else {
        td.textContent = row[key];
      }
      tr.appendChild(td);
    });

    tableBody.appendChild(tr);
  });
});

completeHeader.addEventListener("click", (e) => {
  e.stopPropagation();
  console.table(completeListArray);
  tableBody.innerHTML = "";
  completeListArray.forEach((row) => {
    const tr = document.createElement("tr");

    Object.keys(row).forEach(function (key, idx) {
      console.log(key + ": " + row[key]);
      const td = document.createElement("td");
      if (row[key] === "") {
        td.textContent = "none";
      } else {
        td.textContent = row[key];
      }
      tr.appendChild(td);
    });

    tableBody.appendChild(tr);
  });
});

onholdHeader.addEventListener("click", (e) => {
  e.stopPropagation();
  console.table(onHoldListArray);
  tableBody.innerHTML = "";
  onHoldListArray.forEach((row) => {
    const tr = document.createElement("tr");

    Object.keys(row).forEach(function (key, idx) {
      console.log(key + ": " + row[key]);
      const td = document.createElement("td");
      if (row[key] === "") {
        td.textContent = "none";
      } else {
        td.textContent = row[key];
      }
      tr.appendChild(td);
    });

    tableBody.appendChild(tr);
  });
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    hideInputBox(0);
    hideInputBox(1);
    hideInputBox(2);
    hideInputBox(3);
  }
});

// Dashboard Functionality
window.addEventListener("load", (event) => {
  let data = sessionStorage.getItem("user");
  if (data === null) {
    window.location.href = "http://127.0.0.1:5500/NagarroFinalApp/index.html";
    //window.location.href = 'https://mayank1997.github.io/NagarroFinalApp/index.html';
  } else {
    greeting.innerText = `Hello, ${
      JSON.parse(sessionStorage.getItem("user")).username
    }`;
  }
});

logout.addEventListener("click", () => {
  sessionStorage.removeItem("user");
  window.location.href = "http://127.0.0.1:5500/NagarroFinalApp/index.html";
  //window.location.href = 'https://mayank1997.github.io/NagarroFinalApp/index.html';
});

// Items
let updatedOnLoad = false;

// Initialize Arrays
let backlogListArray = [];
let progressListArray = [];
let completeListArray = [];
let onHoldListArray = [];
let listArrays = [];

// Drag Functionality
let draggedItem;
let dragging = false;
let currentColumn;

// Get Arrays from localStorage if available, set default values if not
function getSavedColumns() {
  if (localStorage.getItem("backlogItems")) {
    backlogListArray = JSON.parse(localStorage.backlogItems);
    progressListArray = JSON.parse(localStorage.progressItems);
    completeListArray = JSON.parse(localStorage.completeItems);
    onHoldListArray = JSON.parse(localStorage.onHoldItems);
  } else {
    backlogListArray = [
      new dashboardElement(new Date(), "", "", "", "Release the course"),
      new dashboardElement(new Date(), "", "", "", "Sit back and relax"),
    ];
    progressListArray = [
      new dashboardElement("", new Date(), "", "", "Work on projects"),
      new dashboardElement("", new Date(), "", "", "Listen to music"),
    ];
    completeListArray = [
      new dashboardElement("", "", new Date(), "", "Being cool"),
      new dashboardElement("", "", new Date(), "", "Getting stuff done"),
    ];
    onHoldListArray = [
      new dashboardElement("", "", "", new Date(), "Being uncool"),
    ];
  }
}

// Set localStorage Arrays
function updateSavedColumns() {
  listArrays = [
    backlogListArray,
    progressListArray,
    completeListArray,
    onHoldListArray,
  ];
  const arrayNames = ["backlog", "progress", "complete", "onHold"];
  arrayNames.forEach((arrayName, index) => {
    localStorage.setItem(
      `${arrayName}Items`,
      JSON.stringify(listArrays[index])
    );
  });
}

// Filter Array to remove empty values
function filterArray(array) {
  const filteredArray = array.filter((item) => item !== null);
  return filteredArray;
}

// Create DOM Elements for each list item
function createItemEl(columnEl, column, item, index) {
  // List Item

  const listEl = document.createElement("li");
  listEl.textContent = item;
  listEl.id = index;
  listEl.classList.add("drag-item");
  listEl.draggable = true;
  listEl.setAttribute("onfocusout", `updateItem(${index}, ${column})`);
  listEl.setAttribute("ondragstart", "drag(event)");
  listEl.contentEditable = true;
  // Append
  columnEl.appendChild(listEl);
}

// Update Columns in DOM - Reset HTML, Filter Array, Update localStorage
function updateDOM() {
  // Check localStorage once
  if (!updatedOnLoad) {
    getSavedColumns();
  }
  // Backlog Column
  backlogListEl.textContent = "";
  backlogListArray.forEach((backlogItem, index) => {
    createItemEl(backlogListEl, 0, backlogItem.data, index);
  });
  backlogListArray = filterArray(backlogListArray);
  // Progress Column
  progressListEl.textContent = "";
  progressListArray.forEach((progressItem, index) => {
    createItemEl(progressListEl, 1, progressItem.data, index);
  });
  progressListArray = filterArray(progressListArray);
  // Complete Column
  completeListEl.textContent = "";
  completeListArray.forEach((completeItem, index) => {
    createItemEl(completeListEl, 2, completeItem.data, index);
  });
  completeListArray = filterArray(completeListArray);
  // On Hold Column
  onHoldListEl.textContent = "";
  onHoldListArray.forEach((onHoldItem, index) => {
    createItemEl(onHoldListEl, 3, onHoldItem.data, index);
  });
  onHoldListArray = filterArray(onHoldListArray);
  // Don't run more than once, Update Local Storage
  updatedOnLoad = true;
  updateSavedColumns();
}

// Update Item - Delete if necessary, or update Array value
function updateItem(id, column) {
  const selectedArray = listArrays[column];
  const selectedColumn = listColumns[column].children;
  if (!dragging) {
    if (!selectedColumn[id].textContent) {
      delete selectedArray[id];
    } else {
      selectedArray[id].data = selectedColumn[id].textContent;
    }
    updateDOM();
  }
}

// Add to Column List, Reset Textbox
function addToColumn(column) {
  const itemText = addItems[column].textContent;
  if (itemText === "") {
    return;
  }
  const selectedArray = listArrays[column];
  switch (column) {
    case 0:
      selectedArray.push(
        new dashboardElement(new Date(), "", "", "", itemText)
      );
      break;
    case 1:
      selectedArray.push(
        new dashboardElement("", new Date(), "", "", itemText)
      );
      break;
    case 2:
      selectedArray.push(
        new dashboardElement("", "", new Date(), "", itemText)
      );
      break;
    case 3:
      selectedArray.push(
        new dashboardElement("", "", "", new Date(), itemText)
      );
      break;
  }
  //selectedArray.push(itemText);
  addItems[column].textContent = "";
  updateDOM(column);
}

// Show Add Item Input Box
function showInputBox(column) {
  addBtns[column].style.visibility = "hidden";
  saveItemBtns[column].style.display = "flex";
  addItemContainers[column].style.display = "flex";
}

// Hide Item Input Box
function hideInputBox(column) {
  addBtns[column].style.visibility = "visible";
  saveItemBtns[column].style.display = "none";
  addItemContainers[column].style.display = "none";
  addToColumn(column);
}

// Allows arrays to reflect Drag and Drop items
function rebuildArrays() {
  backlogListArray = [];
  for (let i = 0; i < backlogListEl.children.length; i++) {
    backlogListArray.push(
      new dashboardElement(
        new Date(),
        "",
        "",
        "",
        backlogListEl.children[i].textContent
      )
    );
  }
  progressListArray = [];
  for (let i = 0; i < progressListEl.children.length; i++) {
    progressListArray.push(
      new dashboardElement(
        "",
        new Date(),
        "",
        "",
        progressListEl.children[i].textContent
      )
    );
  }
  completeListArray = [];
  for (let i = 0; i < completeListEl.children.length; i++) {
    completeListArray.push(
      new dashboardElement(
        "",
        "",
        new Date(),
        "",
        completeListEl.children[i].textContent
      )
    );
  }
  onHoldListArray = [];
  for (let i = 0; i < onHoldListEl.children.length; i++) {
    onHoldListArray.push(
      new dashboardElement(
        "",
        "",
        "",
        new Date(),
        onHoldListEl.children[i].textContent
      )
    );
  }
  updateDOM();
}

// When Item Enters Column Area
function dragEnter(column) {
  listColumns[column].classList.add("over");
  currentColumn = column;
}

// When Item Starts Dragging
function drag(e) {
  draggedItem = e.target;
  dragging = true;
}

// Column Allows for Item to Drop
function allowDrop(e) {
  e.preventDefault();
}

// Dropping Item in Column
function drop(e) {
  e.preventDefault();
  const parent = listColumns[currentColumn];
  // Remove Background Color/Padding
  listColumns.forEach((column) => {
    column.classList.remove("over");
  });
  // Add item to Column
  parent.appendChild(draggedItem);
  // Dragging complete
  dragging = false;
  rebuildArrays();
}

// On Load
updateDOM();
