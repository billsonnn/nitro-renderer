import { IDisposable } from '../../common';

export interface IGroupInformationManager extends IDisposable
{
    init(): void;
    getGroupBadge(groupId: number): string;
}
