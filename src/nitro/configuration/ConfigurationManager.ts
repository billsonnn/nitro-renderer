import { IConfigurationManager, NitroConfiguration } from '../../api';
import { NitroEvent, NitroEventDispatcher, NitroEventType } from '../../events';

export class ConfigurationManager implements IConfigurationManager
{
    public async init(): Promise<void>
    {
        await this.reloadConfiguration();
    }

    public async reloadConfiguration(): Promise<void>
    {
        try
        {
            NitroConfiguration.resetConfiguration();
            NitroConfiguration.parseConfiguration(this.getDefaultConfig(), true);

            const configurationUrls = NitroConfiguration.getValue<string[]>('config.urls').slice();

            if(!configurationUrls || !configurationUrls.length) throw new Error('Invalid configuration urls');

            for(const url of configurationUrls)
            {
                if(!url || !url.length) return;

                const response = await fetch(url);

                if(response.status !== 200) throw new Error('Invalid configuration file');

                NitroConfiguration.parseConfiguration(await response.json());
            }

            NitroEventDispatcher.dispatchEvent(new NitroEvent(NitroEventType.CONFIG_LOADED));
        }

        catch (err)
        {
            NitroEventDispatcher.dispatchEvent(new NitroEvent(NitroEventType.CONFIG_FAILED));

            throw new Error(err);
        }
    }

    public getDefaultConfig(): { [index: string]: any }
    {
        //@ts-ignore
        return NitroConfig as { [index: string]: any };
    }
}
