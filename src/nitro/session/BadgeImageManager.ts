import { Resource, Texture } from '@pixi/core';
import { IAssetManager } from '../../core/asset/IAssetManager';
import { IEventDispatcher } from '../../core/events/IEventDispatcher';
import { Nitro } from '../Nitro';
import { BadgeInfo } from './BadgeInfo';
import { BadgeImageReadyEvent } from './events/BadgeImageReadyEvent';

export class BadgeImageManager
{
    public static GROUP_BADGE: string   = 'group_badge';
    public static NORMAL_BADGE: string  = 'normal_badge';

    private _assets: IAssetManager;
    private _events: IEventDispatcher;
    private _requestedBadges: Map<string, boolean>;

    constructor(assetManager: IAssetManager, eventDispatcher: IEventDispatcher)
    {
        this._assets            = assetManager;
        this._events            = eventDispatcher;
        this._requestedBadges   = new Map();
    }

    public dispose(): void
    {
        this._assets = null;
    }

    public getBadgeImage(badgeName: string, type: string = BadgeImageManager.NORMAL_BADGE, load: boolean = true): Texture<Resource>
    {
        let badge = this.getBadgeTexture(badgeName, type);

        if(!badge && load) badge = this.getBadgePlaceholder();

        return badge;
    }

    public getBadgeInfo(k: string): BadgeInfo
    {
        const badge = this.getBadgeTexture(k);

        return (badge) ? new BadgeInfo(badge, false) : new BadgeInfo(this.getBadgePlaceholder(), true);
    }

    public loadBadgeImage(badgeName: string, type: string = BadgeImageManager.NORMAL_BADGE): string
    {
        if(this._assets.getTexture(this.getBadgeUrl(badgeName, type))) return badgeName;

        this.getBadgeTexture(badgeName, type);

        return null;
    }

    private getBadgeTexture(badgeName: string, type: string = BadgeImageManager.NORMAL_BADGE): Texture<Resource>
    {
        const url = this.getBadgeUrl(badgeName, type);

        const existing = this._assets.getTexture(url);

        if(existing) return existing.clone();

        if(this._requestedBadges.get(badgeName)) return null;

        if(url)
        {
            this._requestedBadges.set(badgeName, true);

            this._assets.downloadAsset(url, (flag: boolean) =>
            {
                if(flag)
                {
                    const texture = this._assets.getTexture(url);

                    if(texture && this._events) this._events.dispatchEvent(new BadgeImageReadyEvent(badgeName, texture.clone()));
                }
            });
        }

        return null;
    }

    private getBadgePlaceholder(): Texture<Resource>
    {
        const url = (Nitro.instance.getConfiguration<string>('images.url') + '/loading_icon.png');
        const existing = this._assets.getTexture(url);

        if(!existing) return null;

        return existing.clone();
    }

    public getBadgeUrl(badge: string, type: string = BadgeImageManager.NORMAL_BADGE): string
    {
        let url = null;

        switch(type)
        {
            case BadgeImageManager.NORMAL_BADGE:
                url = (Nitro.instance.getConfiguration<string>('badge.asset.url')).replace('%badgename%', badge);
                break;
            case BadgeImageManager.GROUP_BADGE:
                url = (Nitro.instance.getConfiguration<string>('badge.asset.group.url')).replace('%badgedata%', badge);
                break;
        }

        return url;
    }
}
