document.addEventListener('DOMContentLoaded', function() {
  const notesList = document.getElementById('notes-list');
  const noteTitleInput = document.getElementById('note-title');
  const noteTextInput = document.getElementById('note-text');
  const saveNoteBtn = document.getElementById('save-note');
  const clearFormBtn = document.getElementById('clear-form');
  const newNoteBtn = document.getElementById('new-note');

  // Function to fetch notes from the server and update the UI
  function fetchNotes() {
    fetch('/api/notes')
      .then(response => response.json())
      .then(notes => renderNotes(notes))
      .catch(error => console.error('Error fetching notes:', error));
  }

  // Function to render notes list
  function renderNotes(notes) {
    notesList.innerHTML = '';
    notes.forEach(note => {
      const noteItem = document.createElement('li');
      noteItem.classList.add('note-item');
      noteItem.dataset.noteId = note.id;
      noteItem.innerHTML = `
        <button class="view-note-btn">${note.title}</button>
        <button class="delete-note-btn">X</button>
      `;
      notesList.appendChild(noteItem);
    });
  }

  // Event listener for Save Note button
  saveNoteBtn.addEventListener('click', function(event) {
    event.preventDefault();

    const noteTitle = noteTitleInput.value.trim();
    const noteText = noteTextInput.value.trim();

    if (!noteTitle || !noteText) {
      alert('Please enter both title and text for the note.');
      return;
    }

    const newNote = {
      title: noteTitle,
      text: noteText
    };

    fetch('/api/notes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newNote)
    })
    .then(response => response.json())
    .then(data => {
      console.log('Successfully added note:', data);
      fetchNotes(); // Refresh notes list after adding new note
      noteTitleInput.value = '';
      noteTextInput.value = '';
    })
    .catch(error => console.error('Error adding note:', error));
  });

  // Event listener for Clear Form button
  clearFormBtn.addEventListener('click', function(event) {
    event.preventDefault();
    noteTitleInput.value = '';
    noteTextInput.value = '';
  });

  // Event delegation for viewing and deleting notes
  notesList.addEventListener('click', function(event) {
    if (event.target.classList.contains('view-note-btn')) {
      const noteId = event.target.closest('.note-item').dataset.noteId;
      fetch(`/api/notes/${noteId}`)
        .then(response => response.json())
        .then(note => {
          noteTitleInput.value = note.title;
          noteTextInput.value = note.text;
        })
        .catch(error => console.error('Error fetching note:', error));
    } else if (event.target.classList.contains('delete-note-btn')) {
      const noteId = event.target.closest('.note-item').dataset.noteId;
      fetch(`/api/notes/${noteId}`, {
        method: 'DELETE'
      })
      .then(response => response.json())
      .then(data => {
        console.log('Successfully deleted note:', data);
        fetchNotes(); // Refresh notes list after deleting note
      })
      .catch(error => console.error('Error deleting note:', error));
    }
  });

  // Event listener for New Note button
  newNoteBtn.addEventListener('click', function(event) {
    event.preventDefault();
    noteTitleInput.value = '';
    noteTextInput.value = '';
  });

  // Initial fetch and render of notes when the page loads
  fetchNotes();
});