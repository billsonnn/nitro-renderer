import { ILocalizationManager } from '@nitrots/api';
import { BadgePointLimitsEvent, GetCommunication } from '@nitrots/communication';
import { GetConfiguration } from '@nitrots/configuration';
import { BadgeBaseAndLevel } from './BadgeBaseAndLevel';

export class LocalizationManager implements ILocalizationManager
{
    private _definitions: Map<string, string> = new Map();
    private _parameters: Map<string, Map<string, string>> = new Map();
    private _badgePointLimits: Map<string, number> = new Map();
    private _romanNumerals: string[] = [ 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII', 'XIII', 'XIV', 'XV', 'XVI', 'XVII', 'XVIII', 'XIX', 'XX', 'XXI', 'XXII', 'XXIII', 'XXIV', 'XXV', 'XXVI', 'XXVII', 'XXVIII', 'XXIX', 'XXX' ];

    public async init(): Promise<void>
    {
        try
        {
            const urls = GetConfiguration().getValue<string[]>('external.texts.url').slice();

            if(!urls || !urls.length) throw new Error('Invalid localization urls');

            for(let url of urls)
            {
                if(!url || !url.length) return;

                url = GetConfiguration().interpolate(url);

                const response = await fetch(url);

                if(response.status !== 200) throw new Error('Invalid localization file');

                this.parseLocalization(await response.json());
            }

            GetCommunication().registerMessageEvent(new BadgePointLimitsEvent(this.onBadgePointLimitsEvent.bind(this)));
        }

        catch (err)
        {
            throw new Error(err);
        }
    }

    private parseLocalization(data: { [index: string]: any }): boolean
    {
        if(!data) return false;

        for(const key in data) this._definitions.set(key, data[key]);

        return true;
    }

    private onBadgePointLimitsEvent(event: BadgePointLimitsEvent): void
    {
        const parser = event.getParser();

        for(const data of parser.data) this.setBadgePointLimit(data.badgeId, data.limit);
    }

    public getBadgePointLimit(badge: string): number
    {
        return (this._badgePointLimits.get(badge) || -1);
    }

    public setBadgePointLimit(badge: string, point: number): void
    {
        this._badgePointLimits.set(badge, point);
    }

    public getRomanNumeral(number: number): string
    {
        return this._romanNumerals[Math.max(0, (number - 1))];
    }

    public getPreviousLevelBadgeId(badgeName: string): string
    {
        const badge = new BadgeBaseAndLevel(badgeName);

        badge.level--;

        return badge.getBadgeId;
    }

    public hasValue(key: string): boolean
    {
        return this._definitions.has(key);
    }

    public getValue(key: string, doParams: boolean = true): string
    {
        if(!key || !key.length) return null;

        const keys = key.match(/\$\{.[^}]*\}/g);

        if(keys && keys.length)
        {
            for(const splitKey of keys) key = key.replace(splitKey, this.getValue(splitKey.slice(2, -1), doParams));
        }

        let value = (this._definitions.get(key) || null);

        if(!value)
        {
            value = (GetConfiguration().definitions.get(key) as any);

            if(value) return value;
        }

        if(value && doParams)
        {
            const parameters = this._parameters.get(key);

            if(parameters)
            {
                for(const [parameter, replacement] of parameters)
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

        const replacedValue = value.replace('%' + parameter + '%', replacement);

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

            let indexKey = -1;
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

                if(replacement === undefined) continue;

                value = value.replace('%' + parameter + '%', replacement);

                if(value.startsWith('%{'))
                {
                    const regex = new RegExp('%{' + parameter.toUpperCase() + '\\|([^|]*)\\|([^|]*)\\|([^|]*)}');
                    const result = value.match(regex);

                    if(!result) continue;

                    const replacementAsNumber = parseInt(replacement);

                    let indexKey = -1;
                    let replace = false;

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
        const keys = ['badge_name_' + key, 'badge_name_' + badge.base];

        let name = this.fixBadLocalization(this.getExistingKey(keys));

        name = name.replace('%roman%', this.getRomanNumeral(badge.level));

        return name;
    }

    public getBadgeDesc(key: string): string
    {
        const badge = new BadgeBaseAndLevel(key);
        const keys = ['badge_desc_' + key, 'badge_desc_' + badge.base];

        let desc = this.fixBadLocalization(this.getExistingKey(keys));

        const limit = this.getBadgePointLimit(key);

        if(limit > -1) desc = desc.replace('%limit%', limit.toString());

        desc = desc.replace('%roman%', this.getRomanNumeral(badge.level));

        return desc;
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

    private fixBadLocalization(k: string): string
    {
        return k.replace('${', '$')
            .replace('{', '$')
            .replace('}', '$');
    }
}
