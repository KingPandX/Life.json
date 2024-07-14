import { useContext } from "react";
import { PageContext } from "../contexts";

export default function Main() {
    const pageContext = useContext(PageContext);
    return (
        <div className="main">
            <h1>{pageContext.page}</h1>
        </div>
    );
}