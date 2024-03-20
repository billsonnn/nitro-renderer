import { IActionDefinition } from './IActionDefinition';

export interface IActiveActionData
{
    id: string;
    actionType: string;
    actionParameter: string;
    startFrame: number;
    definition: IActionDefinition;
    overridingAction: string;
}
