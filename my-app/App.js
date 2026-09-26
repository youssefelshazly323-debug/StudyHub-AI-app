// ---------- Bottom navigation ----------
const NAV_ITEMS = [
  { id: "screen-home", icon: "🏠", label: "Home" },
  { id: "screen-files", icon: "📁", label: "Files" },
  { id: "screen-tasks", icon: "📋", label: "Tasks" },
  { id: "screen-schedule", icon: "📅", label: "Schedule" },
  { id: "screen-chat", icon: "💬", label: "Chat" },
];

function buildNav(containerId, activeId) {
  const el = document.getElementById(containerId);
  if (!el) return;
  el.innerHTML = "";
  NAV_ITEMS.forEach((item) => {
    const div = document.createElement("div");
    div.className = "nav-item" + (item.id === activeId ? " active" : "");
    div.innerHTML = `<span class="nav-icon">${item.icon}</span><span>${item.label}</span>`;
    div.onclick = () => goTo(item.id);
    el.appendChild(div);
  });
}

["home", "files", "tasks", "schedule", "chat"].forEach((key) => {
  buildNav("nav-" + key, "screen-" + key);
});

// ---------- Screen navigation ----------
function goTo(screenId) {
  document.querySelectorAll(".screen").forEach((s) => s.classList.remove("active"));
  const target = document.getElementById(screenId);
  if (target) target.classList.add("active");
}

// ---------- Splash -> Onboarding ----------
window.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => goTo("screen-onboarding"), 1800);
});

// ---------- Onboarding ----------
let obIndex = 0;
function onboardingNext() {
  const slides = document.querySelectorAll(".ob-slide");
  const dots = document.querySelectorAll(".ob-dots .dot");
  if (obIndex < slides.length - 1) {
    slides[obIndex].classList.remove("active");
    dots[obIndex].classList.remove("active");
    obIndex++;
    slides[obIndex].classList.add("active");
    dots[obIndex].classList.add("active");
    document.getElementById("ob-step").textContent = obIndex + 1;
    if (obIndex === slides.length - 1) {
      document.getElementById("ob-continue").textContent = "Get Started";
    }
  } else {
    goTo("screen-auth");
  }
}

// ---------- Auth tabs ----------
function switchAuthTab(which) {
  document.getElementById("tab-login").classList.toggle("active", which === "login");
  document.getElementById("tab-signup").classList.toggle("active", which === "signup");
}

// ---------- Tasks: filter ----------
function filterTasks(filter) {
  document.querySelectorAll("#screen-tasks .chip").forEach((c) => c.classList.remove("active"));
  event.target.classList.add("active");
  document.querySelectorAll("#task-list .task-card").forEach((card) => {
    const status = card.dataset.status;
    card.style.display = filter === "all" || filter === status ? "flex" : "none";
  });
}

// ---------- Tasks: add new ----------
function addTask() {
  const title = document.getElementById("new-task-title").value || "Untitled task";
  const module = document.getElementById("new-task-module").value;
  const priorityBtn = document.querySelector(".priority-btn.active");
  const priority = priorityBtn ? priorityBtn.dataset.p : "Medium";
  const priorityClass = priority === "High" ? "red" : priority === "Medium" ? "orange" : "grey";

  const card = document.createElement("div");
  card.className = "task-card";
  card.dataset.status = "pending";
  card.innerHTML = `
    <input type="checkbox">
    <div class="task-body">
      <div class="row-between">
        <span class="badge blue">${module.split(" ")[0]}</span>
        <span class="badge ${priorityClass}">${priority.toUpperCase()} PRIORITY</span>
      </div>
      <strong>${title}</strong>
      <span class="due">New task</span>
    </div>`;
  document.getElementById("task-list").prepend(card);
  goTo("screen-tasks");
}

document.querySelectorAll(".priority-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".priority-btn").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
  });
});

// ---------- Chat ----------
function sendChat() {
  const input = document.getElementById("chat-input");
  const text = input.value.trim();
  if (!text) return;
  const body = document.getElementById("chat-body");

  const userBubble = document.createElement("div");
  userBubble.className = "bubble user";
  userBubble.textContent = text;
  body.appendChild(userBubble);
  input.value = "";
  body.scrollTop = body.scrollHeight;

  setTimeout(() => {
    const aiBubble = document.createElement("div");
    aiBubble.className = "bubble ai";
    aiBubble.innerHTML = `<span class="chat-icon small">⚡</span><div>Here's a quick explanation grounded on your uploaded PDF. (This is a demo response — connect a real AI backend to generate live answers.)</div>`;
    body.appendChild(aiBubble);
    body.scrollTop = body.scrollHeight;
  }, 600);
}

document.getElementById("chat-input")?.addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendChat();
});