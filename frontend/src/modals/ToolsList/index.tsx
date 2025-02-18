import { useState } from "react";
import { RxCursorArrow } from "react-icons/rx";
import { FaRegHandPaper } from "react-icons/fa";
import { VscGrabber } from "react-icons/vsc";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { AnimatePresence, motion, Variants } from "motion/react";
import "./index.scss";
import { GlobalVarsActions, initGlobalVarsT } from "@/Redux/slices/GlobalVars";
import { IconType } from "react-icons";

type ToolType = initGlobalVarsT["tool"];

const Icons: { Name: ToolType; icon: IconType }[] = [
    {
        Name: "ITEMS",
        icon: RxCursorArrow,
    },
    {
        Name: "GRAB",
        icon: FaRegHandPaper,
    },
];
const IconsSize = Icons.length;
const width = 45 * IconsSize + 10 * (IconsSize - 1);

const ToolsList = () => {
    const [isOpen, setIsOpen] = useState(true);
    const Tool = useAppSelector((s) => s.GlobalVars.tool);
    const dispatch = useAppDispatch();
    const setTool = (_Tool: ToolType) => {
        dispatch(GlobalVarsActions.setTool(_Tool));
    };
    return (
        <motion.div
            className="ToolsList"
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
            animate={{
                borderRadius: isOpen ? "10px" : "5px",
            }}
        >
            <motion.div
                className="icons"
                animate={{
                    width: isOpen ? width : "20px",
                    height: isOpen ? "30px" : "0px",
                }}
            >
                <AnimatePresence mode="wait" presenceAffectsLayout>
                    {isOpen ? (
                        <div className="action-icons">
                            {Icons.map((icon, index) => (
                                <motion.div
                                    key={icon.Name}
                                    className={`icon action-icon ${
                                        Tool === icon.Name ? "opened" : ""
                                    }`}
                                    onClick={() => setTool(icon.Name)}
                                    variants={IconAnimation}
                                    initial="hidden"
                                    animate="animate"
                                    exit="exit"
                                    custom={index}
                                >
                                    <icon.icon />
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <motion.div
                            className="icon"
                            variants={IconAnimation}
                            initial="hidden"
                            animate="animate"
                            exit="exit"
                        >
                            <VscGrabber />
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </motion.div>
    );
};

const IconAnimation: Variants = {
    hidden: { opacity: 0, y: -10 },
    animate: (index: number) => ({
        opacity: 1,
        y: 0,
        transition: { delay: index * 0.1 },
    }),
    exit: { opacity: 0, y: 10, transition: { duration: 0.2 } },
};

export default ToolsList;
