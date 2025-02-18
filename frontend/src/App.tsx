import CanvasSetup from "@/components/CanvasSetup";
import ApplicationSetup from "@/components/ApplicationSetup";
import Modals from "./modals";

const App = () => {
    return (
        <div>
            <CanvasSetup children={<ApplicationSetup />} />
            <Modals />
        </div>
    );
};

export default App;
