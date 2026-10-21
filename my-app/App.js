import React, { useEffect, useState } from "react";
import * as DocumentPicker from "expo-document-picker";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

const C = {
  blue: "#3060AA",
  purple: "#9079C7",
  ink: "#20232A",
  muted: "#697482",
  bg: "#F3F5FA",
  border: "#E2E6EE",
  white: "#FFFFFF",
  red: "#F04444",
  green: "#62A36C",
};
function Mark({ small = false, light = false }) {
  return (
    <View style={[styles.mark, small && styles.markSmall]}>
      <View style={[styles.book, small && styles.bookSmall, light && styles.bookLight]}>
        <View style={[styles.bookSpine, light && styles.bookSpineLight]} />
      </View>
      <Text style={[styles.spark, small && styles.sparkSmall]}>✦</Text>
    </View>
  );
}
function Icon({ type }) {
  const glyphs = {
    home: "⌂",
    files: "▱",
    tasks: "☷",
    schedule: "▦",
    chat: "◯",
    back: "←",
    arrow: ">",
    plus: "+",
    search: "⌕",
    upload: "↑",
    bolt: "✦",
    eye: "◉",
    sliders: "≡",
  };
  return (
    <Text style={[styles.icon, type === "back" && styles.backIcon]}>
      {glyphs[type] || "•"}
    </Text>
  );
}
function Button({
  children,
  onPress,
  secondary = false,
  purple = false,
  style,
}) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={[
        styles.button,
        secondary && styles.secondaryButton,
        purple && styles.purpleButton,
        style,
      ]}
    >
      <Text
        style={[styles.buttonText, secondary && styles.secondaryButtonText]}
      >
        {children}
      </Text>
    </Pressable>
  );
}
function AppTabBar({ navigate, active }) {
  const tabs = [
    ["Home", "⌂"],
    ["Files", "▱"],
    ["Tasks", "☷"],
    ["Schedule", "▦"],
    ["Chat", "◯"],
  ];

  return (
    <View style={styles.manualTabBar}>
      {tabs.map(([label, glyph]) => {
        const selected = label === active;
        return (
          <Pressable
            key={label}
            accessibilityRole="button"
            accessibilityState={{ selected }}
            onPress={() => navigate(label)}
            style={styles.manualTab}
          >
            <Text
              style={[
                styles.manualTabIcon,
                selected && styles.manualTabActive,
              ]}
            >
              {glyph}
            </Text>
            <Text
              style={[
                styles.manualTabLabel,
                selected && styles.manualTabActive,
              ]}
            >
              {label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
function Top({ title, onBack, right }) {
  return (
    <View style={styles.top}>
      {onBack ? (
        <Pressable onPress={onBack} hitSlop={12} style={styles.topBack}>
          <Icon type="back" />
        </Pressable>
      ) : null}
      <Text style={styles.topTitle} numberOfLines={1}>
        {title}
      </Text>
      <View style={styles.topRight}>{right}</View>
    </View>
  );
}
function Splash({ onDone }) {
  useEffect(() => {
    const timer = setTimeout(onDone, 1800);
    return () => clearTimeout(timer);
  }, [onDone]);
  return (
    <View style={styles.splash}>
      <StatusBar style="light" />
      <View style={styles.splashCenter}>
        <Mark />
        <Text style={styles.splashLogo}>StudyHub AI</Text>
        <Text style={styles.splashText}>Study smarter, not harder</Text>
      </View>
      <View style={styles.splashBottom}>
        <View style={styles.dots}>
          <View style={styles.dotOn} />
          <View style={styles.dot} />
          <View style={styles.dot} />
        </View>
        <Text style={styles.version}>Version 2.4.0 (Wits & UCT edition)</Text>
      </View>
    </View>
  );
}
function Onboarding({ onDone }) {
  const [step, setStep] = useState(0);
  const slides = [
    {
      title: "Upload",
      copy: "Drop your Wits COMS, UCT INF slides, or UP engineering PDF textbooks straight into the AI engine.",
      glyph: "⇧",
    },
    {
      title: "Summarize",
      copy: "Get high-yield summaries, key concepts, and instant flashcards from your course material.",
      glyph: "✦",
    },
    {
      title: "Stay organized",
      copy: "Keep track of assignments, deadlines, and your weekly class timetable.",
      glyph: "☷",
    },
  ];

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.onboardTop}>
        <Text style={styles.step}>
          Step {step + 1} of {slides.length}
        </Text>
        <Pressable onPress={onDone} style={styles.skipPill}>
          <Text style={styles.skipText}>Skip</Text>
        </Pressable>
      </View>
      <View style={styles.onboardPage}>
        <View style={styles.onboardCards}>
          {slides.slice(step, step + 2).map((slide, index) => (
            <Pressable
              key={slide.title}
              onPress={() => index > 0 && setStep(step + index)}
              style={[
                styles.onboardCard,
                index > 0 && styles.fadedCard,
              ]}
            >
              <View style={styles.onboardArt}>
                <Text style={styles.uploadGlyph}>{slide.glyph}</Text>
              </View>
              <Text style={styles.onboardTitle}>{slide.title}</Text>
              <Text style={styles.onboardCopy}>{slide.copy}</Text>
            </Pressable>
          ))}
        </View>
      </View>
      <View style={styles.pageDots}>
        {slides.map((slide, index) => (
          <View
            key={slide.title}
            style={index === step ? styles.pageDotOn : styles.pageDot}
          />
        ))}
      </View>
      <View style={styles.onboardActions}>
        {step > 0 && (
          <Button
            secondary
            style={styles.flexButton}
            onPress={() => setStep(step - 1)}
          >
            Back
          </Button>
        )}
        <Button
          style={styles.flexButton}
          onPress={() =>
            step === slides.length - 1 ? onDone() : setStep(step + 1)
          }
        >
          {step === slides.length - 1 ? "Get started" : "Continue"}
        </Button>
      </View>
    </SafeAreaView>
  );
}
function Auth({ onDone }) {
  const [active, setActive] = useState("Log In");
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("thabo.mokoena@students.wits.ac.za");
  const [password, setPassword] = useState("studyhubdemo");
  const [error, setError] = useState("");

  const submit = () => {
    if (!/^[^\s@]+@[^\s@]+\.ac\.za$/i.test(email.trim())) {
      setError("Enter a valid university email address ending in .ac.za.");
      return;
    }
    if (password.length < 8) {
      setError("Your password must be at least 8 characters.");
      return;
    }

    setError("");
    onDone();
  };

  return (
    <SafeAreaView style={styles.auth}>
      <ScrollView contentContainerStyle={styles.authContent}>
        <Mark small light />
        <Text style={styles.authTitle}>Welcome to StudyHub</Text>
        <Text style={styles.authSubtitle}>
          Access AI summaries tailored for South African campus modules.
        </Text>
        <View style={styles.authTabs}>
          {["Log In", "Create Account"].map((tab) => (
            <Pressable key={tab} onPress={() => setActive(tab)}>
              <Text
                style={[styles.authTab, active === tab && styles.authTabOn]}
              >
                {tab}
              </Text>
              <View
                style={[styles.tabLine, active === tab && styles.tabLineOn]}
              />
            </Pressable>
          ))}
        </View>
        <View style={styles.authForm}>
          <Text style={styles.label}>Student Email (.ac.za)</Text>
          <TextInput
            style={styles.field}
            value={email}
            onChangeText={(value) => {
              setEmail(value);
              setError("");
            }}
            placeholder="name@students.wits.ac.za"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            textContentType="emailAddress"
          />
          <View style={styles.labelRow}>
            <Text style={styles.label}>Password</Text>
            <Text
              style={styles.forgot}
              onPress={() =>
                setError("Password reset is not connected in this prototype.")
              }
            >
              Forgot?
            </Text>
          </View>
          <View style={styles.password}>
            <TextInput
              style={styles.passwordInput}
              value={password}
              onChangeText={(value) => {
                setPassword(value);
                setError("");
              }}
              placeholder="Enter your password"
              secureTextEntry={!show}
              textContentType={active === "Log In" ? "password" : "newPassword"}
            />
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={show ? "Hide password" : "Show password"}
              onPress={() => setShow(!show)}
            >
              <Icon type="eye" />
            </Pressable>
          </View>
          {!!error && <Text style={styles.formError}>{error}</Text>}
          <Pressable
            accessibilityRole="button"
            onPress={submit}
            style={styles.signIn}
          >
            <Text style={styles.signInText}>
              {active === "Log In" ? "Sign In" : "Create Account"}
            </Text>
          </Pressable>
          <View style={styles.or}>
            <View style={styles.orLine} />
            <Text style={styles.orText}>OR CONTINUE WITH</Text>
            <View style={styles.orLine} />
          </View>
          <View style={styles.socialRow}>
            <Pressable
              style={styles.social}
              onPress={() => setError("Google sign-in is not connected yet.")}
            >
              <Text style={styles.socialIcon}>○</Text>
              <Text style={styles.socialText}>Google</Text>
            </Pressable>
            <Pressable
              style={styles.social}
              onPress={() => setError("Apple sign-in is not connected yet.")}
            >
              <Text style={styles.socialIcon}>●</Text>
              <Text style={styles.socialText}>Apple</Text>
            </Pressable>
          </View>
        </View>
        <Text style={styles.authFooter}>
          Don't have a student account?{" "}
          <Text
            style={styles.forgot}
            onPress={() => setActive("Create Account")}
          >
            Sign up here
          </Text>
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}
function Home({ navigate }) {
  return (
    <View style={styles.screen}>
      <ScrollView style={styles.flex} contentContainerStyle={styles.content}>
      <View style={styles.homeTop}>
        <View style={styles.homeBrand}>
          <Mark small light />
          <View>
            <Text style={styles.hello}>Halo, Thabo!</Text>
            <Text style={styles.muted}>Wits University • COMS</Text>
          </View>
        </View>
        <Pressable onPress={() => navigate("Profile")} style={styles.avatar}>
          <Text style={styles.avatarText}>TM</Text>
        </Pressable>
      </View>
      <View style={styles.hero}>
        <Text style={styles.heroTitle}>Fast AI Exam Prep</Text>
        <Text style={styles.heroCopy}>
          Upload lecture PDFs, slides or research chapters{`\n`}for lightning
          summaries & quiz generators.
        </Text>
        <Pressable onPress={() => navigate("Upload")} style={styles.heroButton}>
          <Text style={styles.heroButtonIcon}>↑</Text>
          <Text style={styles.heroButtonText}>Upload PDF</Text>
        </Pressable>
      </View>
      <View style={styles.quickRow}>
        <View style={styles.quickCard}>
          <View style={styles.quickIcon}>
            <Text>▣</Text>
          </View>
          <Text style={styles.quickModule}>COMS3007</Text>
          <Text style={styles.quickTitle}>Databases Lecture</Text>
          <Text style={styles.muted}>10:00 • MSB 101</Text>
        </View>
        <View style={styles.quickCard}>
          <View style={[styles.quickIcon, styles.purpleTint]}>
            <Text style={{ color: C.purple }}>☷</Text>
          </View>
          <Text style={[styles.quickModule, { color: C.purple }]}>
            Due Soon
          </Text>
          <Text style={styles.quickTitle}>Assignment 2</Text>
          <Text style={styles.due}>Due Friday, 23:59</Text>
        </View>
      </View>
      <View style={styles.sectionRow}>
        <Text style={styles.sectionTitle}>Recent AI Summaries</Text>
        <Text style={styles.seeAll} onPress={() => navigate("Files")}>
          See All
        </Text>
      </View>
      <Pressable onPress={() => navigate("Summary")} style={styles.summaryRow}>
        <View style={styles.summaryIcon}>
          <Icon type="bolt" />
        </View>
        <View>
          <Text style={styles.rowTitle}>COMS3007_Exam_Prep_Summary.pdf</Text>
          <Text style={styles.muted}>AI generated • 2 hours ago</Text>
        </View>
      </Pressable>
      <Pressable onPress={() => navigate("Files")} style={styles.summaryRow}>
        <View style={styles.folderIcon}>
          <Text>▱</Text>
        </View>
        <View>
          <Text style={styles.rowTitle}>
            INF3024_Software_Engineering_Week...
          </Text>
          <Text style={styles.muted}>User uploaded • Yesterday</Text>
        </View>
      </Pressable>
      </ScrollView>
    </View>
  );
}
function Files({ files, setSelectedFile, navigate }) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All PDFs");
  const filters = [
    "All PDFs",
    ...new Set(
      files
        .map((file) => file.module)
        .filter((module) => !["AI SUMMARY", "NEW UPLOAD"].includes(module)),
    ),
  ];
  const visibleFiles = files.filter((file) => {
    const matchesFilter = filter === "All PDFs" || file.module === filter;
    const matchesQuery = `${file.name} ${file.module}`
      .toLowerCase()
      .includes(query.trim().toLowerCase());
    return matchesFilter && matchesQuery;
  });

  return (
    <View style={styles.screen}>
      <ScrollView style={styles.flex} contentContainerStyle={styles.content}>
      <Top
        title="Your Library"
        right={
          <Pressable
            onPress={() => {
              setQuery("");
              setFilter("All PDFs");
            }}
            style={styles.circleButton}
            accessibilityRole="button"
            accessibilityLabel="Clear library filters"
          >
            <Icon type="sliders" />
          </Pressable>
        }
      />
      <View style={styles.search}>
        <Icon type="search" />
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Search PDFs, summaries, or modules..."
          placeholderTextColor="#8B96A5"
          style={styles.searchInput}
        />
      </View>
      <View style={styles.chips}>
        {filters.map((item) => (
          <Pressable key={item} onPress={() => setFilter(item)}>
            <Text style={filter === item ? styles.chipOn : styles.chip}>
              {item}
            </Text>
          </Pressable>
        ))}
      </View>
      {visibleFiles.map((file) => (
        <Pressable
          key={file.id}
          onPress={() => {
            setSelectedFile(file);
            navigate("Summary");
          }}
          style={[styles.fileCard, file.summary && styles.fileSelected]}
        >
          <View style={styles.fileMeta}>
            <Text style={[styles.moduleTag, file.summary && styles.purpleTag]}>
              {file.module}
            </Text>
            <Text style={styles.fileSize}>{file.size} • PDF</Text>
          </View>
          <Text style={styles.fileName}>{file.name}</Text>
          <Text style={styles.muted}>{file.date}</Text>
        </Pressable>
      ))}
      {visibleFiles.length === 0 && (
        <View style={styles.emptyState}>
          <Text style={styles.emptyTitle}>No documents found</Text>
          <Text style={styles.muted}>
            Try a different search or upload a file.
          </Text>
        </View>
      )}
    </ScrollView>
      <Pressable
        onPress={() => navigate("Upload")}
        style={[styles.fab, styles.filesFab]}
      >
        <Icon type="plus" />
      </Pressable>
    </View>
  );
}
function Tasks({ tasks, setTasks, navigate }) {
  const [filter, setFilter] = useState("All");
  const completeCount = tasks.filter((task) => task.done).length;
  const visibleTasks = tasks.filter((task) => {
    if (filter === "Pending") return !task.done;
    if (filter === "Completed") return task.done;
    return true;
  });

  return (
    <View style={styles.screen}>
    <ScrollView style={styles.flex} contentContainerStyle={styles.content}>
      <Top
        title="Your Tasks"
        right={
          <Text style={styles.donePill}>
            {completeCount}/{tasks.length} Done
          </Text>
        }
      />
      <View style={styles.chips}>
        {["All", "Pending", "Completed"].map((item) => (
          <Pressable key={item} onPress={() => setFilter(item)}>
            <Text style={filter === item ? styles.chipOn : styles.chip}>
              {item}
            </Text>
          </Pressable>
        ))}
      </View>
      {visibleTasks.map((task) => (
        <Pressable
          key={task.id}
          onPress={() =>
            setTasks(
              tasks.map((item) =>
                item.id === task.id ? { ...item, done: !item.done } : item,
              ),
            )
          }
          style={[styles.taskCard, task.done && styles.taskDone]}
        >
          <View style={[styles.checkbox, task.done && styles.checkboxDone]}>
            {task.done && <Text style={styles.check}>✓</Text>}
          </View>
          <View style={styles.taskBody}>
            <View style={styles.taskLine}>
              <Text style={styles.moduleTag}>{task.module}</Text>
              <Text
                style={[
                  styles.priority,
                  task.priority === "MEDIUM PRIORITY" && styles.medium,
                  task.priority === "LOW PRIORITY" && styles.low,
                ]}
              >
                {task.priority}
              </Text>
            </View>
            <Text style={[styles.taskTitle, task.done && styles.struck]}>
              {task.title}
            </Text>
            <Text style={styles.muted}>{task.detail}</Text>
            <Text style={[styles.due, task.done && styles.muted]}>
              {task.due}
            </Text>
          </View>
        </Pressable>
      ))}
      {visibleTasks.length === 0 && (
        <View style={styles.emptyState}>
          <Text style={styles.emptyTitle}>Nothing in this list</Text>
          <Text style={styles.muted}>Add a task or choose another filter.</Text>
        </View>
      )}
    </ScrollView>
      <Pressable
        onPress={() => navigate("TaskEditor")}
        style={[styles.fab, styles.tasksFab]}
      >
        <Icon type="plus" />
      </Pressable>
    </View>
  );
}
function Schedule({ navigate }) {
  const [week, setWeek] = useState(6);
  const [selectedDay, setSelectedDay] = useState(1);
  const classes = [
    ["08:00", "09:30", "COMS3007", "Databases lecture", "MSB 101"],
    ["10:00", "11:30", "INF3024S", "Microservices & Cloud", "Net Lab 2"],
    ["12:00", "13:30", "STAT2012", "Statistical Inference", "Senate House 3"],
    [
      "14:30",
      "16:00",
      "COMS3007",
      "Tutorial & Lab session",
      "Chamber of Mines Lab",
    ],
  ];
  return (
    <ScrollView contentContainerStyle={styles.content}>
      <Top
        title="Class Timetable"
        right={
          <Pressable
            onPress={() =>
              Alert.alert(
                "Timetable",
                "Adding classes is not available in this prototype.",
              )
            }
            style={styles.circleButton}
            accessibilityRole="button"
            accessibilityLabel="Add a class"
          >
            <Icon type="plus" />
          </Pressable>
        }
      />
      <Text style={styles.scheduleSubtitle}>Wits University • Term 1</Text>
      <View style={styles.weekRow}>
        <Pressable onPress={() => setWeek(Math.max(1, week - 1))} hitSlop={12}>
          <Icon type="back" />
        </Pressable>
        <Text style={styles.week}>
          Week {week} ({16 + (week - 6) * 7} - {20 + (week - 6) * 7} Feb)
        </Text>
        <Pressable onPress={() => setWeek(week + 1)} hitSlop={12}>
          <Text style={styles.forward}>›</Text>
        </Pressable>
      </View>
      <View style={styles.days}>
        {["M", "T", "W", "T", "F"].map((day, i) => (
          <Pressable
            key={`${day}${i}`}
            onPress={() => setSelectedDay(i)}
            style={[
              styles.day,
              (selectedDay === i || i === 3) && styles.dayOn,
            ]}
          >
            <Text
              style={[
                styles.dayText,
                (selectedDay === i || i === 3) && styles.dayTextOn,
              ]}
            >
              {day}
            </Text>
            <Text
              style={[
                styles.dayNumber,
                (selectedDay === i || i === 3) && styles.dayTextOn,
              ]}
            >
              {16 + i}
            </Text>
          </Pressable>
        ))}
      </View>
      {classes.map(([start, end, module, title, room]) => (
        <View key={title} style={styles.classRow}>
          <View style={styles.time}>
            <Text style={styles.timeStart}>{start}</Text>
            <Text style={styles.timeEnd}>{end}</Text>
          </View>
          <View style={styles.classCard}>
            <View style={styles.classTop}>
              <Text style={styles.moduleTag}>{module}</Text>
              <Text style={styles.room}>{room}</Text>
            </View>
            <Text style={styles.classTitle}>{title}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}
function Chat({ navigate, selectedFile }) {
  const [draft, setDraft] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "user",
      text: "Can you explain the main difference between 3NF and BCNF with a simple example?",
    },
    {
      role: "assistant",
      text: "BCNF is strictly stronger than 3NF. In 3NF, transitive dependencies of non-key attributes are eliminated, but candidate keys may overlap. BCNF requires every determinant to be a superkey.",
    },
  ]);

  const sendMessage = (text = draft) => {
    const question = text.trim();
    if (!question) return;

    setMessages((current) => [
      ...current,
      { role: "user", text: question },
      {
        role: "assistant",
        text: "This prototype does not connect to an AI service yet. You can review the selected document's sample summary while the chat integration is being built.",
      },
    ]);
    setDraft("");
  };

  return (
    <View style={styles.chatScreen}>
      <View style={styles.chatHeader}>
        <View style={styles.botMark}>
          <Icon type="bolt" />
        </View>
        <View style={styles.chatHeaderCopy}>
          <Text style={styles.chatHeaderTitle}>StudyHub AI Assistant</Text>
          <Text style={styles.chatContext} numberOfLines={1}>
            Grounded on: {selectedFile?.name || "Databases Lecture 10"}
          </Text>
        </View>
        <Pressable onPress={() => navigate("Files")}>
          <Text style={styles.changePdf}>Change PDF</Text>
        </Pressable>
      </View>
      <ScrollView
        style={styles.chatBody}
        contentContainerStyle={styles.chatMessages}
      >
        {messages.map((message, index) =>
          message.role === "user" ? (
            <View key={`${message.role}-${index}`} style={styles.userBubble}>
              <Text style={styles.userText}>{message.text}</Text>
            </View>
          ) : (
            <View key={`${message.role}-${index}`} style={styles.botRow}>
              <View style={styles.botMark}>
                <Icon type="bolt" />
              </View>
              <View style={styles.botBubble}>
                <Text style={styles.botText}>{message.text}</Text>
              </View>
            </View>
          ),
        )}
      </ScrollView>
      <View>
        <Text style={styles.suggested}>SUGGESTED PROMPTS</Text>
        <View style={styles.promptRow}>
          <Pressable
            style={styles.promptAction}
            onPress={() =>
              sendMessage("Generate five practice questions from this chapter.")
            }
          >
            <Text style={styles.prompt}>Generate practice questions</Text>
          </Pressable>
          <Pressable
            style={styles.promptAction}
            onPress={() => sendMessage("Summarize the selected chapter.")}
          >
            <Text style={styles.prompt}>Summarize this chapter</Text>
          </Pressable>
        </View>
        <View style={styles.chatInput}>
          <Text style={styles.attach}>♧</Text>
          <TextInput
            value={draft}
            onChangeText={setDraft}
            onSubmitEditing={() => sendMessage()}
            returnKeyType="send"
            placeholder="Ask StudyHub AI anything..."
            placeholderTextColor="#929DAD"
            style={styles.chatTextInput}
          />
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Send message"
            onPress={() => sendMessage()}
            style={styles.send}
          >
            <Text style={styles.sendText}>›</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
function Upload({ setFiles, selectedFile, setSelectedFile, navigate }) {
  const [picking, setPicking] = useState(false);
  const [error, setError] = useState("");

  const chooseDocument = async () => {
    setError("");
    setPicking(true);
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ["application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "application/vnd.openxmlformats-officedocument.presentationml.presentation"],
        copyToCacheDirectory: true,
        multiple: false,
      });
      if (result.canceled) return;

      const asset = result.assets[0];
      if (asset.size && asset.size > 25 * 1024 * 1024) {
        setError("The selected file is over 25 MB. Choose a smaller PDF.");
        return;
      }

      const file = {
        id: asset.uri,
        uri: asset.uri,
        module: "NEW UPLOAD",
        name: asset.name,
        size: asset.size
          ? `${(asset.size / (1024 * 1024)).toFixed(1)} MB`
          : "Size unavailable",
        date: "Added just now",
        summary: false,
      };

      setSelectedFile(file);
      setFiles((current) => [
        file,
        ...current.filter((existing) => existing.uri !== file.uri),
      ]);
    } catch (error) {
      console.error("Unable to select the document.", error);
      setError("Could not open documents. Please try again.");
    } finally {
      setPicking(false);
    }
  };

  return (
    <View style={styles.screenWithNav}>
      <ScrollView style={styles.flex} contentContainerStyle={styles.content}>
      <Top title="Upload Document" onBack={() => navigate("Back")} />
      <Pressable
        onPress={chooseDocument}
        style={styles.drop}
        accessibilityRole="button"
      >
        <Text style={styles.cloud}>↑</Text>
        <Text style={styles.dropTitle}>
          {picking ? "Opening documents..." : "Tap to choose a PDF"}
        </Text>
        <Text style={styles.muted}>
          PDF, DOCX, or PPT up to 25MB
        </Text>
      </Pressable>
      {!!error && <Text style={styles.formError}>{error}</Text>}
      {selectedFile && (
        <>
          <View style={styles.uploadCard}>
            <View style={styles.uploadFileRow}>
              <View style={styles.documentIcon}>
                <Text style={styles.documentGlyph}>▤</Text>
              </View>
              <View style={styles.uploadFileCopy}>
                <Text style={styles.uploadFileName} numberOfLines={1}>
                  {selectedFile.name}
                </Text>
                <Text style={styles.muted}>
                  {selectedFile.size} • Ready on this device
                </Text>
              </View>
            </View>
            <View style={styles.progressText}>
              <Text style={styles.muted}>Local file selected</Text>
              <Text style={styles.progressPercent}>100%</Text>
            </View>
            <View style={styles.progress}>
              <View style={[styles.progressOn, styles.progressComplete]} />
            </View>
          </View>
          <View style={styles.success}>
            <Text style={styles.successIcon}>✓</Text>
            <View style={styles.successCopyWrap}>
              <Text style={styles.successTitle}>File selected successfully!</Text>
              <Text style={styles.successCopy}>
                Cloud upload and live AI generation are not connected yet.
              </Text>
            </View>
          </View>
          <Button purple onPress={() => navigate("Summary")}>
            ✦ Generate AI Summary
          </Button>
          <Button secondary onPress={() => navigate("Files")}>
            Cancel Upload
          </Button>
        </>
      )}
      </ScrollView>
      <AppTabBar navigate={navigate} active="Files" />
    </View>
  );
}
function Summary({ selectedFile, navigate }) {
  return (
    <View style={styles.screenWithNav}>
      <ScrollView style={styles.flex} contentContainerStyle={styles.content}>
      <Top title="AI Summary" onBack={() => navigate("Back")} />
      <View style={styles.summaryFile}>
        <View style={styles.fileMeta}>
          <Text style={styles.purpleTag}>
            {selectedFile?.module || "COMS3007"}
          </Text>
          <Text style={styles.fileSize}>Active PDF Context</Text>
        </View>
        <Text style={styles.fileName}>
          {selectedFile?.name || "COMS3007_Exam_Prep_Summary.pdf"}
        </Text>
        <View style={styles.summaryProgressRow}>
          <View style={styles.summaryProgress}>
            <View style={styles.summaryProgressOn} />
          </View>
          <Text style={styles.fileSize}>75% Read</Text>
        </View>
      </View>
      <View style={styles.concept}>
        <View style={styles.conceptHeading}>
          <View style={styles.conceptIcon}>
            <Icon type="bolt" />
          </View>
          <Text style={styles.conceptTitle}>High-Yield Concepts</Text>
        </View>
        {[
          "3NF requires eliminating transitive dependencies of non-key attributes on the primary key.",
          "BCNF is strictly stronger than 3NF. It handles overlapping candidate keys by requiring every determinant to be a superkey.",
          "Lossless-join decomposition guarantees that we can reconstruct the original relation using Natural Joins without introducing spurious tuples.",
        ].map((text) => (
          <Text key={text} style={styles.bullet}>
            • <Text style={styles.conceptText}>{text}</Text>
          </Text>
        ))}
      </View>
      <Text style={styles.keywordTitle}>Extracted Keywords</Text>
      <View style={styles.keywordWrap}>
        {[
          "Normalization",
          "BCNF",
          "Superkeys",
          "Transitive Dependency",
          "Join Lossless",
        ].map((k) => (
          <Text key={k} style={styles.keyword}>
            {k}
          </Text>
        ))}
      </View>
      <Button purple onPress={() => navigate("Chat")}>
        ✦ Ask about this file
      </Button>
      </ScrollView>
      <AppTabBar navigate={navigate} active="Files" />
    </View>
  );
}
function Profile({ navigate }) {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  return (
    <View style={styles.screenWithNav}>
      <ScrollView style={styles.flex} contentContainerStyle={styles.profile}>
      <View style={styles.profileHeader}>
        <View style={styles.profileHero}>
          <View style={styles.profileAvatar}>
            <Text style={styles.avatarText}>TM</Text>
          </View>
          <View>
            <Text style={styles.profileName}>Thabo Mokoena</Text>
            <Text style={styles.profileEmail}>
              thabo.mokoena@students.wits.ac.za
            </Text>
          </View>
        </View>
        <View style={styles.affiliation}>
          <Text style={styles.affiliationLabel}>UNIVERSITY AFFILIATION</Text>
          <Text style={styles.affiliationName}>
            Wits University (South Africa)
          </Text>
          <Text style={styles.sync}>Sync active</Text>
        </View>
      </View>
      <Text style={styles.preference}>GENERAL PREFERENCES</Text>
      {[
        ["Notifications", "Alerts, reminders & daily recap schedule"],
        [
          "South African Campus Sync",
          "Wits, UCT, UP portal connection integration",
        ],
        [
          "Offline Storage & Cache",
          "Download summaries for local offline revision",
        ],
        ["Data Privacy & Sharing", "Manage PDF training exclusion settings"],
      ].map(([title, detail], i) => (
        <Pressable
          key={title}
          style={styles.preferenceCard}
          onPress={() =>
            i === 0
              ? setNotificationsEnabled((enabled) => !enabled)
              : Alert.alert(
                  title,
                  "This preference is shown as a prototype and is not connected yet.",
                )
          }
        >
          <View>
            <Text style={styles.prefTitle}>{title}</Text>
            <Text style={styles.muted}>{detail}</Text>
          </View>
          {i === 0 ? (
            <View
              style={[styles.toggle, !notificationsEnabled && styles.toggleOff]}
            >
              <View
                style={[
                  styles.toggleKnob,
                  !notificationsEnabled && styles.toggleKnobOff,
                ]}
              />
            </View>
          ) : (
            <Icon type="arrow" />
          )}
        </Pressable>
      ))}
      <Pressable
        accessibilityRole="button"
        onPress={() => navigate("Auth", true)}
        style={styles.signOut}
      >
        <Text style={styles.signOutText}>Sign Out Student Account</Text>
      </Pressable>
      </ScrollView>
      <AppTabBar navigate={navigate} active="Home" />
    </View>
  );
}
function TaskEditor({ setTasks, navigate }) {
  const [title, setTitle] = useState("Prepare Databases Chapter 4 slides");
  const [module, setModule] = useState("COMS3007");
  const moduleNames = {
    COMS3007: "Databases",
    INF3024S: "Microservices",
    STAT2012: "Statistics",
  };
  const [dueDate, setDueDate] = useState("20 Feb 2026");
  const [dueTime, setDueTime] = useState("23:59");
  const [priority, setPriority] = useState("HIGH");
  const [reminderEnabled, setReminderEnabled] = useState(true);
  const [error, setError] = useState("");

  const saveTask = () => {
    if (!title.trim() || !dueDate.trim() || !dueTime.trim()) {
      setError("Enter a task title, due date, and due time.");
      return;
    }

    setError("");
    setTasks((current) => [
      {
        id: Date.now(),
        module,
        title: title.trim(),
        detail: "Coursework deadline",
        due: `Due ${dueDate.trim()}, ${dueTime.trim()}`,
        priority: `${priority} PRIORITY`,
        done: false,
      },
      ...current,
    ]);
    navigate("Tasks");
  };

  return (
    <View style={styles.screenWithNav}>
      <ScrollView style={styles.flex} contentContainerStyle={styles.content}>
      <Top title="Create New Task" onBack={() => navigate("Back")} />
      <Text style={styles.label}>Task Title</Text>
      <TextInput
        style={styles.field}
        value={title}
        onChangeText={(value) => {
          setTitle(value);
          setError("");
        }}
        placeholder="Prepare Databases Chapter 4 slides"
        maxLength={100}
      />
      <Text style={styles.label}>Course Module</Text>
      <Pressable
        onPress={() =>
          setModule((current) => {
            const modules = ["COMS3007", "INF3024S", "STAT2012"];
            return modules[(modules.indexOf(current) + 1) % modules.length];
          })
        }
        style={styles.select}
      >
        <Text style={styles.selectText}>
          {module} ({moduleNames[module]})
        </Text>
        <Text style={styles.selectArrow}>⌄</Text>
      </Pressable>
      <View style={styles.twoCol}>
        <View style={styles.col}>
          <Text style={styles.label}>Due Date</Text>
          <View style={styles.fieldWithIcon}>
            <TextInput
              style={[styles.field, styles.iconField]}
              value={dueDate}
              onChangeText={(value) => {
                setDueDate(value);
                setError("");
              }}
              placeholder="20 Feb 2026"
            />
            <Text style={styles.fieldIcon}>▦</Text>
          </View>
        </View>
        <View style={styles.col}>
          <Text style={styles.label}>Due Time</Text>
          <View style={styles.fieldWithIcon}>
            <TextInput
              style={[styles.field, styles.iconField]}
              value={dueTime}
              onChangeText={(value) => {
                setDueTime(value);
                setError("");
              }}
              placeholder="23:59"
            />
            <Text style={styles.fieldIcon}>◷</Text>
          </View>
        </View>
      </View>
      <Text style={styles.label}>Priority level</Text>
      <View style={styles.priorityRow}>
        {["LOW", "MEDIUM", "HIGH"].map((item) => (
          <Pressable
            key={item}
            style={styles.priorityAction}
            onPress={() => setPriority(item)}
          >
            <Text
              style={
                priority === item
                  ? styles.priorityChoiceOn
                  : styles.priorityChoice
              }
            >
              {item.charAt(0) + item.slice(1).toLowerCase()}
            </Text>
          </Pressable>
        ))}
      </View>
      <View style={styles.reminder}>
        <View>
          <Text style={styles.prefTitle}>Push Notification Reminder</Text>
          <Text style={styles.muted}>Remind me 1 hour before due</Text>
        </View>
        <Pressable
          accessibilityRole="switch"
          accessibilityState={{ checked: reminderEnabled }}
          onPress={() => setReminderEnabled((enabled) => !enabled)}
          style={[styles.toggle, !reminderEnabled && styles.toggleOff]}
        >
          <View
            style={[
              styles.toggleKnob,
              !reminderEnabled && styles.toggleKnobOff,
            ]}
          />
        </Pressable>
      </View>
      {!!error && <Text style={styles.formError}>{error}</Text>}
      <View style={styles.twoButtons}>
        <Button
          secondary
          style={styles.flexButton}
          onPress={() => navigate("Tasks")}
        >
          Cancel
        </Button>
        <Button style={styles.flexButton} onPress={saveTask}>
          Save Task
        </Button>
      </View>
      </ScrollView>
      <AppTabBar navigate={navigate} active="Tasks" />
    </View>
  );
}

export {
  Auth,
  Chat,
  Files,
  Home,
  Onboarding,
  Profile,
  Schedule,
  Splash,
  Summary,
  Tasks,
  TaskEditor,
  Upload,
};

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: C.bg },
  screenWithNav: { flex: 1, backgroundColor: C.bg },
  flex: { flex: 1 },
  main: { flex: 1 },
  content: { padding: 16, paddingBottom: 38 },
  muted: { color: C.muted, fontSize: 12 },
  mark: { width: 58, height: 52, position: "relative" },
  markSmall: { width: 34, height: 32 },
  book: {
    position: "absolute",
    left: 7,
    top: 14,
    width: 34,
    height: 28,
    borderWidth: 2,
    borderColor: C.white,
    borderRadius: 3,
  },
  bookSmall: { left: 4, top: 8, width: 22, height: 19, borderWidth: 1.5 },
  bookLight: { borderColor: C.blue },
  bookSpine: {
    position: "absolute",
    left: "50%",
    top: 0,
    bottom: 0,
    borderLeftWidth: 1,
    borderColor: C.white,
  },
  bookSpineLight: { borderColor: C.blue },
  spark: {
    position: "absolute",
    top: 0,
    left: 24,
    color: "#C4B2E8",
    fontSize: 30,
    fontWeight: "800",
  },
  sparkSmall: { left: 13, top: 2, fontSize: 15, color: C.purple },
  icon: { color: "#8A96A5", fontSize: 24, lineHeight: 26, textAlign: "center" },
  iconActive: { color: C.blue },
  backIcon: { color: C.ink, fontSize: 32 },
  top: {
    minHeight: 38,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  topBack: { marginRight: 12, width: 22, alignItems: "flex-start" },
  topRight: {
    minWidth: 38,
    alignItems: "flex-end",
    justifyContent: "center",
  },
  topTitle: {
    color: C.ink,
    fontSize: 20,
    fontWeight: "800",
    flex: 1,
    textAlign: "left",
  },
  nav: {
    height: 64,
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: C.white,
    borderTopWidth: 1,
    borderTopColor: C.border,
    paddingTop: 7,
  },
  navItem: { alignItems: "center", width: 62 },
  navLabel: { color: "#8A96A5", fontSize: 11, marginTop: 1 },
  navActive: { color: C.blue, fontWeight: "800" },
  manualTabBar: {
    height: 84,
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: C.white,
    borderTopWidth: 1,
    borderTopColor: C.border,
    paddingTop: 7,
    paddingBottom: 20,
  },
  manualTab: { alignItems: "center", width: 62 },
  manualTabIcon: {
    color: "#8A96A5",
    fontSize: 23,
    lineHeight: 26,
    textAlign: "center",
  },
  manualTabLabel: { color: "#8A96A5", fontSize: 11, marginTop: 1 },
  manualTabActive: { color: C.blue, fontWeight: "800" },
  button: {
    height: 46,
    backgroundColor: C.blue,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
  },
  buttonText: { color: C.white, fontWeight: "800", fontSize: 15 },
  secondaryButton: {
    backgroundColor: C.white,
    borderWidth: 1,
    borderColor: C.border,
  },
  secondaryButtonText: { color: C.muted },
  purpleButton: { backgroundColor: C.purple },
  splash: {
    flex: 1,
    backgroundColor: C.blue,
    alignItems: "center",
    justifyContent: "center",
  },
  splashCenter: { alignItems: "center", marginTop: -25 },
  splashLogo: {
    color: C.white,
    fontSize: 31,
    fontWeight: "800",
    marginTop: 18,
  },
  splashText: { color: "#E1E9FA", fontSize: 16, marginTop: 8 },
  splashBottom: { position: "absolute", bottom: 38, alignItems: "center" },
  dots: { flexDirection: "row", marginBottom: 15 },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#86A5D9",
    marginHorizontal: 3,
  },
  dotOn: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: C.white,
    marginHorizontal: 3,
  },
  version: { color: "#B4C6E8", fontSize: 12 },
  onboardTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
  },
  onboardBrand: { flexDirection: "row", alignItems: "center", gap: 8 },
  step: { color: "#8A96A5", fontWeight: "700" },
  skipPill: {
    backgroundColor: C.white,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 18,
  },
  skipText: { color: C.muted, fontWeight: "700" },
  onboardPage: {
    flex: 1,
    justifyContent: "center",
    paddingLeft: 20,
    overflow: "hidden",
  },
  onboardCards: { flexDirection: "row", gap: 12 },
  onboardActions: {
    flexDirection: "row",
    gap: 12,
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  flexButton: { flex: 1 },
  onboardCard: {
    width: 260,
    height: 360,
    backgroundColor: C.white,
    borderWidth: 2,
    borderColor: C.blue,
    borderRadius: 18,
    padding: 18,
    justifyContent: "flex-start",
  },
  fadedCard: { opacity: 0.5, borderColor: C.border },
  onboardArt: {
    height: 160,
    backgroundColor: "#ECF2FC",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  uploadGlyph: { color: C.blue, fontSize: 44 },
  onboardTitle: {
    color: C.ink,
    fontSize: 20,
    fontWeight: "800",
    marginBottom: 8,
  },
  onboardCopy: { color: C.muted, fontSize: 13, lineHeight: 20 },
  pageDots: {
    position: "absolute",
    bottom: 210,
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 0,
  },
  pageDot: {
    width: 6,
    height: 6,
    backgroundColor: "#CBD1DA",
    borderRadius: 3,
    marginHorizontal: 3,
  },
  pageDotOn: {
    width: 16,
    height: 6,
    backgroundColor: C.blue,
    borderRadius: 3,
    marginHorizontal: 3,
  },
  auth: { flex: 1, backgroundColor: C.bg },
  authContent: { flexGrow: 1, padding: 24, paddingTop: 20, paddingBottom: 24 },
  authTitle: { color: C.ink, fontSize: 24, fontWeight: "800", marginTop: 8 },
  authSubtitle: { color: C.muted, fontSize: 14, lineHeight: 19, marginTop: 4 },
  authTabs: { flexDirection: "row", gap: 17, marginTop: 16 },
  authTab: {
    color: C.muted,
    fontSize: 16,
    fontWeight: "700",
    paddingBottom: 8,
  },
  authTabOn: { color: C.blue },
  tabLine: { height: 2, backgroundColor: "transparent" },
  tabLineOn: { backgroundColor: C.blue },
  authForm: { marginTop: 94 },
  label: {
    color: "#626C7A",
    fontSize: 12,
    fontWeight: "700",
    marginBottom: 7,
    marginTop: 15,
  },
  labelRow: { flexDirection: "row", justifyContent: "space-between" },
  forgot: { color: C.blue, fontSize: 12, fontWeight: "800" },
  formError: {
    color: C.red,
    fontSize: 12,
    lineHeight: 17,
    marginTop: 10,
  },
  field: {
    height: 44,
    backgroundColor: C.white,
    borderColor: C.border,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 14,
    color: C.ink,
    fontSize: 14,
  },
  password: {
    height: 44,
    backgroundColor: C.white,
    borderColor: C.border,
    borderWidth: 1,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
  },
  passwordInput: { flex: 1, fontSize: 14 },
  signIn: {
    height: 46,
    backgroundColor: C.blue,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 14,
  },
  signInText: { color: C.white, fontSize: 15, fontWeight: "800" },
  or: { flexDirection: "row", alignItems: "center", marginVertical: 18 },
  orLine: { height: 1, backgroundColor: C.border, flex: 1 },
  orText: {
    color: "#8993A0",
    fontSize: 11,
    fontWeight: "700",
    marginHorizontal: 12,
  },
  socialRow: { flexDirection: "row", gap: 12 },
  social: {
    height: 44,
    flex: 1,
    backgroundColor: C.white,
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 11,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  socialIcon: { fontSize: 22, color: C.ink },
  socialText: { color: C.ink, fontWeight: "700" },
  authFooter: {
    color: C.muted,
    textAlign: "center",
    fontSize: 13,
    marginTop: "auto",
    paddingTop: 40,
  },
  homeTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  homeBrand: { flexDirection: "row", alignItems: "center", gap: 8 },
  hello: { color: C.ink, fontSize: 20, fontWeight: "800" },
  avatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: C.purple,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: { color: C.white, fontSize: 12, fontWeight: "800" },
  hero: { backgroundColor: C.blue, borderRadius: 17, padding: 18, height: 146 },
  heroTitle: { color: C.white, fontSize: 20, fontWeight: "800" },
  heroCopy: { color: "#EAF0FF", fontSize: 13, lineHeight: 18, marginTop: 3 },
  heroButton: {
    backgroundColor: C.white,
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    paddingHorizontal: 15,
    height: 38,
    borderRadius: 22,
    marginTop: 10,
  },
  heroButtonIcon: { color: C.blue, fontSize: 21, marginRight: 7 },
  heroButtonText: { color: C.blue, fontWeight: "800" },
  quickRow: { flexDirection: "row", gap: 12, marginTop: 16 },
  quickCard: {
    flex: 1,
    height: 94,
    backgroundColor: C.white,
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 15,
    padding: 12,
  },
  quickIcon: {
    position: "absolute",
    left: 12,
    top: 13,
    width: 25,
    height: 25,
    borderRadius: 7,
    backgroundColor: "#EAF1FD",
    alignItems: "center",
    justifyContent: "center",
  },
  purpleTint: { backgroundColor: "#F0ECFA" },
  quickModule: {
    color: C.blue,
    fontSize: 11,
    fontWeight: "800",
    marginLeft: 34,
    marginTop: 3,
  },
  quickTitle: { color: C.ink, fontWeight: "800", fontSize: 13, marginTop: 7 },
  due: { color: C.red, fontSize: 11, marginTop: 3, fontWeight: "700" },
  sectionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 18,
    marginBottom: 8,
  },
  sectionTitle: { color: C.ink, fontSize: 16, fontWeight: "800" },
  seeAll: { color: C.blue, fontSize: 12, fontWeight: "800" },
  summaryRow: {
    height: 58,
    backgroundColor: C.white,
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 12,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  summaryIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: "#F0ECFA",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  folderIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: "#EAF1FD",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  rowTitle: { color: C.ink, fontSize: 13, fontWeight: "800", maxWidth: 270 },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  pageTitle: { color: C.ink, fontSize: 21, fontWeight: "800" },
  circleButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: C.white,
    alignItems: "center",
    justifyContent: "center",
  },
  search: {
    height: 40,
    borderRadius: 22,
    backgroundColor: C.white,
    borderWidth: 1,
    borderColor: C.border,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
  },
  searchInput: { flex: 1, paddingHorizontal: 8, fontSize: 13 },
  chips: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginVertical: 12,
  },
  chip: {
    backgroundColor: C.white,
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 7,
    color: C.muted,
    fontSize: 12,
    fontWeight: "700",
  },
  chipOn: {
    backgroundColor: C.blue,
    color: C.white,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 7,
    fontSize: 12,
    fontWeight: "800",
  },
  fileCard: {
    backgroundColor: C.white,
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 15,
    padding: 14,
    marginBottom: 10,
  },
  fileSelected: { borderColor: C.purple },
  fileMeta: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  moduleTag: {
    backgroundColor: "#EAF1FD",
    color: C.blue,
    fontSize: 10,
    fontWeight: "800",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  purpleTag: {
    backgroundColor: "#F0ECFA",
    color: C.purple,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    fontSize: 10,
    fontWeight: "800",
  },
  fileSize: { color: "#8A96A5", fontSize: 11 },
  fileName: {
    color: C.ink,
    fontSize: 14,
    fontWeight: "800",
    marginTop: 10,
    marginBottom: 3,
  },
  fab: {
    position: "absolute",
    right: 16,
    bottom: 20,
    width: 56,
    height: 56,
    backgroundColor: C.blue,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
  },
  filesFab: { bottom: 180 },
  tasksFab: { bottom: 34 },
  taskCard: {
    backgroundColor: C.white,
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 15,
    padding: 12,
    flexDirection: "row",
    marginBottom: 10,
  },
  taskDone: { opacity: 0.55 },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: C.border,
    borderRadius: 5,
    marginRight: 12,
    marginTop: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxDone: { backgroundColor: C.green, borderColor: C.green },
  check: { color: C.white, fontWeight: "800" },
  taskBody: { flex: 1 },
  taskLine: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  priority: {
    color: C.red,
    backgroundColor: "#FFE2E2",
    fontSize: 9,
    fontWeight: "800",
    padding: 4,
    borderRadius: 4,
  },
  medium: { color: "#BE8500", backgroundColor: "#FFF0BC" },
  low: { color: "#7C8793", backgroundColor: "#F0F2F5" },
  taskTitle: { color: C.ink, fontWeight: "800", fontSize: 14, marginTop: 7 },
  struck: { textDecorationLine: "line-through" },
  donePill: {
    color: C.blue,
    backgroundColor: "#EAF1FD",
    borderRadius: 12,
    padding: 6,
    fontSize: 11,
    fontWeight: "800",
  },
  time: { width: 86 },
  timeStart: { color: C.ink, fontSize: 11, fontWeight: "800" },
  timeEnd: { color: "#8993A0", fontSize: 10 },
  weekRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
  },
  week: { color: C.ink, fontWeight: "800" },
  scheduleSubtitle: { color: C.muted, fontSize: 11, marginTop: 0 },
  forward: { color: C.muted, fontSize: 28 },
  days: { flexDirection: "row", gap: 5, marginBottom: 10 },
  day: {
    flex: 1,
    backgroundColor: C.white,
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 12,
    paddingVertical: 8,
    alignItems: "center",
  },
  dayOn: { backgroundColor: C.blue, borderColor: C.blue },
  dayText: { color: C.ink, fontWeight: "800" },
  dayNumber: { color: "#8A96A5", fontSize: 10, marginTop: 4 },
  dayTextOn: { color: C.white },
  classRow: { flexDirection: "row", marginBottom: 10 },
  classCard: {
    flex: 1,
    backgroundColor: C.white,
    borderWidth: 1,
    borderColor: C.border,
    borderLeftWidth: 4,
    borderLeftColor: "#E8ECF2",
    borderRadius: 12,
    padding: 10,
  },
  classTop: { flexDirection: "row", justifyContent: "space-between" },
  room: { color: "#8993A0", fontSize: 10 },
  classTitle: { color: C.ink, fontWeight: "800", fontSize: 13, marginTop: 6 },
  chatScreen: {
    flex: 1,
    backgroundColor: C.bg,
    paddingBottom: 12,
  },
  chatHeader: {
    height: 48,
    backgroundColor: C.white,
    borderBottomWidth: 1,
    borderBottomColor: C.border,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  chatHeaderCopy: { flex: 1, marginLeft: 7 },
  chatHeaderTitle: { color: C.ink, fontSize: 14, fontWeight: "800" },
  chatContext: { color: C.muted, fontSize: 11, marginTop: 1 },
  chatBody: { flex: 1, paddingTop: 16, marginHorizontal: 16 },
  chatMessages: { paddingBottom: 14 },
  userBubble: {
    alignSelf: "flex-end",
    backgroundColor: C.blue,
    padding: 12,
    borderRadius: 17,
    borderBottomRightRadius: 0,
    width: "82%",
  },
  userText: { color: C.white, fontSize: 14, lineHeight: 19 },
  botRow: { flexDirection: "row", alignItems: "flex-start", marginTop: 16 },
  botMark: {
    width: 28,
    height: 28,
    backgroundColor: C.purple,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },
  botBubble: {
    backgroundColor: C.white,
    borderWidth: 1,
    borderColor: C.border,
    borderBottomRightRadius: 16,
    flex: 1,
    padding: 12,
  },
  botText: { color: C.ink, fontSize: 14, lineHeight: 19 },
  changePdf: {
    color: C.blue,
    backgroundColor: "#EAF1FD",
    padding: 6,
    borderRadius: 6,
    fontSize: 10,
    fontWeight: "800",
  },
  suggested: {
    color: "#8993A0",
    fontSize: 10,
    fontWeight: "800",
    marginBottom: 8,
    marginHorizontal: 16,
  },
  promptRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 9,
    marginHorizontal: 16,
  },
  promptAction: { flex: 1, minWidth: 0 },
  prompt: {
    backgroundColor: C.white,
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 7,
    color: C.muted,
    fontSize: 11,
    flex: 1,
  },
  chatInput: {
    height: 44,
    backgroundColor: C.white,
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 24,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 14,
    marginHorizontal: 16,
  },
  attach: { color: "#8A96A5", fontSize: 18 },
  chatTextInput: { flex: 1, paddingHorizontal: 8, fontSize: 13 },
  send: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: C.purple,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 4,
  },
  sendText: { color: C.white, fontSize: 25, lineHeight: 24 },
  drop: {
    height: 166,
    backgroundColor: C.white,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: C.blue,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 7,
  },
  cloud: {
    width: 56,
    height: 56,
    overflow: "hidden",
    borderRadius: 28,
    backgroundColor: "#EAF1FD",
    fontSize: 36,
    lineHeight: 56,
    textAlign: "center",
    color: C.blue,
  },
  dropTitle: { color: C.ink, fontWeight: "800", marginTop: 7 },
  uploadCard: {
    backgroundColor: C.white,
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 15,
    padding: 14,
    marginTop: 18,
  },
  uploadFileRow: { flexDirection: "row", alignItems: "center" },
  documentIcon: {
    width: 34,
    height: 38,
    borderRadius: 6,
    backgroundColor: "#EAF1FD",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  documentGlyph: { color: C.blue, fontSize: 22 },
  uploadFileCopy: { flex: 1 },
  uploadFileName: { color: C.ink, fontSize: 13, fontWeight: "800" },
  progressPercent: { color: C.blue, fontSize: 11, fontWeight: "800" },
  progressComplete: { width: "100%" },
  successCopyWrap: { flex: 1 },
  uploadNotice: { color: C.muted, fontSize: 12, lineHeight: 18, marginTop: 10 },
  emptyState: {
    alignItems: "center",
    backgroundColor: C.white,
    borderRadius: 14,
    padding: 20,
    marginTop: 14,
  },
  emptyTitle: { color: C.ink, fontWeight: "800", marginBottom: 5 },
  progressText: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  progress: {
    height: 5,
    backgroundColor: "#DCE3F0",
    borderRadius: 3,
    marginTop: 4,
  },
  progressOn: {
    width: "92%",
    height: 5,
    backgroundColor: C.blue,
    borderRadius: 3,
  },
  success: {
    borderWidth: 1,
    borderColor: C.green,
    backgroundColor: "#EFF9F0",
    borderRadius: 13,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 18,
  },
  successIcon: { color: C.green, fontSize: 22, marginRight: 12 },
  successTitle: { color: "#278033", fontWeight: "800", fontSize: 13 },
  successCopy: { color: "#4F8E54", fontSize: 11, marginTop: 2 },
  summaryFile: {
    backgroundColor: C.white,
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 15,
    padding: 13,
    marginTop: 7,
  },
  summaryProgressRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    marginTop: 7,
  },
  summaryProgress: {
    flex: 1,
    height: 4,
    backgroundColor: "#E7EAF0",
    borderRadius: 2,
  },
  summaryProgressOn: {
    width: "75%",
    height: 4,
    backgroundColor: C.purple,
    borderRadius: 2,
  },
  readRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 6,
  },
  readBar: { height: 4, backgroundColor: C.border, width: 180 },
  readOn: { width: "75%", height: 4, backgroundColor: C.purple },
  concept: {
    backgroundColor: C.white,
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 15,
    padding: 15,
    marginTop: 16,
  },
  conceptHeading: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  conceptIcon: {
    width: 26,
    height: 26,
    borderRadius: 8,
    backgroundColor: "#F0ECFA",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 9,
  },
  conceptTitle: { color: C.ink, fontSize: 16, fontWeight: "800" },
  bullet: { color: C.purple, fontSize: 18, lineHeight: 22, marginBottom: 7 },
  conceptText: { color: C.muted, fontSize: 13, lineHeight: 18 },
  keywordTitle: {
    color: C.muted,
    fontWeight: "800",
    fontSize: 13,
    marginTop: 16,
    marginBottom: 8,
  },
  keywordWrap: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  keyword: {
    backgroundColor: C.white,
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 7,
    color: C.muted,
    fontSize: 12,
    fontWeight: "700",
  },
  profile: { paddingBottom: 30, backgroundColor: C.bg },
  profileHeader: {
    backgroundColor: C.blue,
    paddingTop: 12,
    paddingBottom: 18,
    borderBottomLeftRadius: 26,
    borderBottomRightRadius: 26,
  },
  profileHero: {
    paddingHorizontal: 18,
    paddingVertical: 4,
    flexDirection: "row",
    alignItems: "center",
  },
  profileAvatar: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: C.purple,
    borderWidth: 2,
    borderColor: C.white,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  profileName: { color: C.white, fontSize: 19, fontWeight: "800" },
  profileEmail: { color: "#E2EBFF", fontSize: 12, marginTop: 2 },
  affiliation: {
    backgroundColor: C.white,
    borderRadius: 14,
    marginHorizontal: 18,
    marginTop: 12,
    padding: 12,
  },
  affiliationLabel: { color: "#8A96A5", fontSize: 10, fontWeight: "800" },
  affiliationName: {
    color: C.ink,
    fontSize: 12,
    fontWeight: "800",
    marginTop: 2,
  },
  sync: {
    color: C.blue,
    backgroundColor: "#EAF1FD",
    borderRadius: 5,
    padding: 5,
    fontSize: 10,
    fontWeight: "800",
    position: "absolute",
    right: 10,
    top: 15,
  },
  preference: {
    color: "#8993A0",
    fontSize: 11,
    fontWeight: "800",
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 10,
  },
  preferenceCard: {
    backgroundColor: C.white,
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 13,
    marginHorizontal: 16,
    marginBottom: 10,
    padding: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  prefTitle: { color: C.ink, fontWeight: "800", fontSize: 13 },
  signOut: {
    backgroundColor: "#FFE5E5",
    borderColor: C.red,
    borderWidth: 1,
    borderRadius: 12,
    height: 42,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 16,
    marginTop: 2,
  },
  signOutText: { color: C.red, fontWeight: "800", fontSize: 13 },
  toggle: {
    width: 44,
    height: 25,
    borderRadius: 13,
    backgroundColor: C.blue,
    padding: 3,
    justifyContent: "center",
  },
  toggleKnob: {
    width: 19,
    height: 19,
    borderRadius: 10,
    backgroundColor: C.white,
    alignSelf: "flex-end",
  },
  toggleOff: { backgroundColor: "#C8CED8" },
  toggleKnobOff: { alignSelf: "flex-start" },
  select: {
    height: 44,
    backgroundColor: C.white,
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 12,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  fieldWithIcon: { position: "relative" },
  iconField: { paddingRight: 38 },
  fieldIcon: {
    position: "absolute",
    right: 12,
    top: 10,
    color: "#8A96A5",
    fontSize: 18,
  },
  selectText: { color: C.ink, fontSize: 14 },
  selectArrow: { color: "#8A96A5", fontSize: 22, lineHeight: 24 },
  twoCol: { flexDirection: "row", gap: 12 },
  col: { flex: 1 },
  moduleChoices: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  priorityRow: { flexDirection: "row", gap: 9 },
  priorityAction: { flex: 1 },
  priorityChoice: {
    flex: 1,
    backgroundColor: C.white,
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 20,
    paddingVertical: 8,
    textAlign: "center",
    color: C.muted,
    fontWeight: "700",
  },
  priorityChoiceOn: {
    flex: 1,
    backgroundColor: C.blue,
    borderRadius: 20,
    paddingVertical: 8,
    textAlign: "center",
    color: C.white,
    fontWeight: "800",
  },
  reminder: {
    backgroundColor: C.white,
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 14,
    padding: 13,
    marginTop: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  twoButtons: { flexDirection: "row", gap: 10 },
});
