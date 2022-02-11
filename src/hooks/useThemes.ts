import { useContext } from "react";

import { ThemeContext } from "styled-components";

export function useThemes() {
    const value = useContext(ThemeContext);

    return value;
}