import { useState,useEffect } from "react";
import dataService from "@/services/dataService";
import { Student,
    Subject,
    ProgressEntry,
    Assignment,
    AIInsight,
    Score,
    Objective } from "@/app/data/mockData";

export function useStudent(){
    const [student, setStudent] = useState<Student[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string|null>(null)

    useEffect(() => {
        fetchStudents()
    },[])

    const fetchStudents = async ()=>{
        try{
            setLoading(true)
            const data = await dataService.getStudent()
            setStudent(data)
            setError(null)
        }catch(err:any){
            setError(err.message)
        }finally{
            setLoading(false)
        }
    }
    return {student,loading, error,refetch : fetchStudents}
}
//Subject
export function useSubject(){
    const [Subject, setSubject] = useState<Subject[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string|null>(null)

    useEffect(() => {
        fetchSubjects()
    },[])

    const fetchSubjects = async ()=>{
        try{
            setLoading(true)
            const data = await dataService.getSubject()
            setSubject(data)
            setError(null)
        }catch(err:any){
            setError(err.message)
        }finally{
            setLoading(false)
        }
    }
    return {Subject,loading, error,refetch : fetchSubjects}
}
//Assignment
export function useAssignment(){
    const [assignment, setAssignment] = useState<Assignment[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string|null>(null)

    useEffect(() => {
        fetchAssignments()
    },[])

    const fetchAssignments = async ()=>{
        try{
            setLoading(true)
            const data = await dataService.getAssignment()
            setAssignment(data)
            setError(null)
        }catch(err:any){
            setError(err.message)
        }finally{
            setLoading(false)
        }
    }
    return {assignment,loading, error,refetch : fetchAssignments}
}
//Objective
export function useObjective(){
    const [objective, setObjective] = useState<Objective[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string|null>(null)

    useEffect(() => {
        fetchObjectives()
    },[])

    const fetchObjectives = async ()=>{
        try{
            setLoading(true)
            const data = await dataService.getObjective()
            setObjective(Array.isArray(data)?data:[data])
            setError(null)
        }catch(err:any){
            setError(err.message)
        }finally{
            setLoading(false)
        }
    }
    return {objective,loading, error,refetch : fetchObjectives}
}

//Progress
export function useProgress(studentId?:string){
    const [progress, setProgress] = useState<ProgressEntry[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string|null>(null)

    useEffect(() => {
        fetchProgress()
    },[])

    const fetchProgress = async ()=>{
        try{
            setLoading(true)
            const data = studentId
            ? await dataService.getProgressById(studentId)
            : await dataService.getProgress();
            setProgress(Array.isArray(data)?data:[data])
            setError(null)
        }catch(err:any){
            setError(err.message)
        }finally{
            setLoading(false)
        }
    }
    return {progress, loading, error, refetch : fetchProgress}
}
//Score
export function useScore(studentId?: string) {
    const [score, setScore] = useState<Score[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchScore = async () => {
        try {
            setLoading(true);
            
            // ✅ FIX: Assign the RESULT of the API call to 'data'
            // Wrap studentId in an object to satisfy the service's expected parameters
            const data = await dataService.getScoreById({ studentId });
            
            // ✅ FIX: Ensure we are setting state with the API results, not the ID string
            setScore(Array.isArray(data) ? data : [data]);
            
            setError(null);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchScore();
    }, [studentId]); // Refetch if studentId changes

    return { score, loading, error, refetch: fetchScore };
}
//AiInsight
export function useAiInsight(studentId?: string) {
    const [AiInsight, setAiInsight] = useState<AIInsight[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchAiInsight = async () => {
        try {
            setLoading(true);
            
            // ✅ FIX: Assign the RESULT of the API call to 'data'
            // Wrap studentId in an object to satisfy the service's expected parameters
            const data = await dataService.getAIInsights();
            
            // ✅ FIX: Ensure we are setting state with the API results, not the ID string
            setAiInsight(Array.isArray(data) ? data : [data]);
            
            setError(null);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAiInsight();
    }, [studentId]); // Refetch if studentId changes

    return { AiInsight, loading, error, refetch: fetchAiInsight };
}