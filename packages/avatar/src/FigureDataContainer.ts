export class FigureDataContainer
{
    private static MALE: string = 'M';
    private static FEMALE: string = 'F';
    private static UNISEX: string = 'U';
    private static SCALE: string = 'h';
    private static STD: string = 'std';
    private static DEFAULT_FRAME: string = '0';
    private static HD: string = 'hd';
    private static HAIR: string = 'hr';
    private static HAT: string = 'ha';
    private static HEAD_ACCESSORIES: string = 'he';
    private static EYE_ACCESSORIES: string = 'ea';
    private static FACE_ACCESSORIES: string = 'fa';
    private static JACKET: string = 'cc';
    private static SHIRT: string = 'ch';
    private static CHEST_ACCESSORIES: string = 'ca';
    private static CHEST_PRINTS: string = 'cp';
    private static TROUSERS: string = 'lg';
    private static SHOES: string = 'sh';
    private static TROUSER_ACCESSORIES: string = 'wa';
    private static BLOCKED_FX_TYPES: number[] = [28, 29, 30, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 68];

    private _data: Map<string, number>;
    private _colors: Map<string, number[]>;
    private _gender: string = 'M';
    private _isDisposed: boolean;
    private _avatarEffectType: number = -1;

    public loadAvatarData(figure: string, gender: string): void
    {
        this._data = new Map();
        this._colors = new Map();
        this._gender = gender;

        this.parseFigureString(figure);
    }

    public dispose(): void
    {
        this._data = null;
        this._colors = null;
        this._isDisposed = true;
    }

    public get disposed(): boolean
    {
        return this._isDisposed;
    }

    private parseFigureString(k: string): void
    {
        if(!k) return;

        for(const set of k.split('.'))
        {
            const _local_3 = set.split('-');

            if(_local_3.length > 0)
            {
                const part = _local_3[0];
                const setId = parseInt(_local_3[1]);
                const colors: number[] = [];

                let i = 2;

                while(i < _local_3.length)
                {
                    colors.push(parseInt(_local_3[i]));

                    i++;
                }

                if(!colors.length) colors.push(0);

                this.savePartSetId(part, setId, false);
                this.savePartSetColourId(part, colors, false);
            }
        }
    }

    public hasSetType(k: string): boolean
    {
        return !!this._data.get(k);
    }

    public getPartSetId(k: string): number
    {
        if(this.hasSetType(k)) return this._data.get(k);

        return -1;
    }

    public getColourIds(k: string): number[]
    {
        if(this._colors.get(k)) return this._colors.get(k);

        return [];
    }

    public getFigureString(): string
    {
        let figure = '';

        const sets: string[] = [];

        for(const [key, value] of this._data.entries())
        {
            let set = ((key + '-') + value);

            const colors = this._colors.get(key);

            if(colors) for(const color of colors) set = (set + ('-' + color));

            sets.push(set);
        }

        let i = 0;

        while(i < sets.length)
        {
            figure = (figure + sets[i]);

            if(i < (sets.length - 1)) figure = (figure + '.');

            i++;
        }

        return figure;
    }

    public savePartData(k: string, _arg_2: number, _arg_3: number[], _arg_4: boolean = false): void
    {
        this.savePartSetId(k, _arg_2, _arg_4);
        this.savePartSetColourId(k, _arg_3, _arg_4);
    }

    private savePartSetId(k: string, _arg_2: number, _arg_3: boolean = true): void
    {
        switch(k)
        {
            case FigureDataContainer.HD:
            case FigureDataContainer.HAIR:
            case FigureDataContainer.HAT:
            case FigureDataContainer.HEAD_ACCESSORIES:
            case FigureDataContainer.EYE_ACCESSORIES:
            case FigureDataContainer.FACE_ACCESSORIES:
            case FigureDataContainer.SHIRT:
            case FigureDataContainer.JACKET:
            case FigureDataContainer.CHEST_ACCESSORIES:
            case FigureDataContainer.CHEST_PRINTS:
            case FigureDataContainer.TROUSERS:
            case FigureDataContainer.SHOES:
            case FigureDataContainer.TROUSER_ACCESSORIES:
                if(_arg_2 >= 0)
                {
                    this._data.set(k, _arg_2);
                }
                else
                {
                    this._data.delete(k);
                }
        }
    }

    public savePartSetColourId(k: string, _arg_2: number[], _arg_3: boolean = true): void
    {
        switch(k)
        {
            case FigureDataContainer.HD:
            case FigureDataContainer.HAIR:
            case FigureDataContainer.HAT:
            case FigureDataContainer.HEAD_ACCESSORIES:
            case FigureDataContainer.EYE_ACCESSORIES:
            case FigureDataContainer.FACE_ACCESSORIES:
            case FigureDataContainer.SHIRT:
            case FigureDataContainer.JACKET:
            case FigureDataContainer.CHEST_ACCESSORIES:
            case FigureDataContainer.CHEST_PRINTS:
            case FigureDataContainer.TROUSERS:
            case FigureDataContainer.SHOES:
            case FigureDataContainer.TROUSER_ACCESSORIES:
                this._colors.set(k, _arg_2);
                return;
        }
    }

    public getFigureStringWithFace(k: number): string
    {
        const partSets: string[] = [FigureDataContainer.HD];

        let figure = '';
        const sets: string[] = [];

        for(const part of partSets)
        {
            const colors = this._colors.get(part);

            if(colors)
            {
                let setId = this._data.get(part);

                if(part === FigureDataContainer.HD) setId = k;

                let set = ((part + '-') + setId);

                if(setId >= 0)
                {
                    let i = 0;

                    while(i < colors.length)
                    {
                        set = (set + ('-' + colors[i]));

                        i++;
                    }
                }

                sets.push(set);
            }
        }

        let i = 0;

        while(i < sets.length)
        {
            figure = (figure + sets[i]);

            if(i < (sets.length - 1)) figure = (figure + '.');

            i++;
        }

        return figure;
    }

    public get gender(): string
    {
        return this._gender;
    }
}
