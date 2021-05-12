import { IAnimation } from './IAnimation';

export interface ISpriteDataContainer
{
    animation: IAnimation;
    id: string;
    ink: number;
    member: string;
    hasDirections: boolean;
    hasStaticY: boolean;
    getDirectionOffsetX(_arg_1: number): number;
    getDirectionOffsetY(_arg_1: number): number;
    getDirectionOffsetZ(_arg_1: number): number;
}
