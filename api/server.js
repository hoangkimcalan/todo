
   
// const express = require('express');
// const dotenv = require('dotenv');
// const colors = require('colors');
// const cors = require('cors');
// const { json } = require('body-parser');
// const { nanoid } = require('nanoid');
 
// const {arrayMoveImmutable} = require('array-move');
import express from 'express';
import dotenv from 'dotenv'
import colors from 'colors'
import cors from 'cors'
//import {json} from 'body-parser'
import {nanoid} from 'nanoid'
import {arrayMoveImmutable} from "array-move";
dotenv.config({ path: './config.env' });

const app = express();

app.use(cors());
app.use(express.json());

let todos = [
	{
		id: nanoid(),
		title: 'todo 1',
		completed: true,
	},
	{
		id: nanoid(),
		title: 'todo 2',
		completed: false,
	},
	{
		id: nanoid(),
		title: 'todo 3',
		completed: false,
	},
	{
		id: nanoid(),
		title: 'todo 4',
		completed: false,
	},
	{
		id: nanoid(),
		title: 'todo 5',
		completed: false,
	},
];

app.get('/todos', (req, res) => res.send(todos));

app.post('/todos', (req, res) => {
	const todo = { title: req.body.title, id: nanoid(), completed: false };
	todos.push(todo);
	return res.send(todo);
});

app.patch('/todos/:id', (req, res) => {
	const id = req.params.id;
	const index = todos.findIndex((todo) => todo.id == id);
	const completed = Boolean(req.body.completed);
	// console.log(completed);
	if (index > -1) {
		todos[index].completed = completed;
	}
	res.send(todos[index]);
});

app.patch('/todos/editcontent/:id', (req, res) => {
	const id = req.params.id;
	const index = todos.findIndex((todo) => todo.id === id);
	const title = req.body.title;
	if (index > -1) {
		todos[index].title = title;
	}
	res.send(todos[index]);
});

app.patch('/todos/dragelement/:id', (req, res) => {
	// console.log(req.body)
	const items = arrayMoveImmutable(todos, req.body.srcIndex, req.body.destIndex);
	todos = items;
	// console.log(todos);


	// const id = req.params.id;
	// const index = todos.findIndex((todo) => todo.id === id);
	// const idDrag = req.body.id;
	// console.log(index);
	// console.log(id);
	// console.log(index);
	// console.log('idDrag', idDrag);
	// if(index > -1){
	// 	todos[index].id = idDrag;
	// }
	// console.log(todos[index].id);
	res.send(todos);
})



app.delete('/todos/:id', (req, res) => {
	const id = req.params.id;
	const index = todos.findIndex((todo) => todo.id == id);
	res.send(todos[index]);
	if (index > -1) {
		todos.splice(index, 1);
	}
	// console.log(index);
});

const PORT = 7000;

app.listen(PORT, console.log(`Server running on port ${PORT}`.green.bold));