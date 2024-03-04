import { generateClient } from 'aws-amplify/api';
import * as mutations from '../graphql/mutations';
import * as query from '../graphql/queries'

const client = generateClient();

//#region Creation

export async function createTeacher(teacherName) {
  try {
    const teacherData = { name: teacherName };
    const newTeacher = await client.graphql({
      query: mutations.createTeacher,
      variables: { input: teacherData }
    });
    console.log("Teacher created successfully")
    return newTeacher.data.createTeacher;
  } catch (error) {
    console.error("Error creating teacher:", error);
    throw error;
  }
}

export async function addClass(classSubject, classTeacher) {
  try {
    const classData = { subject: classSubject, teacherClassesId: classTeacher};
    const newClass = await client.graphql({
      query: mutations.createClass,
      variables: { input: classData }
    });
    console.log("Class Created successfully",newClass.data.createClass);
    return newClass.data.createClass;
  } catch (error) {
    console.error("Error adding class:", error);
    throw error;
  }
}

export async function addStudent(studentName, studentClassStanding) {
  try {
    const studentData = { name: studentName, classStanding: studentClassStanding };
    const newStudent = await client.graphql({
      query: mutations.createStudent,
      variables: { input: studentData }
    });
    console.log("student added successfully");
    return newStudent.data.createStudent;
  } catch (error) {
    console.error("Error adding student:", error);
    throw error;
  }
}

export async function addGrade(classID, studentId, gradeDescription, gradeScore) {
  try {
    const gradeData = { description: gradeDescription, score: gradeScore, studentGradesId: studentId, classGradesId: classID };
    await client.graphql({
      query: mutations.createGrade,
      variables: { input: gradeData }
    });
    console.log("Grade added successfully");
  } catch (error) {
    console.error("Error adding grade:", error);
    throw error;
  }
}

export async function associateStudentWithClass(classIdInfo, studentIdInfo) {
    try {
      const studentClassData = { classId: classIdInfo, studentId: studentIdInfo };
      await client.graphql({
        query: mutations.createStudentClassLink,
        variables: { input: studentClassData } 
      });
      console.log("Student associated with class successfully");
    } catch (error) {
      console.error("Error associating student with class:", error);
      throw error;
    }
  }

  export async function updateGrade(gradeId, newDescription, newScore) {
    try {
      const gradeData = { id: gradeId, description: newDescription, score: newScore };
      await client.graphql({
        query: mutations.updateGrade,
        variables: { input: gradeData }
      });
      console.log("Grade updated successfully");
    } catch (error) {
      console.error("Error updating grade:", error);
      throw error;
    }
  }
  


//#endregion

//#region Searches
export async function getListOfTeachers() {
  try {
    const result = await client.graphql({
      query: query.listTeachers
    });
    return result.data.listTeachers;
  } catch (error) {
    console.error("Error fetching list of teachers:", error);
    throw error;
  }
}

export async function getTeacher(teacherId) {
  try {
    const response = await client.graphql({ 
      query: query.getTeacher, 
      variables: { id: teacherId } 
    });
    return response.data.getTeacher;
  } catch (error) {
    console.error("Error fetching teacher:", error);
    throw error;
  }
}

export async function getListOfClassesForTeacher(teacherId) {
  try {
    const result = await client.graphql({
      query: query.listClasses,
      variables: {
        filter: {
          teacherClassesId: {
            eq: teacherId
          }
        }
      }
    });
    return result.data.listClasses.items;
  } catch (error) {
    console.error("Error fetching list of classes for teacher:", error);
    throw error;
  }
}

export async function getClass(classId) {
  try {
    const response = await client.graphql({ 
      query: query.getClass, 
      variables: { id: classId } 
    });
    return response.data.getClass;
  } catch (error) {
    console.error("Error fetching class:", error);
    throw error;
  }
}

export async function getListOfAllStudents() {
  try {
    const result = await client.graphql({
      query: query.listStudents
    });
    return result.data.listStudents.items;
  } catch (error) {
    console.error("Error fetching list of Students:", error);
    throw error;
  }
}

export async function getStudentsForClass(classId) {
  try {
    const result = await client.graphql({
      query: query.studentClassLinksByClassId,
      variables: {
        classId: classId
      }
    });
    
    // Extract the student IDs from the result
    const studentClassLinks = result.data.studentClassLinksByClassId.items;
    const studentIds = studentClassLinks.map(link => link.studentId);
    
    // Retrieve the details of the students using their IDs
    const students = await Promise.all(studentIds.map(async studentId => {
      const student = await getStudentDetails(studentId);
      return student;
    }));
    
    return students;
  } catch (error) {
    console.error("Error fetching students for class:", error);
    throw error;
  }
}

export async function getStudentDetails(studentId) {
  try {
    const result = await client.graphql({
      query: query.getStudent,
      variables: {
        id: studentId
      }
    });
    return result.data.getStudent;
  } catch (error) {
    console.error("Error fetching student details:", error);
    throw error;
  }
}

export async function getListOfGradesForStudent(classId, studentId) {
  try {
    const result = await client.graphql({
      query: query.listGrades,
      variables: {
        filter: {
          classGradesId: { eq: classId },
          studentGradesId: { eq: studentId }
        }
      }
    });
    return result.data.listGrades.items;
  } catch (error) {
    console.error("Error fetching list of grades for student:", error);
    throw error;
  }
}

export async function getClassesForStudent(studentId) {
  try {
    const result = await client.graphql({
      query: query.studentClassLinksByStudentId,
      variables: {
        studentId: studentId
      }
    });

    // Extract the class IDs from the result
    const studentClassLinks = result.data.studentClassLinksByStudentId.items;
    const classIds = studentClassLinks.map(link => link.classId);

    // Retrieve the details of the classes using their IDs
    const classes = await Promise.all(classIds.map(async classId => {
      const classInfo = await getClassDetails(classId);
      return classInfo;
    }));

    return classes;
  } catch (error) {
    console.error("Error fetching classes for student:", error);
    throw error;
  }
}

async function getClassDetails(classId) {
  try {
    const result = await client.graphql({
      query: query.getClass,
      variables: {
        id: classId
      }
    });
    return result.data.getClass;
  } catch (error) {
    console.error("Error fetching class details:", error);
    throw error;
  }
}

export async function getUniqueGradeDescriptionsForClass(classId, students) {
  try {
    // Array to store all grade descriptions
    let allGradeDescriptions = [];

    for (const student of students) {
      const grades = await getListOfGradesForStudent(classId, student.id);

      // Extract grade descriptions and add them to the array
      const gradeDescriptions = grades.map(grade => grade.description);
      allGradeDescriptions = [...allGradeDescriptions, ...gradeDescriptions];
    }

    // Remove duplicates using Set and convert back to array
    const uniqueGradeDescriptions = [...new Set(allGradeDescriptions)];

    uniqueGradeDescriptions.sort();
    return uniqueGradeDescriptions;
  } catch (error) {
    console.error("Error fetching unique grade descriptions for class:", error);
    throw error;
  }
}
//#endregion 
 