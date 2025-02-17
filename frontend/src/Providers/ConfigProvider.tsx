import StoreProvider from "@/Redux/StoreProvider";
import { FC, ReactNode } from "react";

const ConfigProvider: FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <>
            <StoreProvider>{children}</StoreProvider>
        </>
    );
};

export default ConfigProvider;
