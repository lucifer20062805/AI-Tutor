import tkinter as tk
from tkinter import messagebox
import torch
from transformers import AutoModelForCausalLM, AutoTokenizer

# Load LLaMA 3.2 Model Locally
MODEL_PATH = "path_to_your_llama3.2_model"  # Update with actual path
tokenizer = AutoTokenizer.from_pretrained(MODEL_PATH)
model = AutoModelForCausalLM.from_pretrained(
    MODEL_PATH,
    torch_dtype=torch.float16,
    device_map="auto"
)

# Function to generate quiz questions
def generate_text(prompt):
    inputs = tokenizer(prompt, return_tensors="pt").to("cuda")
    output = model.generate(**inputs, max_new_tokens=150)
    return tokenizer.decode(output[0], skip_special_tokens=True)

# Tkinter GUI App
class QuizGeneratorApp:
    def __init__(self, root):
        self.root = root
        self.root.title("Quiz Generator App")
        self.root.geometry("500x400")

        # Input fields
        tk.Label(root, text="Topic:").pack()
        self.topic_entry = tk.Entry(root, width=40)
        self.topic_entry.pack()

        tk.Label(root, text="Difficulty Level:").pack()
        self.difficulty_var = tk.StringVar(root)
        self.difficulty_var.set("Medium")  # Default
        tk.OptionMenu(root, self.difficulty_var, "Easy", "Medium", "Hard").pack()

        tk.Label(root, text="Number of Questions:").pack()
        self.num_questions_entry = tk.Entry(root, width=10)
        self.num_questions_entry.pack()

        # Generate quiz button
        self.generate_button = tk.Button(root, text="Generate Quiz", command=self.generate_quiz)
        self.generate_button.pack()

        # Quiz display area
        self.quiz_text = tk.Text(root, height=12, width=60)
        self.quiz_text.pack()

    def generate_quiz(self):
        topic = self.topic_entry.get().strip()
        difficulty = self.difficulty_var.get()
        num_questions = self.num_questions_entry.get().strip()

        if not topic:
            messagebox.showerror("Error", "Please enter a topic.")
            return
        try:
            num_questions = int(num_questions)
            if num_questions <= 0:
                raise ValueError
        except ValueError:
            messagebox.showerror("Error", "Please enter a valid number of questions.")
            return

        self.quiz_text.delete("1.0", tk.END)

        for i in range(num_questions):
            prompt = f"Generate a {difficulty} level question about {topic}, along with the correct answer."
            question = generate_text(prompt)
            self.quiz_text.insert(tk.END, f"Question {i+1}:\n{question}\n\n")

if __name__ == "__main__":
    root = tk.Tk()
    app = QuizGeneratorApp(root)
    root.mainloop()
