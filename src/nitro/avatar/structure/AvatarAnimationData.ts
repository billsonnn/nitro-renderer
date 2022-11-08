import { IActionDefinition, IFigureSetData } from '../../../api';
import { AnimationAction } from './animation';

export class AvatarAnimationData implements IFigureSetData
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

    public appendJSON(k: any): boolean
    {
        for(const _local_2 of k.action)
        {
            this._actions.set(_local_2.id, new AnimationAction(_local_2));
        }

        return true;
    }

    public getAction(action: IActionDefinition): AnimationAction
    {
        const existing = this._actions.get(action.id);

        if(!existing) return null;

        return existing;
    }

    public getFrameCount(k: IActionDefinition): number
    {
        const animationAction = this.getAction(k);

        if(!animationAction) return 0;

        return animationAction.frameCount;
    }
}
