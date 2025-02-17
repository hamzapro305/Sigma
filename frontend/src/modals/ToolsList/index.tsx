import { useState } from "react";
import "./index.scss";
import { FcCursor } from "react-icons/fc";
import { LuGrab } from "react-icons/lu";
import { VscGrabber } from "react-icons/vsc";

const ToolsList = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div
            className="ToolsList"
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
        >
            <div className="icons">
                {isOpen ? (
                    <>
                        <div className="icon">
                            <FcCursor />
                        </div>
                        <div className="icon">
                            <LuGrab />
                        </div>
                    </>
                ) : (
                    <div className="icon">
                        <VscGrabber />
                    </div>
                )}
            </div>
        </div>
    );
};

export default ToolsList;
