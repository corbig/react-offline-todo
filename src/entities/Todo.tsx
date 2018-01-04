import { TypedRecord } from 'typed-immutable-record';
import { CodeStatus } from '../constants/constants';

/** Immutable todo interface */
export interface TodoImmutable extends TypedRecord<TodoImmutable> {
    get(key: 'id'): string;
    get(key: 'content'): string;
    get(key: 'status'): CodeStatus;
    set(key: 'id', value: string): TodoImmutable;
    set(key: 'content', value: string): TodoImmutable;
    set(key: 'status', value: CodeStatus): TodoImmutable;
}

/** Mutable todo interface */
export interface Todo {
    id: string;  // identifier of todo
    content: string; // content of the todo
    status: CodeStatus; // status of the todo
}