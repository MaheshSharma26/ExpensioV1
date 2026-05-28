import urllib.request

url = "https://tracker-expense-vercel-frontend.vercel.app/assets/index-M1OjyoqM.js"
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
}

print("Downloading React bundle...")
try:
    req = urllib.request.Request(url, headers=headers)
    with urllib.request.urlopen(req, timeout=30) as res:
        content = res.read()
        print(f"Success! Downloaded {len(content)} bytes.")
        with open("D:\\Downloads\\ExpenseTracker-main\\index-M1OjyoqM.js", "wb") as f:
            f.write(content)
        print("Saved to index-M1OjyoqM.js")
except Exception as e:
    print("Failed to download:", e)
