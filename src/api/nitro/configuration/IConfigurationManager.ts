
export interface IConfigurationManager
{
    init(): Promise<void>;
    reloadConfiguration(): Promise<void>;
}
