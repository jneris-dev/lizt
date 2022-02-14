export interface TaskInterface {
    id: string,
    name: string,
    isComplete: boolean,
}

export interface ThemeInterface {
    theme?: string;
    toggleTheme: () => void;
}