import urllib.request
import urllib.parse
import re
import os

ids = [
    ("1ZGHHGCvNbFet-iwfQOEFtjACHsx5JFWT", "color.jsx"),
    ("1qpUGGEtTSdEXkWKUBZRRNpTZ2W9X7PFZ", "dummy.js"),
    ("12ZaBfEfEQ7CEQW_mRxluXCrw8_tuAaIi", "dummyStyles.js"),
    ("1BHNrxPLYYtAAazNR_ZTGdvFjev_Exgyv", "logo.png"),
    ("1nT3bQ6XiLouMgZylvPpDRpgMWxUcow87", "react.svg")
]

def download_file(file_id, default_name):
    url = f"https://drive.google.com/uc?export=download&id={file_id}"
    print(f"\nProcessing ID: {file_id}")
    
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    }
    
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, timeout=15) as response:
            content = response.read()
            
            # Check if it's a virus scan warning page
            html_text = ""
            try:
                html_text = content.decode('utf-8')
            except Exception:
                pass
            
            if html_text and ("Virus scan warning" in html_text or "download-form" in html_text):
                print("  [Warning] Detected Google Drive confirmation page. Parsing form inputs...")
                # Extract inputs
                # <input type="hidden" name="id" value="1qpUGGEtTSdEXkWKUBZRRNpTZ2W9X7PFZ">
                # We want name and value
                inputs = re.findall(r'<input type="hidden" name="([^"]+)" value="([^"]*)"', html_text)
                if not inputs:
                    # Try single quotes or variation
                    inputs = re.findall(r"<input type=['\"]hidden['\"] name=['\"]([^'\"]+)['\"] value=['\"]([^'\"]*)['\"]", html_text)
                
                if inputs:
                    params = {name: val for name, val in inputs}
                    print("  [Info] Extracted parameters:", params)
                    
                    query_str = urllib.parse.urlencode(params)
                    confirm_url = f"https://drive.usercontent.google.com/download?{query_str}"
                    print(f"  [Info] Downloading from confirm URL...")
                    
                    confirm_req = urllib.request.Request(confirm_url, headers=headers)
                    with urllib.request.urlopen(confirm_req, timeout=30) as confirm_response:
                        final_content = confirm_response.read()
                        disp = confirm_response.headers.get('Content-Disposition', '')
                        print(f"  [Success] Downloaded. Size: {len(final_content)} bytes")
                        return final_content, disp
                else:
                    print("  [Error] Could not extract form parameters!")
            else:
                disp = response.headers.get('Content-Disposition', '')
                print(f"  [Success] Direct download. Size: {len(content)} bytes")
                return content, disp
    except Exception as e:
        print(f"  [Error] Failed to download {file_id}: {e}")
    return None, None

for file_id, default_name in ids:
    data, disp = download_file(file_id, default_name)
    if data is not None:
        filename = default_name
        if disp:
            fn_match = re.search(r'filename="([^"]+)"', disp)
            if fn_match:
                filename = fn_match.group(1)
        
        # Save file to current directory or downloads
        out_path = f"D:\\Downloads\\ExpenseTracker-main\\{filename}"
        with open(out_path, "wb") as f:
            f.write(data)
        print(f"  Saved to {out_path}")
