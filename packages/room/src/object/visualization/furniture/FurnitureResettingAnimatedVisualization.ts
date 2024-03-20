import { FurnitureAnimatedVisualization } from './FurnitureAnimatedVisualization';

export class FurnitureResettingAnimatedVisualization extends FurnitureAnimatedVisualization
{
    protected usesAnimationResetting(): boolean
    {
        return true;
    }
}