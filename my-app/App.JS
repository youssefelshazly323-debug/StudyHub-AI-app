import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity as T, TextInput, Switch, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import { Ionicons as I } from '@expo/vector-icons';

const B = '#2E5EAA', P = '#8E7CC3', BG = '#F4F6FA', INK = '#1a1f2e', GR = '#6b7280';
const COURSE = { COMS3007: ['#E3ECF9', B], INF3024S: ['#EDE8F8', P], STAT2012: ['#FFF1C7', '#B7791F'] };
const PRI = { High: ['#FDE2E2', '#D32F2F'], Medium: ['#FFF1C7', '#B7791F'], Low: ['#EEF0F4', GR] };

const Chip = ({ t, on, onPress, style }) => (
  <T onPress={onPress} style={[s.chip, on && { backgroundColor: B, borderColor: B }, style]}><Text style={{ color: on ? '#fff' : INK, fontWeight: '600' }}>{t}</Text></T>);
const Tag = ({ c }) => <View style={[s.tag, { backgroundColor: (COURSE[c] || COURSE.COMS3007)[0] }]}><Text style={{ color: (COURSE[c] || COURSE.COMS3007)[1], fontSize: 11, fontWeight: '700' }}>{c}</Text></View>;
const Head = ({ t, back, right }) => (
  <View style={s.head}>{back && <T onPress={back}><I name="arrow-back" size={24} color={INK} style={{ marginRight: 10 }} /></T>}
    <Text style={s.title}>{t}</Text><View style={{ flex: 1 }} />{right}</View>);
const Fab = ({ onPress }) => <T style={s.fab} onPress={onPress}><I name="add" size={30} color="#fff" /></T>;
const Btn = ({ t, onPress, purple, out, icon }) => (
  <T onPress={onPress} style={[s.btn, purple && { backgroundColor: P }, out && { backgroundColor: '#fff', borderWidth: 1, borderColor: '#e5e7eb' }]}>
    {icon && <I name={icon} size={18} color="#fff" style={{ marginRight: 8 }} />}<Text style={[s.btnT, out && { color: GR }]}>{t}</Text></T>);

/* ---------- 1 Splash ---------- */
const Splash = ({ next }) => { useEffect(() => { const t = setTimeout(next, 2000); return () => clearTimeout(t); }, []);
  return (<View style={[s.full, { backgroundColor: B, justifyContent: 'center', alignItems: 'center' }]}>
    <I name="book-outline" size={72} color="#fff" /><Text style={{ color: '#fff', fontSize: 30, fontWeight: '800', marginTop: 20 }}>StudyHub AI</Text>
    <Text style={{ color: '#dbe6f7', marginTop: 6, fontSize: 16 }}>Study smarter, not harder</Text>
    <Text style={{ position: 'absolute', bottom: 40, color: '#a9bfe3', fontSize: 12 }}>Version 2.4.0 (Wits & UCT edition)</Text></View>); };

/* ---------- 2 Onboarding ---------- */
const CARDS = [['cloud-upload-outline', 'Upload', 'Drop your Wits COMS, UCT INF slides, or UP engineering PDF textbooks straight into the AI engine.'],
  ['flash-outline', 'Summarise', 'Get high-yield concepts and instant keywords from every lecture file.'], ['calendar-outline', 'Organise', 'Keep tasks and your class timetable in one simple place.']];
const Onboard = ({ done }) => { const [i, setI] = useState(0); const c = CARDS[i];
  return (<SafeAreaView style={s.full}><View style={s.rowB}><Text style={{ color: GR, fontWeight: '600' }}>Step {i + 1} of 3</Text><T style={s.skip} onPress={done}><Text style={{ fontWeight: '600' }}>Skip</Text></T></View>
    <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}><View style={[s.card, { borderWidth: 2, borderColor: B, borderRadius: 24, padding: 18 }]}>
      <View style={{ backgroundColor: '#E8EFF9', height: 160, borderRadius: 16, alignItems: 'center', justifyContent: 'center' }}><I name={c[0]} size={64} color={B} /></View>
      <Text style={{ fontSize: 22, fontWeight: '800', marginTop: 18 }}>{c[1]}</Text><Text style={{ color: GR, marginTop: 8, lineHeight: 21 }}>{c[2]}</Text></View>
      <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 16 }}>{CARDS.map((_, k) => <View key={k} style={{ width: k === i ? 22 : 7, height: 7, borderRadius: 4, marginHorizontal: 3, backgroundColor: k === i ? B : '#cfd5e1' }} />)}</View></View>
    <View style={{ padding: 20 }}><Btn t="Continue" onPress={() => (i < 2 ? setI(i + 1) : done())} /></View></SafeAreaView>); };

/* ---------- 3 Auth ---------- */
const Auth = ({ done }) => { const [tab, setTab] = useState('Log In'); const [show, setShow] = useState(false);
  return (<SafeAreaView style={[s.full, { padding: 24 }]}><I name="book-outline" size={40} color={B} style={{ marginTop: 20 }} />
    <Text style={{ fontSize: 28, fontWeight: '800', marginTop: 14 }}>Welcome to StudyHub</Text>
    <Text style={{ color: GR, marginTop: 6, fontSize: 15 }}>Access AI summaries tailored for South African campus modules.</Text>
    <View style={{ flexDirection: 'row', marginTop: 20, marginBottom: 30 }}>{['Log In', 'Create Account'].map(k => (
      <T key={k} onPress={() => setTab(k)} style={{ marginRight: 20, paddingBottom: 6, borderBottomWidth: 3, borderBottomColor: tab === k ? B : 'transparent' }}><Text style={{ fontWeight: '700', fontSize: 16, color: tab === k ? B : GR }}>{k}</Text></T>))}</View>
    <Text style={s.lbl}>Student Email (.ac.za)</Text><TextInput style={s.input} defaultValue="thabo.mokoena@students.wits.ac.za" autoCapitalize="none" />
    <View style={s.rowB}><Text style={s.lbl}>Password</Text><Text style={{ color: B, fontWeight: '700' }}>Forgot?</Text></View>
    <View style={[s.input, { flexDirection: 'row', alignItems: 'center' }]}><TextInput style={{ flex: 1 }} secureTextEntry={!show} defaultValue="password1234" /><T onPress={() => setShow(!show)}><I name={show ? 'eye-off-outline' : 'eye-outline'} size={22} color={GR} /></T></View>
    <View style={{ height: 8 }} /><Btn t={tab === 'Log In' ? 'Sign In' : 'Create Account'} onPress={done} />
    <Text style={{ textAlign: 'center', color: GR, marginVertical: 18, fontSize: 12 }}>OR CONTINUE WITH</Text>
    <View style={{ flexDirection: 'row', gap: 12 }}><T style={s.soc} onPress={done}><I name="search" size={18} /><Text style={s.socT}> Google</Text></T><T style={s.soc} onPress={done}><I name="logo-apple" size={18} /><Text style={s.socT}> Apple</Text></T></View>
    <Text style={{ textAlign: 'center', color: GR, marginTop: 'auto' }}>Don't have a student account? <Text style={{ color: B, fontWeight: '700' }} onPress={() => setTab('Create Account')}>Sign up here</Text></Text></SafeAreaView>); };

/* ---------- 4 Home ---------- */
const Home = ({ go }) => (<ScrollView contentContainerStyle={s.pad}>
  <View style={s.rowB}><View style={{ flexDirection: 'row', alignItems: 'center' }}><I name="book-outline" size={34} color={B} /><View style={{ marginLeft: 10 }}><Text style={s.title}>Halo, Thabo!</Text><Text style={{ color: GR }}>Wits University • COMS</Text></View></View>
    <T onPress={() => go('profile')} style={s.avatar}><Text style={{ color: '#fff', fontWeight: '800' }}>TM</Text></T></View>
  <View style={[s.card, { backgroundColor: B, marginTop: 18, padding: 20 }]}><Text style={{ color: '#fff', fontSize: 22, fontWeight: '800' }}>Fast AI Exam Prep</Text>
    <Text style={{ color: '#dbe6f7', marginVertical: 10 }}>Upload lecture PDFs, slides or research chapters for lightning summaries & quiz generators.</Text>
    <T style={s.white} onPress={() => go('upload')}><I name="cloud-upload-outline" size={18} color={B} /><Text style={{ color: B, fontWeight: '800' }}> Upload PDF</Text></T></View>
  <View style={{ flexDirection: 'row', gap: 12, marginTop: 14 }}>
    <View style={[s.card, { flex: 1 }]}><View style={s.rowB}><I name="book-outline" size={20} color={B} /><Text style={{ color: B, fontWeight: '700', fontSize: 12 }}>COMS3007</Text></View><Text style={s.h3}>Databases Lecture</Text><Text style={{ color: GR }}>10:00 • MSB 101</Text></View>
    <View style={[s.card, { flex: 1 }]}><View style={s.rowB}><I name="list" size={20} color={P} /><Text style={{ color: P, fontWeight: '700', fontSize: 12 }}>Due Soon</Text></View><Text style={s.h3}>Assignment 2</Text><Text style={{ color: '#D32F2F', fontWeight: '600' }}>Due Friday, 23:59</Text></View></View>
  <View style={[s.rowB, { marginTop: 20 }]}><Text style={s.title}>Recent AI Summaries</Text><Text style={{ color: B, fontWeight: '700' }} onPress={() => go('Files')}>See All</Text></View>
  {[['flash', 'COMS3007_Exam_Prep_Summary.pdf', 'AI generated • 2 hours ago', 1], ['folder-open', 'INF3024_Software_Engineering_Week…', 'User uploaded • Yesterday', 0]].map(([ic, n, d, ai]) => (
    <T key={n} style={[s.card, s.rowS]} onPress={() => go('summary')}><View style={[s.ico, { backgroundColor: ai ? '#EDE8F8' : '#E3ECF9' }]}><I name={ic === 'flash' ? 'flash' : 'folder-open'} size={22} color={ai ? P : B} /></View>
      <View style={{ marginLeft: 12, flex: 1 }}><Text style={{ fontWeight: '700' }} numberOfLines={1}>{n}</Text><Text style={{ color: GR, fontSize: 12 }}>{d}</Text></View></T>))}</ScrollView>);

/* ---------- 5 Files ---------- */
const FILES = [['COMS3007', 'Database_Normalization_Notes.pdf', '4.2 MB', 'Added: 2 days ago'], ['AI SUMMARY', 'AI_Summary_COMS3007_Lecture10.pdf', '1.1 MB', 'Generated: 4 hours ago'], ['INF3024S', 'UCT_Software_Architecture_Pres.pdf', '8.7 MB', 'Added: 1 week ago']];
const Files = ({ go }) => { const [q, setQ] = useState(''); const [f, setF] = useState('All PDFs');
  const list = FILES.filter(x => x[1].toLowerCase().includes(q.toLowerCase()) && (f === 'All PDFs' || x[0].startsWith(f) || x[0] === 'AI SUMMARY' && f === 'COMS3007'));
  return (<View style={{ flex: 1 }}><ScrollView contentContainerStyle={s.pad}><Head t="Your Library" right={<View style={s.circle}><I name="options" size={22} color={INK} /></View>} />
    <View style={[s.input, { flexDirection: 'row', alignItems: 'center', borderRadius: 24 }]}><I name="search" size={20} color={GR} /><TextInput style={{ flex: 1, marginLeft: 8 }} placeholder="Search PDFs, summaries, or modules..." value={q} onChangeText={setQ} /></View>
    <View style={{ flexDirection: 'row', gap: 8, marginVertical: 14 }}>{['All PDFs', 'COMS3007', 'INF3024'].map(k => <Chip key={k} t={k} on={f === k} onPress={() => setF(k)} />)}</View>
    {list.map(([c, n, sz, d]) => (<T key={n} onPress={() => c === 'AI SUMMARY' && go('summary')} style={[s.card, { marginBottom: 12 }, c === 'AI SUMMARY' && { borderColor: P, borderWidth: 1 }]}>
      <View style={s.rowB}>{c === 'AI SUMMARY' ? <View style={[s.tag, { backgroundColor: '#EDE8F8' }]}><Text style={{ color: P, fontSize: 11, fontWeight: '700' }}>AI SUMMARY</Text></View> : <Tag c={c} />}<Text style={{ color: GR, fontSize: 12 }}>{sz} • PDF</Text></View>
      <Text style={s.h3}>{n}</Text><Text style={{ color: GR }}>{d}</Text></T>))}</ScrollView><Fab onPress={() => go('upload')} /></View>); };

/* ---------- 6 Upload ---------- */
const Upload = ({ go }) => (<ScrollView contentContainerStyle={s.pad}><Head t="Upload Document" back={() => go(null)} />
  <T style={s.drop}><View style={[s.ico, { width: 56, height: 56, borderRadius: 28, backgroundColor: '#E3ECF9' }]}><I name="cloud-upload-outline" size={28} color={B} /></View>
    <Text style={{ fontWeight: '800', marginTop: 12 }}>Tap to select your document</Text><Text style={{ color: GR, fontSize: 12 }}>PDF, DOCX, or PPT up to 25MB</Text></T>
  <View style={[s.card, { marginVertical: 16 }]}><View style={{ flexDirection: 'row' }}><I name="document-text-outline" size={30} color={B} /><View style={{ marginLeft: 10 }}><Text style={{ fontWeight: '800' }}>INF3024S_Microservices_Chapter3.pdf</Text><Text style={{ color: GR, fontSize: 12 }}>3.4 MB • Waiting for AI analysis</Text></View></View>
    <View style={[s.rowB, { marginTop: 12 }]}><Text style={{ color: GR, fontSize: 12 }}>Uploading to StudyHub cloud…</Text><Text style={{ color: B, fontWeight: '700' }}>92%</Text></View><View style={s.bar}><View style={[s.fill, { width: '92%', backgroundColor: B }]} /></View></View>
  <View style={s.ok}><I name="checkmark-circle-outline" size={26} color="#2e7d32" /><View style={{ marginLeft: 10, flex: 1 }}><Text style={{ color: '#2e7d32', fontWeight: '800' }}>File uploaded successfully!</Text><Text style={{ color: '#2e7d32', fontSize: 12 }}>We are generating your AI summary & flashcards now.</Text></View></View>
  <View style={{ height: 16 }} /><Btn purple icon="flash" t="Generate AI Summary" onPress={() => go('summary')} /><View style={{ height: 10 }} /><Btn out t="Cancel Upload" onPress={() => go(null)} /></ScrollView>);

/* ---------- 7 AI Summary ---------- */
const Summary = ({ go }) => (<ScrollView contentContainerStyle={s.pad}><Head t="AI Summary" back={() => go(null)} />
  <View style={s.card}><View style={s.rowB}><View style={[s.tag, { backgroundColor: '#EDE8F8' }]}><Text style={{ color: P, fontWeight: '700', fontSize: 11 }}>COMS3007</Text></View><Text style={{ color: GR, fontSize: 12 }}>Active PDF Context</Text></View>
    <Text style={[s.h3, { marginTop: 10 }]}>COMS3007_Exam_Prep_Summary.pdf</Text><View style={s.bar}><View style={[s.fill, { width: '75%', backgroundColor: P }]} /></View><Text style={{ textAlign: 'right', fontWeight: '700', fontSize: 12 }}>75% Read</Text></View>
  <View style={[s.card, { marginVertical: 14 }]}><View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}><View style={[s.ico, { backgroundColor: '#EDE8F8' }]}><I name="flash" size={20} color={P} /></View><Text style={[s.h3, { marginLeft: 10, marginTop: 0 }]}>High-Yield Concepts</Text></View>
    {['3NF requires eliminating transitive dependencies of non-key attributes on the primary key.', 'BCNF is strictly stronger than 3NF. It handles overlapping candidate keys by requiring every determinant to be a superkey.', 'Lossless-join decomposition guarantees that we can reconstruct the original relation using Natural Joins without introducing spurious tuples.'].map(x => <Text key={x} style={{ marginVertical: 6, lineHeight: 21 }}>•  {x}</Text>)}</View>
  <Text style={[s.lbl, { color: GR }]}>Extracted Keywords</Text><View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginVertical: 10 }}>{['Normalization', 'BCNF', 'Superkeys', 'Transitive Dependency', 'Join Lossless'].map(k => <Chip key={k} t={k} />)}</View>
  <Btn purple icon="flash" t="Ask about this file" onPress={() => go('Chat')} /></ScrollView>);

/* ---------- 8 Tasks & 9 Editor ---------- */
const Tasks = ({ go, tasks, setTasks }) => { const [f, setF] = useState('All'); const done = tasks.filter(t => t.d).length;
  const list = tasks.filter(t => f === 'All' || (f === 'Completed') === t.d);
  return (<View style={{ flex: 1 }}><ScrollView contentContainerStyle={s.pad}><Head t="Your Tasks" right={<View style={[s.tag, { backgroundColor: '#E3ECF9' }]}><Text style={{ color: B, fontWeight: '700' }}>{done}/{tasks.length} Done</Text></View>} />
    <View style={{ flexDirection: 'row', gap: 8, marginBottom: 14 }}>{['All', 'Pending', 'Completed'].map(k => <Chip key={k} t={k} on={f === k} onPress={() => setF(k)} />)}</View>
    {list.map(t => (<View key={t.id} style={[s.card, { marginBottom: 12, flexDirection: 'row', opacity: t.d ? 0.6 : 1 }]}>
      <T onPress={() => setTasks(tasks.map(x => x.id === t.id ? { ...x, d: !x.d } : x))} style={[s.box, t.d && { backgroundColor: '#4c9a5a', borderColor: '#4c9a5a' }]}>{t.d && <I name="checkmark" size={16} color="#fff" />}</T>
      <View style={{ flex: 1, marginLeft: 12 }}><View style={s.rowB}><Tag c={t.c} /><View style={[s.tag, { backgroundColor: PRI[t.p][0] }]}><Text style={{ color: PRI[t.p][1], fontSize: 10, fontWeight: '800' }}>{t.p.toUpperCase()} PRIORITY</Text></View></View>
        <Text style={[s.h3, t.d && { textDecorationLine: 'line-through' }]}>{t.t}</Text><Text style={{ color: GR }}>{t.n}</Text><Text style={{ color: t.d ? GR : '#D32F2F', fontSize: 12, fontWeight: '600', marginTop: 2 }}>{t.due}</Text></View></View>))}</ScrollView>
    <Fab onPress={() => go('editor')} /></View>); };

const Editor = ({ go, addTask }) => { const [title, setTitle] = useState('Prepare Databases Chapter 4 slides'); const [c, setC] = useState('COMS3007'); const [date, setDate] = useState('20 Feb 2026'); const [time, setTime] = useState('23:59'); const [p, setP] = useState('High'); const [n, setN] = useState(true);
  const mods = Object.keys(COURSE);
  return (<ScrollView contentContainerStyle={s.pad}><Head t="Create New Task" back={() => go(null)} />
    <Text style={s.lbl}>Task Title</Text><TextInput style={s.input} value={title} onChangeText={setTitle} />
    <Text style={s.lbl}>Course Module</Text><T style={[s.input, s.rowB]} onPress={() => setC(mods[(mods.indexOf(c) + 1) % mods.length])}><Text>{c}</Text><I name="chevron-down" size={20} color={GR} /></T>
    <View style={{ flexDirection: 'row', gap: 12 }}><View style={{ flex: 1 }}><Text style={s.lbl}>Due Date</Text><TextInput style={s.input} value={date} onChangeText={setDate} /></View><View style={{ flex: 1 }}><Text style={s.lbl}>Due Time</Text><TextInput style={s.input} value={time} onChangeText={setTime} /></View></View>
    <Text style={s.lbl}>Priority level</Text><View style={{ flexDirection: 'row', gap: 10 }}>{['Low', 'Medium', 'High'].map(k => <Chip key={k} t={k} on={p === k} onPress={() => setP(k)} style={{ flex: 1, alignItems: 'center', paddingVertical: 12 }} />)}</View>
    <View style={[s.card, s.rowB, { marginVertical: 16 }]}><View><Text style={{ fontWeight: '800' }}>Push Notification Reminder</Text><Text style={{ color: GR, fontSize: 12 }}>Remind me 1 hour before due</Text></View><Switch value={n} onValueChange={setN} trackColor={{ true: B }} /></View>
    <View style={{ flexDirection: 'row', gap: 12 }}><View style={{ flex: 1 }}><Btn out t="Cancel" onPress={() => go(null)} /></View><View style={{ flex: 1.3 }}><Btn t="Save Task" onPress={() => { addTask({ id: Date.now(), c, p, t: title, n: 'New task', due: `Due ${date}, ${time}`, d: false }); go(null); }} /></View></View></ScrollView>); };

/* ---------- 10 Schedule ---------- */
const CLS = [['08:00', '09:30', 'COMS3007', 'MSB 101', 'Databases lecture'], ['10:00', '11:30', 'INF3024S', 'Net Lab 2', 'Microservices & Cloud'], ['12:00', '13:30', 'STAT2012', 'Senate House 3', 'Statistical Inference'], ['14:30', '16:00', 'COMS3007', 'Chamber of Mines Lab', 'Tutorial & Lab session']];
const Schedule = () => { const [d, setD] = useState(17);
  return (<ScrollView contentContainerStyle={s.pad}><Head t="Class Timetable" right={<View style={s.circle}><I name="add" size={24} color={INK} /></View>} /><Text style={{ color: GR, marginTop: -12, marginBottom: 12 }}>Wits University • Term 1</Text>
    <View style={[s.rowB, { paddingHorizontal: 4 }]}><I name="chevron-back" size={20} /><Text style={s.h3}>Week 6 (16 - 20 Feb)</Text><I name="chevron-forward" size={20} /></View>
    <View style={{ flexDirection: 'row', gap: 8, marginVertical: 14 }}>{[['M', 16], ['T', 17], ['W', 18], ['T', 19], ['F', 20]].map(([l, n]) => (<T key={n} onPress={() => setD(n)} style={[s.day, d === n && { backgroundColor: B, borderColor: B }]}><Text style={{ fontWeight: '800', color: d === n ? '#fff' : INK }}>{l}</Text><Text style={{ fontSize: 12, color: d === n ? '#dbe6f7' : GR }}>{n}</Text></T>))}</View>
    {CLS.map(([a, b, c, r, n]) => (<View key={a} style={{ flexDirection: 'row', marginBottom: 12 }}><View style={{ width: 52 }}><Text style={{ fontWeight: '800' }}>{a}</Text><Text style={{ color: GR, fontSize: 12 }}>{b}</Text></View>
      <View style={[s.card, { flex: 1, borderLeftWidth: 4, borderLeftColor: (COURSE[c])[1] }]}><View style={s.rowB}><Tag c={c} /><Text style={{ color: GR, fontSize: 12 }}>{r}</Text></View><Text style={s.h3}>{n}</Text></View></View>))}</ScrollView>); };

/* ---------- 11 Chat ---------- */
const Chat = () => { const [m, setM] = useState([{ me: true, t: 'Can you explain the main difference between 3NF and BCNF with a simple example?' }, { me: false, t: 'BCNF is strictly stronger than 3NF.\n\nIn 3NF, transitive dependencies of non-key attributes are eliminated, but we allow candidate keys to overlap. BCNF forbids this by requiring that every determinant is a superkey.' }]); const [x, setX] = useState('');
  const send = q => { const v = q || x; if (!v.trim()) return; setM([...m, { me: true, t: v }, { me: false, t: 'Demo reply: connect an AI API here to answer from your PDF.' }]); setX(''); };
  return (<View style={{ flex: 1 }}><View style={[s.rowB, { padding: 14, backgroundColor: '#fff' }]}><View style={{ flexDirection: 'row', alignItems: 'center' }}><View style={[s.ico, { backgroundColor: '#EDE8F8' }]}><I name="flash" size={20} color={P} /></View><View style={{ marginLeft: 10 }}><Text style={{ fontWeight: '800', fontSize: 16 }}>StudyHub AI Assistant</Text><Text style={{ color: GR, fontSize: 12 }}>Grounded on: Databases Lecture 10</Text></View></View><View style={[s.tag, { backgroundColor: '#E3ECF9' }]}><Text style={{ color: B, fontWeight: '700', fontSize: 11 }}>change PDF</Text></View></View>
    <ScrollView contentContainerStyle={s.pad}>{m.map((k, i) => <View key={i} style={[s.bub, k.me ? { backgroundColor: B, alignSelf: 'flex-end' } : { backgroundColor: '#fff', alignSelf: 'flex-start' }]}><Text style={{ color: k.me ? '#fff' : INK, lineHeight: 21 }}>{k.t}</Text></View>)}</ScrollView>
    <Text style={[s.lbl, { color: GR, paddingHorizontal: 16 }]}>SUGGESTED PROMPTS</Text><View style={{ flexDirection: 'row', gap: 8, paddingHorizontal: 16, marginVertical: 8 }}>{['Generate 5-question quiz', 'Summarize chapter'].map(q => <T key={q} style={[s.chip, { flex: 1 }]} onPress={() => send(q)}><Text numberOfLines={1}>{q}</Text></T>)}</View>
    <View style={[s.input, { flexDirection: 'row', alignItems: 'center', margin: 16, borderRadius: 26 }]}><I name="attach" size={22} color={GR} /><TextInput style={{ flex: 1, marginHorizontal: 8 }} placeholder="Ask StudyHub AI anything..." value={x} onChangeText={setX} onSubmitEditing={() => send()} /><T style={[s.circle, { backgroundColor: P, width: 36, height: 36 }]} onPress={() => send()}><I name="arrow-forward" size={18} color="#fff" /></T></View></View>); };

/* ---------- 12 Profile ---------- */
const Profile = ({ out }) => (<ScrollView>
  <View style={{ backgroundColor: B, padding: 18, paddingTop: 30, borderBottomLeftRadius: 28, borderBottomRightRadius: 28 }}>
    <View style={{ flexDirection: 'row', alignItems: 'center' }}><View style={[s.avatar, { width: 64, height: 64, borderRadius: 32, borderWidth: 3, borderColor: '#fff' }]}><Text style={{ color: '#fff', fontWeight: '800', fontSize: 20 }}>TM</Text></View>
      <View style={{ marginLeft: 14, flex: 1 }}><Text style={{ color: '#fff', fontSize: 22, fontWeight: '800' }}>Thabo Mokoena</Text><Text style={{ color: '#dbe6f7' }}>thabo.mokoena@students.wits.ac.za</Text></View></View>
    <View style={[s.card, s.rowB, { marginTop: 16 }]}><View><Text style={{ color: GR, fontSize: 11, fontWeight: '700' }}>UNIVERSITY AFFILIATION</Text><Text style={{ fontWeight: '800' }}>Wits University (South Africa)</Text></View><View style={[s.tag, { backgroundColor: '#E3ECF9' }]}><Text style={{ color: B, fontWeight: '700', fontSize: 11 }}>Sync active</Text></View></View></View>
  <View style={s.pad}><Text style={[s.lbl, { color: GR }]}>GENERAL PREFERENCES</Text>
    <View style={[s.card, s.rowB, { marginVertical: 8 }]}><View><Text style={s.h3}>Notifications</Text><Text style={{ color: GR, fontSize: 12 }}>Alerts, reminders & daily recap schedule</Text></View><Switch value trackColor={{ true: B }} /></View>
    {[['South African Campus Sync', 'Wits, UCT, UP portal connection integration'], ['Offline Storage & Cache', 'Download summaries for local offline revision'], ['Data Privacy & Sharing', 'Manage PDF training exclusion settings']].map(([a, b]) => (
      <View key={a} style={[s.card, s.rowB, { marginVertical: 6 }]}><View style={{ flex: 1 }}><Text style={s.h3}>{a}</Text><Text style={{ color: GR, fontSize: 12 }}>{b}</Text></View><I name="chevron-forward" size={20} color={GR} /></View>))}
    <T onPress={out} style={s.signout}><Text style={{ color: '#D32F2F', fontWeight: '800' }}>Sign Out Student Account</Text></T></View></ScrollView>);

/* ---------- App shell ---------- */
const TABS = [['Home', 'home-outline', 'home'], ['Files', 'folder-open-outline', 'folder-open'], ['Tasks', 'checkbox-outline', 'checkbox'], ['Schedule', 'calendar-outline', 'calendar'], ['Chat', 'chatbubble-outline', 'chatbubble']];
const T0 = [{ id: 1, c: 'COMS3007', p: 'High', t: 'COMS3007: Assignment 2', n: 'Database Schema Normalization', due: 'Due Friday, 23:59', d: false }, { id: 2, c: 'INF3024S', p: 'Medium', t: 'INF3024S: Microservices Prep', n: 'Read Chapter 3 Architectural Patterns', due: 'Due Monday, 14:00', d: false },
  { id: 3, c: 'STAT2012', p: 'High', t: 'STAT2012: Lab 4 Submission', n: 'Linear Regression fitting in R', due: 'Due Today, 17:00', d: true }, { id: 4, c: 'COMS3007', p: 'Low', t: 'COMS3007: Quiz 3 Revision', n: 'Complete practice questions on portal', due: 'Due Yesterday', d: true }];

export default function App() {
  const [stage, setStage] = useState('splash'); const [tab, setTab] = useState('Home'); const [sub, setSub] = useState(null); const [tasks, setTasks] = useState(T0);
  const go = k => (TABS.some(t => t[0] === k) ? (setTab(k), setSub(null)) : setSub(k));
  if (stage === 'splash') return <Splash next={() => setStage('onboard')} />;
  if (stage === 'onboard') return <Onboard done={() => setStage('auth')} />;
  if (stage === 'auth') return <Auth done={() => { setStage('main'); setTab('Home'); setSub(null); }} />;
  const P_ = { go, tasks, setTasks }; const active = sub === 'profile' ? 'Home' : sub === 'editor' ? 'Tasks' : sub === 'upload' || sub === 'summary' ? 'Files' : tab;
  const body = sub === 'upload' ? <Upload go={go} /> : sub === 'summary' ? <Summary go={go} /> : sub === 'editor' ? <Editor go={go} addTask={t => setTasks([t, ...tasks])} /> : sub === 'profile' ? <Profile out={() => setStage('auth')} />
    : { Home: <Home go={go} />, Files: <Files go={go} />, Tasks: <Tasks {...P_} />, Schedule: <Schedule />, Chat: <Chat /> }[tab];
  return (<SafeAreaView style={s.full}><StatusBar barStyle="dark-content" /><View style={{ flex: 1 }}>{body}</View>
    <View style={s.tabs}>{TABS.map(([k, o, f]) => (<T key={k} style={s.tab} onPress={() => go(k)}><I name={active === k ? f : o} size={24} color={active === k ? B : GR} /><Text style={{ fontSize: 11, marginTop: 2, color: active === k ? B : GR, fontWeight: active === k ? '800' : '400' }}>{k}</Text></T>))}</View></SafeAreaView>);
}

const s = StyleSheet.create({
  full: { flex: 1, backgroundColor: BG }, pad: { padding: 16, paddingBottom: 90 }, title: { fontSize: 22, fontWeight: '800', color: INK }, h3: { fontSize: 16, fontWeight: '800', color: INK, marginTop: 6 },
  head: { flexDirection: 'row', alignItems: 'center', marginBottom: 16, marginTop: 8 }, rowB: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }, rowS: { flexDirection: 'row', alignItems: 'center', marginTop: 10 },
  card: { backgroundColor: '#fff', borderRadius: 16, padding: 14, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 6, elevation: 2 },
  chip: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#e5e7eb', borderRadius: 20, paddingHorizontal: 16, paddingVertical: 8 }, tag: { borderRadius: 6, paddingHorizontal: 8, paddingVertical: 3, alignSelf: 'flex-start' },
  btn: { backgroundColor: B, borderRadius: 26, paddingVertical: 15, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }, btnT: { color: '#fff', fontWeight: '800', fontSize: 16 },
  lbl: { fontWeight: '700', color: '#4b5563', fontSize: 13, marginTop: 14, marginBottom: 6 }, input: { backgroundColor: '#fff', borderRadius: 14, padding: 14, borderWidth: 1, borderColor: '#e5e7eb' },
  soc: { flex: 1, backgroundColor: '#fff', borderRadius: 14, padding: 14, flexDirection: 'row', justifyContent: 'center', borderWidth: 1, borderColor: '#e5e7eb' }, socT: { fontWeight: '700' },
  skip: { backgroundColor: '#fff', borderRadius: 16, paddingHorizontal: 14, paddingVertical: 6 }, avatar: { width: 42, height: 42, borderRadius: 21, backgroundColor: P, alignItems: 'center', justifyContent: 'center' },
  white: { backgroundColor: '#fff', borderRadius: 22, paddingVertical: 11, paddingHorizontal: 18, flexDirection: 'row', alignSelf: 'flex-start', alignItems: 'center' }, ico: { width: 40, height: 40, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  circle: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' }, fab: { position: 'absolute', right: 20, bottom: 20, width: 58, height: 58, borderRadius: 29, backgroundColor: B, alignItems: 'center', justifyContent: 'center', elevation: 5 },
  drop: { borderWidth: 2, borderStyle: 'dashed', borderColor: B, borderRadius: 20, height: 190, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' },
  bar: { height: 7, backgroundColor: '#e5e7eb', borderRadius: 4, marginVertical: 6, overflow: 'hidden' }, fill: { height: 7, borderRadius: 4 }, ok: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#E8F5E9', borderWidth: 1, borderColor: '#66bb6a', borderRadius: 12, padding: 12 },
  box: { width: 24, height: 24, borderRadius: 6, borderWidth: 2, borderColor: '#cfd5e1', alignItems: 'center', justifyContent: 'center' }, day: { flex: 1, backgroundColor: '#fff', borderWidth: 1, borderColor: '#e5e7eb', borderRadius: 14, alignItems: 'center', paddingVertical: 10 },
  bub: { padding: 14, borderRadius: 18, maxWidth: '85%', marginBottom: 12 }, signout: { backgroundColor: '#FDE2E2', borderWidth: 1, borderColor: '#D32F2F', borderRadius: 14, padding: 16, alignItems: 'center', marginTop: 14 },
  tabs: { flexDirection: 'row', backgroundColor: '#fff', borderTopWidth: 1, borderColor: '#e5e7eb', paddingBottom: 6 }, tab: { flex: 1, alignItems: 'center', paddingVertical: 10 },
});