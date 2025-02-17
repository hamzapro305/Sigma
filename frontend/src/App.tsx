import CanvasSetup from "@/components/CanvasSetup";
import ApplicationSetup from "@/components/ApplicationSetup";
import ToolsList from "@/modals/ToolsList";

const App = () => {
    return (
        <div>
            <CanvasSetup children={<ApplicationSetup />} />
            <ToolsList />
        </div>
    );
};

export default App;
