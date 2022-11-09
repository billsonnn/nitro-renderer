import { IAdvancedMap } from '../../utils';
import { IRoomObjectModel } from './IRoomObjectModel';

export interface IRoomObjectModelController extends IRoomObjectModel
{
    setNumber(_arg_1: string, _arg_2: number, _arg_3: boolean): void;
    setString(_arg_1: string, _arg_2: string, _arg_3: boolean): void;
    setNumberArray(_arg_1: string, _arg_2: [], _arg_3: boolean): void;
    setStringArray(_arg_1: string, _arg_2: [], _arg_3: boolean): void;
    setStringToStringMap(_arg_1: string, _arg_2: IAdvancedMap<any, any>, _arg_3: boolean): void;
}
