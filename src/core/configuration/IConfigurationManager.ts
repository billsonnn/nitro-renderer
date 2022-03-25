import { INitroManager } from '../common/INitroManager';

export interface IConfigurationManager extends INitroManager
{
    interpolate(value: string, regex?: RegExp): string;
    getValue<T>(key: string, value?: T): T;
    setValue<T>(key: string, value: T): void;
    definitions: Map<string, unknown>;
}
