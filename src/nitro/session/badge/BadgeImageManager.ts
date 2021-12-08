import { Resource, Texture } from '@pixi/core';
import { IAssetManager } from '../../../core/asset/IAssetManager';
import { IMessageEvent } from '../../../core/communication/messages/IMessageEvent';
import { NitroSprite } from '../../../core/utils/proxy/NitroSprite';
import { GroupBadgePartsEvent } from '../../communication/messages/incoming/group/GroupBadgePartsEvent';
import { Nitro } from '../../Nitro';
import { BadgeImageReadyEvent } from '../events/BadgeImageReadyEvent';
import { IDisposable } from './../../../core/common/disposable/IDisposable';
import { TextureUtils } from './../../../room/utils/TextureUtils';
import { SessionDataManager } from './../SessionDataManager';
import { BadgeInfo } from './BadgeInfo';
import { GroupBadge } from './GroupBadge';
import { GroupBadgePart } from './GroupBadgePart';

export class BadgeImageManager implements IDisposable
{
    public static GROUP_BADGE: string   = 'group_badge';
    public static NORMAL_BADGE: string  = 'normal_badge';

    private _assets: IAssetManager;
    private _sessionDataManager: SessionDataManager;
    private _messages: IMessageEvent[];

    private _groupBases: Map<number, string[]>;
    private _groupSymbols: Map<number, string[]>;
    private _groupPartColors: Map<number, string>;

    private _requestedBadges: Map<string, boolean>;
    private _groupBadgesQueue: Map<string, boolean>;

    private _readyToGenerateGroupBadges: boolean;

    constructor(assetManager: IAssetManager, sessionDataManager: SessionDataManager)
    {
        this._assets                = assetManager;
        this._sessionDataManager    = sessionDataManager;

        this._groupBases            = new Map();
        this._groupSymbols          = new Map();
        this._groupPartColors       = new Map();

        this._requestedBadges       = new Map();
        this._groupBadgesQueue      = new Map();

        this._readyToGenerateGroupBadges = false;
    }

    public init(): void
    {
        if(this._sessionDataManager && this._sessionDataManager.communication)
        {
            this._messages = [
                new GroupBadgePartsEvent(this.onGroupBadgePartsEvent.bind(this))
            ];

            for(const message of this._messages) this._sessionDataManager.communication.registerMessageEvent(message);

            //this._sessionDataManager.send(new GroupBadgePartsComposer());
        }
    }

    public dispose(): void
    {
        if(this._messages && this._messages.length)
        {
            for(const message of this._messages) this._sessionDataManager.communication.removeMessageEvent(message);

            this._messages = null;
        }

        this._sessionDataManager = null;
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

            if(type === BadgeImageManager.NORMAL_BADGE)
            {
                this._assets.downloadAsset(url, (flag: boolean) =>
                {
                    if(flag)
                    {
                        this._requestedBadges.delete(badgeName);

                        const texture = this._assets.getTexture(url);

                        if(texture && this._sessionDataManager) this._sessionDataManager.events.dispatchEvent(new BadgeImageReadyEvent(badgeName, texture.clone()));
                    }
                });
            }
            else
            {
                if(!this._readyToGenerateGroupBadges)
                {
                    if(!this._groupBadgesQueue.get(badgeName)) this._groupBadgesQueue.set(badgeName, true);
                }
                else
                {
                    this.loadGroupBadge(badgeName);
                }
            }
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
                //url = (Nitro.instance.getConfiguration<string>('badge.asset.group.url')).replace('%badgedata%', badge);
                url = badge;
                break;
        }

        return url;
    }

    private loadGroupBadge(badgeCode: string): void
    {
        const groupBadge = new GroupBadge(badgeCode);
        const imagePath = Nitro.instance.getConfiguration<string>('badge.asset.grouparts.url');

        const urlsToLoad: string[] = [];

        const partMatches = [...badgeCode.matchAll(/[b|s][0-9]{5,6}/g)];

        for(const partMatch of partMatches)
        {
            const partCode = partMatch[0];
            const shortMethod = (partCode.length === 6);

            const partType = partCode[0];
            const partId = parseInt(partCode.slice(1, shortMethod ? 3 : 4));
            const partColor = parseInt(partCode.slice(shortMethod ? 3 : 4, shortMethod ? 5 : 6));
            const partPosition = parseInt(partCode.slice(shortMethod ? 5 : 6, shortMethod ? 6 : 7));

            const part = new GroupBadgePart(partType, partId, partColor, partPosition);
            groupBadge.parts.push(part);

            const isBase = (partType === 'b');

            const requiredAssets = isBase ? this._groupBases.get(partId) : this._groupSymbols.get(partId);

            if(!requiredAssets) continue;

            for(const requiredAsset of requiredAssets)
            {
                if(requiredAsset.length > 0)
                {
                    const url = imagePath.replace('%part%', requiredAsset);
                    part.urls.push(url);

                    if(!this._assets.getAsset(requiredAsset)) urlsToLoad.push(url);
                }
            }
        }

        if(urlsToLoad.length === 0) return this.renderGroupBadge(groupBadge);

        this._assets.downloadAssets(urlsToLoad, (flag: boolean) =>
        {
            this.renderGroupBadge(groupBadge);
        });
    }

    private renderGroupBadge(groupBadge: GroupBadge): void
    {
        for(const part of groupBadge.parts)
        {
            let isFirst = true;
            for(const partUrl of part.urls)
            {
                const texture = this._assets.getTexture(partUrl);

                if(!texture) continue; //Generate with what we got

                const pos = part.calculatePosition(texture);

                const sprite = new NitroSprite(texture);
                sprite.x = pos.x;
                sprite.y = pos.y;

                if(isFirst) sprite.tint = parseInt(this._groupPartColors.get(part.color), 16);

                isFirst = false;

                groupBadge.container.addChild(sprite);
            }
        }

        this._requestedBadges.delete(groupBadge.code);
        this._groupBadgesQueue.delete(groupBadge.code);

        const texture = TextureUtils.generateTexture(groupBadge.container);
        this._assets.setTexture(groupBadge.code, texture);

        if(this._sessionDataManager) this._sessionDataManager.events.dispatchEvent(new BadgeImageReadyEvent(groupBadge.code, texture));
    }

    private onGroupBadgePartsEvent(event: GroupBadgePartsEvent): void
    {
        if(!event) return;

        const data = event.getParser();

        if(!data) return;

        data.bases.forEach( (names, id) =>
        {
            this._groupBases.set(id, names.map( val => val.replace('.png', '').replace('.gif', '')));
        });

        data.symbols.forEach( (names, id) =>
        {
            this._groupSymbols.set(id, names.map( val => val.replace('.png', '').replace('.gif', '')));
        });

        this._groupPartColors = data.partColors;
        this._readyToGenerateGroupBadges = true;

        this._groupBadgesQueue.forEach((_, badgeCode) =>
        {
            this.loadGroupBadge(badgeCode);
        });
    }

    public get disposed(): boolean
    {
        return !!this._sessionDataManager;
    }
}
