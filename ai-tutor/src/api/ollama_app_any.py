import subprocess
import re
import json

def generate_text_any(prompt):
    command = f'ollama run llama3.2 "Give the answer to this question \'{prompt}\'"'
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

    return result.stdout