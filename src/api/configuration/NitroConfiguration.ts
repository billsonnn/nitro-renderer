import { NitroLogger } from '../common';

export class NitroConfiguration
{
    private static _definitions: Map<string, unknown> = new Map();
    private static _config: any = {};
    private static _missingKeys: string[] = [];

    public static parseConfiguration(data: { [index: string]: any }, overrides: boolean = false): boolean
    {
        if(!data) return false;

        try
        {
            const regex = new RegExp(/\${(.*?)}/g);

            for(const key in data)
            {
                let value = data[key];

                if(typeof value === 'string') value = this.interpolate((value as string), regex);

                if(this._definitions.has(key))
                {
                    if(overrides) this.setValue(key, value);
                }
                else
                {
                    this.setValue(key, value);
                }
            }

            return true;
        }

        catch (e)
        {
            NitroLogger.error(e.stack);

            return false;
        }
    }

    public static interpolate(value: string, regex: RegExp = null): string
    {
        if(!regex) regex = new RegExp(/\${(.*?)}/g);

        const pieces = value.match(regex);

        if(pieces && pieces.length)
        {
            for(const piece of pieces)
            {
                const existing = (this._definitions.get(this.removeInterpolateKey(piece)) as string);

                if(existing) (value = value.replace(piece, existing));
            }
        }

        return value;
    }

    private static removeInterpolateKey(value: string): string
    {
        return value.replace('${', '').replace('}', '');
    }

    public static getValue<T>(key: string, value: T = null): T
    {
        let existing = this._definitions.get(key);

        if(existing === undefined)
        {
            if(this._missingKeys.indexOf(key) >= 0) return value;

            this._missingKeys.push(key);
            NitroLogger.warn(`Missing configuration key: ${key}`);

            existing = value;
        }

        return (existing as T);
    }

    public static setValue<T>(key: string, value: T): void
    {
        const parts = key.split('.');

        let last = this._config;

        for(let i = 0; i < parts.length; i++)
        {
            const part = parts[i].toString();

            if(i !== (parts.length - 1))
            {
                if(!last[part]) last[part] = {};

                last = last[part];

                continue;
            }

            last[part] = value;
        }

        this._definitions.set(key, value);
    }

    public static get definitions(): Map<string, unknown>
    {
        return this._definitions;
    }
}
