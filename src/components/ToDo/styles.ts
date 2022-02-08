import styled from 'styled-components';

export const Styles = styled.div`
    display: contents;

	.taskCard {    
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin: .5rem auto;
		color: #fff;
		background: linear-gradient(90deg, rgb(77, 170, 197) 0%,rgb(93, 196, 225) 100%);
		padding: 1rem;
		border-radius: 0.25rem;
		width: 100%;
		text-align: left;
		gap: 1rem;

		&.completeTask {
			opacity: .45;

			input {
				text-decoration-style: solid;
				text-decoration-line: line-through;
				text-decoration-color: #fffffc;
			}
		}

		&.deleting {
			opacity: .45;
			background: linear-gradient(90deg, rgb(54, 54, 54) 0%, rgb(36, 36, 36) 100%);
		}

		input {
			background: transparent;
			outline: none;
			border: 0;
			color: #ffff;
			pointer-events: none;
			width: 100%;

			&:focus {
				outline: none;
			}

			&.editingTask {
				pointer-events: all;
			}
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