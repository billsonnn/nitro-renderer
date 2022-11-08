import { Point } from '@pixi/math';
import { AvatarDirectionAngle, IActionDefinition, IActiveActionData, IAssetAnimation, IAssetManager, IAvatarFigureContainer, IAvatarImage, IAvatarRenderManager, IFigureData, IFigurePartSet, IPartColor, IStructureData } from '../../api';
import { EventDispatcher } from '../../core';
import { ActionDefinition, AvatarActionManager } from './actions';
import { Animation, AnimationManager, AvatarAnimationLayerData } from './animation';
import { AvatarImagePartContainer } from './AvatarImagePartContainer';
import { AvatarRenderManager } from './AvatarRenderManager';
import { AvatarModelGeometry } from './geometry';
import { AnimationAction, AvatarAnimationData, AvatarAnimationFrame, AvatarCanvas, FigureSetData, PartSetsData } from './structure';

export class AvatarStructure extends EventDispatcher
{
    private _renderManager: AvatarRenderManager;
    private _geometry: AvatarModelGeometry;
    private _figureData: FigureSetData;
    private _partSetsData: PartSetsData;
    private _animationData: AvatarAnimationData;
    private _animationManager: AnimationManager;
    private _mandatorySetTypeIds: { [index: string]: { [index: number]: string[] } };
    private _actionManager: AvatarActionManager;
    private _defaultAction: IActionDefinition;

    constructor(renderManager: AvatarRenderManager)
    {
        super();

        this._renderManager = renderManager;
        this._geometry = null;
        this._figureData = new FigureSetData();
        this._partSetsData = new PartSetsData();
        this._animationData = new AvatarAnimationData();
        this._animationManager = new AnimationManager();
        this._mandatorySetTypeIds = {};
        this._actionManager = null;
        this._defaultAction = null;
    }

    public init(): void
    {

    }

    public dispose(): void
    {
        if(this.disposed) return;

        super.dispose();

        this._renderManager = null;
        this._figureData = null;
        this._partSetsData = null;
        this._animationData = null;
        this._mandatorySetTypeIds = null;
    }

    public initGeometry(k: any): void
    {
        if(!k) return;

        this._geometry = new AvatarModelGeometry(k);
    }

    public initActions(k: IAssetManager, _arg_2: any): void
    {
        if(!_arg_2) return;

        this._actionManager = new AvatarActionManager(k, _arg_2);
        this._defaultAction = this._actionManager.getDefaultAction();
    }

    public updateActions(data: any): void
    {
        this._actionManager.updateActions(data);

        this._defaultAction = this._actionManager.getDefaultAction();
    }

    public initPartSets(k: any): boolean
    {
        if(!k) return false;

        if(this._partSetsData.parse(k))
        {
            this._partSetsData.getPartDefinition('ri').appendToFigure = true;
            this._partSetsData.getPartDefinition('li').appendToFigure = true;

            return true;
        }

        return false;
    }

    public initAnimation(k: any): boolean
    {
        if(!k) return false;

        return this._animationData.parse(k);
    }

    public initFigureData(k: IFigureData): boolean
    {
        if(!k) return false;

        return this._figureData.parse(k);
    }

    public injectFigureData(data: IFigureData): void
    {
        this._figureData.injectJSON(data);
    }

    public registerAnimations(k: IAssetManager, _arg_2: string = 'fx', _arg_3: number = 200): void
    {
        let index = 0;

        while(index < _arg_3)
        {
            const collection = k.getCollection((_arg_2 + index));

            if(collection)
            {
                const animationData = collection.data;

                this._animationManager.registerAnimation(this, animationData.animations);
            }

            index++;
        }
    }

    public registerAnimation(data: { [index: string]: IAssetAnimation }): void
    {
        this._animationManager.registerAnimation(this, data);
    }

    public getPartColor(k: IAvatarFigureContainer, _arg_2: string, _arg_3: number = 0): IPartColor
    {
        const _local_4 = k.getPartColorIds(_arg_2);

        if((!(_local_4)) || (_local_4.length < _arg_3)) return null;

        const _local_5 = this._figureData.getSetType(_arg_2);

        if(_local_5 == null) return null;

        const _local_6 = this._figureData.getPalette(_local_5.paletteID);

        if(!_local_6) return null;

        return _local_6.getColor(_local_4[_arg_3]);
    }

    public getBodyPartData(animation: string, frameCount: number, spriteId: string): AvatarAnimationLayerData
    {
        return this._animationManager.getLayerData(animation, frameCount, spriteId) as AvatarAnimationLayerData;
    }

    public getAnimation(k: string): Animation
    {
        return this._animationManager.getAnimation(k) as Animation;
    }

    public getActionDefinition(k: string): ActionDefinition
    {
        return this._actionManager.getActionDefinition(k);
    }

    public getActionDefinitionWithState(k: string): ActionDefinition
    {
        return this._actionManager.getActionDefinitionWithState(k);
    }

    public isMainAvatarSet(k: string): boolean
    {
        return this._geometry.isMainAvatarSet(k);
    }

    public sortActions(k: IActiveActionData[]): IActiveActionData[]
    {
        return this._actionManager.sortActions(k);
    }

    public maxFrames(k: IActiveActionData[]): number
    {
        let _local_2 = 0;

        for(const _local_3 of k)
        {
            _local_2 = Math.max(_local_2, this._animationData.getFrameCount(_local_3.definition));
        }
        return _local_2;
    }

    public getMandatorySetTypeIds(k: string, _arg_2: number): string[]
    {
        if(!this._mandatorySetTypeIds[k])
        {
            this._mandatorySetTypeIds[k] = [];
        }

        if(this._mandatorySetTypeIds[k][_arg_2])
        {
            return this._mandatorySetTypeIds[k][_arg_2];
        }

        this._mandatorySetTypeIds[k][_arg_2] = this._figureData.getMandatorySetTypeIds(k, _arg_2);

        return this._mandatorySetTypeIds[k][_arg_2];
    }

    public getDefaultPartSet(k: string, _arg_2: string): IFigurePartSet
    {
        return this._figureData.getDefaultPartSet(k, _arg_2);
    }

    public getCanvasOffsets(k: IActiveActionData[], _arg_2: string, _arg_3: number): number[]
    {
        return this._actionManager.getCanvasOffsets(k, _arg_2, _arg_3);
    }

    public getCanvas(k: string, _arg_2: string): AvatarCanvas
    {
        return this._geometry.getCanvas(k, _arg_2);
    }

    public removeDynamicItems(k: IAvatarImage): void
    {
        this._geometry.removeDynamicItems(k);
    }

    public getActiveBodyPartIds(k: IActiveActionData, _arg_2: IAvatarImage): string[]
    {
        let _local_3: string[] = [];

        const _local_4: string[] = [];
        const _local_5 = k.definition.geometryType;

        if(k.definition.isAnimation)
        {
            const _local_7 = ((k.definition.state + '.') + k.actionParameter);
            const _local_8 = this._animationManager.getAnimation(_local_7);

            if(_local_8)
            {
                _local_3 = _local_8.getAnimatedBodyPartIds(0, k.overridingAction);

                if(_local_8.hasAddData())
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

                    for(const _local_13 of _local_8.addData)
                    {
                        const _local_6 = this._geometry.getBodyPart(_local_5, _local_13.align);

                        if(_local_6)
                        {
                            _local_11.id = _local_13.id;
                            _local_6.addPart(_local_11, _arg_2);

                            _local_12.setType = _local_13.id;

                            const _local_10 = this._partSetsData.addPartDefinition(_local_12);
                            _local_10.appendToFigure = true;

                            if(_local_13.base === '') _local_10.staticId = 1;

                            if(_local_4.indexOf(_local_6.id) === -1) _local_4.push(_local_6.id);
                        }
                    }
                }
            }

            for(const _local_9 of _local_3)
            {
                const _local_6 = this._geometry.getBodyPart(_local_5, _local_9);

                if(_local_6 && (_local_4.indexOf(_local_6.id) === -1)) _local_4.push(_local_6.id);
            }
        }
        else
        {
            _local_3 = this._partSetsData.getActiveParts(k.definition);

            for(const _local_14 of _local_3)
            {
                const _local_6 = this._geometry.getBodyPartOfItem(_local_5, _local_14, _arg_2);

                if(_local_6 && (_local_4.indexOf(_local_6.id) === -1)) _local_4.push(_local_6.id);
            }
        }

        return _local_4;
    }

    public getBodyPartsUnordered(k: string): string[]
    {
        return this._geometry.getBodyPartIdsInAvatarSet(k);
    }

    public getBodyParts(k: string, _arg_2: string, _arg_3: number): string[]
    {
        const _local_4 = AvatarDirectionAngle.DIRECTION_TO_ANGLE[_arg_3];

        return this._geometry.getBodyPartsAtAngle(k, _local_4, _arg_2);
    }

    public getFrameBodyPartOffset(k: IActiveActionData, _arg_2: number, _arg_3: number, _arg_4: string): Point
    {
        const _local_5 = this._animationData.getAction(k.definition);

        if(_local_5) return _local_5.getFrameBodyPartOffset(_arg_2, _arg_3, _arg_4);

        return AnimationAction.DEFAULT_OFFSET;
    }

    public getParts(k: string, _arg_2: IAvatarFigureContainer, _arg_3: IActiveActionData, _arg_4: string, _arg_5: number, removes: string[], _arg_7: IAvatarImage, _arg_8: Map<string, string> = null): AvatarImagePartContainer[]
    {
        const _local_10: Animation = null;
        let _local_34: IActionDefinition = null;

        let _local_20: AvatarAnimationFrame[] = [];
        let _local_36: IPartColor = null;

        if(!_arg_3 == null) return [];

        const _local_9 = this._partSetsData.getActiveParts(_arg_3.definition);
        const _local_11: AvatarImagePartContainer[] = [];
        let _local_14: any[] = [0];
        const _local_15 = this._animationData.getAction(_arg_3.definition);

        if(_arg_3.definition.isAnimation)
        {
            const _local_24 = ((_arg_3.definition.state + '.') + _arg_3.actionParameter);
            const _local_10 = this._animationManager.getAnimation(_local_24);

            if(_local_10)
            {
                _local_14 = this.getPopulatedArray(_local_10.frameCount(_arg_3.overridingAction));

                for(const _local_25 of _local_10.getAnimatedBodyPartIds(0, _arg_3.overridingAction))
                {
                    if(_local_25 === k)
                    {
                        const _local_26 = this._geometry.getBodyPart(_arg_4, _local_25);

                        if(_local_26)
                        {
                            for(const _local_27 of _local_26.getDynamicParts(_arg_7))
                            {
                                _local_9.push(_local_27.id);
                            }
                        }
                    }
                }
            }
        }

        const _local_16 = this._geometry.getParts(_arg_4, k, _arg_5, _local_9, _arg_7);
        const _local_21 = _arg_2.getPartTypeIds();

        for(const _local_17 of _local_21)
        {
            if(_arg_8)
            {
                if(_arg_8.get(_local_17)) continue;
            }

            const _local_28 = _arg_2.getPartSetId(_local_17);
            const _local_29 = _arg_2.getPartColorIds(_local_17);
            const _local_30 = this._figureData.getSetType(_local_17);



            if(_local_30)
            {
                const _local_31 = this._figureData.getPalette(_local_30.paletteID);

                if(_local_31)
                {
                    const _local_32 = _local_30.getPartSet(_local_28);

                    if(_local_32)
                    {
                        removes = removes.concat(_local_32.hiddenLayers);

                        for(const _local_33 of _local_32.parts)
                        {
                            if(_local_16.indexOf(_local_33.type) > -1)
                            {
                                if(_local_15)
                                {
                                    const _local_19 = _local_15.getPart(_local_33.type);

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

                                _local_34 = _arg_3.definition;

                                if(_local_9.indexOf(_local_33.type) === -1) _local_34 = this._defaultAction;

                                const _local_13 = this._partSetsData.getPartDefinition(_local_33.type);

                                let _local_35 = (!_local_13) ? _local_33.type : _local_13.flippedSetType;

                                if(!_local_35 || (_local_35 === '')) _local_35 = _local_33.type;

                                if(_local_29 && (_local_29.length > (_local_33.colorLayerIndex - 1)))
                                {
                                    _local_36 = _local_31.getColor(_local_29[(_local_33.colorLayerIndex - 1)]);
                                }

                                const _local_37 = (_local_33.colorLayerIndex > 0);
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
            let _local_38 = false;

            const _local_40 = ((_arg_8) && (_arg_8.get(_local_12)));

            for(const _local_23 of _local_11)
            {
                if(_local_23.partType === _local_12)
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
                        const _local_19 = _local_15.getPart(_local_12);

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

                    const _local_18 = new AvatarImagePartContainer(k, _local_12, _local_41, _local_39, _local_20, _arg_3.definition, (!(_local_39 == null)), -1, _local_12, false, 1);

                    _local_22.push(_local_18);
                }
                else
                {
                    if(_local_9.indexOf(_local_12) > -1)
                    {
                        const _local_44 = this._geometry.getBodyPartOfItem(_arg_4, _local_12, _arg_7);

                        if(k !== _local_44.id)
                        {
                            //
                        }
                        else
                        {
                            const _local_13 = this._partSetsData.getPartDefinition(_local_12);

                            let _local_45 = false;
                            let _local_46 = 1;

                            if(_local_13.appendToFigure)
                            {
                                let _local_47 = '1';

                                if(_arg_3.actionParameter !== '')
                                {
                                    _local_47 = _arg_3.actionParameter;
                                }

                                if(_local_13.hasStaticId())
                                {
                                    _local_47 = _local_13.staticId.toString();
                                }

                                if(_local_10 != null)
                                {
                                    const _local_48 = _local_10.getAddData(_local_12);

                                    if(_local_48)
                                    {
                                        _local_45 = _local_48.isBlended;
                                        _local_46 = _local_48.blend;
                                    }
                                }

                                if(_local_15)
                                {
                                    const _local_19 = _local_15.getPart(_local_12);

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

                                const _local_18 = new AvatarImagePartContainer(k, _local_12, _local_47, null, _local_20, _arg_3.definition, false, -1, _local_12, _local_45, _local_46);

                                _local_22.push(_local_18);
                            }
                        }
                    }
                }
            }
        }

        return _local_22;
    }

    private getPopulatedArray(k: number): number[]
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

    public getItemIds(): string[]
    {
        if(this._actionManager)
        {
            const k = this._actionManager.getActionDefinition('CarryItem').params;

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
