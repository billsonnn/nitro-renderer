import { IAnimation } from './IAnimation';
import { IAnimationLayerData } from './IAnimationLayerData';

export interface IAnimationManager
{
    animations: Map<any, any>;
    _Str_720(_arg_1: string): IAnimation;
    _Str_607(_arg_1: string, _arg_2: number, _arg_3: string): IAnimationLayerData;
}