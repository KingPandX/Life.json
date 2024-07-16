import CreatingNoteTab from "../components/creatingNoteTab";
import IconButton from "../components/iconbutton";
import { useState } from "react";

export default function Notes() {
    const [notes, setNotes] = useState(window.ipcRenderer.getElement('notes'));

    const [hide, setHide] = useState(true);

    function removeNote(index: number) {
        window.ipcRenderer.removeElement('notes', index);
        setNotes(window.ipcRenderer.getElement('notes'));
    }

    return (
        <div className="notes">
            <div className="note-list">
                {notes.map((note: any, index: number) => (
                    <div key={index} className="note">
                        <IconButton icon="delete" onClick={() => removeNote(index)} />
                        <h3>{note.title}</h3>
                        <p>{note.content}</p>
                        <span className="note-date">{note.date}</span>
                    </div>))}
            </div>

            <div className="floatButton">
                <IconButton icon="add" onClick={() => { setHide(!hide) }} />
            </div>

            <CreatingNoteTab hide={hide} setHide={setHide} setNotes={setNotes} />

        </div>
    );
}