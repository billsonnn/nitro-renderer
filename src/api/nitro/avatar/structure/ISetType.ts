import { IAdvancedMap, IFigurePartSet } from '@/api'

export interface ISetType {
  type: string;
  paletteID: number;
  partSets: IAdvancedMap<string, IFigurePartSet>;

  getPartSet(_arg_1: number): IFigurePartSet;

  isMandatory(_arg_1: string, _arg_2: number): boolean;

  optionalFromClubLevel(_arg_1: string): number;
}
