import { IMessageDataWrapper, IMessageParser } from '../../../../../../api';
import { AvatarEffect } from './AvatarEffect';

export class AvatarEffectsParser implements IMessageParser
{
    private _effects: AvatarEffect[];

    public flush(): boolean
    {
        this._effects = [];

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        let totalEffects = wrapper.readInt();

        while(totalEffects > 0)
        {
            const effect = new AvatarEffect();

            effect.type = wrapper.readInt();
            effect.subType = wrapper.readInt();
            effect.duration = wrapper.readInt();
            effect.inactiveEffectsInInventory = wrapper.readInt();
            effect.secondsLeftIfActive = wrapper.readInt();
            effect.isPermanent = wrapper.readBoolean();

            this._effects.push(effect);

            totalEffects--;
        }

        return true;
    }

    public get effects(): AvatarEffect[]
    {
        return this._effects;
    }
}
