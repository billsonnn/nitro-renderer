import { AvatarImageBodyPartContainer } from '../AvatarImageBodyPartContainer';
import { AvatarImagePartContainer } from '../AvatarImagePartContainer';

export class AvatarImageDirectionCache
{
    private _partList: AvatarImagePartContainer[];
    private _images: Map<string, AvatarImageBodyPartContainer>;

    constructor(k: AvatarImagePartContainer[])
    {
        this._partList  = k;
        this._images    = new Map();
    }

    public dispose(): void
    {
        for(const image of this._images.values()) image && image.dispose();

        this._images = null;
    }

    public _Str_1699(): AvatarImagePartContainer[]
    {
        return this._partList;
    }

    public _Str_1629(k: number): AvatarImageBodyPartContainer
    {
        const existing = this._images.get(this._Str_2219(k));

        if(!existing) return null;

        return existing;
    }

    public _Str_1924(k: AvatarImageBodyPartContainer, _arg_2: number): void
    {
        const name = this._Str_2219(_arg_2);

        const existing = this._images.get(name);

        if(existing) existing.dispose();

        this._images.set(name, k);
    }

    private _Str_2219(k: number): string
    {
        let name = '';

        for(const part of this._partList) name += (part._Str_1206(k) + '/');

        return name;
    }

    private _Str_587(k: string): void
    {
    }
}