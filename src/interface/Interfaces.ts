export interface TaskInterface {
    id: string,
    name: string,
    isComplete: boolean,
}

export interface ThemeInterface {
    toggleTheme(): void,
}