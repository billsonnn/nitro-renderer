import { IAnimation, IAssetAnimation, IAssetAnimationFrame } from '../../../api';
import { AvatarStructure } from '../AvatarStructure';
import { AddDataContainer } from './AddDataContainer';
import { AvatarAnimationLayerData } from './AvatarAnimationLayerData';
import { AvatarDataContainer } from './AvatarDataContainer';
import { DirectionDataContainer } from './DirectionDataContainer';
import { SpriteDataContainer } from './SpriteDataContainer';

export class Animation implements IAnimation
{
    private static EMPTY_ARRAY: any[] = [];

    private _id: string;
    private _description: string;
    private _frames: AvatarAnimationLayerData[][];
    private _spriteData: SpriteDataContainer[];
    private _avatarData: AvatarDataContainer;
    private _directionData: DirectionDataContainer;
    private _removeData: string[];
    private _addData: AddDataContainer[];
    private _overriddenActions: Map<string, string>;
    private _overrideFrames: Map<string, AvatarAnimationLayerData[][]>;
    private _resetOnToggle: boolean;

    constructor(k: AvatarStructure, _arg_2: IAssetAnimation)
    {
        this._id = _arg_2.name;
        this._description = this._id;
        this._frames = [];
        this._spriteData = null;
        this._avatarData = null;
        this._directionData = null;
        this._removeData = null;
        this._addData = null;
        this._overriddenActions = null;
        this._overrideFrames = null;
        this._resetOnToggle = (_arg_2.resetOnToggle || false);

        if(_arg_2.sprites && _arg_2.sprites.length)
        {
            this._spriteData = [];

            for(const sprite of _arg_2.sprites) this._spriteData.push(new SpriteDataContainer(this, sprite));
        }

        if(_arg_2.avatars && _arg_2.avatars.length) this._avatarData = new AvatarDataContainer(_arg_2.avatars[0]);

        if(_arg_2.directions && _arg_2.directions.length) this._directionData = new DirectionDataContainer(_arg_2.directions[0]);

        if(_arg_2.removes && _arg_2.removes.length)
        {
            this._removeData = [];

            for(const remove of _arg_2.removes) this._removeData.push(remove.id);
        }

        if(_arg_2.adds && _arg_2.adds.length)
        {
            this._addData = [];

            for(const add of _arg_2.adds) this._addData.push(new AddDataContainer(add));
        }

        if(_arg_2.overrides && _arg_2.overrides.length)
        {
            this._overrideFrames = new Map();
            this._overriddenActions = new Map();

            for(const override of _arg_2.overrides)
            {
                const name = override.name;
                const value = override.override;

                this._overriddenActions.set(value, name);

                const frames: AvatarAnimationLayerData[][] = [];

                this.parseFrames(frames, override.frames, k);

                this._overrideFrames.set(name, frames);
            }
        }

        this.parseFrames(this._frames, _arg_2.frames, k);
    }

    private parseFrames(frames: AvatarAnimationLayerData[][], _arg_2: IAssetAnimationFrame[], _arg_3: AvatarStructure): void
    {
        if(!_arg_2 || !_arg_2.length) return;

        for(const frame of _arg_2)
        {
            let repeats = 1;

            if(frame.repeats && (frame.repeats > 1)) repeats = frame.repeats;

            let index = 0;

            while(index < repeats)
            {
                const layers: AvatarAnimationLayerData[] = [];

                if(frame.bodyparts && frame.bodyparts.length)
                {
                    for(const bodyPart of frame.bodyparts)
                    {
                        const definition = _arg_3.getActionDefinition(bodyPart.action);
                        const layer = new AvatarAnimationLayerData(bodyPart, AvatarAnimationLayerData.BODYPART, definition);

                        layers.push(layer);
                    }
                }

                if(frame.fxs && frame.fxs.length)
                {
                    for(const fx of frame.fxs)
                    {
                        const definition = _arg_3.getActionDefinition(fx.action);
                        const layer = new AvatarAnimationLayerData(fx, AvatarAnimationLayerData.FX, definition);

                        layers.push(layer);
                    }
                }

                frames.push(layers);

                index++;
            }
        }
    }

    public frameCount(k: string = null): number
    {
        if(!k) return this._frames.length;

        if(this._overrideFrames)
        {
            const _local_2 = this._overrideFrames.get(k);

            if(_local_2) return _local_2.length;
        }

        return 0;
    }

    public hasOverriddenActions(): boolean
    {
        if(!this._overriddenActions) return false;

        return (this._overriddenActions.size > 0);
    }

    public overriddenActionNames(): string[]
    {
        if(!this._overriddenActions) return null;

        const keys: string[] = [];

        for(const key of this._overriddenActions.keys()) keys.push(key);

        return keys;
    }

    public overridingAction(k: string): string
    {
        if(!this._overriddenActions) return null;

        return this._overriddenActions.get(k);
    }

    private getFrame(frameCount: number, _arg_2: string = null): AvatarAnimationLayerData[]
    {
        if(frameCount < 0) frameCount = 0;

        let layers: AvatarAnimationLayerData[] = [];

        if(!_arg_2)
        {
            if(this._frames.length > 0)
            {
                layers = this._frames[(frameCount % this._frames.length)];
            }
        }
        else
        {
            const overrideLayers = this._overrideFrames.get(_arg_2);

            if(overrideLayers && (overrideLayers.length > 0))
            {
                layers = overrideLayers[(frameCount % overrideLayers.length)];
            }
        }

        return layers;
    }

    public getAnimatedBodyPartIds(k: number, _arg_2: string = null): string[]
    {
        const _local_3: string[] = [];

        for(const layer of this.getFrame(k, _arg_2))
        {
            if(layer.type === AvatarAnimationLayerData.BODYPART)
            {
                _local_3.push(layer.id);
            }

            else if(layer.type === AvatarAnimationLayerData.FX)
            {
                if(this._addData && this._addData.length)
                {
                    for(const _local_5 of this._addData)
                    {
                        if(_local_5.id === layer.id) _local_3.push(_local_5.align);
                    }
                }
            }
        }

        return _local_3;
    }

    public getLayerData(frameCount: number, spriteId: string, _arg_3: string = null): AvatarAnimationLayerData
    {
        for(const layer of this.getFrame(frameCount, _arg_3))
        {
            if(layer.id === spriteId) return layer;

            if(layer.type === AvatarAnimationLayerData.FX)
            {
                if(this._addData && this._addData.length)
                {
                    for(const addData of this._addData)
                    {
                        if(((addData.align === spriteId) && (addData.id === layer.id))) return layer;
                    }
                }
            }
        }

        return null;
    }

    public hasAvatarData(): boolean
    {
        return this._avatarData !== null;
    }

    public hasDirectionData(): boolean
    {
        return this._directionData !== null;
    }

    public hasAddData(): boolean
    {
        return this._addData !== null;
    }

    public getAddData(k: string): AddDataContainer
    {
        if(this._addData)
        {
            for(const _local_2 of this._addData)
            {
                if(_local_2.id === k) return _local_2;
            }
        }

        return null;
    }

    public get id(): string
    {
        return this._id;
    }

    public get spriteData(): SpriteDataContainer[]
    {
        return this._spriteData || Animation.EMPTY_ARRAY;
    }

    public get avatarData(): AvatarDataContainer
    {
        return this._avatarData;
    }

    public get directionData(): DirectionDataContainer
    {
        return this._directionData;
    }

    public get removeData(): string[]
    {
        return this._removeData || Animation.EMPTY_ARRAY;
    }

    public get addData(): AddDataContainer[]
    {
        return this._addData || Animation.EMPTY_ARRAY;
    }

    public toString(): string
    {
        return this._description;
    }

    public get resetOnToggle(): boolean
    {
        return this._resetOnToggle;
    }
}
