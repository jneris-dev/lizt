import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    html {
        @media (max-width: 1080px) {
            font-size: 93.75%;
        }

        @media (max-width: 720px) {
            font-size: 97.5%;
        }
    }

    body {
        font: 400 1rem 'Source Sans Pro', sans-serif;
        background: ${props => props.theme.colors.background};
        color: ${props => props.theme.colors.text};
    }

    button {
        cursor: pointer;
    }

    a {
        color: inherit;
        text-decoration: none;
    }
`;