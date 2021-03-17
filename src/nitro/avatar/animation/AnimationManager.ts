import { IAssetAnimation } from '../../../core/asset/interfaces';
import { AvatarStructure } from '../AvatarStructure';
import { Animation } from './Animation';
import { IAnimation } from './IAnimation';
import { IAnimationLayerData } from './IAnimationLayerData';
import { IAnimationManager } from './IAnimationManager';

export class AnimationManager implements IAnimationManager
{
    private _animations: Map<string, Animation>;

    constructor()
    {
        this._animations = new Map();
    }

    public _Str_2061(structure: AvatarStructure, _arg_2: { [index: string]: IAssetAnimation }): boolean
    {
        const animationData = _arg_2[Object.keys(_arg_2)[0]];

        const animation = new Animation(structure, animationData);

        this._animations.set(animationData.name, animation);

        return true;
    }

    public _Str_720(animation: string): Animation
    {
        const existing = this._animations.get(animation);

        if(!existing) return null;

        return existing;
    }

    public _Str_607(animation: string, frameCount: number, spriteId: string): IAnimationLayerData
    {
        const existing = this._Str_720(animation);

        if(!existing) return null;

        return existing._Str_607(frameCount, spriteId);
    }

    public get animations(): Map<string, IAnimation>
    {
        return this._animations;
    }
}
