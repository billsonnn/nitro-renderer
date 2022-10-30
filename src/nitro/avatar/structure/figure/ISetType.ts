import { AdvancedMap } from '../../../../core';
import { IFigurePartSet } from './IFigurePartSet';

export interface ISetType
{
    getPartSet(_arg_1: number): IFigurePartSet;
    isMandatory(_arg_1: string, _arg_2: number): boolean;
    optionalFromClubLevel(_arg_1: string): number;
    type: string;
    paletteID: number;
    partSets: AdvancedMap<string, IFigurePartSet>;
}
