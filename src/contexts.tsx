import { createContext, Dispatch, SetStateAction } from "react";
import { Page } from "./app";

export interface PageContextType {
    page: string;
    setPage: Dispatch<SetStateAction<Page>>;
}

export const PageContext = createContext({} as PageContextType);

export const ThemeContext = createContext({} as { theme: string; setTheme: Dispatch<SetStateAction<string>> });