const API_URL = "https://jsonplaceholder.typicode.com/users";

const userTableBody = document.querySelector("#user-table tbody");
const userForm = document.querySelector("#user-form");
const formTitle = document.querySelector("#form-title");

// Fetch and display users
async function fetchUsers() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Failed to fetch users");
    const users = await response.json();
    displayUsers(users);
  } catch (error) {
    console.error(error.message);
    alert("Error fetching users");
  }
}

function displayUsers(users) {
  userTableBody.innerHTML = "";
  users.forEach((user) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${user.id}</td>
      <td>${user.name.split(" ")[0]}</td>
      <td>${user.name.split(" ")[1]}</td>
      <td>${user.email}</td>
      <td>${user.company.name}</td>
      <td>
        <button onclick="editUser(${user.id})">Edit</button>
        <button onclick="deleteUser(${user.id})">Delete</button>
      </td>
    `;
    userTableBody.appendChild(row);
  });
}

// Add or Edit user
userForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const id = document.getElementById("user-id").value;
  const firstName = document.getElementById("first-name").value;
  const lastName = document.getElementById("last-name").value;
  const email = document.getElementById("email").value;
  const department = document.getElementById("department").value;

  const user = {
    name: `${firstName} ${lastName}`,
    email,
    company: { name: department },
  };

  try {
    if (id) {
      await fetch(`${API_URL}/${id}`, { method: "PUT", body: JSON.stringify(user) });
      alert("User updated successfully");
    } else {
      await fetch(API_URL, { method: "POST", body: JSON.stringify(user) });
      alert("User added successfully");
    }
    userForm.reset();
    fetchUsers();
  } catch (error) {
    console.error(error.message);
    alert("Error saving user");
  }
});

// Delete user
async function deleteUser(id) {
  try {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    alert("User deleted successfully");
    fetchUsers();
  } catch (error) {
    console.error(error.message);
    alert("Error deleting user");
  }
}

// Edit user
function editUser(id) {
  formTitle.textContent = "Edit User";
  document.getElementById("user-id").value = id;
  const row = [...userTableBody.rows].find((r) => r.cells[0].textContent == id);
  document.getElementById("first-name").value = row.cells[1].textContent;
  document.getElementById("last-name").value = row.cells[2].textContent;
  document.getElementById("email").value = row.cells[3].textContent;
  document.getElementById("department").value = row.cells[4].textContent;
}

// Initialize
fetchUsers();


