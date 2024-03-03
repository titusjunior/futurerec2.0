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
