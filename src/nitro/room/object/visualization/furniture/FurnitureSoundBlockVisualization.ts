import { RoomObjectVariable } from '../../../../../api';
import { FurnitureAnimatedVisualization } from './FurnitureAnimatedVisualization';

export class FurnitureSoundBlockVisualization extends FurnitureAnimatedVisualization
{
    private _internalFrameIncreaseCounter: number = 0;

    protected updateAnimations(scale: number): number
    {
        this._internalFrameIncreaseCounter = (this._internalFrameIncreaseCounter + this.object.model.getValue<number>(RoomObjectVariable.FURNITURE_SOUNDBLOCK_RELATIVE_ANIMATION_SPEED));
        this._frameIncrease = this._internalFrameIncreaseCounter;
        this._internalFrameIncreaseCounter = (this._internalFrameIncreaseCounter - this._frameIncrease);

        return super.updateAnimations(scale);
    }
}
