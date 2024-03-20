import { NitroEvent } from '../core';

export class RoomContentLoadedEvent extends NitroEvent
{
    public static RCLE_SUCCESS: string = 'RCLE_SUCCESS';
    public static RCLE_FAILURE: string = 'RCLE_FAILURE';
    public static RCLE_CANCEL: string = 'RCLE_CANCEL';

    private _contentType: string;

    constructor(type: string, contentType: string)
    {
        super(type);

        this._contentType = contentType;
    }

    public get contentType(): string
    {
        return this._contentType;
    }
}
