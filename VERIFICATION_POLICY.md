# REXX Verification Policy

## Selective Public Verification

Only signed REXX outputs that are used in **compliance contexts** are listed in the public `/verify/` folder.

### What counts as a compliance context:
- Legal or regulatory documentation
- Public trust or transparency claims
- Executive dashboards presented to oversight bodies
- Formal customer-facing representations (e.g., “REXX-certified interaction”)

These sessions are published using a **SHA-256 hash of the session_fingerprint** to protect user identity and prevent reverse lookup.

---

## Internal Traceability

All other REXX sessions remain **internally traceable**. This means they are:
- Signed
- Stored
- Detectable
- Auditable

But they are **not publicly listed**.

This preserves structural traceability without exposing user-level metadata.

---

## Tamper Resistance

All REXX outputs include:
- `rexx_license_id`
- `session_fingerprint`
- `session_signature` (HMAC)

Any output lacking these fields - or containing an invalid or unverifiable signature - is considered **structurally invalid**.

This ensures that even unlisted sessions cannot be forged, reused, or falsified.

---

## Summary

| Type of Session                        | Listed in `/verify/` | Internally Traceable | Tamper-Proof |
|---------------------------------------|-----------------------|----------------------|--------------|
| Compliance submission                 | ✅ Yes                | ✅ Yes               | ✅ Yes       |
| Public trust claim (e.g. “Certified”) | ✅ Yes                | ✅ Yes               | ✅ Yes       |
| Internal-only operation               | ❌ No                 | ✅ Yes               | ✅ Yes       |
| Fake or altered output                | ❌ No                 | ❌ No                | ❌ Invalid   |

---

This policy ensures that REXX remains structurally enforceable without requiring full visibility.  
**Trust must be verifiable—but never performative.**
