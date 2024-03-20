import { NitroEvent } from '../core';

export class RoomSessionUserTagsEvent extends NitroEvent
{
    public static UTRE_USER_TAGS_RECEIVED: string = 'UTRE_USER_TAGS_RECEIVED';

    private _userId: number;
    private _tags: string[];

    constructor(k: number, _arg_2: string[])
    {
        super(RoomSessionUserTagsEvent.UTRE_USER_TAGS_RECEIVED);

        this._userId = k;
        this._tags = _arg_2;
    }

    public get userId(): number
    {
        return this._userId;
    }

    public get tags(): string[]
    {
        return this._tags;
    }
}
