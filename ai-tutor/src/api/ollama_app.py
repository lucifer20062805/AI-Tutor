import subprocess
import re
import json

def generate_text(prompt):
    command = f'ollama run llama3.2 "Generate a quiz on the topic "{prompt}" and the answers along with them in the format make options as A) B) etc and questions as 1. 2. 3. and answer as Answer:"'
    result = subprocess.run(
        command,
        shell=True,
        text=True,
        encoding='utf-8',
        stdin=subprocess.DEVNULL,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE
    )
    
    raw_output = result.stdout
    split_text = re.split(r'\d+\.\s', raw_output)[1:]
    if result.returncode != 0:
        print(f"Error: {result.stderr}")
        return f"Error: {result.stderr}"
    
    return split_text