import { IFigurePart } from './IFigurePart';

export interface IFigurePartSet
{
    getPart(_arg_1: string, _arg_2: number): IFigurePart;
    id: number;
    type: string;
    gender: string;
    clubLevel: number;
    isColorable: boolean;
    _Str_608: boolean;
    parts: IFigurePart[];
    _Str_790: string[];
    _Str_653: boolean;
    _Str_651: boolean;
}
