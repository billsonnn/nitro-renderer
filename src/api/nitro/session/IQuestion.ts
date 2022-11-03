export interface IQuestion
{
    id: number;
    number: number;
    type: number;
    content: string;
    selection_min?: number;
    selections?: string[];
    selection_values?: string[];
    selection_count?: number;
    selection_max?: number;
}
