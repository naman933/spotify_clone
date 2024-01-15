import { Icon } from "@iconify/react";

const TextWithHover = ({iconName, displayText, active, onClick}) => {
    return (
        <div className="flex items-center justify-start cursor-pointer ">
            <div>
                <div className={`${active? "text-white" : "text-gray-500"} text-sm font-semibold hover:text-white`} onClick={onClick}>{displayText}</div>
            </div>
        </div>
    )
};

export default TextWithHover;