import { TypedRecord } from 'typed-immutable-record';
import { CodeStatus } from '../constants/constants';

/** Immutable todo interface */
export interface TodoImmutable extends TypedRecord<TodoImmutable> {
    get(key: '_id'): string;
    get(key: '_rev'): string;
    get(key: 'content'): string;
    get(key: 'status'): CodeStatus;
    set(key: '_id', value: string): TodoImmutable;
    set(key: '_rev', value: string): TodoImmutable;
    set(key: 'content', value: string): TodoImmutable;
    set(key: 'status', value: CodeStatus): TodoImmutable;
}

/** Mutable todo interface */
export interface Todo {
    _id: string;  // id parameter of PouchDB document because here a todo is also a Pouch doc
    _rev?: string; // revision of the Pouch doc
    content: string; // content of the todo
    status: CodeStatus; // status of the todo
}