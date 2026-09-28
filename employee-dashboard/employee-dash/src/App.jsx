import { useState } from "react";
import "./App.css";

const initialEmployees = [
  {
    id: 1,
    name: "Rahul",
    email: "rahul@test.com",
    role: "Developer",
    status: "Active",
  },
  {
    id: 2,
    name: "Priya",
    email: "priya@test.com",
    role: "Designer",
    status: "Active",
  },
  {
    id: 3,
    name: "Arjun",
    email: "arjun@test.com",
    role: "Developer",
    status: "Inactive",
  },
  {
    id: 4,
    name: "Sneha",
    email: "sneha@test.com",
    role: "HR",
    status: "Active",
  },
  {
    id: 5,
    name:"Hitesh",
    email:"hiteshkanisetty@gmail.com",
    role:" Developer",
    status:"Inactive",
  }
];

function App() {
  const [employees, setEmployees] = useState(initialEmployees);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    status: "Active",
  });


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEmployee = {
      id: Date.now(),
      ...formData,
    };

    setEmployees([...employees, newEmployee]);

    setFormData({
      name: "",
      email: "",
      role: "",
      status: "Active",
    });
  };

  const handleDelete = (id) => {
    setEmployees(employees.filter((employee) => employee.id !== id));
  };


  const filteredEmployees = employees.filter((employee) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      employee.name.toLowerCase().includes(searchText) ||
      employee.email.toLowerCase().includes(searchText);

    const matchesStatus =
      statusFilter === "All" || employee.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="app">
      <header className="header">
        <h1>Employee Management Dashboard</h1>
        <p>Manage your employees</p>
      </header>

      <main className="container">
   
        <section className="card">
          <h2>Add Employee</h2>

          <form onSubmit={handleSubmit} className="employee-form">
            <input
              type="text"
              name="name"
              placeholder="Employee Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="role"
              placeholder="Role"
              value={formData.role}
              onChange={handleChange}
              required
            />

            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>

            <button type="submit">Add Employee</button>
          </form>

        </section>

        <section className="card">
          <div className="list-header">
            <h2>Employees</h2>

            <div className="controls">
              <input
                type="text"
                placeholder="Search by name or email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="All">All</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>

          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {filteredEmployees.length > 0 ? (
                  filteredEmployees.map((employee) => (
                    <tr key={employee.id}>
                      <td>{employee.name}</td>
                      <td>{employee.email}</td>
                      <td>{employee.role}</td>
                      <td>
                        <span
                          className={`status ${employee.status.toLowerCase()}`}
                        >
                          {employee.status}
                        </span>
                      </td>
                      <td>
                        <button
                          className="delete-btn"
                          onClick={() => handleDelete(employee.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="no-results">
                      No employees found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;