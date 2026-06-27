#!/usr/bin/env bash
# Live demo smoke test — run against production URL before sharing with testers.
set -euo pipefail

BASE="${1:-https://club-ops-fawn.vercel.app}"
FAIL=0
PASS=0

check_route() {
  local path="$1"
  local label="${2:-$path}"
  local code
  code=$(curl -sS -o /dev/null -w "%{http_code}" "${BASE}${path}" || echo "000")
  if [[ "$code" == "200" || "$code" == "307" || "$code" == "308" ]]; then
    echo "PASS  $code  $label"
    PASS=$((PASS + 1))
  else
    echo "FAIL  $code  $label"
    FAIL=$((FAIL + 1))
  fi
}

check_content() {
  local path="$1"
  local needle="$2"
  local label="$3"
  if curl -sS "${BASE}${path}" | grep -qi "$needle"; then
    echo "PASS  content  $label"
    PASS=$((PASS + 1))
  else
    echo "FAIL  content  $label (missing: $needle)"
    FAIL=$((FAIL + 1))
  fi
}

echo "=== ClubOps smoke test ==="
echo "Base URL: $BASE"
echo ""

echo "--- Core routes ---"
check_route "/" "Home redirect"
check_route "/dashboard" "Dashboard"
check_route "/demo" "About demo"
check_route "/demo-script" "Demo script"

echo ""
echo "--- Demo script steps (1–10) ---"
check_route "/dashboard" "Step 1 Dashboard"
check_route "/members/mem-002" "Step 2 Member profile"
check_route "/attendance/register" "Step 3 Attendance register"
check_route "/finance/import" "Step 4 Finance import"
check_route "/finance/import/review" "Step 4b Import review"
check_route "/gift-aid/eligible-donations" "Step 5 Gift Aid"
check_route "/communications/compose?preset=gift-aid" "Step 6 Comms compose"
check_route "/documents/scanned-notes" "Step 7 Documents"
check_route "/staff/qualifications" "Step 8 Staff qualifications"
check_route "/fundraising/businesses" "Step 9 Fundraising"
check_route "/reports/export-centre" "Step 10 Export centre"

echo ""
echo "--- Module dashboards ---"
for path in /members /attendance /finance /gift-aid /communications /documents /staff /fundraising /reports /settings /calendar /audit; do
  check_route "$path" "$path"
done

echo ""
echo "--- Demo safety content ---"
check_content "/demo" "fake data" "Demo page mentions fake data"
check_content "/demo" "Simulated" "Demo page mentions simulated integrations"
check_content "/finance/import" "Demo" "Finance import demo notice"
check_content "/reports/export-centre" "Export" "Export centre loads"

echo ""
echo "--- Summary ---"
echo "Passed: $PASS"
echo "Failed: $FAIL"
if [[ "$FAIL" -gt 0 ]]; then
  exit 1
fi
echo "All smoke checks passed."
