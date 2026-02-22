import { useState } from "react";
import { generateEmail } from "../api/emailApi";

function EmailForm() {
  const [emailContent, setEmailContent] = useState("");
  const [tone, setTone] = useState("Professional");
  const [generatedReply, setGeneratedReply] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    if (!emailContent.trim()) {
      setError("Email content cannot be empty");
      return;
    }

    try {
      setError("");
      setLoading(true);

      const reply = await generateEmail(emailContent, tone);
      setGeneratedReply(reply);

    } catch (err) {
      setError("Failed to generate email. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <textarea
        rows="8"
        placeholder="Paste original email..."
        value={emailContent}
        onChange={(e) => setEmailContent(e.target.value)}
      />

      <br />

      <select value={tone} onChange={(e) => setTone(e.target.value)}>
        <option>Professional</option>
        <option>Friendly</option>
        <option>Formal</option>
        <option>Casual</option>
      </select>

      <br />

      <button onClick={handleGenerate} disabled={loading}>
        {loading ? "Generating..." : "Generate Reply"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <h3>AI Reply</h3>

      <textarea rows="8" value={generatedReply} readOnly />
    </div>
  );
}

export default EmailForm;