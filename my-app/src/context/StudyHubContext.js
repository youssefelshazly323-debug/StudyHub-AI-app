import React, { createContext, useContext, useMemo, useState } from "react";

const initialTasks = [
  {
    id: 1,
    module: "COMS3007",
    title: "COMS3007: Assignment 2",
    detail: "Database Schema Normalisation",
    due: "Due Friday, 23:59",
    priority: "HIGH PRIORITY",
    done: false,
  },
  {
    id: 2,
    module: "INF3024S",
    title: "INF3024S: Microservices Prep",
    detail: "Read Chapter 3 Architectural Patterns",
    due: "Due Monday, 14:00",
    priority: "MEDIUM PRIORITY",
    done: false,
  },
  {
    id: 3,
    module: "STAT2012",
    title: "STAT2012: Lab 4 Submission",
    detail: "Linear Regression fitting in R",
    due: "Due Today, 17:00",
    priority: "HIGH PRIORITY",
    done: true,
  },
  {
    id: 4,
    module: "COMS3007",
    title: "COMS3007: Quiz 3 Revision",
    detail: "Complete practice questions on portal",
    due: "Due Yesterday",
    priority: "LOW PRIORITY",
    done: true,
  },
];

const initialFiles = [
  {
    id: "database-notes",
    module: "COMS3007",
    name: "Database_Normalization_Notes.pdf",
    size: "4.2 MB",
    date: "Added 2 days ago",
    summary: false,
  },
  {
    id: "database-summary",
    module: "AI SUMMARY",
    name: "AI_Summary_COMS3007_Lecture10.pdf",
    size: "1.1 MB",
    date: "Generated 4 hours ago",
    summary: true,
  },
  {
    id: "software-architecture",
    module: "INF3024S",
    name: "UCT_Software_Architecture_Pres.pdf",
    size: "8.7 MB",
    date: "Added 1 week ago",
    summary: false,
  },
];

const initialSchedule = [
  {
    id: "monday-databases",
    day: 0,
    start: "08:00",
    end: "09:30",
    module: "COMS3007",
    title: "Databases lecture",
    room: "MSB 101",
  },
  {
    id: "monday-statistics",
    day: 0,
    start: "12:00",
    end: "13:30",
    module: "STAT2012",
    title: "Statistical Inference",
    room: "Senate House 3",
  },
  {
    id: "tuesday-microservices",
    day: 1,
    start: "10:00",
    end: "11:30",
    module: "INF3024S",
    title: "Microservices & Cloud",
    room: "Net Lab 2",
  },
  {
    id: "wednesday-statistics",
    day: 2,
    start: "12:00",
    end: "13:30",
    module: "STAT2012",
    title: "Statistical Inference",
    room: "Senate House 3",
  },
  {
    id: "thursday-databases",
    day: 3,
    start: "08:00",
    end: "09:30",
    module: "COMS3007",
    title: "Databases lecture",
    room: "MSB 101",
  },
  {
    id: "thursday-microservices",
    day: 3,
    start: "10:00",
    end: "11:30",
    module: "INF3024S",
    title: "Microservices & Cloud",
    room: "Net Lab 2",
  },
  {
    id: "thursday-lab",
    day: 3,
    start: "14:30",
    end: "16:00",
    module: "COMS3007",
    title: "Tutorial & Lab session",
    room: "Chamber of Mines Lab",
  },
  {
    id: "friday-statistics",
    day: 4,
    start: "09:00",
    end: "10:30",
    module: "STAT2012",
    title: "Statistics tutorial",
    room: "Senate House 3",
  },
];

const StudyHubContext = createContext(null);

export function StudyHubProvider({ children }) {
  const [tasks, setTasks] = useState(initialTasks);
  const [files, setFiles] = useState(initialFiles);
  const [schedule, setSchedule] = useState(initialSchedule);
  const [selectedFile, setSelectedFile] = useState(null);

  const value = useMemo(
    () => ({
      tasks,
      setTasks,
      files,
      setFiles,
      schedule,
      setSchedule,
      selectedFile,
      setSelectedFile,
    }),
    [tasks, files, schedule, selectedFile],
  );

  return (
    <StudyHubContext.Provider value={value}>
      {children}
    </StudyHubContext.Provider>
  );
}

export function useStudyHub() {
  const context = useContext(StudyHubContext);

  if (!context) {
    throw new Error("useStudyHub must be used inside StudyHubProvider.");
  }

  return context;
}
