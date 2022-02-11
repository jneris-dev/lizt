import styled from 'styled-components';

export const Styles = styled.div`
    display: contents;

	.editingWrap {
		flex: 1;
		flex-direction: row;
		display: flex;
		background: transparent !important;
		margin: .5rem auto;

		input {
			display: block;
			width: 100%;
			padding: 14px 32px 14px 16px;
			background: ${props => props.theme.colors.card};
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

		.editingButton {
			padding: 1rem;
			border: none;
			border-radius: 0 0.25rem 0.25rem 0;
			outline: none;
            background: ${props => props.theme.colors.primary};
            color: #161b22;
            text-transform: capitalize;
            font-weight: bold;
        }
	}

	.taskCard {    
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin: .5rem auto;
		color: #fff;
		background: linear-gradient(90deg, rgba(255, 118, 20, 1) 0%, rgba(255, 84, 17, 1) 100%);
		padding: 1rem;
		border-radius: 0.25rem;
		width: 100%;
		text-align: left;
		gap: 1rem;

		&.completeTask {
			opacity: .45;

			p {
				text-decoration-style: solid;
				text-decoration-line: line-through;
				text-decoration-color: #fffffc;
			}
		}

		&.deleting {
			opacity: .45;
			background: linear-gradient(90deg, rgb(54, 54, 54) 0%, rgb(36, 36, 36) 100%);
		}

		> p {
			font-size: .9rem;
			word-break: break-all;
		}

		div {
			flex: auto;
			gap: 0.3rem;
			display: flex;
			justify-content: flex-end;

			span {
				cursor: pointer;
			}
		}
	}
`;