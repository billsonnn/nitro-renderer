import { IFigureData } from '../interfaces';

export interface IFigureSetData
{
    parse(data: any): boolean;
    appendJSON(data: IFigureData): boolean;
}
