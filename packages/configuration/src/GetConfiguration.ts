import { ConfigurationManager } from './ConfigurationManager';
import { IConfigurationManager } from './IConfigurationManager';

const configuration = new ConfigurationManager();

export const GetConfiguration = (): IConfigurationManager => configuration;
