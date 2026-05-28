with open("D:\\Downloads\\ExpenseTracker-main\\index-M1OjyoqM.js", "r", encoding="utf-8") as f:
    js = f.read()

searches = [
    ("Layout", "Failed to fetch transactions", 3000, 3000),
    ("Navbar", "Failed to load user in navbar", 2000, 2000),
    ("Sidebar", "mobileSidebar", 2000, 2000),
    ("Login", "Welcome Back", 2000, 2000),
    ("Signup", "Create Account", 2000, 2000),
    ("Profile", "Change Password", 3000, 3000),
    ("Dashboard", "Expense Distribution", 4000, 4000)
]

output = []
for name, kw, before, after in searches:
    pos = js.find(kw)
    if pos != -1:
        output.append(f"\n==================== {name} (keyword: '{kw}', pos: {pos}) ====================")
        start = max(0, pos - before)
        end = min(len(js), pos + after)
        output.append(js[start:end])
    else:
        output.append(f"\nCould not find keyword '{kw}' for {name}")

with open("D:\\Downloads\\ExpenseTracker-main\\extracted_components.txt", "w", encoding="utf-8") as f:
    f.write("\n".join(output))

print("Saved extracted_components.txt")
