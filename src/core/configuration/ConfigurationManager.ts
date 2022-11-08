import { IConfigurationManager, NitroConfiguration } from '../../api';
import { NitroManager } from '../common';
import { ConfigurationEvent } from './ConfigurationEvent';

export class ConfigurationManager extends NitroManager implements IConfigurationManager
{
    private _definitions: Map<string, unknown>;
    private _config: any;
    private _pendingUrls: string[];
    private _missingKeys: string[];

    constructor()
    {
        super();

        this._definitions = new Map();
        this._config = [];
        this._pendingUrls = [];
        this._missingKeys = [];

        this.onConfigurationLoaded = this.onConfigurationLoaded.bind(this);
    }

    protected onInit(): void
    {
        NitroConfiguration.parseConfiguration(this.getDefaultConfig(), true);

        this._pendingUrls = NitroConfiguration.getValue<string[]>('config.urls').slice();

        this.loadNextConfiguration();
    }

    private loadNextConfiguration(): void
    {
        if(!this._pendingUrls.length)
        {
            this.dispatchConfigurationEvent(ConfigurationEvent.LOADED);

            return;
        }

        this.loadConfigurationFromUrl(this._pendingUrls[0]);
    }

    public loadConfigurationFromUrl(url: string): void
    {
        if(!url || (url === ''))
        {
            this.dispatchConfigurationEvent(ConfigurationEvent.FAILED);

            return;
        }

        fetch(url)
            .then(response => response.json())
            .then(data => this.onConfigurationLoaded(data, url))
            .catch(err => this.onConfigurationFailed(err));
    }

    private onConfigurationLoaded(data: { [index: string]: any }, url: string): void
    {
        if(!data) return;

        if(NitroConfiguration.parseConfiguration(data))
        {
            const index = this._pendingUrls.indexOf(url);

            if(index >= 0) this._pendingUrls.splice(index, 1);

            this.loadNextConfiguration();

            return;
        }

        this.dispatchConfigurationEvent(ConfigurationEvent.FAILED);
    }

    private onConfigurationFailed(error: Error): void
    {
        this.dispatchConfigurationEvent(ConfigurationEvent.FAILED);
    }

    private dispatchConfigurationEvent(type: string): void
    {
        this.events && this.events.dispatchEvent(new ConfigurationEvent(type));
    }

    public getDefaultConfig(): { [index: string]: any }
    {
        //@ts-ignore
        return NitroConfig as { [index: string]: any };
    }
}
