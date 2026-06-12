# STELIS Security Architecture v1

## Core Security Belief

STELIS must protect owner trust before anything else.

The system may help owners understand cash, balances, transactions, fees, risks,
and financial movement, but STELIS must not become a place where money can be
moved without a deliberate future decision.

## Bank Integration Rule

STELIS observes money.

STELIS does not move money.

For the first financial architecture:

- STELIS may read balances.
- STELIS may read transactions.
- STELIS may read account metadata.
- STELIS may read fees and financial activity.
- STELIS must not initiate payments.
- STELIS must not transfer funds.
- STELIS must not store bank usernames.
- STELIS must not store bank passwords.
- STELIS must not expose bank tokens to the browser or mobile app.

## Plain-English Model

STELIS should work like a trusted financial analyst.

It can look at the bank statement and explain what matters.

It cannot sign checks.

It cannot move cash.

It cannot approve transfers.

## Security Layers

### 1. Least Privilege

Every integration must request only the permissions needed for the decision.

If STELIS only needs balances and transactions, it must not request payment,
transfer, or debit permissions.

### 2. Read-Only Financial Access

Bank integrations should be configured as read-only whenever the provider allows
it.

Any future write-capable financial feature must be treated as a separate product
line with separate approval, separate architecture, and separate security review.

### 3. OAuth and Open Banking

Users should authorize bank access through the bank or a trusted financial data
provider.

STELIS should not ask owners to type bank passwords into STELIS.

### 4. Server-Side Token Storage

Financial access tokens must live only on the server.

The website and mobile app should request financial insights from the STELIS
backend, not call the bank provider directly with secret credentials.

### 5. Encryption

Sensitive tokens and financial identifiers must be encrypted at rest.

All bank-related traffic must use HTTPS in production.

### 6. Permission Boundaries

Owners, managers, accountants, and staff must have different permissions.

Not every user should see bank balances.

Not every user should see transactions.

Not every user should see supplier payment exposure.

### 7. Audit Logs

STELIS must record security-relevant events, including:

- Bank connection created.
- Bank connection removed.
- Balance data refreshed.
- Transaction data refreshed.
- User viewed sensitive financial data.
- Permission changed.
- Login attempt failed.
- Suspicious activity detected.

Audit logs must help answer:

Who did it?

When did it happen?

What changed?

Was money movement possible?

### 8. No Secrets in Frontend Code

The Next.js website, iPhone app, and Android app must not contain provider
secrets, API keys, bank tokens, or signing credentials.

If a value can be viewed by the browser or mobile app, it must be treated as
public.

### 9. AI Data Safety

AI systems should receive only the financial data needed to produce an insight.

The STELIS Brain should prefer structured summaries over raw sensitive records
when possible.

Examples:

- Good: "Cash decreased 8% because supplier payments cleared."
- Avoid unless necessary: raw account numbers, full transaction identifiers, or
  unnecessary personally identifiable information.

### 10. Fail Closed

If STELIS is uncertain whether a user has permission to see something, it should
deny access.

If a bank connection fails, STELIS should show a calm status and explain what is
missing.

It should not guess.

## Financial Data Flow

1. Owner opens STELIS.
2. Owner chooses to connect a bank account.
3. STELIS sends the owner to the bank or trusted provider authorization flow.
4. Owner approves read-only financial data access.
5. Provider gives STELIS a temporary public authorization result.
6. STELIS backend exchanges it for a server-side access token.
7. STELIS encrypts and stores the token on the server.
8. STELIS backend fetches balances and transactions.
9. STELIS Brain converts raw data into decision intelligence.
10. Website and mobile app display only the insight the user is allowed to see.

## Product Experience Rule

Security must feel calm, not scary.

The owner should understand:

- What data STELIS can see.
- Why STELIS needs it.
- Who can view it.
- How to disconnect it.
- That STELIS cannot move money.

## Future Security Requirements

Before production bank integrations, STELIS should add:

- Formal authentication system.
- Role-based access control.
- Multi-factor authentication for owners.
- Encrypted secrets management.
- Database row-level access rules.
- Security headers.
- Rate limiting.
- Audit log storage.
- Provider webhook verification.
- Secure session management.
- Penetration testing.
- Backup and recovery plan.
- Incident response plan.

## Standards To Follow

STELIS security work should be guided by:

- OWASP Application Security Verification Standard.
- OWASP Top 10.
- OAuth 2.0 Security Best Current Practice.
- Financial-grade API principles.
- Provider-specific bank integration requirements.

## Final Rule

STELIS must earn the right to touch financial data.

The first version should be read-only, explainable, encrypted, permissioned, and
audited.

Trust is the product.
