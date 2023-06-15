import { IFigureData } from '@/api'

export interface IFigureSetData {
  parse(data: any): boolean;

  appendJSON(data: IFigureData): boolean;
}
