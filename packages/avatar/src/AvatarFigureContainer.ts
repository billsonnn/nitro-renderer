import { IAvatarFigureContainer } from '@nitrots/api';

export class AvatarFigureContainer implements IAvatarFigureContainer
{
    private _parts: Map<string, Map<string, any>>;

    constructor(figure: string)
    {
        this._parts = new Map();

        this.parseFigure(figure);
    }

    public getPartTypeIds(): IterableIterator<string>
    {
        return this.partSets().keys();
    }

    public hasPartType(k: string): boolean
    {
        return !!this.partSets().get(k);
    }

    public getPartSetId(k: string): number
    {
        const existing = this.partSets().get(k);

        if(!existing) return 0;

        return existing.get('setid');
    }

    public getPartColorIds(k: string): number[]
    {
        const existing = this.partSets().get(k);

        if(!existing) return null;

        return existing.get('colorids');
    }

    public updatePart(setType: string, partSetId: number, colorIds: number[]): void
    {
        const set: Map<string, any> = new Map();

        set.set('type', setType);
        set.set('setid', partSetId);
        set.set('colorids', colorIds);

        const existingSets = this.partSets();

        existingSets.delete(setType);
        existingSets.set(setType, set);
    }

    public removePart(k: string): void
    {
        this.partSets().delete(k);
    }

    public getFigureString(): string
    {
        const parts: string[] = [];

        for(const key of this.partSets().keys())
        {
            if(!key) continue;

            let setParts = [];

            setParts.push(key);
            setParts.push(this.getPartSetId(key));

            setParts = setParts.concat(this.getPartColorIds(key));

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
                const type = pieces[0];
                const setId = parseInt(pieces[1]);
                const colors = [];

                let index = 2;

                while(index < pieces.length)
                {
                    colors.push(parseInt(pieces[index]));

                    index++;
                }

                this.updatePart(type, setId, colors);
            }
        }
    }
}
