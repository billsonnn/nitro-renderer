import { IVector3D } from '../../../api';
import { ObjectMoveUpdateMessage } from './ObjectMoveUpdateMessage';

export class ObjectAvatarUpdateMessage extends ObjectMoveUpdateMessage
{
    private _headDirection: number;
    private _canStandUp: boolean;
    private _baseY: number;

    constructor(location: IVector3D, targetLocation: IVector3D, direction: IVector3D, headDirection: number, canStandUp: boolean, baseY: number)
    {
        super(location, targetLocation, direction);

        this._headDirection = headDirection;
        this._canStandUp = canStandUp;
        this._baseY = baseY;
    }

    public get headDirection(): number
    {
        return this._headDirection;
    }

    public get canStandUp(): boolean
    {
        return this._canStandUp;
    }

    public get baseY(): number
    {
        return this._baseY;
    }
}
