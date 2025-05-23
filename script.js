const taskTable = document.getElementById('taskList');
const user = document.getElementById('user');

async function fetchData() {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos/');
  return await response.json();
}

async function showList() {
  const userList = await fetchData();
  const dropDown = document.getElementById('dropDownList');
  const userId = userList.map((user) => user.userId);
  dropDown.innerHTML = userId
    .filter((user, index) => userId.indexOf(user) === index)
    .map(
      (user) => `
      <li><a class="dropdown-item" href="#" onclick="filterList(${user})">User ID: ${user}</a></li>
      `)
    .join('') + 
    `
    <li><a class="dropdown-item" href="#" onclick="loadPage()">Show All</a></li>
    `;
}

async function filterList(userId) {
  const taskList = await fetchData();
  user.innerHTML = `User: ${userId}`
  taskTable.innerHTML = await generateList(taskList
    .filter((task) => task.userId === userId))
}

async function loadPage() {
  const taskList = await fetchData();
  user.innerHTML = `All User`
  taskTable.innerHTML = await generateList(taskList);
}

async function generateList(task){
  return task.map(
    (task) => {
      if(task.completed === true){
        return `
          <tr>
            <td>${task.userId}: ${task.title}</td>
            <td>✅ Completed</td>
          </tr>
          `
      } else {
        return `
            <tr>
              <td>${task.userId}: ${task.title}</td>
              <td>❌ Not Completed</td>
            </tr>
            `
      }}).join('')
}

loadPage();
