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
      owner
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
        owner
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
        owner
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
      createdAt
      updatedAt
      owner
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
        owner
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
        date
        createdAt
        updatedAt
        studentGradesId
        owner
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
        owner
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
        owner
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
        owner
        __typename
      }
      nextToken
      __typename
    }
  }
`;
