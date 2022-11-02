import { AnimationFrame, AnimationSizeData, SizeData } from '../data';
import { FurnitureVisualizationData } from './FurnitureVisualizationData';

export class FurnitureAnimatedVisualizationData extends FurnitureVisualizationData
{
    protected createSizeData(scale: number, layerCount: number, angle: number): SizeData
    {
        return new AnimationSizeData(layerCount, angle);
    }

    protected processVisualElement(sizeData: SizeData, key: string, data: any): boolean
    {
        if(!sizeData || !key || !data) return false;

        switch(key)
        {
            case 'animations':
                if(!(sizeData instanceof AnimationSizeData) || !sizeData.defineAnimations(data)) return false;
                break;
            default:
                if(!super.processVisualElement(sizeData, key, data)) return false;
                break;
        }

        return true;
    }

    public hasAnimation(scale: number, animationId: number): boolean
    {
        const size = this.getSizeData(scale) as AnimationSizeData;

        if(!size) return null;

        return size.hasAnimation(animationId);
    }

    public getAnimationCount(scale: number): number
    {
        const size = this.getSizeData(scale) as AnimationSizeData;

        if(!size) return null;

        return size.getAnimationCount();
    }

    public getAnimationId(scale: number, animationId: number): number
    {
        const size = this.getSizeData(scale) as AnimationSizeData;

        if(!size) return null;

        return size.getAnimationId(animationId);
    }

    public isImmediateChange(scale: number, animationId: number, _arg_3: number): boolean
    {
        const size = this.getSizeData(scale) as AnimationSizeData;

        if(!size) return null;

        return size.isImmediateChange(animationId, _arg_3);
    }

    public getStartFrame(scale: number, animationId: number, direction: number): number
    {
        const size = this.getSizeData(scale) as AnimationSizeData;

        if(!size) return null;

        return size.getStartFrame(animationId, direction);
    }

    public getFrame(scale: number, animationId: number, direction: number, layerId: number, frameCount: number): AnimationFrame
    {
        const size = this.getSizeData(scale) as AnimationSizeData;

        if(!size) return null;

        return size.getFrame(animationId, direction, layerId, frameCount);
    }

    public getFrameFromSequence(scale: number, animationId: number, direction: number, layerId: number, sequenceId: number, offset: number, frameCount: number): AnimationFrame
    {
        const size = this.getSizeData(scale) as AnimationSizeData;

        if(!size) return null;

        return size.getFrameFromSequence(animationId, direction, layerId, sequenceId, offset, frameCount);
    }
}
