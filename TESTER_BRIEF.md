# ClubOps — Tester brief (public demo)

**Share this link:** [https://club-ops-fawn.vercel.app](https://club-ops-fawn.vercel.app)

## What this is

ClubOps is a **demonstration** of volunteer club management software, branded for **Arbroath Gymnastics Club**. Everything is **fake data**. It is **not** a live system and **not** secure for real member or financial data.

- Changes in a session are **not saved permanently** — reloading the page resets demo changes.
- Email, exports, bank import, Gift Aid submission, and file uploads are **simulated only**.
- The **role switcher** in the top bar shows how different volunteers might see different areas — it is a **preview only**, not real security.

Optional guided tour: [/demo-script](https://club-ops-fawn.vercel.app/demo-script)  
About demo mode: [/demo](https://club-ops-fawn.vercel.app/demo)

---

## Five tasks (about 20–30 minutes)

### 1. Dashboard and priorities
Open the dashboard. Read the welcome banner, then scroll to **Today’s priorities**.  
Click **View today’s priorities** or open one priority card.

**We want to know:** Is it obvious what to do first? Does the dashboard feel useful for a busy volunteer?

### 2. Members
Go to **Members** → open any member (e.g. Jordan Reeves).  
Check the **summary panel** at the top (fees, attendance, Gift Aid, needs-attention).  
Try the **Needs attention** filter on the list. Switch to **Coach** and open a medical-flag member — confirm restricted medical text.

**We want to know:** Can you quickly see who needs follow-up? Is the profile useful for a volunteer secretary?

### 3. Finance and Gift Aid (treasurer view)
Use the role switcher → choose **Treasurer** (or Club Treasurer).  
Open **Finance** → use **Use sample statement** on the Start here panel → follow the guided import wizard → confirm or reject matches on the review page. Then open **Gift Aid**.

**We want to know:** Is the bank statement review journey clear? Do you understand no real bank is connected? Would a treasurer trust this as a demo?

### 4. Communications
Go to **Communications** → **Compose** (or open [/communications/compose?preset=gift-aid](https://club-ops-fawn.vercel.app/communications/compose?preset=gift-aid)).  
Review the preview — do **not** expect a real email to send.

**We want to know:** Is composing a parent message clear? Would secretaries trust this workflow?

### 5. Reports and permissions
Switch role to **Coach**, open **Finance** and **Reports → Export centre**.  
Then switch to **Club Secretary/Admin** and try Export centre again.

**We want to know:** Do restricted areas feel honest (locked/summary vs full)? Any areas that should be hidden but aren’t?

---

## Questions for feedback

Please reply with brief notes on any of these:

1. **First impression** — Does it look professional and on-brand for the club?
2. **Navigation** — Can you find things without getting lost (sidebar, mobile menu, breadcrumbs)?
3. **Mobile** — If you tried on a phone, was it usable?
4. **Role switcher** — Did permission differences make sense for Coach vs Treasurer vs Secretary?
5. **Trust** — Did you always understand this is demo/fake data?
6. **Missing** — What would you expect a real club system to do that this demo doesn’t show?
7. **Deal-breakers** — Anything that would stop you recommending further exploration?

---

## Please do not

- Enter real member, parent, or child data.
- Assume this is production-ready or GDPR-compliant for live use.
- Share the link publicly beyond your test group without the club’s agreement.

Thank you — your feedback directly shapes the next iteration.
