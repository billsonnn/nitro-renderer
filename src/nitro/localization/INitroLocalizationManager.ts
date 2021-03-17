import { INitroManager } from '../../core/common/INitroManager';
export interface INitroLocalizationManager extends INitroManager
{
    getRomanNumeral(number: number): string;
    getBadgeBaseAndLevel(badgeName: string): string;
    getValue(key: string, doParams?: boolean): string;
    getValueWithParameter(key: string, parameter: string, replacement: string): string;
    getValueWithParameters(key: string, parameters: string[], replacements: string[]): string;
    setValue(key: string, value: string): void;
    registerParameter(key: string, parameter: string, value: string): void;
    getBadgeName(key: string): string;
    getBadgeDesc(key: string): string;
}
