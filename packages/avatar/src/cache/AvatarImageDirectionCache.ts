import { AvatarImageBodyPartContainer } from '../AvatarImageBodyPartContainer';
import { AvatarImagePartContainer } from '../AvatarImagePartContainer';

export class AvatarImageDirectionCache
{
    private _partList: AvatarImagePartContainer[];
    private _images: Map<string, AvatarImageBodyPartContainer>;

    constructor(k: AvatarImagePartContainer[])
    {
        this._partList = k;
        this._images = new Map();
    }

    public dispose(): void
    {
        for(const image of this._images.values()) image && image.dispose();

        this._images = null;
    }

    public getPartList(): AvatarImagePartContainer[]
    {
        return this._partList;
    }

    public getImageContainer(k: number): AvatarImageBodyPartContainer
    {
        const existing = this._images.get(this.getCacheKey(k));

        if(!existing) return null;

        return existing;
    }

    public updateImageContainer(k: AvatarImageBodyPartContainer, _arg_2: number): void
    {
        const name = this.getCacheKey(_arg_2);

        const existing = this._images.get(name);

        if(existing) existing.dispose();

        this._images.set(name, k);
    }

    private getCacheKey(k: number): string
    {
        let name = '';

        for(const part of this._partList) name += (part.getCacheableKey(k) + '/');

        return name;
    }

    private debugInfo(k: string): void
    {
    }
}
