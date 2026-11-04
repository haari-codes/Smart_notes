const notesContainer = document.getElementById("notesContainer");
const createButton = document.getElementById("createNoteBtn");

let notes = JSON.parse(localStorage.getItem("smartNotes")) || [];

function saveNotes() {
    localStorage.setItem("smartNotes", JSON.stringify(notes));
    displayNotes();
}

function displayNotes() {
    notesContainer.innerHTML = "";

    if (notes.length === 0) {
        notesContainer.innerHTML = `
            <div class="empty">
                <div>📚</div>
                <h3>No notes yet!</h3>
                <p>Your saved notes will appear here.</p>
            </div>`;
        return;
    }

    notes.forEach((note, index) => {
        const card = document.createElement("div");
        card.className = "card";

        const title = document.createElement("h3");
        title.textContent = note.title;

        const subject = document.createElement("p");
        subject.textContent = "Subject: " + note.subject;

        const content = document.createElement("p");
        content.textContent = note.content;

        const edit = document.createElement("button");
        edit.textContent = "Edit";
        edit.onclick = () => editNote(index);

        const remove = document.createElement("button");
        remove.textContent = "Delete";
        remove.style.marginLeft = "8px";
        remove.onclick = () => deleteNote(index);

        card.append(title, subject, content, edit, remove);
        notesContainer.appendChild(card);
    });
}

function createNote() {
    const title = prompt("Enter note title:");
    if (!title || !title.trim()) return;

    const subject = prompt("Enter subject:");
    if (!subject || !subject.trim()) return;

    const content = prompt("Write your notes:");
    if (!content || !content.trim()) return;

    notes.push({
        title: title.trim(),
        subject: subject.trim(),
        content: content.trim()
    });

    saveNotes();
}

function editNote(index) {
    const updated = prompt("Edit your note:", notes[index].content);

    if (updated === null || !updated.trim()) return;

    notes[index].content = updated.trim();
    saveNotes();
}

function deleteNote(index) {
    if (confirm("Are you sure you want to delete this note?")) {
        notes.splice(index, 1);
        saveNotes();
    }
}

createButton.addEventListener("click", createNote);

displayNotes();
