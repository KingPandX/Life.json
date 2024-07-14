import { useState } from "react";
import LeftBar from "./components/LeftBar";
import Main from "./components/Main";

import { PageContext } from "./contexts";


export enum Page {
    notes = "notes",
    tasks = "tasks",
    contacts = "contacts",
    calendar = "calendar"
}

export default function App() {
    const [page, setPage] = useState(Page.tasks);

    return (
        <>
            <PageContext.Provider value={{ page, setPage }}>
                <div className="container">
                    <LeftBar />
                    <Main />
                </div>
            </PageContext.Provider>
        </>
    );
}