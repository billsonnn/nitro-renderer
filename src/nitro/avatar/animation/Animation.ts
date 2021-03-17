import { IAssetAnimation, IAssetAnimationFrame } from '../../../core/asset/interfaces';
import { AvatarStructure } from '../AvatarStructure';
import { AddDataContainer } from './AddDataContainer';
import { AnimationLayerData } from './AnimationLayerData';
import { AvatarDataContainer } from './AvatarDataContainer';
import { DirectionDataContainer } from './DirectionDataContainer';
import { IAnimation } from './IAnimation';
import { SpriteDataContainer } from './SpriteDataContainer';

export class Animation implements IAnimation
{
    private static _Str_2211: any[] = [];

    private _id: string;
    private _description: string;
    private _frames: AnimationLayerData[][];
    private _spriteData: SpriteDataContainer[];
    private _avatarData: AvatarDataContainer;
    private _directionData: DirectionDataContainer;
    private _removeData: string[];
    private _addData: AddDataContainer[];
    private _overriddenActions: Map<string, string>;
    private _overrideFrames: Map<string, AnimationLayerData[][]>;
    private _resetOnToggle: boolean;

    constructor(k: AvatarStructure, _arg_2: IAssetAnimation)
    {
        this._id                = _arg_2.name;
        this._description       = this._id;
        this._frames            = [];
        this._spriteData        = null;
        this._avatarData        = null;
        this._directionData     = null;
        this._removeData        = null;
        this._addData           = null;
        this._overriddenActions = null;
        this._overrideFrames    = null;
        this._resetOnToggle     = (_arg_2.resetOnToggle || false);

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
            this._overrideFrames    = new Map();
            this._overriddenActions = new Map();

            for(const override of _arg_2.overrides)
            {
                const name  = override.name;
                const value = override.override;

                this._overriddenActions.set(value, name);

                const frames: AnimationLayerData[][] = [];

                this._Str_1031(frames, override.frames, k);

                this._overrideFrames.set(name, frames);
            }
        }

        this._Str_1031(this._frames, _arg_2.frames, k);
    }

    private _Str_1031(frames: AnimationLayerData[][], _arg_2: IAssetAnimationFrame[], _arg_3: AvatarStructure): void
    {
        if(!_arg_2 || !_arg_2.length) return;

        for(const frame of _arg_2)
        {
            let repeats = 1;

            if(frame.repeats && (frame.repeats > 1)) repeats = frame.repeats;

            let index = 0;

            while(index < repeats)
            {
                const layers: AnimationLayerData[] = [];

                if(frame.bodyparts && frame.bodyparts.length)
                {
                    for(const bodyPart of frame.bodyparts)
                    {
                        const definition    = _arg_3._Str_1675(bodyPart.action);
                        const layer         = new AnimationLayerData(bodyPart, AnimationLayerData.BODYPART, definition);

                        layers.push(layer);
                    }
                }

                if(frame.fxs && frame.fxs.length)
                {
                    for(const fx of frame.fxs)
                    {
                        const definition    = _arg_3._Str_1675(fx.action);
                        const layer         = new AnimationLayerData(fx, AnimationLayerData.FX, definition);

                        layers.push(layer);
                    }
                }

                frames.push(layers);

                index++;
            }
        }
    }

    public _Str_2185(k: string = null): number
    {
        if(!k) return this._frames.length;

        if(this._overrideFrames)
        {
            const _local_2 = this._overrideFrames.get(k);

            if(_local_2) return _local_2.length;
        }

        return 0;
    }

    public _Str_1892(): boolean
    {
        if(!this._overriddenActions) return false;

        return (this._overriddenActions.size > 0);
    }

    public _Str_1571(): string[]
    {
        if(!this._overriddenActions) return null;

        const keys: string[] = [];

        for(const key of this._overriddenActions.keys()) keys.push(key);

        return keys;
    }

    public _Str_707(k: string): string
    {
        if(!this._overriddenActions) return null;

        return this._overriddenActions.get(k);
    }

    private _Str_2259(frameCount: number, _arg_2: string = null): AnimationLayerData[]
    {
        if(frameCount < 0) frameCount = 0;

        let layers: AnimationLayerData[] = [];

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

    public _Str_1065(k: number, _arg_2: string=null): string[]
    {
        const _local_3: string[] = [];

        for(const layer of this._Str_2259(k, _arg_2))
        {
            if(layer.type === AnimationLayerData.BODYPART)
            {
                _local_3.push(layer.id);
            }

            else if(layer.type === AnimationLayerData.FX)
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

    public _Str_607(frameCount: number, spriteId: string, _arg_3: string = null): AnimationLayerData
    {
        for(const layer of this._Str_2259(frameCount, _arg_3))
        {
            if(layer.id === spriteId) return layer;

            if(layer.type === AnimationLayerData.FX)
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

    public _Str_872(): boolean
    {
        return this._avatarData !== null;
    }

    public _Str_776(): boolean
    {
        return this._directionData !== null;
    }

    public _Str_706(): boolean
    {
        return this._addData !== null;
    }

    public _Str_1550(k: string): AddDataContainer
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

    public get _Str_786(): SpriteDataContainer[]
    {
        return this._spriteData || Animation._Str_2211;
    }

    public get _Str_1475(): AvatarDataContainer
    {
        return this._avatarData;
    }

    public get _Str_1493(): DirectionDataContainer
    {
        return this._directionData;
    }

    public get _Str_652(): string[]
    {
        return this._removeData || Animation._Str_2211;
    }

    public get _Str_687(): AddDataContainer[]
    {
        return this._addData || Animation._Str_2211;
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
