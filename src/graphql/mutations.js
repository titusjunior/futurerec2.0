/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createTeacher = /* GraphQL */ `
  mutation CreateTeacher(
    $input: CreateTeacherInput!
    $condition: ModelTeacherConditionInput
  ) {
    createTeacher(input: $input, condition: $condition) {
      id
      name
      classes {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const updateTeacher = /* GraphQL */ `
  mutation UpdateTeacher(
    $input: UpdateTeacherInput!
    $condition: ModelTeacherConditionInput
  ) {
    updateTeacher(input: $input, condition: $condition) {
      id
      name
      classes {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const deleteTeacher = /* GraphQL */ `
  mutation DeleteTeacher(
    $input: DeleteTeacherInput!
    $condition: ModelTeacherConditionInput
  ) {
    deleteTeacher(input: $input, condition: $condition) {
      id
      name
      classes {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const createClass = /* GraphQL */ `
  mutation CreateClass(
    $input: CreateClassInput!
    $condition: ModelClassConditionInput
  ) {
    createClass(input: $input, condition: $condition) {
      id
      subject
      teacherID {
        id
        name
        createdAt
        updatedAt
        owner
        __typename
      }
      grades {
        nextToken
        __typename
      }
      students {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      teacherClassesId
      owner
      __typename
    }
  }
`;
export const updateClass = /* GraphQL */ `
  mutation UpdateClass(
    $input: UpdateClassInput!
    $condition: ModelClassConditionInput
  ) {
    updateClass(input: $input, condition: $condition) {
      id
      subject
      teacherID {
        id
        name
        createdAt
        updatedAt
        owner
        __typename
      }
      grades {
        nextToken
        __typename
      }
      students {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      teacherClassesId
      owner
      __typename
    }
  }
`;
export const deleteClass = /* GraphQL */ `
  mutation DeleteClass(
    $input: DeleteClassInput!
    $condition: ModelClassConditionInput
  ) {
    deleteClass(input: $input, condition: $condition) {
      id
      subject
      teacherID {
        id
        name
        createdAt
        updatedAt
        owner
        __typename
      }
      grades {
        nextToken
        __typename
      }
      students {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      teacherClassesId
      owner
      __typename
    }
  }
`;
export const createStudent = /* GraphQL */ `
  mutation CreateStudent(
    $input: CreateStudentInput!
    $condition: ModelStudentConditionInput
  ) {
    createStudent(input: $input, condition: $condition) {
      id
      name
      classStanding
      grades {
        nextToken
        __typename
      }
      classes {
        nextToken
        __typename
      }
      major {
        nextToken
        __typename
      }
      career {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const updateStudent = /* GraphQL */ `
  mutation UpdateStudent(
    $input: UpdateStudentInput!
    $condition: ModelStudentConditionInput
  ) {
    updateStudent(input: $input, condition: $condition) {
      id
      name
      classStanding
      grades {
        nextToken
        __typename
      }
      classes {
        nextToken
        __typename
      }
      major {
        nextToken
        __typename
      }
      career {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const deleteStudent = /* GraphQL */ `
  mutation DeleteStudent(
    $input: DeleteStudentInput!
    $condition: ModelStudentConditionInput
  ) {
    deleteStudent(input: $input, condition: $condition) {
      id
      name
      classStanding
      grades {
        nextToken
        __typename
      }
      classes {
        nextToken
        __typename
      }
      major {
        nextToken
        __typename
      }
      career {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const createGrade = /* GraphQL */ `
  mutation CreateGrade(
    $input: CreateGradeInput!
    $condition: ModelGradeConditionInput
  ) {
    createGrade(input: $input, condition: $condition) {
      id
      description
      score
      weight
      date
      class {
        id
        subject
        createdAt
        updatedAt
        teacherClassesId
        owner
        __typename
      }
      student {
        id
        name
        classStanding
        createdAt
        updatedAt
        owner
        __typename
      }
      createdAt
      updatedAt
      classGradesId
      studentGradesId
      owner
      __typename
    }
  }
`;
export const updateGrade = /* GraphQL */ `
  mutation UpdateGrade(
    $input: UpdateGradeInput!
    $condition: ModelGradeConditionInput
  ) {
    updateGrade(input: $input, condition: $condition) {
      id
      description
      score
      weight
      date
      class {
        id
        subject
        createdAt
        updatedAt
        teacherClassesId
        owner
        __typename
      }
      student {
        id
        name
        classStanding
        createdAt
        updatedAt
        owner
        __typename
      }
      createdAt
      updatedAt
      classGradesId
      studentGradesId
      owner
      __typename
    }
  }
`;
export const deleteGrade = /* GraphQL */ `
  mutation DeleteGrade(
    $input: DeleteGradeInput!
    $condition: ModelGradeConditionInput
  ) {
    deleteGrade(input: $input, condition: $condition) {
      id
      description
      score
      weight
      date
      class {
        id
        subject
        createdAt
        updatedAt
        teacherClassesId
        owner
        __typename
      }
      student {
        id
        name
        classStanding
        createdAt
        updatedAt
        owner
        __typename
      }
      createdAt
      updatedAt
      classGradesId
      studentGradesId
      owner
      __typename
    }
  }
`;
export const createMajor = /* GraphQL */ `
  mutation CreateMajor(
    $input: CreateMajorInput!
    $condition: ModelMajorConditionInput
  ) {
    createMajor(input: $input, condition: $condition) {
      id
      name
      students {
        nextToken
        __typename
      }
      majorRequirement {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const updateMajor = /* GraphQL */ `
  mutation UpdateMajor(
    $input: UpdateMajorInput!
    $condition: ModelMajorConditionInput
  ) {
    updateMajor(input: $input, condition: $condition) {
      id
      name
      students {
        nextToken
        __typename
      }
      majorRequirement {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const deleteMajor = /* GraphQL */ `
  mutation DeleteMajor(
    $input: DeleteMajorInput!
    $condition: ModelMajorConditionInput
  ) {
    deleteMajor(input: $input, condition: $condition) {
      id
      name
      students {
        nextToken
        __typename
      }
      majorRequirement {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const createMajorRequirement = /* GraphQL */ `
  mutation CreateMajorRequirement(
    $input: CreateMajorRequirementInput!
    $condition: ModelMajorRequirementConditionInput
  ) {
    createMajorRequirement(input: $input, condition: $condition) {
      id
      classRequirement
      minimumGradeRequirement
      major {
        id
        name
        createdAt
        updatedAt
        owner
        __typename
      }
      createdAt
      updatedAt
      majorMajorRequirementId
      owner
      __typename
    }
  }
`;
export const updateMajorRequirement = /* GraphQL */ `
  mutation UpdateMajorRequirement(
    $input: UpdateMajorRequirementInput!
    $condition: ModelMajorRequirementConditionInput
  ) {
    updateMajorRequirement(input: $input, condition: $condition) {
      id
      classRequirement
      minimumGradeRequirement
      major {
        id
        name
        createdAt
        updatedAt
        owner
        __typename
      }
      createdAt
      updatedAt
      majorMajorRequirementId
      owner
      __typename
    }
  }
`;
export const deleteMajorRequirement = /* GraphQL */ `
  mutation DeleteMajorRequirement(
    $input: DeleteMajorRequirementInput!
    $condition: ModelMajorRequirementConditionInput
  ) {
    deleteMajorRequirement(input: $input, condition: $condition) {
      id
      classRequirement
      minimumGradeRequirement
      major {
        id
        name
        createdAt
        updatedAt
        owner
        __typename
      }
      createdAt
      updatedAt
      majorMajorRequirementId
      owner
      __typename
    }
  }
`;
export const createCareer = /* GraphQL */ `
  mutation CreateCareer(
    $input: CreateCareerInput!
    $condition: ModelCareerConditionInput
  ) {
    createCareer(input: $input, condition: $condition) {
      id
      name
      students {
        nextToken
        __typename
      }
      careerRequirement {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const updateCareer = /* GraphQL */ `
  mutation UpdateCareer(
    $input: UpdateCareerInput!
    $condition: ModelCareerConditionInput
  ) {
    updateCareer(input: $input, condition: $condition) {
      id
      name
      students {
        nextToken
        __typename
      }
      careerRequirement {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const deleteCareer = /* GraphQL */ `
  mutation DeleteCareer(
    $input: DeleteCareerInput!
    $condition: ModelCareerConditionInput
  ) {
    deleteCareer(input: $input, condition: $condition) {
      id
      name
      students {
        nextToken
        __typename
      }
      careerRequirement {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const createCareerRequirement = /* GraphQL */ `
  mutation CreateCareerRequirement(
    $input: CreateCareerRequirementInput!
    $condition: ModelCareerRequirementConditionInput
  ) {
    createCareerRequirement(input: $input, condition: $condition) {
      id
      classRequirement
      minimumGradeRequirement
      career {
        id
        name
        createdAt
        updatedAt
        owner
        __typename
      }
      createdAt
      updatedAt
      careerCareerRequirementId
      owner
      __typename
    }
  }
`;
export const updateCareerRequirement = /* GraphQL */ `
  mutation UpdateCareerRequirement(
    $input: UpdateCareerRequirementInput!
    $condition: ModelCareerRequirementConditionInput
  ) {
    updateCareerRequirement(input: $input, condition: $condition) {
      id
      classRequirement
      minimumGradeRequirement
      career {
        id
        name
        createdAt
        updatedAt
        owner
        __typename
      }
      createdAt
      updatedAt
      careerCareerRequirementId
      owner
      __typename
    }
  }
`;
export const deleteCareerRequirement = /* GraphQL */ `
  mutation DeleteCareerRequirement(
    $input: DeleteCareerRequirementInput!
    $condition: ModelCareerRequirementConditionInput
  ) {
    deleteCareerRequirement(input: $input, condition: $condition) {
      id
      classRequirement
      minimumGradeRequirement
      career {
        id
        name
        createdAt
        updatedAt
        owner
        __typename
      }
      createdAt
      updatedAt
      careerCareerRequirementId
      owner
      __typename
    }
  }
`;
export const createStudentClassLink = /* GraphQL */ `
  mutation CreateStudentClassLink(
    $input: CreateStudentClassLinkInput!
    $condition: ModelStudentClassLinkConditionInput
  ) {
    createStudentClassLink(input: $input, condition: $condition) {
      id
      classId
      studentId
      class {
        id
        subject
        createdAt
        updatedAt
        teacherClassesId
        owner
        __typename
      }
      student {
        id
        name
        classStanding
        createdAt
        updatedAt
        owner
        __typename
      }
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const updateStudentClassLink = /* GraphQL */ `
  mutation UpdateStudentClassLink(
    $input: UpdateStudentClassLinkInput!
    $condition: ModelStudentClassLinkConditionInput
  ) {
    updateStudentClassLink(input: $input, condition: $condition) {
      id
      classId
      studentId
      class {
        id
        subject
        createdAt
        updatedAt
        teacherClassesId
        owner
        __typename
      }
      student {
        id
        name
        classStanding
        createdAt
        updatedAt
        owner
        __typename
      }
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const deleteStudentClassLink = /* GraphQL */ `
  mutation DeleteStudentClassLink(
    $input: DeleteStudentClassLinkInput!
    $condition: ModelStudentClassLinkConditionInput
  ) {
    deleteStudentClassLink(input: $input, condition: $condition) {
      id
      classId
      studentId
      class {
        id
        subject
        createdAt
        updatedAt
        teacherClassesId
        owner
        __typename
      }
      student {
        id
        name
        classStanding
        createdAt
        updatedAt
        owner
        __typename
      }
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const createStudentMajorLink = /* GraphQL */ `
  mutation CreateStudentMajorLink(
    $input: CreateStudentMajorLinkInput!
    $condition: ModelStudentMajorLinkConditionInput
  ) {
    createStudentMajorLink(input: $input, condition: $condition) {
      id
      studentId
      majorId
      student {
        id
        name
        classStanding
        createdAt
        updatedAt
        owner
        __typename
      }
      major {
        id
        name
        createdAt
        updatedAt
        owner
        __typename
      }
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const updateStudentMajorLink = /* GraphQL */ `
  mutation UpdateStudentMajorLink(
    $input: UpdateStudentMajorLinkInput!
    $condition: ModelStudentMajorLinkConditionInput
  ) {
    updateStudentMajorLink(input: $input, condition: $condition) {
      id
      studentId
      majorId
      student {
        id
        name
        classStanding
        createdAt
        updatedAt
        owner
        __typename
      }
      major {
        id
        name
        createdAt
        updatedAt
        owner
        __typename
      }
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const deleteStudentMajorLink = /* GraphQL */ `
  mutation DeleteStudentMajorLink(
    $input: DeleteStudentMajorLinkInput!
    $condition: ModelStudentMajorLinkConditionInput
  ) {
    deleteStudentMajorLink(input: $input, condition: $condition) {
      id
      studentId
      majorId
      student {
        id
        name
        classStanding
        createdAt
        updatedAt
        owner
        __typename
      }
      major {
        id
        name
        createdAt
        updatedAt
        owner
        __typename
      }
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const createStudentCareerLink = /* GraphQL */ `
  mutation CreateStudentCareerLink(
    $input: CreateStudentCareerLinkInput!
    $condition: ModelStudentCareerLinkConditionInput
  ) {
    createStudentCareerLink(input: $input, condition: $condition) {
      id
      studentId
      careerId
      student {
        id
        name
        classStanding
        createdAt
        updatedAt
        owner
        __typename
      }
      career {
        id
        name
        createdAt
        updatedAt
        owner
        __typename
      }
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const updateStudentCareerLink = /* GraphQL */ `
  mutation UpdateStudentCareerLink(
    $input: UpdateStudentCareerLinkInput!
    $condition: ModelStudentCareerLinkConditionInput
  ) {
    updateStudentCareerLink(input: $input, condition: $condition) {
      id
      studentId
      careerId
      student {
        id
        name
        classStanding
        createdAt
        updatedAt
        owner
        __typename
      }
      career {
        id
        name
        createdAt
        updatedAt
        owner
        __typename
      }
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const deleteStudentCareerLink = /* GraphQL */ `
  mutation DeleteStudentCareerLink(
    $input: DeleteStudentCareerLinkInput!
    $condition: ModelStudentCareerLinkConditionInput
  ) {
    deleteStudentCareerLink(input: $input, condition: $condition) {
      id
      studentId
      careerId
      student {
        id
        name
        classStanding
        createdAt
        updatedAt
        owner
        __typename
      }
      career {
        id
        name
        createdAt
        updatedAt
        owner
        __typename
      }
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
