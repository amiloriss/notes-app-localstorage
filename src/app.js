
window.onload = () => {

    const notes = JSON.parse(localStorage.getItem('notes'));
    const addNote = document.getElementById('add-note');
    const notesWrapper = document.getElementById('notes-wrapper');

    const createNote = (noteValue = '') => {

        document.querySelector('.title').classList.add('hidden');
        const note = document.createElement('div');
        note.classList.add('note');

        note.innerHTML=`
        <div class="top-line">
            <i id="delete-btn"class="fas fa-times delete-btn"></i>
            <p id="edit-mode" class="edit-mode hidden">Edit Mode</p>
            <i id="edit-btn" class="fas fa-edit edit-btn"></i>
        </div>
        <div id="main-note" class="main-note"></div>
        <textarea id="note-text" class="note-text hidden"></textarea>`

        const editBtn = note.querySelector('.edit-btn');
        const deleteBtn = note.querySelector('.delete-btn');
        const editMode = note.querySelector('.edit-mode');

        const mainNote = note.querySelector('.main-note');
        const noteText = note.querySelector('.note-text');

        deleteBtn.addEventListener('click', ()=>{
            note.remove();
            saveToLS();
            if(JSON.parse(localStorage.getItem('notes')).length == 0){
                document.querySelector('.title').classList.remove('hidden');
            }
        })
        
        editBtn.addEventListener('click', ()=>{
            mainNote.classList.toggle('hidden');
            noteText.classList.toggle('hidden');
            editMode.classList.toggle('hidden');
        })
        
        noteText.addEventListener('keydown', (e)=>{
            if(e.keyCode === 13){
                mainNote.classList.toggle('hidden');
                noteText.classList.toggle('hidden');
                editMode.classList.toggle('hidden');      
            }
        });

        mainNote.innerHTML = noteValue === '' ? 'Please click on <i id="edit-btn" class="fas fa-edit edit-btn"></i> to add or edit text' : noteValue; 
        noteText.value = noteValue;

        noteText.addEventListener('input', (e)=>{

            let { value } = e.target;
            if (value.trim() === ''){
                value = 'Please click on <i id="edit-btn" class="fas fa-edit edit-btn"></i> to add or edit text';
                mainNote.innerHTML = value;
            }else mainNote.innerHTML = value;

            saveToLS();

        })

        notesWrapper.appendChild(note);
    }

    if(notes){
        if(notes.length == 0){
        } else { 
            document.querySelector('.title').classList.add('hidden');
            notes.forEach(note => {
            createNote(note);
        })}
    }

    addNote.addEventListener('click', ()=>{
        createNote();
    }); 

    const saveToLS = ()=>{

        const notesText = document.querySelectorAll('textarea');
        const notes = [];
        
        notesText.forEach(note=>{
            notes.push(note.value);
        });
        
        localStorage.setItem('notes', JSON.stringify(notes));
    }
    
}