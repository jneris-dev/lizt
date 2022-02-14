import styled from 'styled-components';

export const Styles = styled.div`
    display: contents;
    
    .header {
        width: 100%;
        max-width: 520px;
        padding-bottom: 2rem;
        padding-top: 1rem;

        @media (max-width: 390px) {
            padding-top: 1.5rem;
            padding-left: .8rem;
            padding-right: .8rem;
        }

        .userWrapper {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;

            @media (max-width: 390px) {
                flex-direction: column;
            }

            .userInfos {
                display: flex;
                gap: 1rem;
                align-items: center;

                img {
                    width: 4rem;
                    height: 4rem;
                    border-radius: 2rem;
                }

                p {
                    font-size: 1.1rem;
                    font-weight: bold;

                    b {
                        color: ${props => props.theme.colors.primary};
                    }
                }

                span {
                    font-size: .85rem;
                    display: block;
                    margin-top: .25rem;
                    color: ${props => props.theme.colors.secondary};
                }
            }

            .signOut {
                background: ${props => props.theme.colors.primary};
                color: #161b22;
                border: 0;
                width: 5.5rem;
                height: 2.8rem;
                border-radius: .25rem;
                font-weight: bold;

                @media (max-width: 390px) {
                    width: 70%;
                    margin-top: 1rem;
                }
            }
        }

        .loginWrapper {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: row;
            gap: 1rem;

            @media (max-width: 520px) {
                flex-direction: column;
            }

            button {
                width: 40%;
                height: 2.8rem;
                border-radius: 0.25rem;
                border: 0;
                color: #FFF;
                font-weight: bold;

                display: flex;
                justify-content: space-around;
                align-items: center;
                padding: 0 1rem;

                @media (max-width: 520px) {
                    width: 60%;
                }

                @media (max-width: 390px) {
                    width: 100%;
                    justify-content: center;
                    gap: 1rem;
                }

                svg {
                    fill: #FFF;
                }

                &.githubButton {
                    background: #444;
                }

                &.goolgeButton {
                    background: #e95f45;
                }
            }
        }
    }
`;