async function fetchData() {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos/');
  return await response.json();
}

async function showList() {
  toggleList();
  toggleButton();
  const userList = await fetchData();
  const dropDown = document.getElementById('dropDownList');
  const userId = userList.map((user) => user.userId);
  dropDown.innerHTML = userId
    .filter((user, index) => userId.indexOf(user) === index)
    .map(
      (user) => `
<a id="list" onclick="filterList(${user})">User ID: ${user}</a>
`
    )
    .join('');
}

function toggleList() {
  document.getElementById('dropDownList').classList.toggle('show');
}

function toggleButton() {
  document.getElementById('button').classList.toggle('press');
}

async function filterList(userId) {
  toggleList();
  toggleButton();
  const taskList = await fetchData();
  const taskTable = document.getElementById('taskList');
  taskTable.innerHTML = taskList
    .filter((task) => task.userId === userId)
    .map(
      (task) => `
  <tr>
    <td>${task.userId}: ${task.title}</td>
  </tr>
  `
    )
    .join('');
}

async function loadPage() {
  const taskList = await fetchData();
  const taskTable = document.getElementById('taskList');
  taskTable.innerHTML = taskList
    .map(
      (task) => `
  <tr>
    <td>${task.userId}: ${task.title}</td>
  </tr>
  `
    )
    .join('');
}

loadPage();
