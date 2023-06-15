import { IDisposable } from '@/api'

export interface IGroupInformationManager extends IDisposable {
  init(): void;

  getGroupBadge(groupId: number): string;
}
