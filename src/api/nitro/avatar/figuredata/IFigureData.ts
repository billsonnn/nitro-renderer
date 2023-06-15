import { IFigureDataPalette, IFigureDataSetType } from '@/api'

export interface IFigureData {
  palettes?: IFigureDataPalette[];
  setTypes?: IFigureDataSetType[];
}
