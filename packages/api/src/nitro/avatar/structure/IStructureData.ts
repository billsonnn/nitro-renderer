import { IFigurePartSet } from './IFigurePartSet';
import { IPalette } from './IPalette';
import { ISetType } from './ISetType';

export interface IStructureData
{
    parse(data: any): boolean;
    appendJSON(k: any): boolean;
    getSetType(_arg_1: string): ISetType;
    getPalette(_arg_1: number): IPalette;
    getFigurePartSet(_arg_1: number): IFigurePartSet;
}
