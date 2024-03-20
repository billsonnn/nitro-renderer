import { FurnitureAnimatedVisualization } from './FurnitureAnimatedVisualization';

export class FurnitureCounterClockVisualization extends FurnitureAnimatedVisualization
{
    private static SECONDS_SPRITE: string = 'seconds_sprite';
    private static TEN_SECONDS_SPRITE: string = 'ten_seconds_sprite';
    private static MINUTES_SPRITE: string = 'minutes_sprite';
    private static TEN_MINUTES_SPRITE: string = 'ten_minutes_sprite';

    protected getFrameNumber(scale: number, layerId: number): number
    {
        const tag = this.getLayerTag(scale, this.direction, layerId);
        const animation = this.object.getState(0);

        switch(tag)
        {
            case FurnitureCounterClockVisualization.SECONDS_SPRITE: return Math.floor((animation % 60) % 10);
            case FurnitureCounterClockVisualization.TEN_SECONDS_SPRITE: return Math.floor((animation % 60) / 10);
            case FurnitureCounterClockVisualization.MINUTES_SPRITE: return Math.floor((animation / 60) % 10);
            case FurnitureCounterClockVisualization.TEN_MINUTES_SPRITE: return Math.floor(((animation / 60) / 10) % 10);
            default: return super.getFrameNumber(scale, layerId);
        }
    }

    public get animationId(): number
    {
        return 0;
    }
}