import type { ComparisonOperator } from "../Types/DatabaseExtension.ComparisonOperator.type"

export interface Condition {
    column: string;
    value: string | number;
    operator: ComparisonOperator;
}