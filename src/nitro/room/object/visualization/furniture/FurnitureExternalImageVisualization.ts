import { RoomObjectVariable } from '../../RoomObjectVariable';
import { FurnitureDynamicThumbnailVisualization } from './FurnitureDynamicThumbnailVisualization';

export class FurnitureExternalImageVisualization extends FurnitureDynamicThumbnailVisualization
{
    private _url: string;
    private _typePrefix: string;

    constructor()
    {
        super();

        this._url           = null;
        this._typePrefix    = null;
    }

    protected getThumbnailURL(): string
    {
        if(!this.object) return null;

        if(this._url) return this._url;

        const jsonString = this.object.model.getValue<string>(RoomObjectVariable.FURNITURE_DATA);

        if(!jsonString || jsonString === '') return null;

        if(this.object.type.indexOf('') >= 0)

            this._typePrefix = (this.object.type.indexOf('') >= 0) ? '' : 'postcards/selfie/';

        const json = JSON.parse(jsonString);

        let url = (json.w || '');

        url = this._Str_18056(url);

        this._url = url;

        return this._url;
    }

    private _Str_18056(url: string): string
    {
        url = url.replace('.png', '_small.png');

        if(url.indexOf('.png') === -1) url = (url + '_small.png');

        return url;
    }
}
