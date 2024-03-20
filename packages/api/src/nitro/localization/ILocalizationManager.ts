export interface ILocalizationManager
{
    init(): Promise<void>;
    getRomanNumeral(number: number): string;
    getPreviousLevelBadgeId(badgeName: string): string;
    hasValue(key: string): boolean;
    getValue(key: string, doParams?: boolean): string;
    getValueWithParameter(key: string, parameter: string, replacement: string): string;
    getValueWithParameters(key: string, parameters: string[], replacements: string[]): string;
    setValue(key: string, value: string): void;
    registerParameter(key: string, parameter: string, value: string): void;
    getBadgeName(key: string): string;
    getBadgeDesc(key: string): string;
    getBadgePointLimit(badge: string): number;
    setBadgePointLimit(badge: string, point: number): void;
}
