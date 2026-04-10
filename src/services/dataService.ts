import apiClient from "./api";

import {
    Student,
    Subject,
    ProgressEntry,
    Assignment,
    AIInsight,
    Score,
    Objective
} from "@/app/data/mockData";

class DataService{
    // student
    async getStudent():Promise<Student[]>{
        const response = await apiClient.get(`/student`)
        return response.data
    }
    async getStudentById(id:string):Promise<Student>{
        const response = await apiClient.get(`/student/${id}`)
        return response.data
    }
    async createStudent(student:Omit<Student,'id'>):Promise<Student>{
        const response = await apiClient.post(`/student`,student)
        return response.data
    }
    async updateStudent(id:string,student:Partial<Student>):Promise<Student>{
        const response = await apiClient.put(`/student/${id}`,student)
        return response.data
    }
    async deleteStudent(id:string):Promise<void>{
        apiClient.delete(`/student/${id}`)
    }
    // subject
    async getSubject():Promise<Subject[]>{
        const response = await apiClient.get(`/subject`)
        return response.data
    }
    async getSubjectById(id:string):Promise<Subject>{
        const response = await apiClient.get(`/subject/${id}`)
        return response.data
    }
    async createSubject(Subject:Omit<Subject,'id'>):Promise<Subject>{
        const response = await apiClient.post(`/subject`,Subject)
        return response.data
    }
    async updateSubject(id:string,Subject:Partial<Subject>):Promise<Subject>{
        const response = await apiClient.put(`/subject/${id}`,Subject)
        return response.data
    }
    async deleteSubject(id:string):Promise<void>{
        apiClient.delete(`/subject/${id}`)
    }
    // Progress
    async getProgress(filters?:{
        studentId?:string,
        subjectID?:string,
        week?:number,
    }):Promise<ProgressEntry[]>{
        const response = await apiClient.get(`/progress`,{params:filters})
        return response.data
    }
    async getProgressById(StudentId:string):Promise<ProgressEntry>{
        const response = await apiClient.get(`/progress`,{params:StudentId})
        return response.data
    }
    async createProgress(Progress:Omit<ProgressEntry,'id'>):Promise<ProgressEntry>{
        const response = await apiClient.post(`/progress`,Progress)
        return response.data
    }
    async updateProgress(id:string,Progress:Partial<ProgressEntry>):Promise<ProgressEntry>{
        const response = await apiClient.put(`/progress/${id}`,Progress)
        return response.data
    }
    async deleteProgress(id:string):Promise<void>{
        apiClient.delete(`/progress/${id}`)
    }
    // Assignment
    async getAssignment(filters?:{
        studentId?:string,
        subjectId?:string,
    }):Promise<Assignment[]>{
        const response = await apiClient.get(`/assignment`,{params:filters})
        return response.data
    }
    async getAssignmentById(StudentId:string):Promise<Assignment>{
        const response = await apiClient.get(`/assignment`,{params:StudentId})
        return response.data
    }
    async createAssignment(Assignment:Omit<Assignment,'id'>):Promise<Assignment>{
        const response = await apiClient.post(`/assignment`,Assignment)
        return response.data
    }
    async updateAssignment(id:string,Assignment:Partial<Assignment>):Promise<Assignment>{
        const response = await apiClient.put(`/assignment/${id}`,Assignment)
        return response.data
    }
    async deleteAssignment(id:string):Promise<void>{
        apiClient.delete(`/Assignment/${id}`)
    }
    // Objective
    
    async getObjective():Promise<Objective>{
        const response = await apiClient.get(`/objective`)
        return response.data
    }
    async getObjectiveById(filters?:{
        studentId?:string,
        subjectID?:string,
        week?:number,
    }):Promise<ProgressEntry[]>{
        const response = await apiClient.get(`/objective`,{params:filters})
        return response.data
    }
    async createObjective(Objective:Omit<Objective,'id'>):Promise<Objective>{
        const response = await apiClient.post(`/objective`,Objective)
        return response.data
    }
    async updateObjective(id:string,Objective:Partial<Objective>):Promise<Objective>{
        const response = await apiClient.put(`/objective/${id}`,Objective)
        return response.data
    }
    async deleteObjective(id:string):Promise<void>{
        apiClient.delete(`/objective/${id}`)
    }
   
    // Score
    
    async getScoreById(filters?:{
        studentId?:string,
        assignmentId?:string,
    }):Promise<Score[]>{
        const response = await apiClient.get(`/score`,{params:filters})
        return response.data
    }
    async createScore(Score:Omit<Score,'id'>):Promise<Score>{
        const response = await apiClient.post(`/score`,Score)
        return response.data
    }
    async updateScore(id:string,Score:Partial<Score>):Promise<Score>{
        const response = await apiClient.put(`/score/${id}`,Score)
        return response.data
    }
    async deleteScore(id:string):Promise<void>{
        apiClient.delete(`/score/${id}`)
    }

    //Ai Analytics
//    async getAlert(): Promise<Alert[]>{
//     // if backend provide this end point
//     try{
//         const response = await apiClient.get(`analytics/alert`)
//         return response.data
//     }catch{
//         return [];
//     }
//    }
    async getAIInsights(): Promise<AIInsight[]> {
    // If backend provides this endpoint
        try {
        const response = await apiClient.get('/analytics/insights');
        return response.data;
        } catch {
        return [];
        }
    }

    async getSubjectAverages(): Promise<any[]> {
        try {
        const response = await apiClient.get('/analytics/subject-averages');
        return response.data;
        } catch {
        return [];
        }
    }

    async getWeeklyTrend(): Promise<any[]> {
        try {
        const response = await apiClient.get('/analytics/weekly-trend');
        return response.data;
        } catch {
        return [];
        }
    }

}
export default new DataService()