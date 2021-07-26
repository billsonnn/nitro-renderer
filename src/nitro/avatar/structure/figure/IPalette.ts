import { IPartColor } from './IPartColor';

export interface IPalette
{
    getColor(id: number): IPartColor;
    id: number;
    colors: Map<string, IPartColor>;
}
