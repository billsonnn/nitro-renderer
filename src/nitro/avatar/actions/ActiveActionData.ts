import { IActionDefinition } from './IActionDefinition';
import { IActiveActionData } from './IActiveActionData';

export class ActiveActionData implements IActiveActionData
{
    private _actionType: string;
    private _actionParameter: string;
    private _definition: IActionDefinition;
    private _startFrame: number;
    private _overridingAction: string;

    constructor(action: string, parameter: string = '', startFrame: number = 0)
    {
        this._actionType        = action || '';
        this._actionParameter   = parameter || '';
        this._definition        = null;
        this._startFrame        = startFrame || 0;
        this._overridingAction  = null;
    }

    public dispose(): void
    {
        this._actionType        = null;
        this._actionParameter   = null;
        this._definition        = null;
    }

    public get id(): string
    {
        if(!this._definition) return '';

        return this._definition.id + '_' + this._actionParameter;
    }

    public get _Str_695(): string
    {
        return this._actionType;
    }

    public get _Str_727(): string
    {
        return this._actionParameter;
    }

    public set _Str_727(parameter: string)
    {
        this._actionParameter = parameter;
    }

    public get _Str_742(): IActionDefinition
    {
        return this._definition;
    }

    public set _Str_742(definition: IActionDefinition)
    {
        this._definition = definition;
    }

    public get _Str_664(): number
    {
        return this._startFrame;
    }

    public get _Str_707(): string
    {
        return this._overridingAction;
    }

    public set _Str_707(action: string)
    {
        this._overridingAction = action;
    }
}