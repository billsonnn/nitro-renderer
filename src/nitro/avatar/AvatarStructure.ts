import { Point } from 'pixi.js';
import { IAssetManager } from '../../core/asset/IAssetManager';
import { IAssetAnimation } from '../../core/asset/interfaces';
import { EventDispatcher } from '../../core/events/EventDispatcher';
import { ActionDefinition } from './actions/ActionDefinition';
import { AvatarActionManager } from './actions/AvatarActionManager';
import { IActionDefinition } from './actions/IActionDefinition';
import { IActiveActionData } from './actions/IActiveActionData';
import { Animation } from './animation/Animation';
import { AnimationLayerData } from './animation/AnimationLayerData';
import { AnimationManager } from './animation/AnimationManager';
import { AvatarImagePartContainer } from './AvatarImagePartContainer';
import { AvatarRenderManager } from './AvatarRenderManager';
import { AvatarDirectionAngle } from './enum/AvatarDirectionAngle';
import { AvatarModelGeometry } from './geometry/AvatarModelGeometry';
import { IAvatarFigureContainer } from './IAvatarFigureContainer';
import { IAvatarImage } from './IAvatarImage';
import { IAvatarRenderManager } from './IAvatarRenderManager';
import { AnimationAction } from './structure/animation/AnimationAction';
import { AnimationFrame } from './structure/animation/AnimationFrame';
import { AnimationData } from './structure/AnimationData';
import { AvatarCanvas } from './structure/AvatarCanvas';
import { IFigurePartSet } from './structure/figure/IFigurePartSet';
import { IPartColor } from './structure/figure/IPartColor';
import { FigureSetData } from './structure/FigureSetData';
import { IStructureData } from './structure/IStructureData';
import { PartSetsData } from './structure/PartSetsData';

export class AvatarStructure extends EventDispatcher
{
    private _renderManager: AvatarRenderManager;
    private _geometry: AvatarModelGeometry;
    private _figureData: FigureSetData;
    private _partSetsData: PartSetsData;
    private _animationData: AnimationData;
    private _animationManager: AnimationManager;
    private _mandatorySetTypeIds: { [index: string]: { [index: number]: string[] } };
    private _actionManager: AvatarActionManager;
    private _defaultAction: IActionDefinition;

    constructor(renderManager: AvatarRenderManager)
    {
        super();

        this._renderManager         = renderManager;
        this._geometry              = null;
        this._figureData            = new FigureSetData();
        this._partSetsData          = new PartSetsData();
        this._animationData         = new AnimationData();
        this._animationManager      = new AnimationManager();
        this._mandatorySetTypeIds   = {};
        this._actionManager         = null;
        this._defaultAction         = null;
    }

    public init(): void
    {

    }

    public dispose(): void
    {
        if(this.disposed) return;

        super.dispose();

        this._renderManager         = null;
        this._figureData            = null;
        this._partSetsData          = null;
        this._animationData         = null;
        this._mandatorySetTypeIds   = null;
    }

    public _Str_1825(k: any): void
    {
        if(!k) return;

        this._geometry = new AvatarModelGeometry(k);
    }

    public _Str_1060(k: IAssetManager, _arg_2: any): void
    {
        if(!_arg_2) return;

        this._actionManager = new AvatarActionManager(k, _arg_2);
        this._defaultAction = this._actionManager._Str_1027();
    }

    public _Str_1620(data: any): void
    {
        this._actionManager._Str_1620(data);

        this._defaultAction = this._actionManager._Str_1027();
    }

    public _Str_1296(k: any): boolean
    {
        if(!k) return false;

        if(this._partSetsData.parse(k))
        {
            this._partSetsData._Str_1102('ri')._Str_1583 = true;
            this._partSetsData._Str_1102('li')._Str_1583 = true;

            return true;
        }

        return false;
    }

    public _Str_2229(k: any): boolean
    {
        if(!k) return false;

        return this._animationData.parse(k);
    }

    public _Str_1569(k: any): boolean
    {
        if(!k) return false;

        return this._figureData.parse(k);
    }

    public _Str_882(data: any): void
    {
        this._figureData._Str_1133(data);
    }

    public _Str_1849(k: IAssetManager, _arg_2: string = 'fx', _arg_3: number = 200): void
    {
        let index = 0;

        while(index < _arg_3)
        {
            const collection = k.getCollection((_arg_2 + index));

            if(collection)
            {
                const animationData = collection.data;

                this._animationManager._Str_2061(this, animationData.animations);
            }

            index++;
        }
    }

    public _Str_2061(data: { [index: string]: IAssetAnimation }): void
    {
        this._animationManager._Str_2061(this, data);
    }

    public _Str_867(k: IAvatarFigureContainer, _arg_2: string, _arg_3: number = 0): IPartColor
    {
        const _local_4 = k._Str_815(_arg_2);

        if((!(_local_4)) || (_local_4.length < _arg_3)) return null;

        const _local_5 = this._figureData._Str_740(_arg_2);

        if(_local_5 == null) return null;

        const _local_6 = this._figureData._Str_783(_local_5._Str_734);

        if(!_local_6) return null;

        return _local_6._Str_751(_local_4[_arg_3]);
    }

    public _Str_1881(animation: string, frameCount: number, spriteId: string): AnimationLayerData
    {
        return this._animationManager._Str_607(animation, frameCount, spriteId) as AnimationLayerData;
    }

    public _Str_720(k: string): Animation
    {
        return this._animationManager._Str_720(k) as Animation;
    }

    public _Str_1675(k: string): ActionDefinition
    {
        return this._actionManager._Str_1675(k);
    }

    public _Str_2018(k: string): ActionDefinition
    {
        return this._actionManager._Str_2018(k);
    }

    public _Str_1939(k: string): boolean
    {
        return this._geometry._Str_1939(k);
    }

    public _Str_711(k: IActiveActionData[]): IActiveActionData[]
    {
        return this._actionManager._Str_711(k);
    }

    public _Str_1936(k: IActiveActionData[]): number
    {
        let _local_2 = 0;

        for(const _local_3 of k)
        {
            _local_2 = Math.max(_local_2, this._animationData._Str_1408(_local_3._Str_742));
        }
        return _local_2;
    }

    public _Str_1733(k: string, _arg_2: number): string[]
    {
        if(!this._mandatorySetTypeIds[k])
        {
            this._mandatorySetTypeIds[k] = [];
        }

        if(this._mandatorySetTypeIds[k][_arg_2])
        {
            return this._mandatorySetTypeIds[k][_arg_2];
        }

        this._mandatorySetTypeIds[k][_arg_2] = this._figureData._Str_1733(k, _arg_2);

        return this._mandatorySetTypeIds[k][_arg_2];
    }

    public _Str_2264(k: string, _arg_2: string): IFigurePartSet
    {
        return this._figureData._Str_2264(k, _arg_2);
    }

    public _Str_781(k: IActiveActionData[], _arg_2: string, _arg_3: number): number[]
    {
        return this._actionManager._Str_781(k, _arg_2, _arg_3);
    }

    public _Str_1664(k: string, _arg_2: string): AvatarCanvas
    {
        return this._geometry._Str_1664(k, _arg_2);
    }

    public _Str_2101(k: IAvatarImage): void
    {
        this._geometry._Str_2101(k);
    }

    public _Str_2021(k: IActiveActionData, _arg_2: IAvatarImage): string[]
    {
        let _local_3: string[] = [];

        const _local_4: string[]    = [];
        const _local_5              = k._Str_742._Str_868;

        if(k._Str_742._Str_861)
        {
            const _local_7 = ((k._Str_742.state + '.') + k._Str_727);
            const _local_8 = this._animationManager._Str_720(_local_7);

            if(_local_8)
            {
                _local_3 = _local_8._Str_1065(0, k._Str_707);

                if(_local_8._Str_706())
                {
                    const _local_11 = {
                        id: '',
                        x: 0,
                        y: 0,
                        z: 0,
                        radius: 0.01,
                        nx: 0,
                        ny: 0,
                        nz: -1,
                        double: 1
                    };

                    const _local_12 = {
                        setType: ''
                    };

                    for(const _local_13 of _local_8._Str_687)
                    {
                        const _local_6 = this._geometry._Str_1919(_local_5, _local_13.align);

                        if(_local_6)
                        {
                            _local_11.id = _local_13.id;
                            _local_6._Str_2020(_local_11, _arg_2);

                            _local_12.setType = _local_13.id;

                            const _local_10 = this._partSetsData._Str_1520(_local_12);
                            _local_10._Str_1583 = true;

                            if(_local_13.base === '') _local_10._Str_1734 = 1;

                            if(_local_4.indexOf(_local_6.id) === -1) _local_4.push(_local_6.id);
                        }
                    }
                }
            }

            for(const _local_9 of _local_3)
            {
                const _local_6 = this._geometry._Str_1919(_local_5, _local_9);

                if(_local_6 && (_local_4.indexOf(_local_6.id) === -1)) _local_4.push(_local_6.id);
            }
        }
        else
        {
            _local_3 = this._partSetsData._Str_1795(k._Str_742);

            for(const _local_14 of _local_3)
            {
                const _local_6 = this._geometry._Str_1701(_local_5, _local_14, _arg_2);

                if(_local_6 && (_local_4.indexOf(_local_6.id) === -1)) _local_4.push(_local_6.id);
            }
        }

        return _local_4;
    }

    public _Str_1695(k: string): string[]
    {
        return this._geometry._Str_1307(k);
    }

    public _Str_755(k: string, _arg_2: string, _arg_3: number): string[]
    {
        const _local_4 = AvatarDirectionAngle.DIRECTION_TO_ANGLE[_arg_3];

        return this._geometry._Str_2250(k, _local_4, _arg_2);
    }

    public _Str_1888(k:IActiveActionData, _arg_2: number, _arg_3: number, _arg_4: string): Point
    {
        const _local_5 = this._animationData._Str_2244(k._Str_742);

        if(_local_5) return _local_5._Str_1888(_arg_2, _arg_3, _arg_4);

        return AnimationAction._Str_1934;
    }

    public _Str_713(k: string, _arg_2:IAvatarFigureContainer, _arg_3:IActiveActionData, _arg_4: string, _arg_5: number, removes: string[], _arg_7: IAvatarImage, _arg_8: Map<string, string> = null): AvatarImagePartContainer[]
    {
        const _local_10: Animation = null;
        let _local_34: IActionDefinition = null;

        let _local_20: AnimationFrame[] = [];
        let _local_36:IPartColor = null;

        if(!_arg_3 == null) return [];

        const _local_9                                = this._partSetsData._Str_1795(_arg_3._Str_742);
        const _local_11: AvatarImagePartContainer[]   = [];
        let _local_14: any[]                     = [ 0 ];
        const _local_15                               = this._animationData._Str_2244(_arg_3._Str_742);

        if(_arg_3._Str_742._Str_861)
        {
            const _local_24 = ((_arg_3._Str_742.state + '.') + _arg_3._Str_727);
            const _local_10 = this._animationManager._Str_720(_local_24);

            if(_local_10)
            {
                _local_14 = this._Str_1768(_local_10._Str_2185(_arg_3._Str_707));

                for(const _local_25 of _local_10._Str_1065(0, _arg_3._Str_707))
                {
                    if(_local_25 === k)
                    {
                        const _local_26 = this._geometry._Str_1919(_arg_4, _local_25);

                        if(_local_26)
                        {
                            for(const _local_27 of _local_26._Str_1883(_arg_7))
                            {
                                _local_9.push(_local_27.id);
                            }
                        }
                    }
                }
            }
        }

        const _local_16     = this._geometry._Str_713(_arg_4, k, _arg_5, _local_9, _arg_7);
        const  _local_21    = _arg_2._Str_1016();

        for(const _local_17 of _local_21)
        {
            if(_arg_8)
            {
                if(_arg_8.get(_local_17)) continue;
            }

            const _local_28 = _arg_2.getPartSetId(_local_17);
            const _local_29 = _arg_2._Str_815(_local_17);
            const _local_30 = this._figureData._Str_740(_local_17);



            if(_local_30)
            {
                const _local_31 = this._figureData._Str_783(_local_30._Str_734);

                if(_local_31)
                {
                    const _local_32 = _local_30._Str_1020(_local_28);

                    if(_local_32)
                    {
                        removes = removes.concat(_local_32._Str_790);

                        for(const _local_33 of _local_32._Str_806)
                        {
                            if(_local_16.indexOf(_local_33.type) > -1)
                            {
                                if(_local_15)
                                {
                                    const _local_19 = _local_15._Str_989(_local_33.type);

                                    if(_local_19)
                                    {
                                        _local_20 = _local_19.frames;
                                    }
                                    else
                                    {
                                        _local_20 = _local_14;
                                    }
                                }
                                else
                                {
                                    _local_20 = _local_14;
                                }

                                _local_34 = _arg_3._Str_742;

                                if(_local_9.indexOf(_local_33.type) === -1) _local_34 = this._defaultAction;

                                const _local_13 = this._partSetsData._Str_1102(_local_33.type);

                                let _local_35 = (!_local_13) ? _local_33.type : _local_13._Str_1693;

                                if(!_local_35 || (_local_35 === '')) _local_35 = _local_33.type;

                                if(_local_29 && (_local_29.length > (_local_33._Str_827 - 1)))
                                {
                                    _local_36 = _local_31._Str_751(_local_29[(_local_33._Str_827 - 1)]);
                                }

                                const _local_37 = (_local_33._Str_827 > 0);
                                const _local_18 = new AvatarImagePartContainer(k, _local_33.type, _local_33.id.toString(), _local_36, _local_20, _local_34, _local_37, _local_33.paletteMap, _local_35);

                                _local_11.push(_local_18);
                            }
                        }
                    }
                }
            }
        }

        const _local_22: AvatarImagePartContainer[] = [];

        for(const _local_12 of _local_16)
        {
            let _local_39: IPartColor = null;
            let _local_38             = false;

            const _local_40 = ((_arg_8) && (_arg_8.get(_local_12)));

            for(const _local_23 of _local_11)
            {
                if(_local_23._Str_1669 === _local_12)
                {
                    if(_local_40)
                    {
                        _local_39 = _local_23.color;
                    }
                    else
                    {
                        _local_38 = true;

                        if(removes.indexOf(_local_12) === -1) _local_22.push(_local_23);
                    }
                }
            }

            if(!_local_38)
            {
                if(_local_40)
                {
                    const _local_41 = _arg_8.get(_local_12);

                    let _local_42 = 0;
                    let _local_43 = 0;

                    while(_local_43 < _local_41.length)
                    {
                        _local_42 = (_local_42 + _local_41.charCodeAt(_local_43));
                        _local_43++;
                    }

                    if(_local_15)
                    {
                        const _local_19 = _local_15._Str_989(_local_12);

                        if(_local_19)
                        {
                            _local_20 = _local_19.frames;
                        }
                        else
                        {
                            _local_20 = _local_14;
                        }
                    }
                    else
                    {
                        _local_20 = _local_14;
                    }

                    const _local_18 = new AvatarImagePartContainer(k, _local_12, _local_41, _local_39, _local_20, _arg_3._Str_742, (!(_local_39 == null)), -1, _local_12, false, 1);

                    _local_22.push(_local_18);
                }
                else
                {
                    if(_local_9.indexOf(_local_12) > -1)
                    {
                        const _local_44 = this._geometry._Str_1701(_arg_4, _local_12, _arg_7);

                        if(k !== _local_44.id)
                        {
                            //
                        }
                        else
                        {
                            const _local_13 = this._partSetsData._Str_1102(_local_12);

                            let _local_45 = false;
                            let _local_46 = 1;

                            if(_local_13._Str_1583)
                            {
                                let _local_47 = '1';

                                if(_arg_3._Str_727 !== '')
                                {
                                    _local_47 = _arg_3._Str_727;
                                }

                                if(_local_13._Str_2234())
                                {
                                    _local_47 = _local_13._Str_1734.toString();
                                }

                                if(_local_10 != null)
                                {
                                    const _local_48 = _local_10._Str_1550(_local_12);

                                    if(_local_48)
                                    {
                                        _local_45 = _local_48._Str_1096;
                                        _local_46 = _local_48.blend;
                                    }
                                }

                                if(_local_15)
                                {
                                    const _local_19 = _local_15._Str_989(_local_12);

                                    if(_local_19)
                                    {
                                        _local_20 = _local_19.frames;
                                    }
                                    else
                                    {
                                        _local_20 = _local_14;
                                    }
                                }
                                else
                                {
                                    _local_20 = _local_14;
                                }

                                const _local_18 = new AvatarImagePartContainer(k, _local_12, _local_47, null, _local_20, _arg_3._Str_742, false, -1, _local_12, _local_45, _local_46);

                                _local_22.push(_local_18);
                            }
                        }
                    }
                }
            }
        }

        return _local_22;
    }

    private _Str_1768(k: number): number[]
    {
        const _local_2: number[] = [];

        let index = 0;

        while(index < k)
        {
            _local_2.push(index);

            index++;
        }

        return _local_2;
    }

    public _Str_672(): string[]
    {
        if(this._actionManager)
        {
            const k = this._actionManager._Str_1675('CarryItem').params;

            const _local_2 = [];

            for(const _local_3 of k.values()) _local_2.push(_local_3);

            return _local_2;
        }

        return [];
    }

    public get renderManager(): IAvatarRenderManager
    {
        return this._renderManager;
    }

    public get figureData(): IStructureData
    {
        return this._figureData;
    }

    public get partData(): PartSetsData
    {
        return this._partSetsData;
    }

    public get animationManager(): AnimationManager
    {
        return this._animationManager;
    }
}
