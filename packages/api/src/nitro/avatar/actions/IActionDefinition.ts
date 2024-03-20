export interface IActionDefinition
{
    id: string;
    state: string;
    precedence: number;
    activePartSet: string;
    isMain: boolean;
    isDefault: boolean;
    assetPartDefinition: string;
    lay: string;
    geometryType: string;
    isAnimation: boolean;
    startFromFrameZero: boolean;
    isAnimated(_arg_1: string): boolean;
    getPrevents(_arg_1: string): string[];
    getPreventHeadTurn(_arg_1: string): boolean;
    setOffsets(_arg_1: string, _arg_2: number, _arg_3: []): void;
    getOffsets(_arg_1: string, _arg_2: number): number[];
}
