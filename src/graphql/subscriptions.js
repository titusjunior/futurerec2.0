/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateTeacher = /* GraphQL */ `
  subscription OnCreateTeacher(
    $filter: ModelSubscriptionTeacherFilterInput
    $owner: String
  ) {
    onCreateTeacher(filter: $filter, owner: $owner) {
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
export const onUpdateTeacher = /* GraphQL */ `
  subscription OnUpdateTeacher(
    $filter: ModelSubscriptionTeacherFilterInput
    $owner: String
  ) {
    onUpdateTeacher(filter: $filter, owner: $owner) {
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
export const onDeleteTeacher = /* GraphQL */ `
  subscription OnDeleteTeacher(
    $filter: ModelSubscriptionTeacherFilterInput
    $owner: String
  ) {
    onDeleteTeacher(filter: $filter, owner: $owner) {
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
export const onCreateClass = /* GraphQL */ `
  subscription OnCreateClass(
    $filter: ModelSubscriptionClassFilterInput
    $owner: String
  ) {
    onCreateClass(filter: $filter, owner: $owner) {
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
export const onUpdateClass = /* GraphQL */ `
  subscription OnUpdateClass(
    $filter: ModelSubscriptionClassFilterInput
    $owner: String
  ) {
    onUpdateClass(filter: $filter, owner: $owner) {
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
export const onDeleteClass = /* GraphQL */ `
  subscription OnDeleteClass(
    $filter: ModelSubscriptionClassFilterInput
    $owner: String
  ) {
    onDeleteClass(filter: $filter, owner: $owner) {
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
export const onCreateStudent = /* GraphQL */ `
  subscription OnCreateStudent(
    $filter: ModelSubscriptionStudentFilterInput
    $owner: String
  ) {
    onCreateStudent(filter: $filter, owner: $owner) {
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
export const onUpdateStudent = /* GraphQL */ `
  subscription OnUpdateStudent(
    $filter: ModelSubscriptionStudentFilterInput
    $owner: String
  ) {
    onUpdateStudent(filter: $filter, owner: $owner) {
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
export const onDeleteStudent = /* GraphQL */ `
  subscription OnDeleteStudent(
    $filter: ModelSubscriptionStudentFilterInput
    $owner: String
  ) {
    onDeleteStudent(filter: $filter, owner: $owner) {
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
export const onCreateGrade = /* GraphQL */ `
  subscription OnCreateGrade(
    $filter: ModelSubscriptionGradeFilterInput
    $owner: String
  ) {
    onCreateGrade(filter: $filter, owner: $owner) {
      id
      description
      score
      date
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
      studentGradesId
      owner
      __typename
    }
  }
`;
export const onUpdateGrade = /* GraphQL */ `
  subscription OnUpdateGrade(
    $filter: ModelSubscriptionGradeFilterInput
    $owner: String
  ) {
    onUpdateGrade(filter: $filter, owner: $owner) {
      id
      description
      score
      date
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
      studentGradesId
      owner
      __typename
    }
  }
`;
export const onDeleteGrade = /* GraphQL */ `
  subscription OnDeleteGrade(
    $filter: ModelSubscriptionGradeFilterInput
    $owner: String
  ) {
    onDeleteGrade(filter: $filter, owner: $owner) {
      id
      description
      score
      date
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
      studentGradesId
      owner
      __typename
    }
  }
`;
export const onCreateStudentClassLink = /* GraphQL */ `
  subscription OnCreateStudentClassLink(
    $filter: ModelSubscriptionStudentClassLinkFilterInput
    $owner: String
  ) {
    onCreateStudentClassLink(filter: $filter, owner: $owner) {
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
export const onUpdateStudentClassLink = /* GraphQL */ `
  subscription OnUpdateStudentClassLink(
    $filter: ModelSubscriptionStudentClassLinkFilterInput
    $owner: String
  ) {
    onUpdateStudentClassLink(filter: $filter, owner: $owner) {
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
export const onDeleteStudentClassLink = /* GraphQL */ `
  subscription OnDeleteStudentClassLink(
    $filter: ModelSubscriptionStudentClassLinkFilterInput
    $owner: String
  ) {
    onDeleteStudentClassLink(filter: $filter, owner: $owner) {
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
