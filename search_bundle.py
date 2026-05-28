import re

with open("D:\\Downloads\\ExpenseTracker-main\\index-M1OjyoqM.js", "r", encoding="utf-8") as f:
    js = f.read()

print("Length of JS bundle:", len(js))

# Let's search for "Login error:"
pos = js.find("Login error:")
if pos != -1:
    print(f"Found 'Login error:' at position {pos}")
    # Print 500 chars before and after
    start = max(0, pos - 1000)
    end = min(len(js), pos + 1000)
    print("Snippet around 'Login error:':\n")
    print(js[start:end])
else:
    print("Could not find 'Login error:'")
