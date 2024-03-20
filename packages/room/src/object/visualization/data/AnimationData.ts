import { IAssetVisualAnimation, IAssetVisualAnimationLayer, IAssetVisualAnimationSequenceFrame } from '@nitrots/api';
import { AnimationFrame } from './AnimationFrame';
import { AnimationLayerData } from './AnimationLayerData';
import { DirectionalOffsetData } from './DirectionalOffsetData';

export class AnimationData
{
    private static TRANSITION_TO_ANIMATION_OFFSET: number = 1000000;
    private static TRANSITION_FROM_ANIMATION_OFFSET: number = 2000000;

    public static DEFAULT_FRAME_NUMBER: number = 0;

    private _layers: Map<number, AnimationLayerData>;
    private _frameCount: number;
    private _randomStart: boolean;
    private _immediateChanges: number[];

    constructor()
    {
        this._layers = new Map();
        this._frameCount = -1;
        this._randomStart = false;
        this._immediateChanges = null;
    }

    public static getTransitionToAnimationId(animationId: number): number
    {
        return AnimationData.TRANSITION_TO_ANIMATION_OFFSET + animationId;
    }

    public static getTransitionFromAnimationId(animationId: number): number
    {
        return AnimationData.TRANSITION_FROM_ANIMATION_OFFSET + animationId;
    }

    public static isTransitionToAnimation(animationId: number): boolean
    {
        return (animationId >= AnimationData.TRANSITION_TO_ANIMATION_OFFSET) && (animationId < AnimationData.TRANSITION_FROM_ANIMATION_OFFSET);
    }

    public static isTransitionFromAnimation(animationId: number): boolean
    {
        return animationId >= AnimationData.TRANSITION_FROM_ANIMATION_OFFSET;
    }

    public dispose(): void
    {
        for(const layer of this._layers.values())
        {
            if(!layer) continue;

            layer.dispose();
        }

        this._layers.clear();

        this._immediateChanges = null;
    }

    public setImmediateChanges(k: number[]): void
    {
        this._immediateChanges = k;
    }

    public isImmediateChange(k: number): boolean
    {
        if(!this._immediateChanges || (this._immediateChanges.indexOf(k) === -1)) return false;

        return true;
    }

    public getStartFrame(direction: number): number
    {
        if(!this._randomStart) return 0;

        return Math.random() * this._frameCount;
    }

    public initialize(k: IAssetVisualAnimation): boolean
    {
        if(k.randomStart) this._randomStart = true;

        if(k.layers)
        {
            for(const key in k.layers)
            {
                const layer = k.layers[key];

                if(!layer) return false;

                const animationId = parseInt(key);

                const loopCount = (layer.loopCount !== undefined) ? layer.loopCount : 1;
                const frameRepeat = (layer.frameRepeat !== undefined) ? layer.frameRepeat : 1;
                const isRandom = ((layer.random !== undefined) && (layer.random !== 0)) ? true : false;

                if(!this.addLayer(animationId, loopCount, frameRepeat, isRandom, layer)) return false;
            }
        }

        return true;
    }

    private addLayer(animationId: number, loopCount: number, frameRepeat: number, isRandom: boolean, layer: IAssetVisualAnimationLayer): boolean
    {
        const layerData = new AnimationLayerData(loopCount, frameRepeat, isRandom);

        if(layer.frameSequences)
        {
            for(const key in layer.frameSequences)
            {
                const animationSequence = layer.frameSequences[key];

                if(!animationSequence) continue;

                const loopCount = (animationSequence.loopCount !== undefined) ? animationSequence.loopCount : 1;
                const isSequenceRandom = ((animationSequence.random !== undefined) && (animationSequence.random !== 0)) ? true : false;

                const frame = layerData.addFrameSequence(loopCount, isSequenceRandom);

                if(animationSequence.frames)
                {
                    for(const key in animationSequence.frames)
                    {
                        const animationFrame = animationSequence.frames[key];

                        if(!animationFrame)
                        {
                            layerData.dispose();

                            return false;
                        }

                        frame.addFrame(animationFrame.id, (animationFrame.x || 0), (animationFrame.y || 0), (animationFrame.randomX || 0), (animationFrame.randomY || 0), this.readDirectionalOffsets(animationFrame));
                    }
                }

                frame.initialize();
            }
        }

        layerData.calculateLength();

        this._layers.set(animationId, layerData);

        const frameCount: number = layerData.frameCount;

        if(frameCount > this._frameCount) this._frameCount = frameCount;

        return true;
    }

    private readDirectionalOffsets(frame: IAssetVisualAnimationSequenceFrame): DirectionalOffsetData
    {
        let directionalOffset: DirectionalOffsetData = null;

        if(frame && frame.offsets)
        {
            for(const directionId in frame.offsets)
            {
                const offset = frame.offsets[directionId];

                if(!offset) continue;

                if(!directionalOffset) directionalOffset = new DirectionalOffsetData();

                directionalOffset.setDirection(offset.direction, offset.x, offset.y);
            }
        }

        return directionalOffset;
    }

    public getFrame(direction: number, layerId: number, frameCount: number): AnimationFrame
    {
        const layer = this._layers.get(layerId);

        if(!layer) return null;

        return layer.getFrame(direction, frameCount);
    }

    public getFrameFromSequence(direction: number, layerId: number, sequenceId: number, offset: number, frameCount: number): AnimationFrame
    {
        const layer = this._layers.get(layerId);

        if(!layer) return null;

        return layer.getFrameFromSequence(direction, sequenceId, offset, frameCount);
    }
}
