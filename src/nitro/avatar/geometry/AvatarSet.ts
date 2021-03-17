export class AvatarSet
{
    private _id: string;
    private _isMain: boolean;
    private _avatarSets: Map<string, AvatarSet>;
    private _bodyParts: string[];
    private _allBodyParts: string[];

    constructor(k: any)
    {
        this._id            = k.id;
        this._isMain        = k.main || false;
        this._avatarSets    = new Map();
        this._bodyParts     = [];
        this._allBodyParts  = [];

        if(k.avatarSets && (k.avatarSets.length > 0))
        {
            for(const avatarSet of k.avatarSets)
            {
                if(!avatarSet) continue;

                const set = new AvatarSet(avatarSet);

                this._avatarSets.set(set.id, set);
            }
        }

        if(k.bodyParts && (k.bodyParts.length > 0))
        {
            for(const bodyPart of k.bodyParts)
            {
                if(!bodyPart) continue;

                this._bodyParts.push(bodyPart.id);
            }
        }

        let bodyParts = this._bodyParts.concat();

        for(const avatarSet of this._avatarSets.values())
        {
            if(!avatarSet) continue;

            bodyParts = bodyParts.concat(avatarSet._Str_755());
        }

        this._allBodyParts = bodyParts;
    }

    public _Str_1498(k: string): AvatarSet
    {
        if(k === this._id) return this;

        for(const avatarSet of this._avatarSets.values())
        {
            if(!avatarSet) continue;

            if(!avatarSet._Str_1498(k)) continue;

            return avatarSet;
        }

        return null;
    }

    public _Str_755(): string[]
    {
        return this._allBodyParts.concat();
    }

    public get id(): string
    {
        return this._id;
    }

    public get _Str_779(): boolean
    {
        if(this._isMain) return true;

        for(const avatarSet of this._avatarSets.values())
        {
            if(!avatarSet) continue;

            if(!avatarSet._Str_779) continue;

            return true;
        }

        return false;
    }
}