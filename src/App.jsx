import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [timeLeft, setTimeLeft] = useState(0);

  // ⏳ Countdown Timer Logic
  useEffect(() => {
    let timer;
    if (loading && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [loading, timeLeft]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}m ${s < 10 ? "0" : ""}${s}s`;
  };

  const generateImage = async () => {
    if (!prompt.trim()) {
      alert("Please enter a prompt");
      return;
    }

    setLoading(true);
    setError("");
    setImage(null);
    setTimeLeft(170); // ⏳ approx 2m 50s

    try {
      const res = await fetch("http://localhost:8000/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to generate image");
      }

      setImage(`data:image/png;base64,${data.image}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const downloadImage = () => {
    const link = document.createElement("a");
    link.href = image;
    link.download = "generated_image.png";
    link.click();
  };

  return (
    <div className="app">
      {/* Warning */}
      <div className="warning">
        ⚠️ Image generation runs on CPU. It may take 2–5 minutes. Please wait.
      </div>

      {/* Hero */}
      <div className="hero">
        <h1>RealVisXL AI Image Generator</h1>
        <p>Diffusion Model • HuggingFace • CPU Inference</p>
      </div>

      {/* Main Layout */}
      <div className="main">
        {/* LEFT */}
        <div className="left">
          <h2>Enter Prompt</h2>

          <textarea
            placeholder="e.g. a hyper realistic 4k photo of a monkey using a smartphone"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />

          <button onClick={generateImage} disabled={loading}>
            {loading ? "Generating..." : "Generate Image"}
          </button>

          {loading && (
            <div className="loader">
              <div className="spinner"></div>
              <p>⏳ Time Remaining: {formatTime(timeLeft)}</p>
            </div>
          )}

          {error && <p className="error">{error}</p>}
        </div>

        {/* RIGHT */}
        <div className="right">
          <h2>Generated Image</h2>

          {image ? (
            <>
              <img src={image} alt="Generated" />
              <button className="download" onClick={downloadImage}>
                ⬇️ Download Image
              </button>
            </>
          ) : (
            <div className="placeholder">Your image will appear here</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
