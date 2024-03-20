import { IAdvancedMap } from '../../../utils';
import { IPartColor } from './IPartColor';

export interface IPalette
{
    getColor(id: number): IPartColor;
    id: number;
    colors: IAdvancedMap<string, IPartColor>;
}
