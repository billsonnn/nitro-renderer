import { IActionDefinition } from '../actions/IActionDefinition';
import { AnimationAction } from './animation/AnimationAction';
import { IFigureSetData } from './IFigureSetData';

export class AnimationData implements IFigureSetData
{
    private _actions: Map<string, AnimationAction>;

    constructor()
    {
        this._actions = new Map();
    }

    public parse(data: any): boolean
    {
        if(data && (data.length > 0))
        {
            for(const animation of data)
            {
                if(!animation) continue;

                const newAnimation = new AnimationAction(animation);

                this._actions.set(newAnimation.id, newAnimation);
            }
        }

        return true;
    }

    public _Str_1017(k: any): boolean
    {
        for(const _local_2 of k.action)
        {
            this._actions.set(_local_2.id, new AnimationAction(_local_2));
        }

        return true;
    }

    public _Str_2244(action: IActionDefinition): AnimationAction
    {
        const existing = this._actions.get(action.id);

        if(!existing) return null;

        return existing;
    }

    public _Str_1408(k: IActionDefinition): number
    {
        const animationAction = this._Str_2244(k);

        if(!animationAction) return 0;

        return animationAction._Str_2185;
    }
}