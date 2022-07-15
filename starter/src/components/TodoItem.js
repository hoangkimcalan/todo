import React, {useRef} from 'react';
import { useDispatch } from 'react-redux';
import ContentEditable from 'react-contenteditable'
import { toggleCompleteAsync, deleteTodosAsync, editContentTodosAsync } from '../redux/todoSlice';


const TodoItem = ({ id, title, completed }) => {
	const text = useRef('');

	const dispatch = useDispatch();

	const handleToggleComplete = () => {
		dispatch(toggleCompleteAsync({
			id: id,
			completed: !completed
		}))
		// console.log(id);
	}

	const handleDeleteTodo = () => {
		dispatch(deleteTodosAsync({
			id: id
		}))
	}

	const handleContentEditable = (e) => {
		// console.log(e.target.value);
		// console.log(text.current.lastHtml);
		dispatch(editContentTodosAsync({
			id: id,
			title: e.target.value
		}))
	}

	const handleBlur = () => {
		// console.log(title);
		dispatch(editContentTodosAsync({
			 id: id,
			 title: text.current.lastHtml
		}))
	}
	

	return (
		<li className={`list-group-item ${completed && 'list-group-item-success'}`}>
			<div className='d-flex justify-content-between'>
				<span className='d-flex align-items-center'>
					<input
						type='checkbox'
						className='mr-3' 
						checked={completed}
						onChange={handleToggleComplete}
					/>
					<ContentEditable
						ref={text}
						html={title}	
						disabled={false}
						className='title-todoItem'
						onChange={handleContentEditable}
						onBlur={handleBlur}
					/>
					
				</span>
				<button className='btn btn-danger' onClick={handleDeleteTodo} >Delete</button>
			</div>
		</li>
	);
};

export default TodoItem;
