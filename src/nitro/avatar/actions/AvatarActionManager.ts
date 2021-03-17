import { IAssetManager } from '../../../core/asset/IAssetManager';
import { ActionDefinition } from './ActionDefinition';
import { IActiveActionData } from './IActiveActionData';

export class AvatarActionManager
{
    private _assets: IAssetManager;
    private _actions: Map<string, ActionDefinition>;
    private _defaultAction: ActionDefinition;

    constructor(k: IAssetManager, data: any)
    {
        this._assets        = k;
        this._actions       = new Map();
        this._defaultAction = null;

        this._Str_1620(data);
    }

    public _Str_1620(data: any): void
    {
        if(!data) return;

        for(const action of data.actions)
        {
            if(!action || !action.state) continue;

            const definition = new ActionDefinition(action);

            this._actions.set(definition.state, definition);
        }

        if(data.actionOffsets) this._Str_1767(data.actionOffsets);
    }

    private _Str_1767(offsets: any): void
    {
        if(!offsets || !offsets.length) return;

        for(const offset of offsets)
        {
            const action = this._actions.get(offset.action);

            if(!action) continue;

            for(const canvasOffset of offset.offsets)
            {
                const size      = (canvasOffset.size || '');
                const direction = canvasOffset.direction;

                if((size === '') || (direction === undefined)) continue;

                const x = (canvasOffset.x || 0);
                const y = (canvasOffset.y || 0);
                const z = (canvasOffset.z || 0);

                action._Str_772(size, direction, [ x, y, z ]);
            }
        }
    }

    public _Str_1675(id: string): ActionDefinition
    {
        if(!id) return null;

        for(const action of this._actions.values())
        {
            if(!action || (action.id !== id)) continue;

            return action;
        }

        return null;
    }

    public _Str_2018(state: string): ActionDefinition
    {
        const existing = this._actions.get(state);

        if(!existing) return null;

        return existing;
    }

    public _Str_1027(): ActionDefinition
    {
        if(this._defaultAction) return this._defaultAction;

        for(const action of this._actions.values())
        {
            if(!action || !action._Str_804) continue;

            this._defaultAction = action;

            return action;
        }

        return null;
    }

    public _Str_781(k: IActiveActionData[], _arg_2: string, _arg_3: number): number[]
    {
        let canvasOffsets: number[] = [];

        for(const activeAction of k)
        {
            if(!activeAction) continue;

            const action    = this._actions.get(activeAction._Str_695);
            const offsets   = action && action._Str_805(_arg_2, _arg_3);

            if(offsets) canvasOffsets = offsets;
        }

        return canvasOffsets;
    }

    public _Str_711(actions: IActiveActionData[]): IActiveActionData[]
    {
        if(!actions) return null;

        actions = this._Str_1247(actions);

        const validatedActions: IActiveActionData[] = [];

        for(const action of actions)
        {
            if(!action) continue;

            const definition = this._actions.get(action._Str_695);

            if(!definition) continue;

            action._Str_742 = definition;

            validatedActions.push(action);
        }

        validatedActions.sort(this.sortByPrecedence);

        return validatedActions;
    }

    private _Str_1247(actions: IActiveActionData[]): IActiveActionData[]
    {
        let preventions: string[]               = [];
        const activeActions: IActiveActionData[]  = [];

        for(const action of actions)
        {
            if(!action) continue;

            const localAction = this._actions.get(action._Str_695);

            if(localAction) preventions = preventions.concat(localAction._Str_733(action._Str_727));
        }

        for(const action of actions)
        {
            if(!action) continue;

            let actionType = action._Str_695;

            if(action._Str_695 === 'fx') actionType = (actionType + ('.' + action._Str_727));

            if(preventions.indexOf(actionType) >= 0) continue;

            activeActions.push(action);
        }

        return activeActions;
    }

    private sortByPrecedence(actionOne: IActiveActionData, actionTwo: IActiveActionData): number
    {
        if(!actionOne || !actionTwo) return 0;

        const precedenceOne = actionOne._Str_742.precedence;
        const precedenceTwo = actionTwo._Str_742.precedence;

        if(precedenceOne < precedenceTwo) return 1;

        if(precedenceOne > precedenceTwo) return -1;

        return 0;
    }
}