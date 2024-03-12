/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getTeacher = /* GraphQL */ `
  query GetTeacher($id: ID!) {
    getTeacher(id: $id) {
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
export const listTeachers = /* GraphQL */ `
  query ListTeachers(
    $filter: ModelTeacherFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTeachers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getClass = /* GraphQL */ `
  query GetClass($id: ID!) {
    getClass(id: $id) {
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
export const listClasses = /* GraphQL */ `
  query ListClasses(
    $filter: ModelClassFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listClasses(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        subject
        createdAt
        updatedAt
        teacherClassesId
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getStudent = /* GraphQL */ `
  query GetStudent($id: ID!) {
    getStudent(id: $id) {
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
export const listStudents = /* GraphQL */ `
  query ListStudents(
    $filter: ModelStudentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listStudents(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        classStanding
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getGrade = /* GraphQL */ `
  query GetGrade($id: ID!) {
    getGrade(id: $id) {
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
export const listGrades = /* GraphQL */ `
  query ListGrades(
    $filter: ModelGradeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listGrades(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        description
        score
        weight
        date
        createdAt
        updatedAt
        classGradesId
        studentGradesId
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getMajor = /* GraphQL */ `
  query GetMajor($id: ID!) {
    getMajor(id: $id) {
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
export const listMajors = /* GraphQL */ `
  query ListMajors(
    $filter: ModelMajorFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMajors(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getMajorRequirement = /* GraphQL */ `
  query GetMajorRequirement($id: ID!) {
    getMajorRequirement(id: $id) {
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
export const listMajorRequirements = /* GraphQL */ `
  query ListMajorRequirements(
    $filter: ModelMajorRequirementFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMajorRequirements(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        classRequirement
        minimumGradeRequirement
        createdAt
        updatedAt
        majorMajorRequirementId
        owner
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getCareer = /* GraphQL */ `
  query GetCareer($id: ID!) {
    getCareer(id: $id) {
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
export const listCareers = /* GraphQL */ `
  query ListCareers(
    $filter: ModelCareerFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCareers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getCareerRequirement = /* GraphQL */ `
  query GetCareerRequirement($id: ID!) {
    getCareerRequirement(id: $id) {
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
export const listCareerRequirements = /* GraphQL */ `
  query ListCareerRequirements(
    $filter: ModelCareerRequirementFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCareerRequirements(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        classRequirement
        minimumGradeRequirement
        createdAt
        updatedAt
        careerCareerRequirementId
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getStudentClassLink = /* GraphQL */ `
  query GetStudentClassLink($id: ID!) {
    getStudentClassLink(id: $id) {
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
export const listStudentClassLinks = /* GraphQL */ `
  query ListStudentClassLinks(
    $filter: ModelStudentClassLinkFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listStudentClassLinks(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        classId
        studentId
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getStudentMajorLink = /* GraphQL */ `
  query GetStudentMajorLink($id: ID!) {
    getStudentMajorLink(id: $id) {
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
export const listStudentMajorLinks = /* GraphQL */ `
  query ListStudentMajorLinks(
    $filter: ModelStudentMajorLinkFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listStudentMajorLinks(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        studentId
        majorId
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getStudentCareerLink = /* GraphQL */ `
  query GetStudentCareerLink($id: ID!) {
    getStudentCareerLink(id: $id) {
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
export const listStudentCareerLinks = /* GraphQL */ `
  query ListStudentCareerLinks(
    $filter: ModelStudentCareerLinkFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listStudentCareerLinks(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        studentId
        careerId
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const studentClassLinksByClassId = /* GraphQL */ `
  query StudentClassLinksByClassId(
    $classId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelStudentClassLinkFilterInput
    $limit: Int
    $nextToken: String
  ) {
    studentClassLinksByClassId(
      classId: $classId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        classId
        studentId
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const studentClassLinksByStudentId = /* GraphQL */ `
  query StudentClassLinksByStudentId(
    $studentId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelStudentClassLinkFilterInput
    $limit: Int
    $nextToken: String
  ) {
    studentClassLinksByStudentId(
      studentId: $studentId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        classId
        studentId
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const studentMajorLinksByStudentId = /* GraphQL */ `
  query StudentMajorLinksByStudentId(
    $studentId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelStudentMajorLinkFilterInput
    $limit: Int
    $nextToken: String
  ) {
    studentMajorLinksByStudentId(
      studentId: $studentId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        studentId
        majorId
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const studentMajorLinksByMajorId = /* GraphQL */ `
  query StudentMajorLinksByMajorId(
    $majorId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelStudentMajorLinkFilterInput
    $limit: Int
    $nextToken: String
  ) {
    studentMajorLinksByMajorId(
      majorId: $majorId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        studentId
        majorId
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const studentCareerLinksByStudentId = /* GraphQL */ `
  query StudentCareerLinksByStudentId(
    $studentId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelStudentCareerLinkFilterInput
    $limit: Int
    $nextToken: String
  ) {
    studentCareerLinksByStudentId(
      studentId: $studentId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        studentId
        careerId
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const studentCareerLinksByCareerId = /* GraphQL */ `
  query StudentCareerLinksByCareerId(
    $careerId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelStudentCareerLinkFilterInput
    $limit: Int
    $nextToken: String
  ) {
    studentCareerLinksByCareerId(
      careerId: $careerId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        studentId
        careerId
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
