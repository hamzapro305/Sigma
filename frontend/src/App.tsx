import CanvasSetup from "@/components/CanvasSetup";
import ApplicationSetup from "@/components/ApplicationSetup";
import Modals from "./modals";
import SocketProvider from "./Providers/SocketProvider";

const App = () => {
    return (
        <SocketProvider>
            <CanvasSetup children={<ApplicationSetup />} />
            <Modals />
        </SocketProvider>
    );
};

export default App;
