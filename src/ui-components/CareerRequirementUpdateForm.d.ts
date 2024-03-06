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
export declare type CareerRequirementUpdateFormInputValues = {
    classRequirement?: string;
    minimumGradeRequirement?: number;
};
export declare type CareerRequirementUpdateFormValidationValues = {
    classRequirement?: ValidationFunction<string>;
    minimumGradeRequirement?: ValidationFunction<number>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type CareerRequirementUpdateFormOverridesProps = {
    CareerRequirementUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    classRequirement?: PrimitiveOverrideProps<TextFieldProps>;
    minimumGradeRequirement?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type CareerRequirementUpdateFormProps = React.PropsWithChildren<{
    overrides?: CareerRequirementUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    careerRequirement?: any;
    onSubmit?: (fields: CareerRequirementUpdateFormInputValues) => CareerRequirementUpdateFormInputValues;
    onSuccess?: (fields: CareerRequirementUpdateFormInputValues) => void;
    onError?: (fields: CareerRequirementUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: CareerRequirementUpdateFormInputValues) => CareerRequirementUpdateFormInputValues;
    onValidate?: CareerRequirementUpdateFormValidationValues;
} & React.CSSProperties>;
export default function CareerRequirementUpdateForm(props: CareerRequirementUpdateFormProps): React.ReactElement;
