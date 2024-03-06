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
import { getCareerRequirement } from "../graphql/queries";
import { updateCareerRequirement } from "../graphql/mutations";
const client = generateClient();
export default function CareerRequirementUpdateForm(props) {
  const {
    id: idProp,
    careerRequirement: careerRequirementModelProp,
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
    const cleanValues = careerRequirementRecord
      ? { ...initialValues, ...careerRequirementRecord }
      : initialValues;
    setClassRequirement(cleanValues.classRequirement);
    setMinimumGradeRequirement(cleanValues.minimumGradeRequirement);
    setErrors({});
  };
  const [careerRequirementRecord, setCareerRequirementRecord] = React.useState(
    careerRequirementModelProp
  );
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await client.graphql({
              query: getCareerRequirement.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getCareerRequirement
        : careerRequirementModelProp;
      setCareerRequirementRecord(record);
    };
    queryData();
  }, [idProp, careerRequirementModelProp]);
  React.useEffect(resetStateValues, [careerRequirementRecord]);
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
            query: updateCareerRequirement.replaceAll("__typename", ""),
            variables: {
              input: {
                id: careerRequirementRecord.id,
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
      {...getOverrideProps(overrides, "CareerRequirementUpdateForm")}
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
          isDisabled={!(idProp || careerRequirementModelProp)}
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
              !(idProp || careerRequirementModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
