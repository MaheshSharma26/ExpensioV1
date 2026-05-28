import sys

# Reconfigure stdout to use utf-8
if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")

with open("C:\\Users\\RUPAM\\.gemini\\antigravity-ide\\brain\\23fc8d7b-a5bd-453c-a55e-d182590fc486\\.system_generated\\tasks\\task-278.log", "r", encoding="utf-8", errors="replace") as f:
    log = f.read()

print("Log Length:", len(log))
print("Last 1500 characters of log:\n")
# Filter non-ASCII if reconfigure didn't work, just in case
clean_log = "".join([c if ord(c) < 128 else "?" for c in log])
print(clean_log[-1500:])
