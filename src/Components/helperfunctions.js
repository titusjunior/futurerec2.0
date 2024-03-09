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

  export async function addGrade(classID, studentId, gradeDescription, gradeScore, gradeWeight) {
    try {
      const gradeData = { description: gradeDescription, score: gradeScore, weight: gradeWeight, studentGradesId: studentId, classGradesId: classID };
      await client.graphql({
        query: mutations.createGrade,
        variables: { input: gradeData }
      });
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

  export async function associateStudentWithMajor(majorInfo, studentInfo) {
    try {
      const studentMajorData = { studentId: studentInfo, majorId: majorInfo };
      await client.graphql({
        query: mutations.createStudentMajorLink,
        variables: { input: studentMajorData } 
      });
      console.log("Student associated with major successfully");
    } catch (error) {
      console.error("Error associating student with major:", error);
      throw error;
    }
  }
  
  export async function updateGrade(gradeId, newDescription, newScore, newWeight) {
    try {
      const gradeData = { id: gradeId, description: newDescription, score: newScore, weight: newWeight};
      await client.graphql({
        query: mutations.updateGrade,
        variables: { input: gradeData }
      });
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

export async function getListOfAllClasses() {
  try {
    const result = await client.graphql({
      query: query.listClasses
    });
    return result.data.listClasses.items;
  } catch (error) {
    console.error("Error fetching list of Students:", error);
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

//since all students in the same class should have the same Assignments we only need one student's info
export async function getUniqueGradeDescriptionsAndWeightForClass(classId, studentId) {
  try {
    const grades = await getListOfGradesForStudent(classId, studentId);
    const descriptionsAndWeights = grades.map(grade => ({
      description: grade.description,
      weight: grade.weight
  }));

  // Sort the array by the description property
  descriptionsAndWeights.sort((a, b) => a.description.localeCompare(b.description));
    return descriptionsAndWeights;
  } catch (error) {
    console.error("Error fetching unique grade descriptions for class:", error);
    throw error;
  }
}

export async function getListOfAllMajors() {
  try {
    const result = await client.graphql({
      query: query.listMajors
    });
    return result.data.listMajors.items;
  } catch (error) {
    console.error("Error fetching list of Students:", error);
    throw error;
  }
}



export async function getMajorsForStudent(studentId) {
  try {
    const result = await client.graphql({
      query: query.studentMajorLinksByStudentId,
      variables: {
        studentId: studentId
      }
    });

    // Extract the career IDs from the result
    const studentMajorLinks = result.data.studentMajorLinksByStudentId.items;
    const majorIds = studentMajorLinks.map(link => link.majorId);

    // Retrieve the details of the careers using their IDs
    const majors = await Promise.all(majorIds.map(async majorId => {
      const majorInfo = await getClassDetails(majorId);
      return majorInfo;
    }));

    return majors;
  } catch (error) {
    console.error("Error fetching majors for student:", error);
    //throw error;
  }
}
//#endregion 
 

//#region career and majors

//calculate class average for a student
export async function CalculateAverageGrade(studentId, classId) {
  try{
    const grades = await getListOfGradesForStudent(classId, studentId);
    let sumProduct = 0;
    let sumWeight = 0;

    grades.forEach(grade => {
      sumProduct += grade.score * grade.weight;
      sumWeight += grade.weight;
    });

    const weightedAverage = sumWeight !== 0 ? sumProduct / sumWeight : 0;
    return Math.round(weightedAverage * 100)/100;//round to two decimal places
  }catch (error){
    console.log("Error Calculating the average: ", error)
  }

}


export async function getstudentClassAverages(studentId) {
  try {
    const classes = await getClassesForStudent(studentId);

    const classAverages = await Promise.all( classes.map(async classInfo =>{
  //    console.log("new student");
  //   console.log("class info:", classInfo);
  //    console.log("class ID:", classInfo.id);
      console.log("student Id:", studentId);
      const avgGrade = await CalculateAverageGrade(studentId, classInfo.id);
      const subject = classInfo.subject;       
  //    console.log("class subject:", subject);
  //    console.log("class average:", avgGrade);
      return {subject, avgGrade};
    }));

    return classAverages;
  } catch (error) {
    console.log(`Error getting class averages for${studentId}: ${error}`)
  }
}



//#endregion




//#region CareerDB stuff
  
export async function createCareer(careerName) {
  try {
    const careerData = {name: careerName};
    //console.log("career addative", careerData);
    const response= await client.graphql({
      query: mutations.createCareer,
      variables: { input: careerData}
    });
    console.log("Career created successfully")
    return response.data.createCareer;
  } catch (error) {
    console.error("Error adding career:", error);
    throw error;
  }
}

export async function getCareer(careerId) {
  try {
    const CareerDetails = await client.graphql({
      query: query.getCareer,
      variables: { id: careerId}
    });
    return CareerDetails.data.getCareer;
  } catch (error) {
    console.error("Error adding Career:", error);
    throw error;
  }
}

export async function getListOfAllCareers() {
  try {
    const result = await client.graphql({
      query: query.listCareers
    });
    return result.data.listCareers.items;
  } catch (error) {
    console.error("Error fetching list of Students:", error);
    throw error;
  }
}

export async function getCareersForStudent(studentId) {
  try {
    const result = await client.graphql({
      query: query.studentCareerLinksByStudentId,
      variables: {
        studentId: studentId
      }
    });
    
    // Extract the career IDs from the result
    const studentCareerLinks = result.data.studentCareerLinksByStudentId.items;
    const careerIds = studentCareerLinks.map(link => link.careerId);
    
    // Retrieve the details of the careers using their IDs
    const careers = await Promise.all(careerIds.map(async careerId => {
      const careerInfo = await getClassDetails(careerId);
      return careerInfo;
    }));
    
    return careers;
  } catch (error) {
    console.error("Error fetching careers for student:", error);
    //throw error;
  }
}

export async function createCareerRequirement(careerId, className, minGrade ) {
  try {
    const careerReqData = {classRequirement: className, minimumGradeRequirement: minGrade, careerCareerRequirementId: careerId};
    console.log("career Requirement addative", careerReqData);
    const response= await client.graphql({
      query: mutations.createCareerRequirement,
      variables: { input: careerReqData}
    });
    console.log("Career created successfully")
    return response.data.createCareerRequirement;

  } catch (error) {
    console.error("Error adding Career Requirement:", error);
    throw error;
  }
}

export async function getListOfCareerRequirementsForCareer(careerId) {
  try {
    const listRequirements = await client.graphql({
      query: query.listCareerRequirements,
      variables: { 
        filter:{
          careerCareerRequirementId: {
            eq: careerId
          }
        }
      }
    });
    return listRequirements.data.listCareerRequirements.items;
  } catch (error) {
    console.error("Error adding grade:", error);
    throw error;
  }
}

export async function associateStudentWithCareer(CareerInfo, studentInfo) {
  try {
    const studentCareerData = { studentId: studentInfo, careerId: CareerInfo };
    await client.graphql({
      query: mutations.createStudentCareerLink,
      variables: { input: studentCareerData } 
    });
    console.log("Student associated with major successfully");
  } catch (error) {
    console.error("Error associating student with major:", error);
    throw error;
  }
}


//#endregion
