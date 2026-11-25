import { useEffect, useState } from "react";
import "./App.css";

const API_URL = `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/contacts`;

function App() {
  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    category: "Personal",
  });

  const fetchContacts = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setContacts(data);
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const url = editingId
        ? `${API_URL}/${editingId}`
        : API_URL;

      const response = await fetch(url, {
        method: editingId ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error("Unable to save contact");
      }

      setForm({
        name: "",
        email: "",
        phone: "",
        address: "",
        category: "Personal",
      });

      setShowForm(false);
      setEditingId(null);
      fetchContacts();
    } catch (error) {
      alert(error.message);
    }
  };

  const handleEdit = (contact) => {
    setForm({
      name: contact.name,
      email: contact.email || "",
      phone: contact.phone,
      address: contact.address || "",
      category: contact.category || "Personal",
    });

    setEditingId(contact._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this contact?")) {
      return;
    }

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Unable to delete contact");
      }

      fetchContacts();
    } catch (error) {
      alert(error.message);
    }
  };

  const filteredContacts = contacts.filter((contact) =>
    `${contact.name} ${contact.email} ${contact.phone}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="app">
      <header className="header">
        <div className="logo">Contact<span>Book.</span></div>
        <div className="header-tag">MY PERSONAL DIRECTORY</div>
      </header>

      <main className="container">
        <section className="welcome">
          <div>
            <p className="eyebrow">YOUR PEOPLE, ORGANIZED</p>
            <h1>All your contacts.<br /><span>One beautiful place.</span></h1>
            <p className="subtitle">
              Keep your important connections close and organized.
            </p>
          </div>

          <button
            className="add-btn"
            onClick={() => {
              setForm({
                name: "",
                email: "",
                phone: "",
                address: "",
                category: "Personal",
              });
              setEditingId(null);
              setShowForm(true);
            }}
          >
            + Add Contact
          </button>
        </section>

        <section className="stats">
          <div className="stat-card">
            <span>Total Contacts</span>
            <h2>{contacts.length}</h2>
          </div>
          <div className="stat-card">
            <span>Personal</span>
            <h2>
              {contacts.filter((c) => c.category === "Personal").length}
            </h2>
          </div>
          <div className="stat-card">
            <span>Work</span>
            <h2>
              {contacts.filter((c) => c.category === "Work").length}
            </h2>
          </div>
        </section>

        <section className="contacts-section">
          <div className="section-heading">
            <div>
              <h2>Your Contacts</h2>
              <p>Manage all your connections in one place.</p>
            </div>

            <input
              className="search"
              type="text"
              placeholder="Search contacts..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {filteredContacts.length === 0 ? (
            <div className="empty">
              <div className="empty-icon">♡</div>
              <h3>No contacts found</h3>
              <p>Add your first contact or try another search.</p>
            </div>
          ) : (
            <div className="contact-grid">
              {filteredContacts.map((contact) => (
                <div className="contact-card" key={contact._id}>
                  <div className="card-top">
                    <div className="avatar">
                      {contact.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="category">
                      {contact.category}
                    </span>
                  </div>

                  <h3>{contact.name}</h3>
                  <p>✉ {contact.email || "No email added"}</p>
                  <p>☎ {contact.phone}</p>
                  <p>⌖ {contact.address || "No address added"}</p>

                  <div className="card-actions">
                    <button onClick={() => handleEdit(contact)}>
                      Edit
                    </button>
                    <button
                      className="delete"
                      onClick={() => handleDelete(contact._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      {showForm && (
        <div className="modal-overlay">
          <form className="contact-form" onSubmit={handleSubmit}>
            <h2>{editingId ? "Edit Contact" : "Add New Contact"}</h2>
            <p>Enter the contact details below.</p>

            <input
              name="name"
              placeholder="Full Name *"
              value={form.name}
              onChange={handleChange}
              required
            />

            <input
              name="email"
              type="email"
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange}
            />

            <input
              name="phone"
              placeholder="Phone Number *"
              value={form.phone}
              onChange={handleChange}
              required
            />

            <input
              name="address"
              placeholder="Address"
              value={form.address}
              onChange={handleChange}
            />

            <select
              name="category"
              value={form.category}
              onChange={handleChange}
            >
              <option value="Personal">Personal</option>
              <option value="Work">Work</option>
              <option value="Family">Family</option>
              <option value="Other">Other</option>
            </select>

            <div className="form-actions">
              <button type="button" onClick={() => setShowForm(false)}>
                Cancel
              </button>
              <button type="submit" className="save-btn">
                {editingId ? "Update Contact" : "Save Contact"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default App;