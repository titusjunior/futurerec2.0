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
export declare type MajorRequirementUpdateFormInputValues = {
    classRequirement?: string;
    minimumGradeRequirement?: number;
};
export declare type MajorRequirementUpdateFormValidationValues = {
    classRequirement?: ValidationFunction<string>;
    minimumGradeRequirement?: ValidationFunction<number>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type MajorRequirementUpdateFormOverridesProps = {
    MajorRequirementUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    classRequirement?: PrimitiveOverrideProps<TextFieldProps>;
    minimumGradeRequirement?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type MajorRequirementUpdateFormProps = React.PropsWithChildren<{
    overrides?: MajorRequirementUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    majorRequirement?: any;
    onSubmit?: (fields: MajorRequirementUpdateFormInputValues) => MajorRequirementUpdateFormInputValues;
    onSuccess?: (fields: MajorRequirementUpdateFormInputValues) => void;
    onError?: (fields: MajorRequirementUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: MajorRequirementUpdateFormInputValues) => MajorRequirementUpdateFormInputValues;
    onValidate?: MajorRequirementUpdateFormValidationValues;
} & React.CSSProperties>;
export default function MajorRequirementUpdateForm(props: MajorRequirementUpdateFormProps): React.ReactElement;
