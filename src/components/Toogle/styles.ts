import styled from 'styled-components';

export const Styles = styled.div`
    display: contents;

    .changeTheme {
        position: absolute;
        top: 0;
        right: 0;
        padding: .8rem;

        button {
            border: 0;
            outline: none;
            background: transparent;

                label {
                position: relative;
                display: block;
                width: 43px;
                height: 20px;
                border-radius: 10px;
                background-color: #161b22;
                overflow: hidden;
                cursor: pointer;

                &:before, &:after {
                    display: block;
                    position: absolute;
                    content: "";		
                    width: 14px;
                    height: 14px;
                    border-radius: 50%;
                    top: 3px;
                    left: 5px;
                    transition: .5s ease;
                }

                &:before {
                    background-color: #ffa41b;

                }

                &:after {
                    background-color: #161b22;
                    left: -58px;
                    transform: scale(0.00001);
                }
            }

            &.checked label {
                
                &:before {
                    background-color: #FFF;
                    transform: translateX(19px);
                }
                
                &:after {
                    transform: translateX(76px) scale(1);
                }
            }
        }
    }
`;