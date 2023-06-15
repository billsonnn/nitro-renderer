import { IFigurePart } from '@/api'

export interface IFigurePartSet {
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

  getPart(_arg_1: string, _arg_2: number): IFigurePart;
}
