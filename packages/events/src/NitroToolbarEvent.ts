import { NitroEvent } from './core';

export class NitroToolbarEvent extends NitroEvent
{
    public static TOOLBAR_CLICK: string = 'NTE_TOOLBAR_CLICK';
    public static SELECT_OWN_AVATAR: string = 'NTE_SELECT_OWN_AVATAR';

    private _iconId: string;
    private _iconName: string;

    constructor(type: string)
    {
        super(type);
    }

    public get iconId(): string
    {
        return this._iconId;
    }

    public set iconId(id: string)
    {
        this._iconId = id;
    }

    public get iconName(): string
    {
        return this._iconName;
    }

    public set iconName(name: string)
    {
        this._iconName = name;
    }
}
