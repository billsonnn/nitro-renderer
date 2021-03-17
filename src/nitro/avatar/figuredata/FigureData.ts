import { IAvatarImageListener } from '../IAvatarImageListener';
import { FigureDataView } from './FigureDataView';

export class FigureData implements IAvatarImageListener
{
    public static M: string = 'M';
    public static F: string = 'F';
    public static U: string = 'U';
    public static H: string = 'h';
    public static STD: string = 'std';
    public static _Str_2028: string = '0';
    public static FACE: string = 'hd';
    public static HR: string = 'hr';
    public static HA: string = 'ha';
    public static HE: string = 'he';
    public static EA: string = 'ea';
    public static FA: string = 'fa';
    public static CC: string = 'cc';
    public static CH: string = 'ch';
    public static CHEST_ACCESSORIES: string = 'ca';
    public static CHEST_PRINTS: string = 'cp';
    public static LG: string = 'lg';
    public static SH: string = 'sh';
    public static WA: string = 'wa';

    private _view: FigureDataView;
    private _data: Map<string, number>;
    private _colors: Map<string, number[]>;
    private _gender: string = 'M';
    private _isDisposed: boolean;
    private _direction: number = 4;
    private _avatarEffectType: number = -1;

    constructor()
    {
        this._direction = FigureDataView._Str_9887;
        this._view      = new FigureDataView(this);
    }

    public loadAvatarData(figureString: string, gender: string): void
    {
        this._data      = new Map();
        this._colors    = new Map();
        this._gender    = gender;

        this.parseFigureString(figureString);
        this.updateView();
    }

    public dispose(): void
    {
        this._data          = null;
        this._colors        = null;
        this._isDisposed    = true;

        if(this._view)
        {
            this._view.dispose();

            this._view = null;
        }
    }

    public get disposed(): boolean
    {
        return this._isDisposed;
    }

    private parseFigureString(figure: string): void
    {
        if(!figure) return;

        const sets = figure.split('.');

        if(!sets || !sets.length) return;

        for(const set of sets)
        {
            const parts = set.split('-');

            if(!parts.length) continue;

            const setType               = parts[0];
            const setId                 = parseInt(parts[1]);
            const colorIds: number[]    = [];

            let offset = 2;

            while(offset < parts.length)
            {
                colorIds.push(parseInt(parts[offset]));

                offset++;
            }

            if(!colorIds.length) colorIds.push(0);

            this.savePartSetId(setType, setId, false);
            this.savePartSetColourId(setType, colorIds, false);
        }
    }

    public getPartSetId(k: string): number
    {
        const existing = this._data.get(k);

        if(existing !== undefined) return existing;

        return -1;
    }

    public getColourIds(k: string): number[]
    {
        const existing = this._colors.get(k);

        if(existing !== undefined) return existing;

        return [];
        // return [this._avatarEditor._Str_24919(k)];
    }

    public getFigureString(): string
    {
        let figureString    = '';
        const setParts: string[]      = [];

        for(const [ setType, setId ] of this._data.entries())
        {
            const colorIds = this._colors.get(setType);

            let setPart = ((setType + '-') + setId);

            if(colorIds && colorIds.length)
            {
                let i = 0;

                while(i < colorIds.length)
                {
                    setPart = (setPart + ('-' + colorIds[i]));

                    i++;
                }
            }

            setParts.push(setPart);
        }

        let i = 0;

        while(i < setParts.length)
        {
            figureString = (figureString + setParts[i]);

            if(i < (setParts.length - 1)) figureString = (figureString + '.');

            i++;
        }

        return figureString;
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
            case FigureData.FACE:
            case FigureData.HR:
            case FigureData.HA:
            case FigureData.HE:
            case FigureData.EA:
            case FigureData.FA:
            case FigureData.CH:
            case FigureData.CC:
            case FigureData.CHEST_ACCESSORIES:
            case FigureData.CHEST_PRINTS:
            case FigureData.LG:
            case FigureData.SH:
            case FigureData.WA:
                if(_arg_2 >= 0)
                {
                    this._data.set(k, _arg_2);
                }
                else
                {
                    this._data.delete(k);
                }
                break;
        }

        if(_arg_3) this.updateView();
    }

    public savePartSetColourId(k: string, _arg_2: number[], _arg_3: boolean = true): void
    {
        switch(k)
        {
            case FigureData.FACE:
            case FigureData.HR:
            case FigureData.HA:
            case FigureData.HE:
            case FigureData.EA:
            case FigureData.FA:
            case FigureData.CH:
            case FigureData.CC:
            case FigureData.CHEST_ACCESSORIES:
            case FigureData.CHEST_PRINTS:
            case FigureData.LG:
            case FigureData.SH:
            case FigureData.WA:
                this._colors.set(k, _arg_2);
                break;
        }

        if(_arg_3) this.updateView();
    }

    public getFigureStringWithFace(k: number, override = true): string
    {
        let figureString = '';

        const setTypes: string[]    = [ FigureData.FACE ];
        const figureSets: string[]  = [];

        for(const setType of setTypes)
        {
            const colors = this._colors.get(setType);

            if(colors === undefined) continue;

            let setId = this._data.get(setType);

            if((setType === FigureData.FACE) && override) setId = k;

            let figureSet = ((setType + '-') + setId);

            if(setId >= 0)
            {
                let i = 0;

                while(i < colors.length)
                {
                    figureSet = (figureSet + ('-' + colors[i]));

                    i++;
                }
            }

            figureSets.push(figureSet);
        }

        let i = 0;

        while(i < figureSets.length)
        {
            figureString = (figureString + figureSets[i]);

            if(i < (figureSets.length - 1)) figureString = (figureString + '.');

            i++;
        }

        return figureString;
    }

    public updateView(): void
    {
        this._view.update(this.getFigureString(), this._avatarEffectType, this._direction);
    }

    public get view(): FigureDataView
    {
        return this._view;
    }

    public get gender(): string
    {
        return this._gender;
    }

    public resetFigure(k: string): void
    {
        this.updateView();
    }

    public set avatarEffectType(k: number)
    {
        this._avatarEffectType = k;
    }

    public get avatarEffectType(): number
    {
        return this._avatarEffectType;
    }

    public get direction(): number
    {
        return this._direction;
    }

    public set direction(k: number)
    {
        this._direction = k;
        this.updateView();
    }
}