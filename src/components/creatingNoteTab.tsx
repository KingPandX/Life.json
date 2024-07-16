import { FormEvent, useState } from "react";
import IconButton from "./iconbutton";

interface CreatingNoteTabProps {
    hide: boolean,
    setHide: (hide: boolean) => void,
    setNotes: (notes: any) => void
}

export default function CreatingNoteTab({ hide, setHide, setNotes }: CreatingNoteTabProps) {
    const [comment, setComment] = useState("");

    // Form values
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [date, setDate] = useState("");

    // Form handlers
    function handleTitle(e: FormEvent<HTMLDivElement>) {
        setTitle(e.currentTarget.innerText);
    }

    function handleContent(e: FormEvent<HTMLDivElement>) {
        setContent(e.currentTarget.innerText);
    }

    function handleDate(e: React.ChangeEvent<HTMLInputElement>) {
        setDate(e.target.value);
    }

    // Form submit

    function handleSubmit() {
        console.log(title, content, date);
        if (title === '') {
            setComment('Title cannot be empty');
            return;
        }

        if (content === '') {
            setComment('Content cannot be empty');
            return;
        }

        if (date === '') {
            setComment('Date cannot be empty');
            return;
        }

        window.ipcRenderer.pushElement('notes', {
            title,
            content,
            date
        });

        setNotes(window.ipcRenderer.getElement('notes'));
        setTitle('');
        setContent('');
        setDate('');

        document.getElementById('title-input')!.innerText = '';
        document.getElementById('content-input')!.innerText = '';
        const dateIn = document.getElementById('date-input')! as HTMLInputElement;
        dateIn.value = '';

        setComment('');
        setHide(true);
    }

    return (
        <div className={hide ? 'creating-note-tab hide' : 'creating-note-tab'}>
            <div className="tab-icon">
                <IconButton icon="close" onClick={() => { setHide(true) }} />
            </div>
            <div className="Note-view">
                <div contentEditable className="Note-title FormControll" id="title-input" onInput={e => handleTitle(e)} />
                <div contentEditable className="Note-content FormControll" id="content-input" onInput={e => handleContent(e)} />
                <input type="date" className="Note-date FormControll" id="date-input" onChange={(e) => { handleDate(e) }} />
                <p className={comment != '' ? 'Note-Label' : 'Note-Label hide'}>{comment}</p>
                <button onClick={handleSubmit} className="FormControll Note-Button">Add</button>
            </div>
        </div>
    );
}