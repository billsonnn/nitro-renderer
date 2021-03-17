import { AdvancedMap } from '../../../../core/utils/AdvancedMap';
import { IFigurePartSet } from './IFigurePartSet';

export interface ISetType
{
    _Str_1020(_arg_1: number): IFigurePartSet;
    _Str_895(_arg_1: string, _arg_2: number): boolean;
    _Str_1002(_arg_1: string): number;
    type: string;
    _Str_734: number;
    _Str_710: AdvancedMap<string, IFigurePartSet>;
}