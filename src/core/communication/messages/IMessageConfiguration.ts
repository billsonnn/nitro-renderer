export interface IMessageConfiguration
{
    events: Map<number, Function>;
    composers: Map<number, Function>;
}