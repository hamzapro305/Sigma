import { createRoot } from "react-dom/client";
import App from "@/App.tsx";
import "@/sass/_global.scss";
import ConfigProvider from "@/Providers/ConfigProvider";

const ElementId: string = "SIGMA_APPLICATION";
const Element = document.getElementById(ElementId);

if (Element) {
    createRoot(Element).render(<ConfigProvider children={<App />} />);
} else {
    console.log(`Error Getting Element: ${ElementId}`);
}
