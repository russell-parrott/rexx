# REXX LICENSING MODEL v1.0  
**“No licence, no proof”**

REXX is the emotional compliance layer for service systems.  
It makes refusal, escalation, exit, and emotional breach structurally visible—without simulation, sentiment theatre, or manual empathy scripting.

The doctrine is open. The code is public. The schema is published.  
Anyone may run the logic, interpret signals, and apply the enforcement model inside their own systems.

But only licensed implementations may:
- Attach the REXX Compliance Seal  
- Output cryptographically verifiable fingerprints  
- Claim audit-grade traceability  
- Use REXX in regulatory, contractual, or public-facing claims  

This licensing model does not restrict access to functionality.  
It restricts the right to claim trust.

REXX is not a tool. It is a standard.  
Compliance is not symbolic. It is structural.

Licensed systems do not just run REXX — they prove they have nothing to hide.

---

## LICENSING

### Free Tier — Fully Functional, Structurally Unverifiable

```json
{
  "rexx_license_id": null,
  "session_fingerprint": null,
  "compliance_vector": {
    "refusal_visible": true,
    "emotional_breach_scored": true,
    "license_valid": false
  }
}
```

- Use case: Testing, development, internal use  
- No redactions: All output fields remain visible  
- But: No valid fingerprint, no license ID, no verifiable signature  
- Cannot be used in legal, regulatory, or customer-facing claims  
- Tampering is detectable: Output will fail verification  

The free tier lets you run the logic. It does not let you claim compliance.

---

### Licensed Tier — $10,000/year  
**Verifiable, enforceable, audit-grade output**

```json
{
  "rexx_license_id": "ORG-7481-EU",
  "session_fingerprint": "C7X9-W8G4-TR2L",
  "session_signature": "98A1F3C4D72B",
  "compliance_vector": {
    "refusal_visible": true,
    "emotional_breach_scored": true,
    "license_valid": true
  }
}
```

Includes:
- Cryptographically signed outputs  
- Listing in the REXX Verified Register  
- Permission to use the REXX Compliance Seal  
- Access to audit-ready templates for:
  - GDPR Article 22  
  - FTC “Click to Cancel”  
  - UK Consumer Duty  

Only licensed outputs carry legal weight or survive regulatory inspection.

---

### Enterprise Tier — $20,000/year  
**Custom traceability and system integration**

Includes everything in the Licensed Tier, plus:
- Custom `compliance_vector` fields  
- Branded `rexx_license_id` (e.g. `"BANKCORP-REXX-COMPLIANT"`)  
- SIEM/SOC feed integration (e.g. Splunk, Datadog)  
- Private schema extension support  
- Output validation endpoint for internal compliance teams  

---

## STRUCTURAL ENFORCEMENT

All licensed outputs include:
- `rexx_license_id`  
- `session_fingerprint`  
- `session_signature` (HMAC-verified)

Free tier outputs are detectable and will fail verification.

**Verification URL:**  
`https://russell-parrott/rexx/verify/[session_fingerprint]`
