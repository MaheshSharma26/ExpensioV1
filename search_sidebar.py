with open("D:\\Downloads\\ExpenseTracker-main\\index-M1OjyoqM.js", "r", encoding="utf-8") as f:
    js = f.read()

pos = js.find("ZQ=")
if pos != -1:
    print("Found 'ZQ=' at position:", pos)
    with open("D:\\Downloads\\ExpenseTracker-main\\raw_sidebar.js", "w", encoding="utf-8") as f:
        f.write(js[pos : pos + 10000])
else:
    print("Could not find 'ZQ='")
