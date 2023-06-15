import { IAdvancedMap, IPartColor } from '@/api'

export interface IPalette {
  id: number;
  colors: IAdvancedMap<string, IPartColor>;

  getColor(id: number): IPartColor;
}
