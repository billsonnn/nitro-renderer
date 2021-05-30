import { IAnimation } from './IAnimation';
import { IAnimationLayerData } from './IAnimationLayerData';

export interface IAnimationManager
{
    animations: Map<any, any>;
    getAnimation(_arg_1: string): IAnimation;
    getLayerData(_arg_1: string, _arg_2: number, _arg_3: string): IAnimationLayerData;
}
