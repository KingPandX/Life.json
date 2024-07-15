import { useContext } from "react";
import { PageContext } from "../contexts";
import Task from "../pages/tasks";
import Notes from "../pages/notes";
import Events from "../pages/events";
import Contacts from "../pages/contacts";

export default function Main() {
    const pageContext = useContext(PageContext);
    return (
        <div className="main">
            {
                pageContext.page === "tasks" && <Task />
            }
            {
                pageContext.page === "notes" && <Notes />
            }
            {
                pageContext.page === "events" && <Events />
            }
            {
                pageContext.page === "contacts" && <Contacts />
            }
        </div>
    );
}