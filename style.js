const userForm = document.getElementById('userForm');
const userList = document.getElementById('userList');

async function fetchUsers() {
  const response = await fetch('/users');
  const users = await response.json();
  userList.innerHTML = '';
  users.forEach(user => {
    const li = document.createElement('li');
    li.textContent = `${user.username} (${user.email})`;
    userList.appendChild(li);
  });
}

userForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;

  await fetch('/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, email }),
  });

  document.getElementById('username').value = '';
  document.getElementById('email').value = '';
  fetchUsers();
});

fetchUsers();