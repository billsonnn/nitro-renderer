import { IAssetManager, ICommunicationManager, IConfigurationManager, IDisposable } from '../api';

export interface INitroCore extends IDisposable
{
    configuration: IConfigurationManager;
    asset: IAssetManager;
    communication: ICommunicationManager;
}
