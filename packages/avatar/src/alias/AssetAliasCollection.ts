import { IAssetManager, IGraphicAsset } from '@nitrots/api';
import { AvatarRenderManager } from '../AvatarRenderManager';
import { AssetAlias } from './AssetAlias';

export class AssetAliasCollection
{
    private _assets: IAssetManager;
    private _aliases: Map<string, AssetAlias>;
    private _avatarRenderManager: AvatarRenderManager;
    private _missingAssetNames: string[];

    constructor(k: AvatarRenderManager, _arg_2: IAssetManager)
    {
        this._avatarRenderManager = k;
        this._aliases = new Map();
        this._assets = _arg_2;
        this._missingAssetNames = [];
    }

    public dispose(): void
    {
        this._assets = null;
        this._aliases = null;
    }

    public reset(): void
    {
        this.init();
    }

    public init(): void
    {
        for(const collection of this._assets.collections.values())
        {
            if(!collection) continue;

            const aliases = collection.data && collection.data.aliases;

            if(!aliases) continue;

            for(const name in aliases)
            {
                const alias = aliases[name];

                if(!alias) continue;

                this._aliases.set(name, new AssetAlias(name, alias));
            }
        }
    }

    public hasAlias(k: string): boolean
    {
        const alias = this._aliases.get(k);

        if(alias) return true;

        return false;
    }

    public getAssetName(k: string): string
    {
        let _local_2 = k;
        let _local_3 = 5;

        while(this.hasAlias(_local_2) && (_local_3 >= 0))
        {
            const _local_4 = this._aliases.get(_local_2);

            _local_2 = _local_4.link;
            _local_3--;
        }

        return _local_2;
    }

    public getAsset(name: string): IGraphicAsset
    {
        if(!this._assets) return null;

        name = this.getAssetName(name);

        const asset = this._assets.getAsset(name);

        if(!asset) return null;

        return asset;
    }
}
