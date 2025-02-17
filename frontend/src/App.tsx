import React from "react";
import CanvasSetup from "./components/CanvasSetup";
import ApplicationSetup from "./components/ApplicationSetup";

const App = () => {
    return (
        <div>
            <CanvasSetup children={<ApplicationSetup />} />
        </div>
    );
};

export default App;
