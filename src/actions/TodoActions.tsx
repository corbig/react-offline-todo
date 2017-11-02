import { TodoImmutable, Todo } from '../entities/Todo';
import PouchDB from 'pouchdb';
import pouchDBUpsert from 'pouchdb-upsert';
import { fromJS } from 'immutable';
import { CodeStatus, Action } from '../constants/constants';

PouchDB.plugin(pouchDBUpsert);

const db = new PouchDB('TodoDB', { revs_limit: 1, auto_compaction: true });

const saveTodo = (todo: TodoImmutable) => {

    return db.upsert(todo.get('_id'), (doc) => {
        return todo.toJS();
    });
};

export const getAllTodos = () => {

    const todoList: Todo[] = [];

    return (dispatch: Function) => {
        return db.allDocs({ startkey: 'todo', descending: false, include_docs: true }).then(data => {

            data.rows.map((item) => todoList.push(item.doc as Todo));

            dispatch({
                type: Action.GET_ALL_TODOS,
                todoList: fromJS(todoList)
            });

        });
    };
};

export const addTodo = (todoContent: string) => {
    const newTodo: TodoImmutable = fromJS({
        _id: 'todo_' + new Date().getTime(),
        content: todoContent,
        status: CodeStatus.TODO
    });

    return (dispatch: Function) => {

        return saveTodo(newTodo).then(reponse => {
            dispatch({
                type: Action.ADD_TODO,
                todo: fromJS(newTodo)
            });
        });
    };
};

export const changeStatus = (todo: TodoImmutable) => {
    todo = todo.set('status', todo.get('status') === CodeStatus.DONE ? CodeStatus.TODO : CodeStatus.DONE);

    return (dispatch: Function) => {

        return saveTodo(todo).then(reponse => {
            dispatch({
                type: Action.UPDATE_TODO,
                todo
            });
        });
    };
};

export const removeTodo = (todo: TodoImmutable) => {

    return (dispatch: Function) => {
        return db.get(todo.get('_id')).then((doc) => {

            return db.remove(doc).then(response => {
                dispatch({
                    type: Action.REMOVE_TODO,
                    todo
                });
            });

        });
    };
};