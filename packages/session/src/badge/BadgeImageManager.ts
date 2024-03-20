import { GetAssetManager } from '@nitrots/assets';
import { GetCommunication, GroupBadgePartsEvent } from '@nitrots/communication';
import { GetConfiguration } from '@nitrots/configuration';
import { BadgeImageReadyEvent, GetEventDispatcher } from '@nitrots/events';
import { TextureUtils } from '@nitrots/utils';
import { Container, Sprite, Texture } from 'pixi.js';
import { BadgeInfo } from './BadgeInfo';
import { GroupBadge } from './GroupBadge';
import { GroupBadgePart } from './GroupBadgePart';

export class BadgeImageManager
{
    public static GROUP_BADGE: string = 'group_badge';
    public static NORMAL_BADGE: string = 'normal_badge';

    private _groupBases: Map<number, string[]> = new Map();
    private _groupSymbols: Map<number, string[]> = new Map();
    private _groupPartColors: Map<number, string> = new Map();
    private _requestedBadges: Map<string, boolean> = new Map();
    private _groupBadgesQueue: Map<string, boolean> = new Map();
    private _readyToGenerateGroupBadges: boolean = false;

    public init(): void
    {
        GetCommunication().registerMessageEvent(new GroupBadgePartsEvent(this.onGroupBadgePartsEvent.bind(this)));
    }

    public getBadgeImage(badgeName: string, type: string = BadgeImageManager.NORMAL_BADGE, load: boolean = true): Texture
    {
        return this.getBadgeTexture(badgeName, type);
    }

    public getBadgeInfo(k: string): BadgeInfo
    {
        const badge = this.getBadgeTexture(k);

        return (badge) ? new BadgeInfo(badge, false) : new BadgeInfo(this.getBadgePlaceholder(), true);
    }

    public loadBadgeImage(badgeName: string, type: string = BadgeImageManager.NORMAL_BADGE): string
    {
        if(GetAssetManager().getTexture(this.getBadgeUrl(badgeName, type))) return badgeName;

        this.getBadgeTexture(badgeName, type);

        return null;
    }

    private getBadgeTexture(badgeName: string, type: string = BadgeImageManager.NORMAL_BADGE): Texture
    {
        const url = this.getBadgeUrl(badgeName, type);

        if(!url || !url.length) return null;

        const texture = GetAssetManager().getTexture(url);

        if(texture) return texture;

        if(type === BadgeImageManager.NORMAL_BADGE)
        {
            const loadBadge = async () =>
            {
                await GetAssetManager().downloadAsset(url);

                const texture = GetAssetManager().getTexture(url);

                if(texture) GetEventDispatcher().dispatchEvent(new BadgeImageReadyEvent(badgeName, texture));
            };

            loadBadge();
        }

        else if(type === BadgeImageManager.GROUP_BADGE)
        {
            if(this._groupBadgesQueue.get(badgeName)) return;

            this._groupBadgesQueue.set(badgeName, true);

            if(this._readyToGenerateGroupBadges) this.loadGroupBadge(badgeName);
        }

        return this.getBadgePlaceholder();
    }

    private getBadgePlaceholder(): Texture
    {
        return GetAssetManager().getTexture(GetConfiguration().getValue<string>('images.url') + '/loading_icon.png');
    }

    public getBadgeUrl(badge: string, type: string = BadgeImageManager.NORMAL_BADGE): string
    {
        let url = null;

        switch(type)
        {
            case BadgeImageManager.NORMAL_BADGE:
                url = (GetConfiguration().getValue<string>('badge.asset.url')).replace('%badgename%', badge);
                break;
            case BadgeImageManager.GROUP_BADGE:
                url = badge;
                break;
        }

        return url;
    }

    private loadGroupBadge(badgeCode: string): void
    {
        const groupBadge = new GroupBadge(badgeCode);
        const partMatches = [...badgeCode.matchAll(/[b|s][0-9]{4,6}/g)];

        for(const partMatch of partMatches)
        {
            const partCode = partMatch[0];
            const shortMethod = (partCode.length === 6);
            const partType = partCode[0];
            const partId = parseInt(partCode.slice(1, shortMethod ? 3 : 4));
            const partColor = parseInt(partCode.slice(shortMethod ? 3 : 4, shortMethod ? 5 : 6));
            const partPosition = partCode.length < 6 ? 0 : parseInt(partCode.slice(shortMethod ? 5 : 6, shortMethod ? 6 : 7)); // sometimes position is ommitted 
            const part = new GroupBadgePart(partType, partId, partColor, partPosition);

            groupBadge.parts.push(part);
        }

        this.renderGroupBadge(groupBadge);
    }

    private renderGroupBadge(groupBadge: GroupBadge): void
    {
        const container = new Container();
        const tempSprite = new Sprite(Texture.EMPTY);

        tempSprite.width = GroupBadgePart.IMAGE_WIDTH;
        tempSprite.height = GroupBadgePart.IMAGE_HEIGHT;

        container.addChild(tempSprite);

        for(const part of groupBadge.parts)
        {
            let isFirst = true;

            const partNames = ((part.type === 'b') ? this._groupBases.get(part.key) : this._groupSymbols.get(part.key));

            if(partNames)
            {
                for(const partName of partNames)
                {
                    if(!partName || !partName.length) continue;

                    const texture = GetAssetManager().getTexture(`badgepart_${partName}`);

                    if(!texture) continue;

                    const { x, y } = part.calculatePosition(texture);
                    const sprite = new Sprite(texture);

                    sprite.position.set(x, y);

                    if(isFirst) sprite.tint = parseInt(this._groupPartColors.get(part.color), 16);

                    isFirst = false;

                    container.addChild(sprite);
                }
            }
        }

        this._requestedBadges.delete(groupBadge.code);
        this._groupBadgesQueue.delete(groupBadge.code);

        const texture = TextureUtils.generateTexture(container);
        GetAssetManager().setTexture(groupBadge.code, texture);

        GetEventDispatcher().dispatchEvent(new BadgeImageReadyEvent(groupBadge.code, texture));
    }

    private onGroupBadgePartsEvent(event: GroupBadgePartsEvent): void
    {
        if(!event) return;

        const data = event.getParser();

        if(!data) return;

        data.bases.forEach((names, id) => this._groupBases.set(id, names.map(val => val.replace('.png', '').replace('.gif', ''))));

        data.symbols.forEach((names, id) => this._groupSymbols.set(id, names.map(val => val.replace('.png', '').replace('.gif', ''))));

        this._groupPartColors = data.partColors;
        this._readyToGenerateGroupBadges = true;

        for(const badgeCode of this._groupBadgesQueue.keys()) this.loadGroupBadge(badgeCode);
    }
}
