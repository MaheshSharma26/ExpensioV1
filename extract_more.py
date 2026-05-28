import re

with open("D:\\Downloads\\ExpenseTracker-main\\index-M1OjyoqM.js", "r", encoding="utf-8") as f:
    js = f.read()

keywords = {
    "Layout": "income/get",
    "Navbar": "hK=",
    "Profile": "Change Password",
    "Dashboard": "Expense Distribution",
    "Sidebar": "Dashboard",
}

output = []
for name, kw in keywords.items():
    pos = js.find(kw)
    if pos != -1:
        output.append(f"\n==================== {name} (keyword: '{kw}', pos: {pos}) ====================")
        start = max(0, pos - 1500)
        end = min(len(js), pos + 1500)
        output.append(js[start:end])
    else:
        output.append(f"\nCould not find keyword '{kw}' for {name}")

with open("D:\\Downloads\\ExpenseTracker-main\\extracted_snippets_more.txt", "w", encoding="utf-8") as f:
    f.write("\n".join(output))
print("Saved extracted_snippets_more.txt")
