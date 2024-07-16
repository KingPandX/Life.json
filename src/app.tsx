import { useState } from "react";
import LeftBar from "./components/LeftBar";
import Main from "./components/Main";
import { type } from "../electron/modules/life";

import { PageContext } from "./contexts";

declare global {
    interface Window {
        ipcRenderer: {
            getElement: (type: type | 'ALL') => any,
            pushElement: (type: type, data: any) => void,
            removeElement: (type: type, index: number) => void,
            saveElement: () => void
        }
    }
}

export enum Page {
    notes = "notes",
    tasks = "tasks",
    contacts = "contacts",
    events = "events"
}

export default function App() {
    const [page, setPage] = useState(Page.notes);

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