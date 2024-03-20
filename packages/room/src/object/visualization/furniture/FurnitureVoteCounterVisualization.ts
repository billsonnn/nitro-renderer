import { RoomObjectVariable } from '@nitrots/api';
import { FurnitureAnimatedVisualization } from './FurnitureAnimatedVisualization';

export class FurnitureVoteCounterVisualization extends FurnitureAnimatedVisualization
{
    private static ONES_SPRITE: string = 'ones_sprite';
    private static TENS_SPRITE: string = 'tens_sprite';
    private static HUNDREDS_SPRITE: string = 'hundreds_sprite';
    private static HIDE_COUNTER_SCORE: number = -1;

    protected updateObject(scale: number, direction: number): boolean
    {
        super.updateObject(scale, direction);

        return true;
    }

    protected getFrameNumber(scale: number, layerId: number): number
    {
        const result = this.object.model.getValue<number>(RoomObjectVariable.FURNITURE_VOTE_COUNTER_COUNT);
        const tag = this.getLayerTag(scale, this.direction, layerId);

        switch(tag)
        {
            case FurnitureVoteCounterVisualization.ONES_SPRITE: return (result % 10);
            case FurnitureVoteCounterVisualization.TENS_SPRITE: return ((result / 10) % 10);
            case FurnitureVoteCounterVisualization.HUNDREDS_SPRITE: return ((result / 100) % 10);
            default: return super.getFrameNumber(scale, layerId);
        }
    }

    protected getLayerAlpha(scale: number, direction: number, layerId: number): number
    {
        const result = this.object.model.getValue<number>(RoomObjectVariable.FURNITURE_VOTE_COUNTER_COUNT);

        if(result === FurnitureVoteCounterVisualization.HIDE_COUNTER_SCORE)
        {
            const tag = this.getLayerTag(scale, direction, layerId);

            switch(tag)
            {
                case FurnitureVoteCounterVisualization.ONES_SPRITE:
                case FurnitureVoteCounterVisualization.TENS_SPRITE:
                case FurnitureVoteCounterVisualization.HUNDREDS_SPRITE:
                    return 0;
            }
        }

        return super.getLayerAlpha(scale, direction, layerId);
    }
}
