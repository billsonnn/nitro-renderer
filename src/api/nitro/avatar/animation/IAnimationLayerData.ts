import { IActiveActionData } from '../actions';

export interface IAnimationLayerData
{
    id: string;
    action: IActiveActionData;
    animationFrame: number;
    dx: number;
    dy: number;
    dz: number;
    dd: number;
}
