import { RoomObjectVariable } from '../../RoomObjectVariable';
import { FurnitureAnimatedVisualization } from './FurnitureAnimatedVisualization';

export class FurnitureVoteMajorityVisualization extends FurnitureAnimatedVisualization
{
    private static ONES_SPRITE: string      = 'ones_sprite';
    private static TENS_SPRITE: string      = 'tens_sprite';
    private static HUNDREDS_SPRITE: string  = 'hundreds_sprite';
    private static _Str_16109: number[]     = [-1, 1];
    private static _Str_17618: number       = -1;

    protected getFrameNumber(scale: number, layerId: number): number
    {
        const result    = this.object.model.getValue<number>(RoomObjectVariable.FURNITURE_VOTE_MAJORITY_RESULT);
        const tag       = this.getLayerTag(scale, this.direction, layerId);

        switch(tag)
        {
            case FurnitureVoteMajorityVisualization.ONES_SPRITE: return (result % 10);
            case FurnitureVoteMajorityVisualization.TENS_SPRITE: return ((result / 10) % 10);
            case FurnitureVoteMajorityVisualization.HUNDREDS_SPRITE: return ((result / 100) % 10);
            default: return super.getFrameNumber(scale, layerId);
        }
    }

    protected getLayerAlpha(scale: number, direction: number, layerId: number): number
    {
        const result = this.object.model.getValue<number>(RoomObjectVariable.FURNITURE_VOTE_MAJORITY_RESULT);

        if(((!(FurnitureVoteMajorityVisualization._Str_16109.indexOf(this.object.getState(0)) === -1)) || (result === FurnitureVoteMajorityVisualization._Str_17618)))
        {
            const tag = this.getLayerTag(scale, direction, layerId);

            switch(tag)
            {
                case FurnitureVoteMajorityVisualization.ONES_SPRITE:
                case FurnitureVoteMajorityVisualization.TENS_SPRITE:
                case FurnitureVoteMajorityVisualization.HUNDREDS_SPRITE:
                    return 0;
            }
        }

        return super.getLayerAlpha(scale, direction, layerId);
    }
}