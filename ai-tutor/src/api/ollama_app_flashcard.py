import subprocess
import re
import json

def generate_text_flashcard(prompt):
    command = f'ollama run llama3.2 "Generate 10 flash cards ( small question, one theory answer format, no options ) on the topic "{prompt}" in the format [Question] : Answer"'
    result = subprocess.run(
        command,
        shell=True,
        text=True,
        encoding='utf-8',
        stdin=subprocess.DEVNULL,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE
    )
    if result.returncode != 0:
        print(f"Error: {result.stderr}")
        return f"Error: {result.stderr}"

    print(result.stdout)
    return result.stdout