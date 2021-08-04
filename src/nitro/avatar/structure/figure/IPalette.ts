import { AdvancedMap } from '../../../../core';
import { IPartColor } from './IPartColor';

export interface IPalette
{
    getColor(id: number): IPartColor;
    id: number;
    colors: AdvancedMap<string, IPartColor>;
}
