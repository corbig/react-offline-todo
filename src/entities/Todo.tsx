import { TypedRecord } from 'typed-immutable-record';
import { CodeStatus } from '../constants/constants';

/** Decalration du type todo immutable */
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

/** Deeclaration du type todo mutable */
export interface Todo {
    _id?: string;
    _rev?: string;
    content: string;
    status: CodeStatus;
}