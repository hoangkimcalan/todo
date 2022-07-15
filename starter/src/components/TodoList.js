import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import TodoItem from './TodoItem';
import {getTodosAsync, dragElementTodosAsync} from '../redux/todoSlice';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const TodoList = ({ id }) => {
	const dispatch = useDispatch();
	let todos = useSelector((state) => state.todos);

	// const todos = [
	// 	{ id: 1, title: 'todo1', completed: false },
	// 	{ id: 2, title: 'todo2', completed: false },
	// 	{ id: 3, title: 'todo3', completed: true },
	// 	{ id: 4, title: 'todo4', completed: false },
	// 	{ id: 5, title: 'todo5', completed: false },
	// ];

	useEffect(() => {
		dispatch(getTodosAsync());
	}, [dispatch]);

	const reorder = (list, startIndex, endIndex) => {
		const result = Array.from(list);
		const [removed] = result.splice(startIndex, 1);
		result.splice(endIndex, 0, removed);
	  
		return result;
	  };

	const onDragEnd = (result) => {
		todos = reorder(todos, result.source.index, result.destination.index);
		// console.log(result.destination.index);
		// console.log(todos[result.destination.index].id);
		id = todos[result.destination.index].id;
		dispatch(dragElementTodosAsync({
			id: id, 
			srcIndex: result.source.index,
			destIndex: result.destination.index,
		}))
	}
	return (
		// <ul className='list-group'>
		// 	{todos.map((todo, index) => (
		// 		<TodoItem key={index} id={todo.id} title={todo.title} completed={todo.completed} />
		// 	))}
		// </ul>
		<DragDropContext onDragEnd={onDragEnd} className='list-group'>
            <Droppable droppableId="1234567">
                {(provided, snapshot) => (
                    <div ref={provided.innerRef} {...provided.droppableProps}>
                        {todos.map((todo, index) => (
                            <Draggable
                                draggableId={todo.id}
                                key={todo.id}
                                index={index}
                            >
                                {(provided, snapshot) => (
                                    <div
                                        {...provided.draggableProps}
										{...provided.dragHandleProps}
                                        ref={provided.innerRef}
                                    >
                                        <TodoItem key={index} id={todo.id} title={todo.title} completed={todo.completed} />
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
	);
};

export default TodoList;
