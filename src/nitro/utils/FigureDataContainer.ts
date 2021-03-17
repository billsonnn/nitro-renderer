export class FigureDataContainer
{
    private static M: string            = 'M';
    private static F: string            = 'F';
    private static U: string            = 'U';
    private static H: string            = 'h';
    private static STD: string          = 'std';
    private static _Str_2028: string    = '0';
    private static HD: string           = 'hd';
    private static HR: string           = 'hr';
    private static HA: string           = 'ha';
    private static HE: string           = 'he';
    private static EA: string           = 'ea';
    private static FA: string           = 'fa';
    private static CC: string           = 'cc';
    private static CH: string           = 'ch';
    private static CA: string           = 'ca';
    private static CP: string           = 'cp';
    private static LG: string           = 'lg';
    private static SH: string           = 'sh';
    private static WA: string           = 'wa';
    private static _Str_1329: number[]  = [28, 29, 30, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 68];

    private _data: Map<string, number>;
    private _colors: Map<string, number[]>;
    private _gender: string = 'M';
    private _isDisposed: boolean;
    private _avatarEffectType: number = -1;

    public _Str_2153(k: string, _arg_2: string): void
    {
        this._data      = new Map();
        this._colors    = new Map();
        this._gender    = _arg_2;

        this._Str_958(k);
    }

    public dispose(): void
    {
        this._data          = null;
        this._colors        = null;
        this._isDisposed    = true;
    }

    public get disposed(): boolean
    {
        return this._isDisposed;
    }

    private _Str_958(k: string): void
    {
        if(!k) return;

        for(const set of k.split('.'))
        {
            const _local_3 = set.split('-');

            if(_local_3.length > 0)
            {
                const part              = _local_3[0];
                const setId             = parseInt(_local_3[1]);
                const colors: number[]  = [];

                let i = 2;

                while(i < _local_3.length)
                {
                    colors.push(parseInt(_local_3[i]));

                    i++;
                }

                if(!colors.length) colors.push(0);

                this._Str_1876(part, setId, false);
                this.savePartSetColourId(part, colors, false);
            }
        }
    }

    public _Str_2131(k: string): boolean
    {
        return !!this._data.get(k);
    }

    public getPartSetId(k: string): number
    {
        if(this._Str_2131(k)) return this._data.get(k);

        return -1;
    }

    public getColourIds(k: string): number[]
    {
        if(this._colors.get(k)) return this._colors.get(k);

        return [];
    }

    public _Str_1008(): string
    {
        let figure = '';

        const sets: string[] = [];

        for(const [ key, value ] of this._data.entries())
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

    public _Str_2088(k: string, _arg_2: number, _arg_3: number[], _arg_4: boolean = false): void
    {
        this._Str_1876(k, _arg_2, _arg_4);
        this.savePartSetColourId(k, _arg_3, _arg_4);
    }

    private _Str_1876(k: string, _arg_2: number, _arg_3: boolean = true): void
    {
        switch(k)
        {
            case FigureDataContainer.HD:
            case FigureDataContainer.HR:
            case FigureDataContainer.HA:
            case FigureDataContainer.HE:
            case FigureDataContainer.EA:
            case FigureDataContainer.FA:
            case FigureDataContainer.CH:
            case FigureDataContainer.CC:
            case FigureDataContainer.CA:
            case FigureDataContainer.CP:
            case FigureDataContainer.LG:
            case FigureDataContainer.SH:
            case FigureDataContainer.WA:
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
            case FigureDataContainer.HR:
            case FigureDataContainer.HA:
            case FigureDataContainer.HE:
            case FigureDataContainer.EA:
            case FigureDataContainer.FA:
            case FigureDataContainer.CH:
            case FigureDataContainer.CC:
            case FigureDataContainer.CA:
            case FigureDataContainer.CP:
            case FigureDataContainer.LG:
            case FigureDataContainer.SH:
            case FigureDataContainer.WA:
                this._colors.set(k, _arg_2);
                return;
        }
    }

    public getFigureStringWithFace(k: number): string
    {
        const partSets: string[] = [ FigureDataContainer.HD ];

        let figure          = '';
        const sets: string[]  = [];

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