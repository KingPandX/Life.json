import { useContext } from "react";
import { Page } from "../app";
import { PageContext } from "../contexts";
import IconButton from "./iconbutton";

export default function LeftBar() {
    const pageContext = useContext(PageContext);
    function changePage(page: Page) {
        pageContext.setPage(page);
    }

    function save() {
        window.ipcRenderer.saveElement();
    }


    return (
        <div className="left-bar">
            <IconButton icon="notes" onClick={() => { changePage(Page.notes) }} />
            <IconButton icon="task_alt" onClick={() => { changePage(Page.tasks) }} />
            <IconButton icon="save" onClick={save} />
            <IconButton icon="contacts" onClick={() => { changePage(Page.contacts) }} />
            <IconButton icon="event" onClick={() => { changePage(Page.events) }} />
        </div>
    );
}