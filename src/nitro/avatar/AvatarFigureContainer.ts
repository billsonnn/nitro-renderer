import { IAvatarFigureContainer } from './IAvatarFigureContainer';

export class AvatarFigureContainer implements IAvatarFigureContainer
{
    private _parts: Map<string, Map<string, any>>;

    constructor(figure: string)
    {
        this._parts = new Map();

        this.parseFigure(figure);
    }

    public _Str_1016(): IterableIterator<string>
    {
        return this.partSets().keys();
    }

    public _Str_744(k: string): boolean
    {
        return this.partSets().get(k) !== null;
    }

    public getPartSetId(k: string): number
    {
        const existing = this.partSets().get(k);

        if(!existing) return 0;

        return existing.get('setid');
    }

    public _Str_815(k: string): number[]
    {
        const existing = this.partSets().get(k);

        if(!existing) return null;

        return existing.get('colorids');
    }

    public _Str_830(k: string, _arg_2: number, _arg_3: number[]): void
    {
        const set: Map<string, any> = new Map();

        set.set('type', k);
        set.set('setid', _arg_2);
        set.set('colorids', _arg_3);

        const existingSets = this.partSets();

        existingSets.delete(k);
        existingSets.set(k, set);
    }

    public _Str_923(k: string): void
    {
        this.partSets().delete(k);
    }

    public _Str_1008(): string
    {
        const parts: string[] = [];

        for(const key of this.partSets().keys())
        {
            if(!key) continue;

            let setParts = [];

            setParts.push(key);
            setParts.push(this.getPartSetId(key));

            setParts = setParts.concat(this._Str_815(key));

            parts.push(setParts.join('-'));
        }

        return parts.join('.');
    }

    private partSets(): Map<string, Map<string, any>>
    {
        if(!this._parts) this._parts = new Map();

        return this._parts;
    }

    private parseFigure(figure: string): void
    {
        if(!figure) figure = '';

        for(const part of figure.split('.'))
        {
            const pieces = part.split('-');

            if(pieces.length >= 2)
            {
                const type      = pieces[0];
                const setId     = parseInt(pieces[1]);
                const colors    = [];

                let index = 2;

                while(index < pieces.length)
                {
                    colors.push(parseInt(pieces[index]));

                    index++;
                }

                this._Str_830(type, setId, colors);
            }
        }
    }
}