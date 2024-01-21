# main.py

import sys

# Retrieve the Python code from command-line arguments
python_code = sys.argv[1]

print("Received Python code:from python", python_code)

try:
    exec(python_code)
    print("Execution completed successfully")
except Exception as e:
    # Print any exception that occurred during execution
    print("Error:", e)
