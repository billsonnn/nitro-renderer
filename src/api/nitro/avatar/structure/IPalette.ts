import { IAdvancedMap } from '../../../IAdvancedMap';
import { IPartColor } from './IPartColor';

export interface IPalette
{
    getColor(id: number): IPartColor;
    id: number;
    colors: IAdvancedMap<string, IPartColor>;
}
