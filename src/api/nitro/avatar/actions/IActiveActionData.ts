import { IActionDefinition } from '@/api'

export interface IActiveActionData {
  id: string;
  actionType: string;
  actionParameter: string;
  startFrame: number;
  definition: IActionDefinition;
  overridingAction: string;
}
