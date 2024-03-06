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
export const onCreateGrade = /* GraphQL */ `
  subscription OnCreateGrade(
    $filter: ModelSubscriptionGradeFilterInput
    $owner: String
  ) {
    onCreateGrade(filter: $filter, owner: $owner) {
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
export const onUpdateGrade = /* GraphQL */ `
  subscription OnUpdateGrade(
    $filter: ModelSubscriptionGradeFilterInput
    $owner: String
  ) {
    onUpdateGrade(filter: $filter, owner: $owner) {
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
export const onDeleteGrade = /* GraphQL */ `
  subscription OnDeleteGrade(
    $filter: ModelSubscriptionGradeFilterInput
    $owner: String
  ) {
    onDeleteGrade(filter: $filter, owner: $owner) {
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
export const onCreateMajor = /* GraphQL */ `
  subscription OnCreateMajor(
    $filter: ModelSubscriptionMajorFilterInput
    $owner: String
  ) {
    onCreateMajor(filter: $filter, owner: $owner) {
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
export const onUpdateMajor = /* GraphQL */ `
  subscription OnUpdateMajor(
    $filter: ModelSubscriptionMajorFilterInput
    $owner: String
  ) {
    onUpdateMajor(filter: $filter, owner: $owner) {
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
export const onDeleteMajor = /* GraphQL */ `
  subscription OnDeleteMajor(
    $filter: ModelSubscriptionMajorFilterInput
    $owner: String
  ) {
    onDeleteMajor(filter: $filter, owner: $owner) {
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
export const onCreateMajorRequirement = /* GraphQL */ `
  subscription OnCreateMajorRequirement(
    $filter: ModelSubscriptionMajorRequirementFilterInput
    $owner: String
  ) {
    onCreateMajorRequirement(filter: $filter, owner: $owner) {
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
export const onUpdateMajorRequirement = /* GraphQL */ `
  subscription OnUpdateMajorRequirement(
    $filter: ModelSubscriptionMajorRequirementFilterInput
    $owner: String
  ) {
    onUpdateMajorRequirement(filter: $filter, owner: $owner) {
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
export const onDeleteMajorRequirement = /* GraphQL */ `
  subscription OnDeleteMajorRequirement(
    $filter: ModelSubscriptionMajorRequirementFilterInput
    $owner: String
  ) {
    onDeleteMajorRequirement(filter: $filter, owner: $owner) {
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
export const onCreateCareer = /* GraphQL */ `
  subscription OnCreateCareer(
    $filter: ModelSubscriptionCareerFilterInput
    $owner: String
  ) {
    onCreateCareer(filter: $filter, owner: $owner) {
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
export const onUpdateCareer = /* GraphQL */ `
  subscription OnUpdateCareer(
    $filter: ModelSubscriptionCareerFilterInput
    $owner: String
  ) {
    onUpdateCareer(filter: $filter, owner: $owner) {
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
export const onDeleteCareer = /* GraphQL */ `
  subscription OnDeleteCareer(
    $filter: ModelSubscriptionCareerFilterInput
    $owner: String
  ) {
    onDeleteCareer(filter: $filter, owner: $owner) {
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
export const onCreateCareerRequirement = /* GraphQL */ `
  subscription OnCreateCareerRequirement(
    $filter: ModelSubscriptionCareerRequirementFilterInput
    $owner: String
  ) {
    onCreateCareerRequirement(filter: $filter, owner: $owner) {
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
export const onUpdateCareerRequirement = /* GraphQL */ `
  subscription OnUpdateCareerRequirement(
    $filter: ModelSubscriptionCareerRequirementFilterInput
    $owner: String
  ) {
    onUpdateCareerRequirement(filter: $filter, owner: $owner) {
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
export const onDeleteCareerRequirement = /* GraphQL */ `
  subscription OnDeleteCareerRequirement(
    $filter: ModelSubscriptionCareerRequirementFilterInput
    $owner: String
  ) {
    onDeleteCareerRequirement(filter: $filter, owner: $owner) {
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
export const onCreateStudentMajorLink = /* GraphQL */ `
  subscription OnCreateStudentMajorLink(
    $filter: ModelSubscriptionStudentMajorLinkFilterInput
    $owner: String
  ) {
    onCreateStudentMajorLink(filter: $filter, owner: $owner) {
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
export const onUpdateStudentMajorLink = /* GraphQL */ `
  subscription OnUpdateStudentMajorLink(
    $filter: ModelSubscriptionStudentMajorLinkFilterInput
    $owner: String
  ) {
    onUpdateStudentMajorLink(filter: $filter, owner: $owner) {
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
export const onDeleteStudentMajorLink = /* GraphQL */ `
  subscription OnDeleteStudentMajorLink(
    $filter: ModelSubscriptionStudentMajorLinkFilterInput
    $owner: String
  ) {
    onDeleteStudentMajorLink(filter: $filter, owner: $owner) {
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
export const onCreateStudentCareerLink = /* GraphQL */ `
  subscription OnCreateStudentCareerLink(
    $filter: ModelSubscriptionStudentCareerLinkFilterInput
    $owner: String
  ) {
    onCreateStudentCareerLink(filter: $filter, owner: $owner) {
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
export const onUpdateStudentCareerLink = /* GraphQL */ `
  subscription OnUpdateStudentCareerLink(
    $filter: ModelSubscriptionStudentCareerLinkFilterInput
    $owner: String
  ) {
    onUpdateStudentCareerLink(filter: $filter, owner: $owner) {
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
export const onDeleteStudentCareerLink = /* GraphQL */ `
  subscription OnDeleteStudentCareerLink(
    $filter: ModelSubscriptionStudentCareerLinkFilterInput
    $owner: String
  ) {
    onDeleteStudentCareerLink(filter: $filter, owner: $owner) {
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
