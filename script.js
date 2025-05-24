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
      <li><a class="dropdown-item" href="#" onclick="filterUserPage(${user})">User ID: ${user}</a></li>
      `)
    .join('') + 
    `
    <li><a class="dropdown-item" href="#" onclick="loadPage()">Show All</a></li>
    `;
}

async function filterUserPage(userId) {
  const taskList = await fetchData();
  user.innerHTML = userId
  taskTable.innerHTML = await generateList(filterUser(taskList, userId))
}

async function loadPage() {
  const taskList = await fetchData();
  user.innerHTML = `All User`
  taskTable.innerHTML = await generateList(taskList);
}

async function filterStatusPage(status){
  const taskList = await fetchData();
  const currentUser = user.innerHTML
  taskTable.innerHTML = (currentUser === "All User") ? await generateList(filterStatus(taskList, status)) : await generateList(filterUser(filterStatus(taskList, status), parseInt(currentUser)))
}

async function filterStatusPageAll(){
  const currentUser = user.innerHTML
  if (currentUser === "All User") {
    loadPage()
  } else {
    filterUserPage(parseInt(currentUser))
  }
}

function filterUser(task, userId){
  return task.filter((task) => task.userId === userId);
}

function filterStatus(task, status){
  return task.filter((task) => task.completed === status);
}

function generateList(task){
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
