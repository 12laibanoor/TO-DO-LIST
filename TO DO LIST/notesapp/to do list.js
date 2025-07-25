
  let notes = [];

  // Close popup
  function closemodel() {
    document.getElementById('id01').style.display = 'none';
  }

  // Open popup
  function opennote(event) {
    document.getElementById('id01').style.display = 'block';
  }

  // Validate & Save note
  function validatenote() {
    let title = document.getElementById('input-field').value.trim();
    let description = document.getElementById('text-Area').value.trim();

    if (title === "") {
      alert("Title must be filled out");
      return false;
    }

    if (description === "") {
      alert("Please fill out notes");
      return false;
    }

    const note = {
      id: Date.now(), // unique ID
      title,
      description,
      date: new Date().toLocaleString()
    };

    notes.push(note);
    localStorage.setItem('myNotes', JSON.stringify(notes));
    renderNotes();
    document.getElementById('input-field').value = "";
    document.getElementById('text-Area').value = "";
    closemodel();
    return false;
  }

  // Render notes
  function renderNotes() {
    const notesContainer = document.getElementById('notes-container');
    notesContainer.innerHTML = "";

    notes.forEach(note => {
      const noteBox = document.createElement('div');
      noteBox.className = 'add-box note-box';
      noteBox.innerHTML = `
        <h3>${note.title}</h3>
        <p>${note.description}</p>
        <br>
        <small>${note.date}</small>
        <hr style="width:100%;">
        <br>
        <div class="note-buttons">
          <button class="edit-btn" onclick="editNote(${note.id})">Edit</button>
          <button class="delete-btn" onclick="deleteNote(${note.id})">Delete</button>
        </div>
      `;
      notesContainer.appendChild(noteBox);
    });
  }

  // Delete note
  function deleteNote(id) {
    let confirmDel = confirm("Are you sure you want to delete this note?");
  if (!confirmDel) return;
    notes = notes.filter(note => note.id !== id);
    localStorage.setItem('myNotes', JSON.stringify(notes));
    renderNotes();
  }

  // Edit note
  function editNote(id) {
    const note = notes.find(note => note.id === id);
    if (note) {
      document.getElementById('input-field').value = note.title;
      document.getElementById('text-Area').value = note.description;
      deleteNote(id); // remove old note
      opennote(); // reopen modal for editing
    }
  }

  // Search functionality
  document.addEventListener("DOMContentLoaded", () => {
    // Load from localStorage
    const storedNotes = localStorage.getItem('myNotes');
    if (storedNotes) {
      notes = JSON.parse(storedNotes);
      renderNotes();
    }

    // Search bar
    const searchInput = document.querySelector(".searchbar input");
    searchInput.addEventListener("input", () => {
      const keyword = searchInput.value.toLowerCase();
      const noteBoxes = document.querySelectorAll("#notes-container .note-box");

      noteBoxes.forEach(note => {
        const title = note.querySelector("h3").textContent.toLowerCase();
        const description = note.querySelector("p").textContent.toLowerCase();

        if (title.includes(keyword) || description.includes(keyword)) {
          note.style.display = "block";
        } else {
          note.style.display = "none";
        }
      });
    });
  });
