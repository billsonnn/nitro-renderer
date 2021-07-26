import { NitroManager } from '../../core/common/NitroManager';
import { Nitro } from '../Nitro';
import { BadgeBaseAndLevel } from './BadgeBaseAndLevel';
import { INitroLocalizationManager } from './INitroLocalizationManager';
import { NitroLocalizationEvent } from './NitroLocalizationEvent';

export class NitroLocalizationManager extends NitroManager implements INitroLocalizationManager
{
    private _definitions: Map<string, string>;
    private _parameters: Map<string, Map<string, string>>;
    private _romanNumerals: string[];

    constructor()
    {
        super();

        this._definitions   = new Map();
        this._parameters    = new Map();
        this._romanNumerals = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII', 'XIII', 'XIV', 'XV', 'XVI', 'XVII', 'XVIII', 'XIX', 'XX', 'XXI', 'XXII', 'XXIII', 'XXIV', 'XXV', 'XXVI', 'XXVII', 'XXVIII', 'XXIX', 'XXX'];
    }

    protected onInit(): void
    {
        this.loadLocalizationFromURL(Nitro.instance.getConfiguration<string>('external.texts.url'));
    }

    public loadLocalizationFromURL(url: string): void
    {
        fetch(url)
            .then(response => response.json())
            .then(data => this.onLocalizationLoaded(data))
            .catch(err => this.onLocalizationFailed(err));
    }

    private onLocalizationLoaded(data: { [index: string]: any }): void
    {
        if(!data) return;

        this.parseLocalization(data);

        this.events && this.events.dispatchEvent(new NitroLocalizationEvent(NitroLocalizationEvent.LOADED));
    }

    private onLocalizationFailed(error: Error): void
    {
        this.events && this.events.dispatchEvent(new NitroLocalizationEvent(NitroLocalizationEvent.FAILED));
    }

    private parseLocalization(data: { [index: string]: any }): void
    {
        if(!data) return;

        for(const key in data) this._definitions.set(key, data[key]);
    }

    public getRomanNumeral(number: number): string
    {
        return this._romanNumerals[Math.max(0, (number - 1))];
    }

    public getBadgeBaseAndLevel(badgeName: string): string
    {
        const badge = new BadgeBaseAndLevel(badgeName);

        badge.level--;

        return badge.getBadgeId;
    }

    public getValue(key: string, doParams: boolean = true): string
    {
        if(key.startsWith('${')) key = key.substr(2, (key.length - 3));

        let value = (this._definitions.get(key) || null);

        if(value && doParams)
        {
            const parameters = this._parameters.get(key);

            if(parameters)
            {
                for(const [ parameter, replacement ] of parameters)
                {
                    value = value.replace('%' + parameter + '%', replacement);
                }
            }
        }

        return (value || key);
    }

    public getValueWithParameter(key: string, parameter: string, replacement: string): string
    {
        const value = this.getValue(key, false);

        const replacedValue =  value.replace('%' + parameter + '%', replacement);

        if(value.startsWith('%{'))
        {
            // This adds support for multi-optioned texts like
            // catalog.vip.item.header.months=%{NUM_MONTHS|0 months|1 month|%% months}
            // It only checks for this multi-optioned thext if the value of the key starts with %{

            // If it does, it will create a RegEx with the provided parameter, eg. NUM_DAYS or NUM_MONTS
            // Then, based on the provided replacement it searches for the resultgroup based on the replacement.
            // If the replacement is not either 0, 1 - it will be assumed it will be plural. (eg. Months)
            const regex = new RegExp('%{' + parameter.toUpperCase() + '\\|([^|]*)\\|([^|]*)\\|([^|]*)}');
            const result = value.match(regex);

            if(!result) return replacedValue;

            let indexKey =  -1;
            const replacementAsNumber = Number.parseInt(replacement);
            let replace = false;

            switch(replacementAsNumber)
            {
                case 0:
                    indexKey = 1;
                    break;
                case 1:
                    indexKey = 2;
                    break;
                default:
                case 2:
                    indexKey = 3;
                    replace = true;
                    break;
            }


            if(indexKey == -1 || typeof result[indexKey] == 'undefined')
            {
                return replacedValue;
            }

            const valueFromResults = result[indexKey];

            if(valueFromResults)
            {
                return valueFromResults.replace('%%', replacement);
            }
        }

        return replacedValue;
    }

    public getValueWithParameters(key: string, parameters: string[], replacements: string[]): string
    {
        let value = this.getValue(key, false);

        if(parameters)
        {
            for(let i = 0; i < parameters.length; i++)
            {
                const parameter = parameters[i];
                const replacement = replacements[i];

                value = value.replace('%' + parameter + '%', replacement);

                if(value.startsWith('%{'))
                {
                    const regex     = new RegExp('%{' + parameter.toUpperCase() + '\\|([^|]*)\\|([^|]*)\\|([^|]*)}');
                    const result    = value.match(regex);

                    if(!result) continue;

                    const replacementAsNumber = parseInt(replacement);

                    let indexKey    =  -1;
                    let replace     = false;

                    switch(replacementAsNumber)
                    {
                        case 0:
                            indexKey = 1;
                            break;
                        case 1:
                            indexKey = 2;
                            break;
                        case 2:
                        default:
                            indexKey = 3;
                            replace = true;
                            break;
                    }


                    if((indexKey === -1) || (typeof result[indexKey] === 'undefined')) continue;

                    const valueFromResults = result[indexKey];

                    if(valueFromResults)
                    {
                        value = valueFromResults.replace('%%', replacement);
                    }
                }
            }
        }

        return value;
    }

    public setValue(key: string, value: string): void
    {
        this._definitions.set(key, value);
    }

    public registerParameter(key: string, parameter: string, value: string): void
    {
        if(!key || (key.length === 0) || !parameter || (parameter.length === 0)) return;

        let existing = this._parameters.get(key);

        if(!existing)
        {
            existing = new Map();

            this._parameters.set(key, existing);
        }

        existing.set(parameter, value);
    }

    public getBadgeName(key: string): string
    {
        const badge = new BadgeBaseAndLevel(key);
        const keys  = [ 'badge_name_' + key, 'badge_name_' + badge.base ];

        return this._Str_2103(this.getExistingKey(keys)).replace('%roman%', this.getRomanNumeral(badge.level));
    }

    public getBadgeDesc(key: string): string
    {
        const badge = new BadgeBaseAndLevel(key);
        const keys  = [ 'badge_desc_' + key, 'badge_desc_' + badge.base ];

        return this._Str_2103(this.getExistingKey(keys)).replace('%roman%', this.getRomanNumeral(badge.level));
    }

    private getExistingKey(keys: string[]): string
    {
        for(const entry of keys)
        {
            const item = this.getValue(entry);
            if(item != entry) return item;
        }

        return '';
    }

    private  _Str_2103(k: string): string
    {
        return k.replace('${', '$')
            .replace('{', '$')
            .replace('}', '$');
    }
}
