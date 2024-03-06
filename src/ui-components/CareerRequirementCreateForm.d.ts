/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
export declare type EscapeHatchProps = {
    [elementHierarchy: string]: Record<string, unknown>;
} | null;
export declare type VariantValues = {
    [key: string]: string;
};
export declare type Variant = {
    variantValues: VariantValues;
    overrides: EscapeHatchProps;
};
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type CareerRequirementCreateFormInputValues = {
    classRequirement?: string;
    minimumGradeRequirement?: number;
};
export declare type CareerRequirementCreateFormValidationValues = {
    classRequirement?: ValidationFunction<string>;
    minimumGradeRequirement?: ValidationFunction<number>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type CareerRequirementCreateFormOverridesProps = {
    CareerRequirementCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    classRequirement?: PrimitiveOverrideProps<TextFieldProps>;
    minimumGradeRequirement?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type CareerRequirementCreateFormProps = React.PropsWithChildren<{
    overrides?: CareerRequirementCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: CareerRequirementCreateFormInputValues) => CareerRequirementCreateFormInputValues;
    onSuccess?: (fields: CareerRequirementCreateFormInputValues) => void;
    onError?: (fields: CareerRequirementCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: CareerRequirementCreateFormInputValues) => CareerRequirementCreateFormInputValues;
    onValidate?: CareerRequirementCreateFormValidationValues;
} & React.CSSProperties>;
export default function CareerRequirementCreateForm(props: CareerRequirementCreateFormProps): React.ReactElement;
