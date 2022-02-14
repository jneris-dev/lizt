import styled from 'styled-components';

export const Styles = styled.div`
    display: contents;

	.container {
        display: contents;
        
        .card {
            width: 100%;
            max-width: 520px;
            padding: 2.5rem 3rem;
            text-align: center;
            min-height: 600px;
            border-radius: 10px;
            box-shadow: 0 0 30px rgba(0, 0, 0, 0.05);
            background-color: ${props => props.theme.colors.card};

            @media (max-width: 390px) {
                padding: 1.5rem;
                border-radius: 0;
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
                overflow: auto;

                &::-webkit-scrollbar {
                    width: 4px;
                }
                &::-webkit-scrollbar-track {
                    background: transparent;
                }
                &::-webkit-scrollbar-thumb {
                    background: ${props => props.theme.colors.primary};
                    border-radius: 8px;
                    background-clip: padding-box;
                }
                &::-moz-selection {
                    background: ${props => props.theme.colors.primary};
                }
                
                > div:nth-child(4n + 1) > div {
                    background: linear-gradient( 90deg, rgba(93, 12, 255, 1) 0%, rgba(155, 0, 250, 1) 100%);
                }

                > div:nth-child(4n + 2) > div {
                    background: linear-gradient(90deg, rgba(255, 12, 241, 1) 0%, rgba(250, 0, 135, 1) 100%);
                }

                > div:nth-child(4n + 3) > div {
                    background: linear-gradient(90deg, rgba(20, 159, 255, 1) 0%, rgba(17, 122, 255, 1) 100%);
                }
            }
        }
    }
`;