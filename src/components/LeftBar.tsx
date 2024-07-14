import IconButton from "./iconbutton";

export default function LeftBar() {
    function handleClick() {
        console.log("Click");
    }

    return (
        <div className="left-bar">
            <IconButton icon="notes" onClick={handleClick} />
            <IconButton icon="task_alt" onClick={handleClick} />
            <IconButton icon="contacts" onClick={handleClick} />
            <IconButton icon="event" onClick={handleClick} />
        </div>
    );
}