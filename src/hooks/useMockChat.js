import { useCallback, useEffect, useRef, useState } from "react";
import { getMockResponse, uid } from "../lib/mockAi";
import useReducedMotion from "./useReducedMotion";

/**
 * Front-end only "AI" chat engine: typing indicator, then a character-by-character
 * streamed canned response. Supports stop, regenerate and feedback.
 */
const useMockChat = ({ initialMessages = [], speed = 1 } = {}) => {
  const reduced = useReducedMotion();
  const [messages, setMessages] = useState(initialMessages);
  const messagesRef = useRef(messages);
  const timers = useRef(new Set());
  const streamRef = useRef(null); // { id, full, interval }

  const clearTimers = useCallback(() => {
    timers.current.forEach((t) => {
      clearTimeout(t);
      clearInterval(t);
    });
    timers.current.clear();
  }, []);

  useEffect(() => clearTimers, [clearTimers]);

  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  const patch = useCallback((id, changes) => {
    setMessages((list) => list.map((m) => (m.id === id ? { ...m, ...changes } : m)));
  }, []);

  const stream = useCallback(
    (id, full) => {
      const thinkDelay = reduced ? 150 : 650 + Math.random() * 600;

      const start = setTimeout(() => {
        timers.current.delete(start);
        let index = 0;
        patch(id, { status: "streaming", content: "" });

        const step = reduced ? full.length : Math.max(1, Math.round(2 * speed));
        const interval = setInterval(() => {
          // Stream a little faster through whitespace for a natural rhythm
          index = Math.min(full.length, index + step + (full[index] === " " ? 1 : 0));
          const done = index >= full.length;
          patch(id, {
            content: full.slice(0, index),
            status: done ? "done" : "streaming",
          });
          if (done) {
            clearInterval(interval);
            timers.current.delete(interval);
            streamRef.current = null;
          }
        }, 16);

        timers.current.add(interval);
        streamRef.current = { id, full, interval };
      }, thinkDelay);

      timers.current.add(start);
      streamRef.current = { id, full, interval: start };
    },
    [patch, reduced, speed]
  );

  const send = useCallback(
    (text) => {
      const prompt = text.trim();
      if (!prompt) return;
      clearTimers();

      const userMsg = { id: uid(), role: "user", content: prompt, status: "done", createdAt: Date.now() };
      const botMsg = {
        id: uid(),
        role: "assistant",
        content: "",
        status: "typing",
        prompt,
        variant: 0,
        createdAt: Date.now(),
      };

      setMessages((list) => [
        ...list.map((m) =>
          m.status === "typing" || m.status === "streaming" ? { ...m, status: "stopped" } : m
        ),
        userMsg,
        botMsg,
      ]);
      stream(botMsg.id, getMockResponse(prompt, 0));
    },
    [clearTimers, stream]
  );

  const stop = useCallback(() => {
    const current = streamRef.current;
    clearTimers();
    streamRef.current = null;
    if (!current) return;
    setMessages((list) =>
      list.map((m) =>
        m.id === current.id
          ? { ...m, status: "stopped", content: m.content || "_Generation stopped._" }
          : m
      )
    );
  }, [clearTimers]);

  const regenerate = useCallback(
    (id) => {
      const msg = messagesRef.current.find((m) => m.id === id);
      if (!msg) return;
      clearTimers();
      const variant = (msg.variant || 0) + 1;
      setMessages((list) =>
        list.map((m) =>
          m.id === id
            ? { ...m, variant, content: "", status: "typing", feedback: null }
            : m.status === "typing" || m.status === "streaming"
            ? { ...m, status: "stopped" }
            : m
        )
      );
      stream(id, getMockResponse(msg.prompt || "", variant));
    },
    [clearTimers, stream]
  );

  const setFeedback = useCallback(
    (id, feedback) => patch(id, { feedback }),
    [patch]
  );

  const reset = useCallback(
    (next = []) => {
      clearTimers();
      streamRef.current = null;
      setMessages(next);
    },
    [clearTimers]
  );

  const isBusy = messages.some((m) => m.status === "typing" || m.status === "streaming");

  return { messages, send, stop, regenerate, setFeedback, reset, isBusy };
};

export default useMockChat;
