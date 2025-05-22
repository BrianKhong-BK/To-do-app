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
`
    )
    .join('');
}

async function filterList(userId) {
  const taskList = await fetchData();
  const taskTable = document.getElementById('taskList');
  taskTable.innerHTML = taskList
    .filter((task) => task.userId === userId)
    .map(
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

async function loadPage() {
  const taskList = await fetchData();
  const taskTable = document.getElementById('taskList');
  taskTable.innerHTML = taskList
  .map(
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
