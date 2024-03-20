import { IDisposable } from '../common';

export interface IAdvancedMap<T = any, U = any> extends IDisposable
{
    dispose(): void;
    reset(): void;
    unshift(key: T, value: U): boolean;
    add(key: T, value: U): boolean;
    remove(key: T): U;
    getWithIndex(index: number): U;
    getKey(index: number): T;
    getKeys(): T[];
    hasKey(key: T): boolean;
    getValue(key: T): U;
    getValues(): U[];
    hasValue(value: U): boolean;
    indexOf(value: U): number;
    concatenate(newValues: IAdvancedMap<T, U>): void;
    clone(): IAdvancedMap<T, U>;
    readonly length: number;
    readonly disposed: boolean
}
