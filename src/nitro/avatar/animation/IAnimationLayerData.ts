import { IActiveActionData } from '../actions/IActiveActionData';

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
