import urllib.request

url = "https://drive.google.com/uc?export=download&id=1qpUGGEtTSdEXkWKUBZRRNpTZ2W9X7PFZ"
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
}

req = urllib.request.Request(url, headers=headers)
with urllib.request.urlopen(req) as res:
    html = res.read().decode('utf-8', errors='replace')
    
print("Length of HTML:", len(html))
# Find all hrefs or confirm strings
import re
hrefs = re.findall(r'href="([^"]+)"', html)
print("All Hrefs:")
for h in hrefs:
    if "confirm" in h or "download" in h:
        print("  HREF:", h)

forms = re.findall(r'<form[^>]*action="([^"]+)"[^>]*>', html)
print("All Forms:")
for f in forms:
    print("  FORM Action:", f)
    
# Let's save it to inspect
with open("warning.html", "w", encoding="utf-8") as f:
    f.write(html)
print("Saved warning.html")
