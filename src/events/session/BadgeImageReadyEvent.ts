import { Resource, Texture } from '@pixi/core';
import { NitroEvent } from '../core';

export class BadgeImageReadyEvent extends NitroEvent
{
    public static IMAGE_READY: string = 'BIME_BADGE_IMAGE_READY';

    private _badgeId: string;
    private _image: Texture<Resource>;

    constructor(badgeId: string, image: Texture<Resource>)
    {
        super(BadgeImageReadyEvent.IMAGE_READY);

        this._badgeId = badgeId;
        this._image = image;
    }

    public get badgeId(): string
    {
        return this._badgeId;
    }

    public get image(): Texture<Resource>
    {
        return this._image;
    }
}
