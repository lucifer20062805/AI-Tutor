import subprocess
def generate_text(prompt):
    command = f'ollama run llama3.2:1b "{prompt}"'
    result = subprocess.run(
        command,
        shell=True,
        text=True,
        encoding='utf-8',
        stdin=subprocess.DEVNULL,  # Prevents console interaction
        stdout=subprocess.PIPE,     # Captures standard output
        stderr=subprocess.PIPE      # Captures standard error
    )
    
    if result.returncode != 0:
        print(f"Error: {result.stderr}")
        return f"Error: {result.stderr}"
    
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
