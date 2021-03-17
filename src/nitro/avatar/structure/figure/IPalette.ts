import { IPartColor } from './IPartColor';

export interface IPalette
{
    _Str_751(id: number): IPartColor;
    id: number;
    colors: Map<string, IPartColor>;
}