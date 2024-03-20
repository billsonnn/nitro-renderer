import { IRoomGeometry, IRoomObject, IVector3D } from '@nitrots/api';
import { Vector3d } from '@nitrots/utils';

export class RoomObjectLocationCacheItem
{
    private _roomObjectVariableAccurateZ: string;

    private _location: Vector3d;
    private _screenLocation: Vector3d;
    private _locationChanged: boolean;

    private _geometryUpdateId: number;
    private _objectUpdateId: number;

    constructor(accurateZ: string)
    {
        this._roomObjectVariableAccurateZ = accurateZ || '';

        this._location = new Vector3d();
        this._screenLocation = new Vector3d();
        this._locationChanged = false;

        this._geometryUpdateId = -1;
        this._objectUpdateId = -1;
    }

    public dispose(): void
    {
        this._screenLocation = null;
    }

    public updateLocation(object: IRoomObject, geometry: IRoomGeometry): IVector3D
    {
        if(!object || !geometry) return null;

        let locationChanged = false;

        const location = object.getLocation();

        if((geometry.updateId !== this._geometryUpdateId) || (object.updateCounter !== this._objectUpdateId))
        {
            this._objectUpdateId = object.updateCounter;

            if((geometry.updateId !== this._geometryUpdateId) || (location.x !== this._location.x) || (location.y !== this._location.y) || (location.z !== this._location.z))
            {
                this._geometryUpdateId = geometry.updateId;
                this._location.assign(location);

                locationChanged = true;
            }
        }

        this._locationChanged = locationChanged;

        if(this._locationChanged)
        {
            const screenLocation = geometry.getScreenPosition(location);

            if(!screenLocation) return null;

            const accurateZ = object.model.getValue<number>(this._roomObjectVariableAccurateZ);

            if(isNaN(accurateZ) || (accurateZ === 0))
            {
                const rounded = new Vector3d(Math.round(location.x), Math.round(location.y), location.z);

                if((rounded.x !== location.x) || (rounded.y !== location.y))
                {
                    const roundedScreen = geometry.getScreenPosition(rounded);

                    this._screenLocation.assign(screenLocation);

                    if(roundedScreen) this._screenLocation.z = roundedScreen.z;
                }
                else
                {
                    this._screenLocation.assign(screenLocation);
                }
            }
            else
            {
                this._screenLocation.assign(screenLocation);
            }

            this._screenLocation.x = Math.round(this._screenLocation.x);
            this._screenLocation.y = Math.round(this._screenLocation.y);
        }

        return this._screenLocation;
    }

    public get locationChanged(): boolean
    {
        return this._locationChanged;
    }
}
