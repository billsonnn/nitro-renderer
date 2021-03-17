import { SCALE_MODES, Texture } from 'pixi.js';
import { FurnitureThumbnailVisualization } from './FurnitureThumbnailVisualization';

export class FurnitureDynamicThumbnailVisualization extends FurnitureThumbnailVisualization
{
    private _cachedUrl: string;

    constructor()
    {
        super();

        this._cachedUrl = null;
    }

    protected updateModel(scale: number): boolean
    {
        if(this.object)
        {
            const thumbnailUrl = this.getThumbnailURL();

            if(this._cachedUrl !== thumbnailUrl)
            {
                this._cachedUrl = thumbnailUrl;

                if(this._cachedUrl && (this._cachedUrl !== ''))
                {
                    const image = new Image();

                    image.src           = thumbnailUrl;
                    image.crossOrigin   = '*';

                    image.onload = () =>
                    {
                        const texture = Texture.from(image);

                        texture.baseTexture.scaleMode = SCALE_MODES.LINEAR;

                        this._Str_6645(texture);
                    };
                }
                else
                {
                    this._Str_6645(null);
                }
            }
        }

        return super.updateModel(scale);
    }

    protected getThumbnailURL(): string
    {
        throw (new Error('This method must be overridden!'));
    }
}
