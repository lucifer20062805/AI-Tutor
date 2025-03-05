import React, { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const App = () => {
  const [file, setFile] = useState(null);
  const [quiz, setQuiz] = useState([]);
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please upload a PDF file.");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("http://127.0.0.1:5000/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setQuiz(response.data.questions);
      setSummary(response.data.summary);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
    setLoading(false);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">📄 PDF Quiz & Summary Generator</h1>
      <Card>
        <CardContent className="p-4">
          <Input type="file" accept="application/pdf" onChange={handleFileChange} />
          <Button className="mt-4" onClick={handleUpload} disabled={loading}>
            {loading ? "Processing..." : "Generate Quiz & Summary"}
          </Button>
        </CardContent>
      </Card>

      {summary && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold">📌 Summary</h2>
          <p className="mt-2 p-4 border rounded-lg bg-gray-100">{summary}</p>
        </div>
      )}

      {quiz.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold">📝 Generated Quiz</h2>
          {quiz.map((q, index) => (
            <div key={index} className="mt-3 p-4 border rounded-lg bg-gray-50">
              <strong>Q{index + 1}:</strong> {q}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
