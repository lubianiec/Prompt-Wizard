import React, { useState } from "react";
import { Copy, Sparkles, Loader2 } from "lucide-react";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setLoading(true);
    setResponse("");
    setCopied(false);

    try {
      const HF_TOKEN = import.meta.env.VITE_HF_TOKEN;

      if (!HF_TOKEN) {
        throw new Error("Brak klucza Hugging Face – sprawdź zmienne na Vercelu!");
      }

      const res = await fetch(
        "https://api.huggingface.co/models/Qwen/Qwen2.5-72B-Instruct",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${HF_TOKEN}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            inputs: prompt,
            parameters: {
              max_new_tokens: 2048,
              temperature: 0.7,
              top_p: 0.95,
              return_full_text: false,
            },
          }),
        }
      );

      if (!res.ok) {
        const err = await res.text();
        throw new Error(`Błąd Hugging Face: ${res.status} – ${err}`);
      }

      const data = await res.json();

      let text = "";
      if (Array.isArray(data) && data[0]?.generated_text) {
        text = data[0].generated_text;
      } else if (data.generated_text) {
        text = data.generated_text;
      } else {
        text = "Coś poszło nie tak… spróbuj jeszcze raz!";
      }

      setResponse(text.trim());
    } catch (err: any) {
      setResponse(`😱 Błąd: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () =>
