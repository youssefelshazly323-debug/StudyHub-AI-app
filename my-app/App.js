import React, { useEffect, useState } from "react";
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

const colors = {
  blue: "#2F4EA0",
  purple: "#7561A8",
  ink: "#182033",
  muted: "#657084",
  background: "#F4F6FA",
  border: "#E2E6EF",
  white: "#FFFFFF",
};

const initialTasks = [
  { id: 1, title: "COMS3007: Assignment 2", detail: "Database schema normalisation", due: "Due Friday, 23:59", done: false },
  { id: 2, title: "INF3024S: Microservices prep", detail: "Read Chapter 3 architectural patterns", due: "Due Monday, 14:00", done: false },
  { id: 3, title: "STAT2012: Lab 4 submission", detail: "Linear regression fitting in R", due: "Due today, 17:00", done: true },
];

function Button({ children, onPress, secondary = false }) {
  return (
    <Pressable onPress={onPress} style={[styles.button, secondary && styles.secondaryButton]}>
      <Text style={[styles.buttonText, secondary && styles.secondaryButtonText]}>{children}</Text>
    </Pressable>
  );
}

function Header({ title, onBack }) {
  return (
    <View style={styles.header}>
      {onBack ? <Pressable onPress={onBack}><Text style={styles.back}>Back</Text></Pressable> : <View />}
      <Text style={styles.headerTitle}>{title}</Text>
      <View style={{ width: 40 }} />
    </View>
  );
}

function Splash({ onDone }) {
  useEffect(() => {
    const timer = setTimeout(onDone, 2000);
    return () => clearTimeout(timer);
  }, [onDone]);
  return (
    <View style={styles.splash}>
      <View style={styles.splashCenter}>
        <View style={styles.splashMark}>
          <View style={styles.splashBookLeft} />
          <View style={styles.splashBookRight} />
          <Text style={styles.splashSpark}>✦</Text>
        </View>
        <Text style={styles.logo}>StudyHub AI</Text>
        <Text style={styles.splashText}>Study smarter, not harder</Text>
      </View>
      <View style={styles.splashBottom}>
        <View style={styles.splashDots}><View style={styles.splashDotActive} /><View style={styles.splashDot} /><View style={styles.splashDot} /></View>
        <Text style={styles.splashVersion}>Version 2.4.0 (Wits &amp; UCT edition)</Text>
      </View>
    </View>
  );
}

function Onboarding({ onDone }) {
  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.brand}>Step 1 of 3</Text>
        <View style={styles.upload}>
          <Text style={styles.logoSmall}>StudyHub AI</Text>
          <Text style={styles.cardTitle}>Upload your course material</Text>
          <Text style={styles.muted}>Add Wits COMS, UCT INF, or UP engineering slides and textbooks to study from one place.</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Summarise and organise</Text>
          <Text style={styles.muted}>Create high-yield summaries, manage tasks, and keep your class timetable together.</Text>
        </View>
        <Button onPress={onDone}>Continue to sign in</Button>
        <Pressable onPress={onDone} style={styles.skip}><Text style={styles.muted}>Skip onboarding</Text></Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

function Auth({ onDone }) {
  const [activeTab, setActiveTab] = useState("Log In");
  const [showPassword, setShowPassword] = useState(false);
  return (
    <SafeAreaView style={styles.authScreen}>
      <ScrollView contentContainerStyle={styles.authContent} keyboardShouldPersistTaps="handled">
        <View style={styles.authMark}>
          <View style={styles.authBookLeft} />
          <View style={styles.authBookRight} />
          <Text style={styles.authSpark}>✦</Text>
        </View>
        <Text style={styles.authTitle}>Welcome to StudyHub</Text>
        <Text style={styles.authSubtitle}>Access AI summaries tailored for South African{`\n`}campus modules.</Text>
        <View style={styles.authTabs}>
          {['Log In', 'Create Account'].map((tab) => (
            <Pressable key={tab} onPress={() => setActiveTab(tab)} style={styles.authTab}>
              <Text style={[styles.authTabText, activeTab === tab && styles.authTabActive]}>{tab}</Text>
              <View style={[styles.authTabLine, activeTab === tab && styles.authTabLineActive]} />
            </Pressable>
          ))}
        </View>
        <View style={styles.authForm}>
          <Text style={styles.authLabel}>Student Email (.ac.za)</Text>
          <TextInput style={styles.authInput} keyboardType="email-address" autoCapitalize="none" defaultValue="thabo.mokoena@students.wits.ac.za" />
          <View style={styles.authLabelRow}><Text style={styles.authLabel}>Password</Text><Pressable><Text style={styles.forgot}>Forgot?</Text></Pressable></View>
          <View style={styles.passwordInput}>
            <TextInput style={styles.passwordTextInput} secureTextEntry={!showPassword} defaultValue="password1234" />
            <Pressable onPress={() => setShowPassword(!showPassword)} style={styles.eyeButton}><Text style={styles.eye}>{showPassword ? '◉' : '◌'}</Text></Pressable>
          </View>
          <Pressable onPress={onDone} style={styles.signInButton}><Text style={styles.signInText}>{activeTab === 'Log In' ? 'Sign In' : 'Create Account'}</Text></Pressable>
          <View style={styles.divider}><View style={styles.dividerLine} /><Text style={styles.dividerText}>OR CONTINUE WITH</Text><View style={styles.dividerLine} /></View>
          <View style={styles.socialRow}><Pressable onPress={onDone} style={styles.socialButton}><Text style={styles.googleIcon}>⌕</Text><Text style={styles.socialText}>Google</Text></Pressable><Pressable onPress={onDone} style={styles.socialButton}><Text style={styles.appleIcon}>●</Text><Text style={styles.socialText}>Apple</Text></Pressable></View>
        </View>
        <Text style={styles.authFooter}>Don't have a student account? <Text style={styles.signUp} onPress={() => setActiveTab('Create Account')}>Sign up here</Text></Text>
      </ScrollView>
    </SafeAreaView>
  );
}

function Home({ navigate }) {
  return (
    <ScrollView contentContainerStyle={styles.content}>
      <View style={styles.row}><View><Text style={styles.title}>Hello, Thabo!</Text><Text style={styles.muted}>Wits University | COMS</Text></View><Pressable onPress={() => navigate("Profile")} style={styles.avatar}><Text style={styles.avatarText}>TM</Text></Pressable></View>
      <View style={styles.hero}><Text style={styles.heroTitle}>Fast AI exam prep</Text><Text style={styles.heroText}>Upload lecture PDFs, slides, or research chapters for summaries and quiz generators.</Text><Button onPress={() => navigate("Upload")}>Upload document</Button></View>
      <Text style={styles.sectionTitle}>Recent AI summaries</Text>
      <Pressable style={styles.card} onPress={() => navigate("Summary")}><Text style={styles.cardTitle}>COMS3007 Exam Prep Summary</Text><Text style={styles.muted}>AI generated | 2 hours ago</Text></Pressable>
      <Pressable style={styles.card} onPress={() => navigate("Files")}><Text style={styles.cardTitle}>INF3024 Software Engineering</Text><Text style={styles.muted}>User uploaded | Yesterday</Text></Pressable>
    </ScrollView>
  );
}

function Files({ navigate }) {
  return <ScrollView contentContainerStyle={styles.content}><Header title="Your library" /><TextInput style={styles.input} placeholder="Search PDFs, summaries, or modules..." /><Text style={styles.sectionTitle}>Files</Text>{["Database Normalisation Notes.pdf", "AI Summary COMS3007 Lecture 10.pdf", "UCT Software Architecture.pdf"].map((file) => <Pressable key={file} style={styles.card} onPress={() => navigate("Summary")}><Text style={styles.cardTitle}>{file}</Text><Text style={styles.muted}>PDF | Available offline</Text></Pressable>)}<Button onPress={() => navigate("Upload")}>Upload document</Button></ScrollView>;
}

function Tasks({ tasks, setTasks, navigate }) {
  return <ScrollView contentContainerStyle={styles.content}><Header title="Your tasks" /><Button onPress={() => navigate("TaskEditor")}>Add task</Button>{tasks.map((task) => <Pressable key={task.id} style={[styles.card, task.done && styles.completed]} onPress={() => setTasks(tasks.map((item) => item.id === task.id ? { ...item, done: !item.done } : item))}><Text style={[styles.cardTitle, task.done && styles.struck]}>{task.done ? "[Done] " : "[ ] "}{task.title}</Text><Text style={styles.muted}>{task.detail}</Text><Text style={styles.due}>{task.due}</Text></Pressable>)}</ScrollView>;
}

function SimplePage({ title, children, navigate }) {
  return <ScrollView contentContainerStyle={styles.content}><Header title={title} onBack={() => navigate("Home")} />{children}</ScrollView>;
}

export default function App() {
  const [screen, setScreen] = useState("Splash");
  const [tasks, setTasks] = useState(initialTasks);
  const navigate = (next) => setScreen(next);
  if (screen === "Splash") return <Splash onDone={() => navigate("Onboarding")} />;
  if (screen === "Onboarding") return <Onboarding onDone={() => navigate("Auth")} />;
  if (screen === "Auth") return <Auth onDone={() => navigate("Home")} />;
  const content = {
    Home: <Home navigate={navigate} />,
    Files: <Files navigate={navigate} />,
    Tasks: <Tasks tasks={tasks} setTasks={setTasks} navigate={navigate} />,
    Schedule: <SimplePage title="Class timetable" navigate={navigate}><Text style={styles.muted}>Week 6 | 16 - 20 February</Text>{["08:00  COMS3007 | Databases lecture", "10:00  INF3024S | Microservices and cloud", "12:00  STAT2012 | Statistical inference"].map((item) => <View key={item} style={styles.card}><Text style={styles.cardTitle}>{item}</Text></View>)}</SimplePage>,
    Chat: <SimplePage title="StudyHub AI assistant" navigate={navigate}><Text style={styles.card}>Ask questions about your uploaded PDFs. AI answers are currently demo responses.</Text><TextInput style={styles.input} placeholder="Ask StudyHub AI anything..." /></SimplePage>,
    Upload: <SimplePage title="Upload document" navigate={navigate}><View style={styles.upload}><Text style={styles.cardTitle}>Select a PDF, DOCX, or PPT</Text><Text style={styles.muted}>Maximum file size: 25 MB</Text></View><Button onPress={() => navigate("Summary")}>Generate AI summary</Button></SimplePage>,
    Summary: <SimplePage title="AI summary" navigate={navigate}><View style={styles.card}><Text style={styles.cardTitle}>High-yield concepts</Text><Text style={styles.body}>3NF removes transitive dependencies. BCNF is stricter because every determinant must be a superkey. Lossless joins reconstruct the original relation without spurious tuples.</Text></View></SimplePage>,
    Profile: <SimplePage title="Profile" navigate={navigate}><View style={styles.card}><Text style={styles.cardTitle}>Thabo Mokoena</Text><Text style={styles.muted}>thabo.mokoena@students.wits.ac.za</Text><Text style={styles.muted}>Wits University, South Africa</Text></View><Button onPress={() => navigate("Auth")} secondary>Sign out</Button></SimplePage>,
    TaskEditor: <SimplePage title="Create task" navigate={navigate}><TextInput style={styles.input} placeholder="Task title" /><TextInput style={styles.input} placeholder="Due date" /><Button onPress={() => { setTasks([{ id: Date.now(), title: "New study task", detail: "Added from StudyHub", due: "Due soon", done: false }, ...tasks]); navigate("Tasks"); }}>Save task</Button></SimplePage>,
  }[screen] || <Home navigate={navigate} />;
  return <SafeAreaView style={styles.screen}><View style={styles.main}>{content}</View><View style={styles.nav}>{["Home", "Files", "Tasks", "Schedule", "Chat"].map((item) => <Pressable key={item} onPress={() => navigate(item)}><Text style={[styles.navText, screen === item && styles.activeNav]}>{item}</Text></Pressable>)}</View></SafeAreaView>;
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background }, authScreen: { flex: 1, backgroundColor: "#F5F6FA" }, main: { flex: 1 }, content: { padding: 18, paddingBottom: 30 }, authContent: { flexGrow: 1, paddingHorizontal: 24, paddingTop: 58, paddingBottom: 26 }, splash: { flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "#3565B1" }, splashCenter: { alignItems: "center", marginTop: -25 }, splashMark: { width: 60, height: 55, marginBottom: 28, position: "relative" }, splashBookLeft: { position: "absolute", left: 8, top: 8, width: 24, height: 39, borderWidth: 2, borderColor: colors.white, borderTopLeftRadius: 3, borderBottomLeftRadius: 3 }, splashBookRight: { position: "absolute", left: 30, top: 8, width: 24, height: 39, borderWidth: 2, borderColor: colors.white, borderTopRightRadius: 3, borderBottomRightRadius: 3 }, splashSpark: { position: "absolute", left: 20, top: -5, color: "#C6B3E8", fontSize: 32, fontWeight: "800" }, logo: { color: colors.white, fontSize: 32, fontWeight: "800" }, logoSmall: { color: colors.blue, fontSize: 24, fontWeight: "800", marginBottom: 20 }, splashText: { color: "#E5ECFF", marginTop: 10, fontSize: 16 }, splashBottom: { position: "absolute", bottom: 34, alignItems: "center" }, splashDots: { flexDirection: "row", alignItems: "center", marginBottom: 15 }, splashDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: "#8BA9DC", marginHorizontal: 3 }, splashDotActive: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.white, marginHorizontal: 3 }, splashVersion: { color: "#B8C9E8", fontSize: 12 }, brand: { color: colors.blue, fontWeight: "800", fontSize: 18, marginBottom: 35 }, title: { color: colors.ink, fontSize: 26, fontWeight: "800", marginBottom: 8 }, authMark: { width: 34, height: 31, marginBottom: 25, position: "relative" }, authBookLeft: { position: "absolute", left: 5, top: 5, width: 14, height: 22, borderWidth: 2, borderColor: colors.blue, borderTopLeftRadius: 2, borderBottomLeftRadius: 2 }, authBookRight: { position: "absolute", left: 18, top: 5, width: 14, height: 22, borderWidth: 2, borderColor: colors.blue, borderTopRightRadius: 2, borderBottomRightRadius: 2 }, authSpark: { position: "absolute", left: 10, top: -5, color: colors.purple, fontSize: 21, fontWeight: "800" }, authTitle: { color: "#202124", fontSize: 25, lineHeight: 31, fontWeight: "800", marginBottom: 5 }, authSubtitle: { color: colors.muted, fontSize: 15, lineHeight: 20, marginBottom: 18 }, authTabs: { flexDirection: "row", alignItems: "flex-end", gap: 17 }, authTab: { paddingTop: 1 }, authTabText: { color: colors.muted, fontSize: 16, fontWeight: "700", paddingBottom: 8 }, authTabActive: { color: colors.blue }, authTabLine: { height: 2, backgroundColor: "transparent" }, authTabLineActive: { backgroundColor: colors.blue }, authForm: { marginTop: 105 }, authLabelRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" }, authLabel: { color: "#5F6876", fontSize: 12, fontWeight: "700", marginBottom: 7 }, forgot: { color: colors.blue, fontSize: 12, fontWeight: "800", marginBottom: 7 }, authInput: { height: 44, backgroundColor: colors.white, borderColor: colors.border, borderWidth: 1, borderRadius: 12, paddingHorizontal: 15, color: "#252A32", fontSize: 14, marginBottom: 14 }, passwordInput: { height: 44, backgroundColor: colors.white, borderColor: colors.border, borderWidth: 1, borderRadius: 12, flexDirection: "row", alignItems: "center", paddingLeft: 15, marginBottom: 14 }, passwordTextInput: { flex: 1, color: "#252A32", fontSize: 14 }, eyeButton: { width: 42, height: 42, alignItems: "center", justifyContent: "center" }, eye: { color: colors.muted, fontSize: 21, fontWeight: "700" }, signInButton: { height: 46, borderRadius: 24, backgroundColor: "#3565B1", alignItems: "center", justifyContent: "center", marginTop: 1 }, signInText: { color: colors.white, fontSize: 15, fontWeight: "800" }, divider: { flexDirection: "row", alignItems: "center", marginVertical: 18 }, dividerLine: { height: 1, backgroundColor: "#E4E7EC", flex: 1 }, dividerText: { color: "#8A93A1", fontSize: 12, fontWeight: "700", marginHorizontal: 12 }, socialRow: { flexDirection: "row", gap: 12 }, socialButton: { height: 44, borderRadius: 11, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.white, flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8 }, socialText: { color: "#272B32", fontSize: 14, fontWeight: "700" }, googleIcon: { color: "#5C6876", fontSize: 25, lineHeight: 20 }, appleIcon: { color: "#20242A", fontSize: 16 }, authFooter: { color: colors.muted, textAlign: "center", fontSize: 13, marginTop: "auto", paddingTop: 40 }, signUp: { color: colors.blue, fontWeight: "800" }, header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }, headerTitle: { color: colors.ink, fontSize: 22, fontWeight: "800" }, back: { color: colors.blue, width: 40 }, row: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 22 }, hero: { backgroundColor: colors.blue, borderRadius: 16, padding: 18, marginBottom: 24 }, heroTitle: { color: colors.white, fontSize: 22, fontWeight: "800" }, heroText: { color: "#E5ECFF", lineHeight: 21, marginVertical: 10 }, sectionTitle: { color: colors.ink, fontSize: 18, fontWeight: "800", marginBottom: 10 }, card: { backgroundColor: colors.white, borderRadius: 14, padding: 16, marginBottom: 12, borderWidth: 1, borderColor: colors.border }, cardTitle: { color: colors.ink, fontWeight: "800", fontSize: 16, marginBottom: 5 }, body: { color: colors.ink, lineHeight: 23 }, muted: { color: colors.muted, lineHeight: 20 }, due: { color: "#C53C3C", fontWeight: "700", marginTop: 8 }, input: { backgroundColor: colors.white, borderColor: colors.border, borderWidth: 1, borderRadius: 12, padding: 14, marginBottom: 14 }, button: { backgroundColor: colors.blue, borderRadius: 12, padding: 14, alignItems: "center", marginTop: 8 }, buttonText: { color: colors.white, fontWeight: "800" }, secondaryButton: { backgroundColor: colors.white, borderWidth: 1, borderColor: colors.blue }, secondaryButtonText: { color: colors.blue }, avatar: { backgroundColor: colors.purple, width: 44, height: 44, borderRadius: 22, alignItems: "center", justifyContent: "center" }, avatarText: { color: colors.white, fontWeight: "800" }, label: { color: colors.ink, fontWeight: "700", marginBottom: 6, marginTop: 18 }, upload: { borderWidth: 2, borderStyle: "dashed", borderColor: colors.blue, borderRadius: 14, padding: 45, alignItems: "center", backgroundColor: colors.white, marginBottom: 16 }, skip: { alignItems: "center", padding: 16 }, completed: { opacity: 0.55 }, struck: { textDecorationLine: "line-through" }, nav: { flexDirection: "row", justifyContent: "space-around", paddingVertical: 12, backgroundColor: colors.white, borderTopWidth: 1, borderTopColor: colors.border }, navText: { color: colors.muted, fontSize: 12, fontWeight: "700" }, activeNav: { color: colors.blue },
});

