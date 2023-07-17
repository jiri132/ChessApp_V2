import type { ComparisonOperator } from "../types/DatabaseExtention.ComparisonOperator.type"

export interface Condition {
    column: string;
    value: string | number;
    operator: ComparisonOperator;
}