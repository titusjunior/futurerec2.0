/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { generateClient } from "aws-amplify/api";
import { getMajorRequirement } from "../graphql/queries";
import { updateMajorRequirement } from "../graphql/mutations";
const client = generateClient();
export default function MajorRequirementUpdateForm(props) {
  const {
    id: idProp,
    majorRequirement: majorRequirementModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    classRequirement: "",
    minimumGradeRequirement: "",
  };
  const [classRequirement, setClassRequirement] = React.useState(
    initialValues.classRequirement
  );
  const [minimumGradeRequirement, setMinimumGradeRequirement] = React.useState(
    initialValues.minimumGradeRequirement
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = majorRequirementRecord
      ? { ...initialValues, ...majorRequirementRecord }
      : initialValues;
    setClassRequirement(cleanValues.classRequirement);
    setMinimumGradeRequirement(cleanValues.minimumGradeRequirement);
    setErrors({});
  };
  const [majorRequirementRecord, setMajorRequirementRecord] = React.useState(
    majorRequirementModelProp
  );
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await client.graphql({
              query: getMajorRequirement.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getMajorRequirement
        : majorRequirementModelProp;
      setMajorRequirementRecord(record);
    };
    queryData();
  }, [idProp, majorRequirementModelProp]);
  React.useEffect(resetStateValues, [majorRequirementRecord]);
  const validations = {
    classRequirement: [{ type: "Required" }],
    minimumGradeRequirement: [{ type: "Required" }],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          classRequirement,
          minimumGradeRequirement,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value === "") {
              modelFields[key] = null;
            }
          });
          await client.graphql({
            query: updateMajorRequirement.replaceAll("__typename", ""),
            variables: {
              input: {
                id: majorRequirementRecord.id,
                ...modelFields,
              },
            },
          });
          if (onSuccess) {
            onSuccess(modelFields);
          }
        } catch (err) {
          if (onError) {
            const messages = err.errors.map((e) => e.message).join("\n");
            onError(modelFields, messages);
          }
        }
      }}
      {...getOverrideProps(overrides, "MajorRequirementUpdateForm")}
      {...rest}
    >
      <TextField
        label="Class requirement"
        isRequired={true}
        isReadOnly={false}
        value={classRequirement}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              classRequirement: value,
              minimumGradeRequirement,
            };
            const result = onChange(modelFields);
            value = result?.classRequirement ?? value;
          }
          if (errors.classRequirement?.hasError) {
            runValidationTasks("classRequirement", value);
          }
          setClassRequirement(value);
        }}
        onBlur={() => runValidationTasks("classRequirement", classRequirement)}
        errorMessage={errors.classRequirement?.errorMessage}
        hasError={errors.classRequirement?.hasError}
        {...getOverrideProps(overrides, "classRequirement")}
      ></TextField>
      <TextField
        label="Minimum grade requirement"
        isRequired={true}
        isReadOnly={false}
        type="number"
        step="any"
        value={minimumGradeRequirement}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              classRequirement,
              minimumGradeRequirement: value,
            };
            const result = onChange(modelFields);
            value = result?.minimumGradeRequirement ?? value;
          }
          if (errors.minimumGradeRequirement?.hasError) {
            runValidationTasks("minimumGradeRequirement", value);
          }
          setMinimumGradeRequirement(value);
        }}
        onBlur={() =>
          runValidationTasks("minimumGradeRequirement", minimumGradeRequirement)
        }
        errorMessage={errors.minimumGradeRequirement?.errorMessage}
        hasError={errors.minimumGradeRequirement?.hasError}
        {...getOverrideProps(overrides, "minimumGradeRequirement")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Reset"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          isDisabled={!(idProp || majorRequirementModelProp)}
          {...getOverrideProps(overrides, "ResetButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={
              !(idProp || majorRequirementModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
