import { IFigurePart } from './IFigurePart';

export interface IFigurePartSet
{
    getPart(_arg_1: string, _arg_2: number): IFigurePart;
    id: number;
    type: string;
    gender: string;
    clubLevel: number;
    isColorable: boolean;
    isSelectable: boolean;
    parts: IFigurePart[];
    hiddenLayers: string[];
    isPreSelectable: boolean;
    isSellable: boolean;
}
