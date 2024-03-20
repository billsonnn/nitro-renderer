export interface IIgnoredUsersManager
{
    init(): void;
    requestIgnoredUsers(username: string): void;
    ignoreUserId(id: number): void;
    ignoreUser(name: string): void;
    unignoreUser(name: string): void;
    isIgnored(name: string): boolean;
}
