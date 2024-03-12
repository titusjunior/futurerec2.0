/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateTeacher = /* GraphQL */ `
  subscription OnCreateTeacher($filter: ModelSubscriptionTeacherFilterInput) {
    onCreateTeacher(filter: $filter) {
      id
      name
      classes {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateTeacher = /* GraphQL */ `
  subscription OnUpdateTeacher($filter: ModelSubscriptionTeacherFilterInput) {
    onUpdateTeacher(filter: $filter) {
      id
      name
      classes {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteTeacher = /* GraphQL */ `
  subscription OnDeleteTeacher($filter: ModelSubscriptionTeacherFilterInput) {
    onDeleteTeacher(filter: $filter) {
      id
      name
      classes {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateClass = /* GraphQL */ `
  subscription OnCreateClass($filter: ModelSubscriptionClassFilterInput) {
    onCreateClass(filter: $filter) {
      id
      subject
      teacherID {
        id
        name
        createdAt
        updatedAt
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
      __typename
    }
  }
`;
export const onUpdateClass = /* GraphQL */ `
  subscription OnUpdateClass($filter: ModelSubscriptionClassFilterInput) {
    onUpdateClass(filter: $filter) {
      id
      subject
      teacherID {
        id
        name
        createdAt
        updatedAt
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
      __typename
    }
  }
`;
export const onDeleteClass = /* GraphQL */ `
  subscription OnDeleteClass($filter: ModelSubscriptionClassFilterInput) {
    onDeleteClass(filter: $filter) {
      id
      subject
      teacherID {
        id
        name
        createdAt
        updatedAt
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
      __typename
    }
  }
`;
export const onCreateStudent = /* GraphQL */ `
  subscription OnCreateStudent($filter: ModelSubscriptionStudentFilterInput) {
    onCreateStudent(filter: $filter) {
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
      __typename
    }
  }
`;
export const onUpdateStudent = /* GraphQL */ `
  subscription OnUpdateStudent($filter: ModelSubscriptionStudentFilterInput) {
    onUpdateStudent(filter: $filter) {
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
      __typename
    }
  }
`;
export const onDeleteStudent = /* GraphQL */ `
  subscription OnDeleteStudent($filter: ModelSubscriptionStudentFilterInput) {
    onDeleteStudent(filter: $filter) {
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
      __typename
    }
  }
`;
export const onCreateGrade = /* GraphQL */ `
  subscription OnCreateGrade($filter: ModelSubscriptionGradeFilterInput) {
    onCreateGrade(filter: $filter) {
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
        __typename
      }
      student {
        id
        name
        classStanding
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      classGradesId
      studentGradesId
      __typename
    }
  }
`;
export const onUpdateGrade = /* GraphQL */ `
  subscription OnUpdateGrade($filter: ModelSubscriptionGradeFilterInput) {
    onUpdateGrade(filter: $filter) {
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
        __typename
      }
      student {
        id
        name
        classStanding
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      classGradesId
      studentGradesId
      __typename
    }
  }
`;
export const onDeleteGrade = /* GraphQL */ `
  subscription OnDeleteGrade($filter: ModelSubscriptionGradeFilterInput) {
    onDeleteGrade(filter: $filter) {
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
        __typename
      }
      student {
        id
        name
        classStanding
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      classGradesId
      studentGradesId
      __typename
    }
  }
`;
export const onCreateMajor = /* GraphQL */ `
  subscription OnCreateMajor($filter: ModelSubscriptionMajorFilterInput) {
    onCreateMajor(filter: $filter) {
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
      __typename
    }
  }
`;
export const onUpdateMajor = /* GraphQL */ `
  subscription OnUpdateMajor($filter: ModelSubscriptionMajorFilterInput) {
    onUpdateMajor(filter: $filter) {
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
      __typename
    }
  }
`;
export const onDeleteMajor = /* GraphQL */ `
  subscription OnDeleteMajor($filter: ModelSubscriptionMajorFilterInput) {
    onDeleteMajor(filter: $filter) {
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
      __typename
    }
  }
`;
export const onCreateMajorRequirement = /* GraphQL */ `
  subscription OnCreateMajorRequirement(
    $filter: ModelSubscriptionMajorRequirementFilterInput
  ) {
    onCreateMajorRequirement(filter: $filter) {
      id
      classRequirement
      minimumGradeRequirement
      major {
        id
        name
        createdAt
        updatedAt
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
export const onUpdateMajorRequirement = /* GraphQL */ `
  subscription OnUpdateMajorRequirement(
    $filter: ModelSubscriptionMajorRequirementFilterInput
  ) {
    onUpdateMajorRequirement(filter: $filter) {
      id
      classRequirement
      minimumGradeRequirement
      major {
        id
        name
        createdAt
        updatedAt
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
export const onDeleteMajorRequirement = /* GraphQL */ `
  subscription OnDeleteMajorRequirement(
    $filter: ModelSubscriptionMajorRequirementFilterInput
  ) {
    onDeleteMajorRequirement(filter: $filter) {
      id
      classRequirement
      minimumGradeRequirement
      major {
        id
        name
        createdAt
        updatedAt
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
export const onCreateCareer = /* GraphQL */ `
  subscription OnCreateCareer($filter: ModelSubscriptionCareerFilterInput) {
    onCreateCareer(filter: $filter) {
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
      __typename
    }
  }
`;
export const onUpdateCareer = /* GraphQL */ `
  subscription OnUpdateCareer($filter: ModelSubscriptionCareerFilterInput) {
    onUpdateCareer(filter: $filter) {
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
      __typename
    }
  }
`;
export const onDeleteCareer = /* GraphQL */ `
  subscription OnDeleteCareer($filter: ModelSubscriptionCareerFilterInput) {
    onDeleteCareer(filter: $filter) {
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
      __typename
    }
  }
`;
export const onCreateCareerRequirement = /* GraphQL */ `
  subscription OnCreateCareerRequirement(
    $filter: ModelSubscriptionCareerRequirementFilterInput
  ) {
    onCreateCareerRequirement(filter: $filter) {
      id
      classRequirement
      minimumGradeRequirement
      career {
        id
        name
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      careerCareerRequirementId
      __typename
    }
  }
`;
export const onUpdateCareerRequirement = /* GraphQL */ `
  subscription OnUpdateCareerRequirement(
    $filter: ModelSubscriptionCareerRequirementFilterInput
  ) {
    onUpdateCareerRequirement(filter: $filter) {
      id
      classRequirement
      minimumGradeRequirement
      career {
        id
        name
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      careerCareerRequirementId
      __typename
    }
  }
`;
export const onDeleteCareerRequirement = /* GraphQL */ `
  subscription OnDeleteCareerRequirement(
    $filter: ModelSubscriptionCareerRequirementFilterInput
  ) {
    onDeleteCareerRequirement(filter: $filter) {
      id
      classRequirement
      minimumGradeRequirement
      career {
        id
        name
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      careerCareerRequirementId
      __typename
    }
  }
`;
export const onCreateStudentClassLink = /* GraphQL */ `
  subscription OnCreateStudentClassLink(
    $filter: ModelSubscriptionStudentClassLinkFilterInput
  ) {
    onCreateStudentClassLink(filter: $filter) {
      id
      classId
      studentId
      class {
        id
        subject
        createdAt
        updatedAt
        teacherClassesId
        __typename
      }
      student {
        id
        name
        classStanding
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateStudentClassLink = /* GraphQL */ `
  subscription OnUpdateStudentClassLink(
    $filter: ModelSubscriptionStudentClassLinkFilterInput
  ) {
    onUpdateStudentClassLink(filter: $filter) {
      id
      classId
      studentId
      class {
        id
        subject
        createdAt
        updatedAt
        teacherClassesId
        __typename
      }
      student {
        id
        name
        classStanding
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteStudentClassLink = /* GraphQL */ `
  subscription OnDeleteStudentClassLink(
    $filter: ModelSubscriptionStudentClassLinkFilterInput
  ) {
    onDeleteStudentClassLink(filter: $filter) {
      id
      classId
      studentId
      class {
        id
        subject
        createdAt
        updatedAt
        teacherClassesId
        __typename
      }
      student {
        id
        name
        classStanding
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateStudentMajorLink = /* GraphQL */ `
  subscription OnCreateStudentMajorLink(
    $filter: ModelSubscriptionStudentMajorLinkFilterInput
  ) {
    onCreateStudentMajorLink(filter: $filter) {
      id
      studentId
      majorId
      student {
        id
        name
        classStanding
        createdAt
        updatedAt
        __typename
      }
      major {
        id
        name
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateStudentMajorLink = /* GraphQL */ `
  subscription OnUpdateStudentMajorLink(
    $filter: ModelSubscriptionStudentMajorLinkFilterInput
  ) {
    onUpdateStudentMajorLink(filter: $filter) {
      id
      studentId
      majorId
      student {
        id
        name
        classStanding
        createdAt
        updatedAt
        __typename
      }
      major {
        id
        name
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteStudentMajorLink = /* GraphQL */ `
  subscription OnDeleteStudentMajorLink(
    $filter: ModelSubscriptionStudentMajorLinkFilterInput
  ) {
    onDeleteStudentMajorLink(filter: $filter) {
      id
      studentId
      majorId
      student {
        id
        name
        classStanding
        createdAt
        updatedAt
        __typename
      }
      major {
        id
        name
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateStudentCareerLink = /* GraphQL */ `
  subscription OnCreateStudentCareerLink(
    $filter: ModelSubscriptionStudentCareerLinkFilterInput
  ) {
    onCreateStudentCareerLink(filter: $filter) {
      id
      studentId
      careerId
      student {
        id
        name
        classStanding
        createdAt
        updatedAt
        __typename
      }
      career {
        id
        name
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateStudentCareerLink = /* GraphQL */ `
  subscription OnUpdateStudentCareerLink(
    $filter: ModelSubscriptionStudentCareerLinkFilterInput
  ) {
    onUpdateStudentCareerLink(filter: $filter) {
      id
      studentId
      careerId
      student {
        id
        name
        classStanding
        createdAt
        updatedAt
        __typename
      }
      career {
        id
        name
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteStudentCareerLink = /* GraphQL */ `
  subscription OnDeleteStudentCareerLink(
    $filter: ModelSubscriptionStudentCareerLinkFilterInput
  ) {
    onDeleteStudentCareerLink(filter: $filter) {
      id
      studentId
      careerId
      student {
        id
        name
        classStanding
        createdAt
        updatedAt
        __typename
      }
      career {
        id
        name
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
