with open("D:\\Downloads\\ExpenseTracker-main\\index-M1OjyoqM.js", "r", encoding="utf-8") as f:
    js = f.read()

# Let's find some exact boundaries
def get_slice_by_kw(start_kw, end_kw, offset_start=0, offset_end=0):
    start_pos = js.find(start_kw)
    if start_pos == -1:
        return f"Could not find start: {start_kw}"
    end_pos = js.find(end_kw, start_pos)
    if end_pos == -1:
        return f"Could not find end: {end_kw} after start"
    return js[start_pos + offset_start : end_pos + offset_end]

# 1. Login
# Starts at "L2e="
# Ends just before "I2e="
login_code = get_slice_by_kw("L2e=({API_URL:", "I2e=({API_URL:")
with open("D:\\Downloads\\ExpenseTracker-main\\raw_login.js", "w", encoding="utf-8") as f:
    f.write(login_code)

# 2. Signup
# Starts at "I2e="
# Ends just before "Ime=" or "ProfilePage"? Let's search what is after Signup.
# In the bundle, the next keyword after I2e is probably something else. Let's find it.
signup_code = get_slice_by_kw("I2e=({API_URL:", "const ")
# Wait, let's search what starts after I2e. Let's find all occurrences of "I2e=" and print what follows.
pos = js.find("I2e=({API_URL:")
if pos != -1:
    # Let's search for next component or function definition, e.g. "const " or "function " or similar
    # Let's just grab 15000 characters after I2e
    with open("D:\\Downloads\\ExpenseTracker-main\\raw_signup.js", "w", encoding="utf-8") as f:
        f.write(js[pos : pos + 10000])

print("Saved raw files")
