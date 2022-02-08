import styled from 'styled-components';

export const Styles = styled.div`
    display: contents;

	.container {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100vh;
        min-height: 600px;
        flex-direction: column;
        padding: 2rem 1.3rem;

        @media (max-height: 700px) {
            height: auto;
        }

        .card {
            width: 100%;
            max-width: 520px;
            padding: 2.5rem 3rem;
            text-align: center;
            min-height: 600px;
            border-radius: 10px;
            box-shadow: 0 0 30px rgba(0, 0, 0, 0.05);
            background-color:  ${props => props.theme.colors.card};

            @media (max-width: 390px) {
                padding: 1.5rem;
            }

            .notLogin {
                margin-top: 1rem;

                .illustration {
                    max-width: 100%;
                    display: block;
                    margin: 2rem auto 0;
                }
            }

            .emptyListWrap {
                flex: 1;
                display: flex;
                align-items: center;
                justify-content: center;
                flex-direction: column;
                height: 100%;
                opacity: .3;

                img {
                    margin-bottom: 1rem;
                }

                p {
                    color: ${props => props.theme.colors.text};
                }
            }

            .todoWrap {
                margin-top: 3rem;
                flex: 1;
                flex-direction: row;
                display: flex;

                .todoInput {
                    display: block;
                    width: 100%;
                    padding: 14px 32px 14px 16px;
                    background: transparent;
                    border: 2px solid ${props => props.theme.colors.primary};
                    color: ${props => props.theme.colors.text};
                    border-radius: 0.25rem;
                    border-top-right-radius: 0;
                    border-bottom-right-radius: 0;
                    outline: none;

                    &::placeholder {
                        color: ${props => props.theme.colors.secondary};
                    }
                }

                .todoButton {
                    width: 5rem;
                    padding: 1rem 1.5rem;
                    border: none;
                    border-radius: 0 0.25rem 0.25rem 0;
                    outline: none;
                    background: ${props => props.theme.colors.primary};
                    color: #161b22;
                    text-transform: capitalize;
                    font-weight: bold;
                }
            }

            .listWrap {
                height: 350px;
                width: 100%;
                margin-top: 1rem;
                padding: 0 .5rem;
                overflow: auto;

                &::-webkit-scrollbar {
                    width: 4px;
                }
                &::-webkit-scrollbar-track {
                    background: rgba(48, 16, 255, 1);
                }
                &::-webkit-scrollbar-thumb {
                    background: rgba(100, 115, 255, 1);
                    border-radius: 8px;
                    background-clip: padding-box;
                }
                &::-moz-selection {
                    background: rgba(100, 115, 255, .15);
                }
            }
        }
    }
`;