import { TodoImmutable, Todo } from '../entities/Todo';
import PouchDB from 'pouchdb';
import pouchDBUpsert from 'pouchdb-upsert';
import { fromJS } from 'immutable';
import { CodeStatus, Action } from '../constants/constants';

// Injection of pouchdb upsert plugin
PouchDB.plugin(pouchDBUpsert);

let todoDataBase: PouchDB.Database;

// Setting up a database call TodoDB
const getDB = () => new Promise((resolve) => {
    if (todoDataBase === null || todoDataBase === undefined) {
        todoDataBase = new PouchDB('TodoDB', { revs_limit: 1, auto_compaction: true });
        return resolve(todoDataBase);
    } else {
        todoDataBase.info().catch((err) => {
            todoDataBase = new PouchDB('TodoDB', { revs_limit: 1, auto_compaction: true });
            return Promise.resolve();
        }).then(() => {
            return resolve(todoDataBase);
        });
    }
});
/**
 * We create a dedicated function to save a todo
 * @param todo
 */
const saveTodo = (todo: TodoImmutable) => {

    return getDB().then((database: PouchDB.Database) =>

        database.upsert(todo.get('_id'), (doc) => {
            return todo.toJS();
        })
    );
};

/**
 * Function to get all todo document from pouchdb
 * 
 * Collections don't exist in pouchdb so we use a
 * startkey filter to get all documents with an id 
 * beginning with 'todo'
 */
export const getAllTodos = () => {

    const todoList: Todo[] = [];

    return (dispatch: Function) => {

        return getDB().then((dataBase: PouchDB.Database) =>
            dataBase.allDocs({ startkey: 'todo', descending: false, include_docs: true }).then(data => {

                data.rows.map((item) => todoList.push(item.doc as Todo));

                // Here we send a notification to redux reducer to refresh the store
                dispatch({
                    type: Action.GET_ALL_TODOS,
                    todoList: fromJS(todoList)
                });

            })
        );

    };
};

/**
 * Function to add a new todo
 * 
 * We generate a unique identifier with timestamp
 * and a fixed prefix to use db.Alldocs function to
 * retrieve all todos.
 * 
 * @param todoContent : content of the todo
 */
export const addTodo = (todoContent: string) => {
    const newTodo: Todo = {
        _id: 'todo_' + new Date().getTime(),
        content: todoContent,
        status: CodeStatus.TODO
    };

    return (dispatch: Function) => {

        // We call our dedicated save action
        return saveTodo(fromJS(newTodo)).then(reponse => {
            // Then, we send a notification to refresh redux store
            dispatch({
                type: Action.ADD_TODO,
                todo: fromJS(newTodo)
            });
        });
    };
};

/**
 * Function to change a todo status
 * 
 * @param todo 
 */
export const changeStatus = (todo: TodoImmutable) => {

    todo = todo.set('status', todo.get('status') === CodeStatus.DONE ? CodeStatus.TODO : CodeStatus.DONE);

    return (dispatch: Function) => {
        // We call our dedicated save action
        return saveTodo(todo).then(response => {
            // Then, we send a notification to refresh redux store
            dispatch({
                type: Action.UPDATE_TODO,
                todo
            });
        });
    };
};

/**
 * Function to remove a todo
 * 
 * First we retrieve the object from db to get the todo 
 * with the last rev parameter. Then we delete it.
 * 
 * If we don't do this PouchDB will send an error when we'll
 * try to delete a todo
 * @param todo 
 */
export const removeTodo = (todo: TodoImmutable) => {

    return (dispatch: Function) => {
        return getDB().then((dataBase: PouchDB.Database) =>
            dataBase.get(todo.get('_id')).then((doc) => {
                return dataBase.remove(doc).then(response => {

                    // We send a notification to refresh redux store
                    dispatch({
                        type: Action.REMOVE_TODO,
                        todo
                    });
                });

            })
        );
    };
};