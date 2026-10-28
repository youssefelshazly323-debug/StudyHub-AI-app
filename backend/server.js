
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json({ limit: "1mb" }));

app.get("/", (req, res) => {
  res.json({
    message: "StudyHub AI backend is running!",
  });
});

app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    mode: "demo",
  });
});

app.post("/api/chat", (req, res) => {
  const { message, messages, documentText } = req.body || {};

  const conversation = Array.isArray(messages)
    ? messages
    : typeof message === "string"
      ? [{ role: "user", content: message }]
      : [];

  if (
    conversation.length === 0 ||
    conversation.length > 20 ||
    conversation.some(
      (item) =>
        !item ||
        !["user", "assistant"].includes(item.role) ||
        typeof item.content !== "string" ||
        !item.content.trim() ||
        item.content.length > 5000
    )
  ) {
    return res.status(400).json({
      error: "Please send a valid message.",
    });
  }

  const lastUserMessage = [...conversation]
    .reverse()
    .find((item) => item.role === "user");

  if (!lastUserMessage) {
    return res.status(400).json({
      error: "Please send a user message.",
    });
  }

  const question = lastUserMessage.content.toLowerCase();
  let answer;

  if (documentText && documentText.trim()) {
    answer =
      "Demo mode is active. Your document was received, but I cannot analyse it with AI yet. We can connect a free AI service next.";
  } else if (
    question.includes("hello") ||
    question.includes("hi")
  ) {
    answer =
      "Hello! Welcome to StudyHub AI. The chat is working in demo mode.";
  } else if (question.includes("photosynthesis")) {
    answer =
      "Photosynthesis is the process plants use to make food from sunlight, water, and carbon dioxide. This is a demo answer, not a live AI response.";
  } else {
    answer =
      "Your message reached StudyHub AI successfully. The chat is currently in demo mode, so it cannot generate real AI answers yet.";
  }

  return res.json({
    answer,
    mode: "demo",
  });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`StudyHub AI backend running on port ${PORT}`);
  console.log("Chat mode: demo (no paid AI API calls)");
});
