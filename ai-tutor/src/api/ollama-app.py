import subprocess

# Function to generate quiz questions using Ollama CLI
def generate_text(prompt):
    command = f'ollama run llama3.2:1b "{prompt}"'
    result = subprocess.run(command, shell=True, capture_output=True, text=True, encoding='utf-8')
    return result.stdout

if __name__ == "__main__":
    topic = input("Enter the topic: ").strip()
    difficulty = input("Enter difficulty level (Easy, Medium, Hard): ").strip()
    try:
        num_questions = int(input("Enter the number of questions: ").strip())
        if num_questions <= 0:
            raise ValueError
    except ValueError:
        print("Please enter a valid number of questions.")
        exit()
    
    for i in range(num_questions):
        prompt = f"Generate a {difficulty} level question about {topic}, along with the correct answer."
        question = generate_text(prompt)
        print(question)
