import React from 'react';

import { useThemes } from '../../hooks/useThemes';
import { ThemeInterface } from '../../interface/Interfaces';

import { Styles } from './styles';

export function Toogle({ toggleTheme, ...props }: ThemeInterface) {
    const { title } = useThemes();

    return (
        <Styles>
            <div className="changeTheme">
                <button
                    id="toggle"
                    onClick={toggleTheme}
                    aria-label="Dark mode toggle"
                    className={`${title === 'dark' && "checked"}`}
                    {...props}
                >
                    <label />
                </button>

            </div>
        </Styles>
    );
}