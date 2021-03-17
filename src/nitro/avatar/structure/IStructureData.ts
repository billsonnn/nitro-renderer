import { IFigurePartSet } from './figure/IFigurePartSet';
import { IPalette } from './figure/IPalette';
import { ISetType } from './figure/ISetType';

export interface IStructureData
{
    parse(data: any): boolean;
    _Str_1017(k: any): boolean;
    _Str_740(_arg_1: string): ISetType;
    _Str_783(_arg_1: number): IPalette;
    _Str_938(_arg_1: number): IFigurePartSet;
}