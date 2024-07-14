interface IconButtonProps {
    icon: string;
    onClick: () => void;
}

export default function IconButton({ icon, onClick }: IconButtonProps) {
    return (
        <a onClick={onClick} className="IconButton">
            <span className="material-symbols-outlined">
                {icon}
            </span>
        </a>
    )
}