# vara - Product Requirements Document (PRD)

> Detailed requirements for vara's digital safety platform

**Version:** 1.0
**Last Updated:** 2024-12-17
**Status:** Draft
**Parent Document:** [Product Brief](./product-brief.md)

---

## Table of Contents

1. [Overview](#overview)
2. [Release Scope](#release-scope)
3. [User Journeys](#user-journeys)
4. [Feature Requirements](#feature-requirements)
5. [Subscription Tiers](#subscription-tiers)
6. [Non-Functional Requirements](#non-functional-requirements)
7. [Integrations & Dependencies](#integrations--dependencies)
8. [Out of Scope](#out-of-scope)

---

## Overview

### Purpose

This PRD defines the detailed requirements for vara's MVP (v1.0) and outlines the roadmap for subsequent releases. It translates the Product Brief vision into implementable specifications.

### Product Summary

vara is a mobile-first digital safety platform that helps women:
- **Discover** existing exposure through comprehensive scanning
- **Monitor** for new threats across multiple data sources
- **Respond** with guided actions and evidence collection
- **Learn** through an AI assistant and support resources

### Target Users

| Segment | Primary Needs |
|---------|---------------|
| **General women 18-45** | Proactive protection, peace of mind |
| **Content creators** | Image monitoring, impersonation detection |
| **Dating app users** | Identity verification, stalking prevention |
| **Harassment survivors** | Ongoing monitoring, evidence collection |

---

## Release Scope

### MVP (v1.0) - Core Protection

**In Scope:**
- Image-based threat detection (deepfakes, photo scraping, non-consensual imagery)
- Identity threat monitoring (impersonation, fake profiles)
- Data exposure monitoring (breach databases, privacy leaks)
- Basic harassment monitoring (foundation for v1.1)
- Progressive onboarding with real-time scanning
- Tiered subscription model with free trial
- AI support assistant
- Configurable alerts

**Out of Scope for MVP:**
- Advanced harassment/stalking features (v1.1)
- Community features beyond support resources
- B2B/enterprise features
- Tablet-optimized layouts

### v1.1 - Enhanced Harassment Protection

- Cross-platform harassment tracking
- Pattern detection and escalation alerts
- Evidence collection and export
- Trusted contacts sharing

### v1.2+ - Advanced Features

- Real-time deepfake detection improvements
- Platform reporting automation
- B2B2C partnerships
- International expansion features

---

## User Journeys

### Journey 1: New User Onboarding

```
Download App → Create Account → Minimal Setup → Initial Scan → View Results → Get Protection Plan → Start Trial
```

**Step-by-step flow:**

| Step | User Action | System Response |
|------|-------------|-----------------|
| 1. Welcome | Opens app for first time | Show value proposition, "Get Protected" CTA |
| 2. Account | Creates account (email/social) | Secure account creation, verify email |
| 3. Minimal Input | Provides name + 1-3 photos | Store securely, explain usage |
| 4. Scan Initiation | Taps "Start Scan" | Begin real-time scanning with progress |
| 5. Live Progress | Watches scan progress | Show each source being checked with live updates |
| 6. Results | Reviews exposure report | Present findings with severity levels |
| 7. Protection Plan | Views recommended actions | Personalized plan based on findings |
| 8. Trial Start | Begins free trial | Full access activated |

**Progressive Data Collection (post-onboarding):**
- Prompt for social media handles after first scan
- Request email/phone for breach monitoring
- Suggest additional photos for better coverage
- Offer account connections for deeper monitoring

### Journey 2: Threat Detection & Response

```
Threat Detected → Alert Sent → User Reviews → Takes Action → Marks Resolved
```

| Step | System Action | User Action |
|------|---------------|-------------|
| 1. Detection | Identifies potential threat | - |
| 2. Classification | Assigns severity (Critical/High/Medium/Low) | - |
| 3. Alert | Sends notification via user's preferred channel | Receives alert |
| 4. Review | Displays threat details in app | Opens app, reviews finding |
| 5. Guidance | Shows recommended actions | Reviews options |
| 6. Action | Provides step-by-step remediation | Follows steps / requests help |
| 7. Resolution | Tracks action completion | Marks as addressed |
| 8. Monitoring | Continues watching for related threats | Receives confirmation |

### Journey 3: Regular Check-in

```
Opens App → Views Dashboard → Reviews Status → Checks Recent Activity → Adjusts Settings
```

**Dashboard shows:**
- Overall protection score/status
- Recent scan results
- Active monitoring summary
- New findings since last visit
- Quick actions

### Journey 4: AI Assistant Interaction

```
Has Question → Opens Assistant → Asks Question → Gets Answer → Takes Action
```

**Assistant capabilities:**
- Explains threats in plain language
- Answers "what should I do?" questions
- Provides emotional support and resources
- Guides through remediation steps
- Connects to external support resources

---

## Feature Requirements

### F1: User Authentication & Account

| ID | Requirement | Priority | Tier |
|----|-------------|----------|------|
| F1.1 | Email/password registration | Must | All |
| F1.2 | Social login (Google, Apple) | Must | All |
| F1.3 | Email verification | Must | All |
| F1.4 | Password reset flow | Must | All |
| F1.5 | Biometric login (Face ID, fingerprint) | Should | All |
| F1.6 | Two-factor authentication | Should | All |
| F1.7 | Account deletion with data purge | Must | All |

### F2: Onboarding & Data Input

| ID | Requirement | Priority | Tier |
|----|-------------|----------|------|
| F2.1 | Name input (first, last, maiden, aliases) | Must | All |
| F2.2 | Photo upload (1-10 images) | Must | All |
| F2.3 | Camera capture for photos | Should | All |
| F2.4 | Social media handle input | Must | All |
| F2.5 | Email address input (for breach monitoring) | Should | All |
| F2.6 | Phone number input (for breach monitoring) | Should | Premium+ |
| F2.7 | Progressive prompts for additional data | Must | All |
| F2.8 | Data usage explanations | Must | All |
| F2.9 | Skip/later options for non-essential fields | Must | All |

### F3: Scanning Engine

| ID | Requirement | Priority | Tier |
|----|-------------|----------|------|
| F3.1 | Initial comprehensive scan | Must | All |
| F3.2 | Real-time scan progress display | Must | All |
| F3.3 | Public web image search | Must | All |
| F3.4 | Social media surface scan | Must | All |
| F3.5 | Data breach database check | Must | Premium+ |
| F3.6 | Dark web monitoring | Should | Pro |
| F3.7 | Deepfake detection analysis | Must | Premium+ |
| F3.8 | Impersonation detection | Must | All |
| F3.9 | Scan scheduling (manual re-scan) | Must | All |
| F3.10 | Background continuous monitoring | Must | Premium+ |

### F4: Threat Detection & Classification

| ID | Requirement | Priority | Tier |
|----|-------------|----------|------|
| F4.1 | Image match detection | Must | All |
| F4.2 | Deepfake/synthetic image detection | Must | Premium+ |
| F4.3 | Fake profile detection | Must | All |
| F4.4 | Breach exposure detection | Must | Premium+ |
| F4.5 | Privacy leak detection | Must | Premium+ |
| F4.6 | Severity classification (Critical/High/Medium/Low) | Must | All |
| F4.7 | Confidence scoring | Should | All |
| F4.8 | False positive marking | Must | All |
| F4.9 | Basic harassment indicator detection | Should | All |

### F5: Alerts & Notifications

| ID | Requirement | Priority | Tier |
|----|-------------|----------|------|
| F5.1 | Push notification support | Must | All |
| F5.2 | In-app notification center | Must | All |
| F5.3 | Email notification option | Must | All |
| F5.4 | SMS notification option | Should | Premium+ |
| F5.5 | Notification preferences configuration | Must | All |
| F5.6 | Severity-based notification filtering | Should | All |
| F5.7 | Quiet hours / Do not disturb | Should | All |
| F5.8 | Alert aggregation (batch low-severity) | Should | All |

### F6: Dashboard & Reporting

| ID | Requirement | Priority | Tier |
|----|-------------|----------|------|
| F6.1 | Protection status overview | Must | All |
| F6.2 | Recent findings display | Must | All |
| F6.3 | Threat history | Must | All |
| F6.4 | Active monitoring status | Must | All |
| F6.5 | Action items / to-do list | Must | All |
| F6.6 | Exposure report visualization | Should | All |
| F6.7 | Trend analysis over time | Should | Premium+ |

### F7: Remediation & Actions

| ID | Requirement | Priority | Tier |
|----|-------------|----------|------|
| F7.1 | Guided remediation steps | Must | All |
| F7.2 | Step-by-step instructions | Must | All |
| F7.3 | Mark action as complete | Must | All |
| F7.4 | Platform reporting links | Should | Premium+ |
| F7.5 | One-click report generation | Should | Pro |
| F7.6 | Evidence screenshot capture | Should | Premium+ |
| F7.7 | Evidence export (PDF) | Should | Pro |
| F7.8 | Legal resource links | Should | All |

### F8: AI Support Assistant

| ID | Requirement | Priority | Tier |
|----|-------------|----------|------|
| F8.1 | Chat interface | Must | All |
| F8.2 | Natural language understanding | Must | All |
| F8.3 | Threat explanation | Must | All |
| F8.4 | Action guidance | Must | All |
| F8.5 | Emotional support responses | Should | All |
| F8.6 | Crisis resource escalation | Must | All |
| F8.7 | Conversation history | Should | All |
| F8.8 | Handoff to human support (if available) | Could | Pro |

### F9: Support Resources

| ID | Requirement | Priority | Tier |
|----|-------------|----------|------|
| F9.1 | Help center / FAQ | Must | All |
| F9.2 | Safety guides and articles | Must | All |
| F9.3 | Crisis hotline links | Must | All |
| F9.4 | External resource directory | Should | All |
| F9.5 | In-app tutorials | Should | All |

### F10: Settings & Preferences

| ID | Requirement | Priority | Tier |
|----|-------------|----------|------|
| F10.1 | Profile management | Must | All |
| F10.2 | Monitored data management (add/remove) | Must | All |
| F10.3 | Notification preferences | Must | All |
| F10.4 | Privacy settings | Must | All |
| F10.5 | Subscription management | Must | All |
| F10.6 | Data export | Should | All |
| F10.7 | Account deletion | Must | All |

### F11: Subscription & Payments

| ID | Requirement | Priority | Tier |
|----|-------------|----------|------|
| F11.1 | Free trial initiation | Must | All |
| F11.2 | Trial expiration handling | Must | All |
| F11.3 | In-app purchase (iOS) | Must | All |
| F11.4 | Google Play billing (Android) | Must | All |
| F11.5 | Subscription tier selection | Must | All |
| F11.6 | Upgrade/downgrade flow | Must | All |
| F11.7 | Billing history | Should | All |
| F11.8 | Annual vs monthly toggle | Should | All |

---

## Subscription Tiers

### Tier Structure

| Feature | Basic (~$5/mo) | Premium (~$15/mo) | Pro (~$30/mo) |
|---------|----------------|-------------------|---------------|
| **Onboarding scan** | Yes | Yes | Yes |
| **Public web image search** | Yes | Yes | Yes |
| **Social surface monitoring** | Limited | Full | Full |
| **Impersonation detection** | Basic | Advanced | Advanced |
| **Deepfake detection** | - | Yes | Yes |
| **Breach monitoring** | - | Yes | Yes |
| **Dark web monitoring** | - | - | Yes |
| **Monitoring frequency** | Weekly | Daily | Real-time |
| **Guided remediation** | Yes | Yes | Yes |
| **Platform reporting** | - | Yes | Yes |
| **Evidence collection** | - | - | Yes |
| **Evidence export** | - | - | Yes |
| **AI assistant** | Basic | Full | Full |
| **SMS alerts** | - | Yes | Yes |
| **Priority support** | - | - | Yes |

### Free Trial

- **Duration:** 7 days (or 14 days - TBD based on conversion testing)
- **Access level:** Full Premium features
- **Payment required:** Credit card at signup (standard practice)
- **Conversion prompt:** At day 5 and day 7

---

## Non-Functional Requirements

### NFR1: Performance

| ID | Requirement | Target |
|----|-------------|--------|
| NFR1.1 | App launch time | < 2 seconds |
| NFR1.2 | Initial scan completion | < 5 minutes |
| NFR1.3 | Screen load time | < 1 second |
| NFR1.4 | Alert delivery latency | < 1 minute for Critical |
| NFR1.5 | API response time | < 500ms (95th percentile) |

### NFR2: Security

| ID | Requirement | Target |
|----|-------------|--------|
| NFR2.1 | Data encryption at rest | AES-256 |
| NFR2.2 | Data encryption in transit | TLS 1.3 |
| NFR2.3 | User photos stored encrypted | Yes |
| NFR2.4 | No plain-text PII in logs | Yes |
| NFR2.5 | Regular security audits | Quarterly |
| NFR2.6 | Penetration testing | Annual minimum |

### NFR3: Privacy & Compliance

| ID | Requirement | Target |
|----|-------------|--------|
| NFR3.1 | GDPR compliance | Required |
| NFR3.2 | CCPA compliance | Required |
| NFR3.3 | SOC 2 Type II | Target within 12 months |
| NFR3.4 | Privacy policy | Required at launch |
| NFR3.5 | Data retention policy | Configurable, default 2 years |
| NFR3.6 | Right to deletion | < 30 days |
| NFR3.7 | Data portability | Export within 72 hours |

### NFR4: Reliability

| ID | Requirement | Target |
|----|-------------|--------|
| NFR4.1 | Uptime | 99.9% |
| NFR4.2 | Disaster recovery | RPO < 1 hour, RTO < 4 hours |
| NFR4.3 | Graceful degradation | Core features work if integrations fail |

### NFR5: Scalability

| ID | Requirement | Target |
|----|-------------|--------|
| NFR5.1 | Concurrent users | Support 100K+ |
| NFR5.2 | Data storage growth | Plan for 10x in year 1 |
| NFR5.3 | Scan queue handling | Auto-scaling |

### NFR6: Accessibility

| ID | Requirement | Target |
|----|-------------|--------|
| NFR6.1 | Screen reader support | WCAG 2.1 AA |
| NFR6.2 | Dynamic text sizing | iOS/Android standards |
| NFR6.3 | Color contrast | WCAG 2.1 AA |
| NFR6.4 | Touch target sizes | 44x44pt minimum |

### NFR7: Localization

| ID | Requirement | Target |
|----|-------------|--------|
| NFR7.1 | Launch language | English |
| NFR7.2 | Localization-ready architecture | Yes |
| NFR7.3 | RTL support (future) | Architecture supports |

---

## Integrations & Dependencies

### External Services (Confirmed)

| Service | Purpose | Priority |
|---------|---------|----------|
| **Have I Been Pwned API** | Breach database queries | Must |
| **Reverse image search** | Image matching (TinEye, Google Vision, etc.) | Must |
| **Social media APIs** | Public profile monitoring | Should |
| **Push notification service** | Firebase/APNs | Must |
| **Payment processing** | Stripe / RevenueCat | Must |
| **Analytics** | Usage tracking | Must |
| **Crash reporting** | Error monitoring | Must |

### Services Requiring Research

| Category | Options to Evaluate |
|----------|---------------------|
| **Deepfake detection** | Microsoft Video Authenticator, Sensity, custom ML |
| **Dark web monitoring** | SpyCloud, Identity Guard, custom crawling |
| **AI assistant** | OpenAI, Anthropic, custom fine-tuned model |
| **Image hashing** | PhotoDNA, pHash, custom implementation |

### Platform Dependencies

| Platform | Requirements |
|----------|--------------|
| **iOS** | iOS 15+ (covers ~95% of devices) |
| **Android** | Android 10+ (API 29+) |
| **Expo SDK** | Latest stable |

---

## Out of Scope

### Not in MVP

| Item | Reason | Target Release |
|------|--------|----------------|
| Advanced harassment tracking | Complex, needs v1 learnings | v1.1 |
| Community forums | MVP is solo experience | v2.0+ |
| Trusted contacts feature | Adds complexity | v1.1 |
| Tablet-optimized UI | Mobile-first focus | v1.2 |
| Web dashboard | Mobile-only for MVP | v2.0 |
| B2B/enterprise features | Consumer focus first | v2.0+ |
| Automated platform reporting | Partnership dependent | v1.2+ |
| International languages | English-first | v1.3+ |

### Explicitly Not Planned

| Item | Reason |
|------|--------|
| Device security features | Out of product scope (devices, not people) |
| VPN services | Out of product scope |
| Password manager | Out of product scope |
| Social media posting | Not aligned with protection focus |

---

## Acceptance Criteria Summary

### MVP Launch Criteria

- [ ] User can complete onboarding and initial scan
- [ ] Scan covers image matching, impersonation, and breach data
- [ ] Threats are classified and displayed with appropriate severity
- [ ] User receives alerts via at least one channel
- [ ] Guided remediation is available for all threat types
- [ ] AI assistant answers basic questions
- [ ] Subscription purchase works on both iOS and Android
- [ ] Free trial converts to paid correctly
- [ ] GDPR and CCPA compliance verified
- [ ] Security audit completed
- [ ] Performance targets met
- [ ] Accessibility requirements met

---

## Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2024-12-17 | BMAD Workflow | Initial PRD |

---

## Appendix

### Glossary

| Term | Definition |
|------|------------|
| **Deepfake** | AI-generated synthetic media that manipulates a person's likeness |
| **Impersonation** | Fake profiles or accounts using someone's identity |
| **Breach** | Unauthorized access to data, often leaked publicly |
| **Dark web** | Encrypted networks not indexed by search engines |
| **Remediation** | Actions taken to address or resolve a threat |
| **Progressive disclosure** | UX pattern of revealing information/options gradually |

### Related Documents

- [Product Brief](./product-brief.md)
- UX Design (TBD)
- Architecture (TBD)
- Epics & Stories (TBD)
