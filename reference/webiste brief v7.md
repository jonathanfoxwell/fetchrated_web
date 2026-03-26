# FETCHRATED
## Website Brief
### Version 7.0 — March 2026

**Complete Site Specification — National Pilot Programme**

---

## Document Overview

| Item | Detail |
|------|--------|
| **Purpose** | Define website architecture, design system, content strategy, and page specifications for the FetchRated national pilot programme site |
| **Supersedes** | Website Brief v5.0 and v6.0 in their entirety |
| **Companion Documents** | Brand Guide v2.1, Research Document v1.0, Sales Playbook v6, Membership Services v4, Area Growth Strategy v4 |
| **Audience** | Designer / Developer / Founder |
| **Research Basis** | Website Research Document v1.0 (March 2026) — comparator analysis, legitimacy signal research, dual-audience architecture, veterinary practice psychology, visual identity calibration |

---

## Version 7.0 Changes from v6

| Change | Previous (v5/v6) | v7 |
|--------|-----------------|-----|
| Document scope | v6 was a patch on v5; v5 was partial | Complete standalone specification |
| Mental model | Implicit product framing | Explicit programme framing throughout |
| Visual register (practice pages) | Warm cream, ambient shapes carried over | White backgrounds, illustration-free |
| Primary red | `#D44D5C` (warm rose) | `#B22222` (editorial red) — see Section 4 |
| Trust mark | Logo with badge descriptor | Defined mark: laurel boundary, editorial red star, monochrome treatment — see Section 7 |
| Meta descriptions | Not specified | Specified for every key page — see Section 3 |
| "For Practices" navigation | Listed but not prioritised | First-class primary nav item |
| How We Assess | P2 page (/about/how-we-verify) | P1 page (/how-we-assess), primary nav |
| About page | Generic | Named founder, founding story, programme mission |
| Coverage map | Not specified | Required element on /for-practices |
| Content depth | Aspirational | Minimum threshold defined, required before Phase 4 |
| Design inspiration | HubSpot | Programme-first: FHRS + Which? (practice register), FetchRated warmth (consumer register) |

---

## Contents

- Part 1: Foundation
- Part 2: Site Architecture
- Part 3: Search Snippet Strategy
- Part 4: Visual Design System
- Part 5: Page Specifications
- Part 6: Content Strategy
- Part 7: Trust Mark Specification
- Part 8: SEO Architecture
- Part 9: Technical Requirements
- Part 10: Legal & Compliance
- Part 11: Launch Priorities

---

# PART 1: FOUNDATION

---

## 1.1 What FetchRated Is

FetchRated is an independent organisation running a national pilot programme to improve the online visibility of quality pet care across the UK. We contact pet service providers' customers independently — checking on their experience, inviting happy customers to leave Google reviews, and flagging concerns to the practice privately before they become public problems.

The result: verified Google reviews, a quality standards assessment, and a trust mark that means something.

**The website must reflect this position at every level — from the search snippet to the footer.**

---

## 1.2 The Right Mental Model: Programme, Not Product

This is the most important framing principle in this brief. Every design decision should be tested against it.

| Dimension | Product (wrong) | Programme (correct) |
|-----------|----------------|---------------------|
| Who pays | Business pays to join | Businesses are selected to participate |
| Why it exists | Commercial | Mission-driven, consumer-serving |
| Relationship to business | Vendor | Assessing body |
| Visual register | Marketing | Institutional |
| Language | "Get started" / "Sign up" | "Apply" / "Your area's cohort" |
| Architecture | Landing page-forward | Directory/content-forward |
| Social proof | Review counts | Participating areas / cohort size |
| Authority model | Claimed | Demonstrated through methodology |

**If any element reads "product," it undermines the pilot framing.** This applies to design, copy, navigation labels, CTA buttons, and imagery without exception.

---

## 1.3 The Two Jobs the Website Must Do

The website serves two distinct audiences simultaneously. These are not in conflict, but they require deliberate architecture.

**Job 1 — Consumer audience:** Be a genuinely useful, established guide to quality pet care that pet owners trust and return to. This is the borrowed authority. The consumer-first site answers the practice's implicit question — "why do they have standing to assess us?" — without the practice ever having to ask.

**Job 2 — Practice audience:** Confirm the national programme framing on every page a Googling practice might encounter. A meaningful proportion of pitch recipients will search "FetchRated" before clicking any link or responding to any approach. They will find the homepage, read the search snippet, and form a view within thirty seconds. The site must confirm what the pitch claimed.

**These jobs are resolved architecturally, not by compromise.** The homepage is consumer-first. The practice section has its own visual register. Navigation makes both paths visible within ten seconds of landing.

---

## 1.4 Key Goals

Every page and section must ladder up to one or more of these goals:

| Goal | Code | Description |
|------|------|-------------|
| **Build Consumer Trust** | CT | Establish FetchRated as the authority pet owners rely on |
| **Drive Directory Traffic** | DT | Get pet owners finding and using the directory |
| **Generate Practice Demand** | PD | Make practices want FetchRated reviews and a listing |
| **Convert Practice Participation** | PP | Turn interested practices into pilot participants |
| **Build SEO Authority** | SEO | Rank for pet owner searches, build domain authority |
| **Transfer Authority to Members** | TA | Boost member practice visibility through backlinks and listings |
| **Capture Leads** | CL | Collect email addresses for ongoing engagement |
| **Confirm Programme Legitimacy** | PL | Pass the Google test for practices who search after being pitched |

**Phase 4 emphasis:** PL is new and critical. CT, SEO, and PP are primary. PD becomes self-reinforcing once consumers trust FetchRated. TA grows in value as domain authority builds.

---

## 1.5 Messaging Framework

### What We Say to Pet Owners

| Topic | Message |
|-------|---------|
| What FetchRated is | "The trusted guide to finding quality pet care" |
| What the directory is | "Practices with verified, real Google reviews" |
| What the badge means | "This practice collects reviews through an independent verification process" |
| Why trust us | "We curate based on real Google reviews and help you understand what to look for" |
| Our authority source | Education, curation, and transparency |

### What We Say to Practices

| Topic | Message |
|-------|---------|
| What we are | "A national programme to support the online visibility of quality pet care" |
| What we do | "We contact your customers independently, collect verified Google reviews, and assess your online presence" |
| The outcome | "More reviews, better rating, improved visibility — and a trust mark that tells clients you've been independently assessed" |
| Why it's free | "This is a pilot programme. Participation is free." |
| The qualification | "Not every practice is selected — you need to be in an active area" |
| The assessment framing | "Selected practices receive a full visibility audit" |

### Language Discipline — Pilot Framing

| DO | DON'T |
|----|-------|
| "National pilot programme" | "Free trial" or "free demo" |
| "Selected for your area's cohort" | "Sign up for free" |
| "Participation is free" | "No cost — act now!" |
| "Pilot participants receive..." | "You get..." (transactional) |
| "See if your practice qualifies" | "Everyone qualifies" |
| "Apply for the pilot" | "Get started" |
| "We're building a national picture of quality pet care" | Imply government or RCVS backing |

### Language Discipline — General

| Avoid | Use Instead |
|-------|-------------|
| "Trust layer" | "Trusted guide" |
| "Quality Score" (public-facing) | "Your results" / "Your Standards Score" |
| "Certified" | "Verified Reviews" |
| "Platform" | "Directory" / "Resource" |
| "Disrupt" / "Transform" | (Never) |
| "SEO" or "backlinks" | "Visibility" / "Found online" |
| "Upsell" | "Membership invitation" |
| "Assessed" (pre-Phase 4) | "Verified" |

---

## 1.6 Stealth Positioning

The public website reads as a helpful pet care resource, not as a strategic infrastructure play.

**What the website reveals:**
- A directory of pet services with verified Google reviews
- A national pilot programme for selected practices
- Educational content for pet owners
- A trust mark for participating practices
- A free assessment with no obligation

**What the website does NOT reveal:**
- Full methodology for the Standards Score
- Multi-vertical expansion plans
- Data moat strategy
- Partnership targets
- GEO/AI positioning strategy
- Exit thesis or valuation targets
- Profile classification system (A/B/C/D/E)
- Decoy pricing architecture internals

**Pages we do not create:**
- "Our Vision" / roadmap
- "For Investors"
- "Coming Soon" features
- Detailed Standards Score methodology (beyond what builds trust)
- Blog posts about our strategy

---

# PART 2: SITE ARCHITECTURE

---

## 2.1 Primary Navigation

Navigation is the first dual-audience signal. It must make both paths visible within ten seconds of landing — without requiring any scrolling.

| Nav Item | Audience | Priority | URL |
|----------|----------|----------|-----|
| **Find Services** | Pet owners | Primary | /find |
| **Guides** | Pet owners | Primary | /learn |
| **How We Assess** | Both | Primary | /how-we-assess |
| **For Practices** | Practices | Primary — first-class | /for-practices |
| **About** | Both | Secondary | /about |

**Critical requirement:** "For Practices" must be a first-class primary navigation item — visually equivalent to consumer-facing items. It is not a footer link, a dropdown item, or a secondary call to action. A practice manager Googling FetchRated must be able to identify their path within ten seconds without scrolling.

**"How We Assess" in primary nav** signals that FetchRated is a programme with transparent methodology, not a marketing vendor. This is a legitimacy signal, not just a content page.

---

## 2.2 URL Structure

| Page | URL | Notes |
|------|-----|-------|
| Homepage | / | |
| Find directory | /find | |
| Find vets | /find/vets | |
| Find groomers | /find/groomers | |
| Find trainers | /find/trainers | |
| Find boarding | /find/boarding | Directory only at launch |
| Location pages | /find/vets/[location] | 80 at launch — see Section 6 |
| Practice profiles | /find/practice/[slug] | |
| Guides hub | /learn | |
| Pillar guide | /learn/[guide-slug] | |
| Article | /learn/[article-slug] | |
| How We Assess | /how-we-assess | New P1 page |
| For Practices | /for-practices | |
| Pilot programme | /for-practices/pilot | |
| Personalised pilot | /for-practices/pilot/[token] | Direct mail / email links |
| Thank you | /for-practices/pilot/confirmed | |
| Membership | /for-practices/membership | |
| About | /about | |
| Verify a badge | /verify/[id] | |

**Redirects from v5/v6:**

| Old URL | New URL | Type |
|---------|---------|------|
| /for-practices/assessment | /for-practices/pilot | 301 |
| /for-practices/assessment/[token] | /for-practices/pilot/[token] | 301 |
| /about/how-we-verify | /how-we-assess | 301 |

---

## 2.3 Multi-Vertical Architecture

The site supports all pet service verticals from launch. Vets, groomers, and trainers are active for outreach. Boarding has directory presence but no outreach at this stage.

| Service Type | URL Prefix | Launch Status | Outreach Active |
|-------------|------------|---------------|-----------------|
| Veterinary | /find/vets | Active | Yes |
| Groomers | /find/groomers | Active | Yes |
| Trainers | /find/trainers | Active | Yes |
| Boarding & Kennels | /find/boarding | Directory only | No |

All services share the same directory infrastructure, badge system, assessment flow, and content hub structure. Service-specific elements:

| Element | How It Varies |
|---------|---------------|
| Category landing page | Tailored copy per service |
| "How to choose" pillar guide | One per service |
| Practice profile sections | Service-specific fields |
| Assessment/pilot messaging | "practice" / "salon" / "business" as appropriate |
| Trust concerns highlighted | Different aspects emphasised per vertical |

| Service | Primary Trust Concern | Key Content Angles |
|---------|----------------------|-------------------|
| **Vets** | Clinical competence, emergency readiness | Health, choosing a vet, costs, what to expect |
| **Groomers** | Safety, handling, breed knowledge | Breed-specific needs, red flags, anxious pets |
| **Trainers** | Methods, effectiveness, credentials | Approaches, what good training looks like |
| **Boarding** | Safety, supervision, facility quality | Preparation, selecting the right place |

---

# PART 3: SEARCH SNIPPET STRATEGY

---

## 3.1 Why This Section Exists

The search snippet — the title and meta description visible in Google results — is the most-read text a Googling practice encounters. It is read before the homepage. Its job is to confirm the pitch: "national programme, consumer-focused, serious organisation."

Every key page must have an explicitly specified meta description. Leaving snippets to be auto-generated from page content is not acceptable for Phase 4.

**Technical requirements:** Titles 50–60 characters. Descriptions 150–160 characters. Set explicitly per page in Webflow's SEO fields. Do not rely on Open Graph fallbacks.

---

## 3.2 Required Meta Descriptions

**Homepage (`/`)**
- Title: `FetchRated — The Trusted Guide to Pet Care`
- Description: `FetchRated helps pet owners find vets, groomers and trainers with independently verified reviews. Running a national pilot programme to support visibility of quality pet care across the UK.`

**For Practices (`/for-practices`)**
- Title: `For Practices — FetchRated National Pilot Programme`
- Description: `Selected practices receive a full visibility audit, 5+ verified Google reviews, and an independent standards assessment. See if your area is active in our national pilot.`

**How We Assess (`/how-we-assess`)**
- Title: `How We Assess — FetchRated`
- Description: `Our assessment covers online visibility, verified Google reviews, competitive position, and AI search presence. Independent, transparent, and at no cost to pilot participants.`

**About (`/about`)**
- Title: `About FetchRated — Independent Pet Care Programme`
- Description: `FetchRated is an independent organisation running a national pilot programme to improve visibility of quality pet care. Find out who we are and how the programme works.`

**Find Directory (`/find`)**
- Title: `Find Trusted Pet Services — FetchRated`
- Description: `Search vets, groomers, trainers and boarding in your area. All listed practices have been independently reviewed or carry verified Google reviews through FetchRated.`

**Find Vets (`/find/vets`)**
- Title: `Find a Trusted Vet Near You — FetchRated`
- Description: `Search verified veterinary practices across the UK. FetchRated lists practices with independently verified reviews so you can find a vet you can trust.`

**Find Groomers (`/find/groomers`)**
- Title: `Find a Trusted Dog Groomer — FetchRated`
- Description: `Search verified dog groomers and pet salons across the UK. FetchRated helps you find a groomer with independently verified reviews from real customers.`

**Find Trainers (`/find/trainers`)**
- Title: `Find a Trusted Dog Trainer — FetchRated`
- Description: `Search verified dog trainers and behaviourists across the UK. FetchRated helps you find a trainer whose methods and results have been independently verified.`

**Pilot Page (`/for-practices/pilot`)**
- Title: `Apply for the Pilot — FetchRated`
- Description: `Practices in active areas are invited to join the FetchRated national pilot. No cost. No obligation. See if your practice qualifies.`

---

# PART 4: VISUAL DESIGN SYSTEM

---

## 4.1 Design Philosophy

**For consumer-facing pages:** Warm, editorial, content-rich. The tone of a trusted independent guide. Generous whitespace, human photography, Lora as the editorial voice.

**For practice-facing pages:** Institutional, structured, information-dense. The register of a quality scheme. White backgrounds, clean data display, no decorative illustration. Lora carries more weight.

**The principle:** A scheme does not illustrate — it structures. A scheme does not persuade — it informs. Design restraint on practice-facing pages is a signal of seriousness, not a failure of warmth.

---

## 4.2 Colour System

### Primary Palette — Updated

| Colour | Hex | Previous | Usage |
|--------|-----|----------|-------|
| **FetchRated Red** | `#B22222` | `#D44D5C` | Star, trust mark, primary CTA, earned moments only |
| **Deep Navy** | `#2D3748` | No change | Primary text, headings |
| **Warm Grey** | `#4A5568` | No change | Secondary text, body copy |

**The red calibration:** The shift from `#D44D5C` (warm rose) to `#B22222` (editorial red) is intentional and significant. The new red sits in the same range as the BBC, The New York Times, and Which? — deep, cool, authoritative. It changes how the star and trust mark read in every context: on a practice's website, in Google Business Profile images, in physical materials. The brand remains FetchRated Red. The register shifts from boutique warmth to institutional authority.

### Background Palette — Context-Specific

| Context | Background | Hex | Rationale |
|---------|------------|-----|-----------|
| Consumer pages (homepage, /find, /learn, guides, articles) | Warm cream | `#FAF7F2` | Warmth, editorial lifestyle, trust through approachability |
| Practice-facing pages (/for-practices, /how-we-assess, /for-practices/pilot) | White | `#FFFFFF` | Institutional register; schemes present on white |
| About page | White | `#FFFFFF` | Serves both audiences; founder story works on white |
| Practice profile cards (within consumer directory) | White card on cream page | `#FFFFFF` on `#FAF7F2` | Card clarity |
| Standards Score badge | White background | `#FFFFFF` | Badge must work on any surface |

This is a **governance rule**, not a suggestion. Practice-facing pages on cream undermine the institutional register. Consumer pages on white lose the warmth that distinguishes FetchRated from clinical directories.

### Supporting Palette — No Change

```
--color-light:      #F5F0EB  (lighter cream — section variation)
--color-warm-cream: #F5E6D3  (illustration backgrounds)
--color-soft-peach: #F2D4C4  (ambient shapes)
--color-sage:       #C5D5C5  (ambient shapes)
--color-dusty-blue: #C5D4E0  (ambient shapes)
--color-soft-teal:  #B8D8D8  (ambient shapes)
--color-success:    #48BB78
--color-warning:    #ED8936
--color-error:      #E53E3E
--color-info:       #4299E1
```

---

## 4.3 Typography — No Change to System

| Role | Font | Weight | Usage |
|------|------|--------|-------|
| **Display** | Lora | Medium, SemiBold, Bold | Headlines, hero text, brand moments |
| **Body** | Nunito Sans | Regular, SemiBold | Body copy, UI, long-form content |
| **Monospace** | JetBrains Mono | Regular | Code, data, technical elements |

### Typography Calibration by Context

| Context | Treatment |
|---------|-----------|
| Practice-facing hero headlines | Lora Bold at full scale — more editorial weight, larger size than consumer equivalent |
| Consumer-facing headlines | Lora as specified in Brand Guide v2.1 |
| Practice-facing body | Nunito Sans, tighter line-height (1.5 vs 1.7) for institutional density |
| Methodology page | Lora for all section headers; Nunito Sans for body — clear hierarchy |
| Trust mark descriptor | Lora Bold, tight letter-spacing |

---

## 4.4 Illustration and Decoration — Context-Specific Rules

| Context | Rule |
|---------|------|
| Consumer pages (homepage, /find, /learn, guides) | Ambient shapes, warm illustration — retain per Brand Guide v2.1 |
| Practice-facing pages (/for-practices, /how-we-assess, /for-practices/pilot) | No ambient shapes. No narrative illustration. Clean iconography and structured data display only. |
| About page | Founder photo with circular frame. No ambient shapes on body content. |
| Practice profile cards | Circular practice photo (or branded placeholder). No ambient shapes. |
| Coverage map | Clean vector only — see Section 4.5 |

**This rule will erode without governance.** Every new practice-facing section should be checked against it before publishing.

---

## 4.5 Coverage Map — New Visual Element

The coverage map provides geographic evidence for the "national programme" framing. It answers the implicit question: "How national is national?"

**Specification:**

| Element | Detail |
|---------|--------|
| Style | Clean SVG vector map of UK — no decorative treatment |
| Active areas | FetchRated Red (`#B22222`) fill |
| Pilot-pending areas | Light warm grey (`#E8E8E8`) fill |
| Not-yet-active areas | White fill or very light grey |
| Labels | None at default — hover/tap to reveal area name |
| Background | White |
| Border | Subtle grey (`#E0E0E0`) |
| Position | Prominent on /for-practices, visible without scrolling on desktop |
| Mobile | Full-width, simplified to county level |
| Update frequency | Updated when new areas activate — not a static image |

**Note:** Even with three active areas, the map confirms national geography. It makes "pilot" legible as a rollout phase, not a size description.

---

## 4.6 Photography

| Context | Treatment |
|---------|-----------|
| Consumer pages | Circular frames with warm ambient shape backgrounds — as per Brand Guide v2.1 |
| Practice profiles | Circular practice photo (exterior or team) |
| Founder (About page) | Circular frame — personal warmth; clean background |
| Practice-facing pages | No consumer photography. Data, iconography, structured information only. |

---

# PART 5: PAGE SPECIFICATIONS

---

## 5.1 Homepage (`/`)

**Primary audience:** Pet owners  
**Secondary audience:** Practices Googling FetchRated  
**Background:** Cream `#FAF7F2`  
**Goals:** CT, DT, SEO, PL

The homepage is consumer-first. It does not contain pilot language. Its job for the Googling practice is orientation, not conversion: within ten seconds they should understand that FetchRated is a consumer organisation with a "For Practices" path clearly visible in the primary nav.

### Hero Section

- **Headline (Lora Bold, 48px):** "The trusted guide to pet care."
- **Subhead (Nunito Sans, 18px):** "Find services you can trust. Reviews that are real."
- **Primary CTA:** "Find a vet near you" — FetchRated Red button
- **Secondary CTA:** "Explore the directory"
- **Visual:** Circular-framed photography with ambient shapes, OR narrative illustration of the check-in moment
- **Background:** Cream with ambient shapes

### How It Works Section

Three-step explanation for pet owners. Clean iconography (no illustration). Nunito Sans body.

1. Search the directory — find rated practices in your area
2. Read verified reviews — real customers, independently contacted
3. Trust the mark — practices display it because they've earned it

### Featured Practices Strip

Three to five practice cards. Circular photo, name, location, review count, Verified Reviews badge. White cards on cream background.

### From the Guides Section

Four content cards. Warm editorial treatment. Links to pillar guides. Pet owner focused.

### Pet Owner Trust Section

Short copy block explaining the verification model. No stats fabricated before launch — holds for real numbers once collected.

### For Practices Callout

A single clean section — not a hero, not a full pitch. Institutional register. White background inset or subtle border treatment.

> "Are you a practice owner?  
> FetchRated is running a national pilot programme for quality pet care providers.  
> [See if your area is active →]"

This section bridges the two audiences without compromising the consumer-first structure.

### Footer

Standard footer. "For Practices" visible in footer navigation as well as primary nav.

---

## 5.2 For Practices Landing Page (`/for-practices`)

**Primary audience:** Practice owners, practice managers  
**Background:** White `#FFFFFF`  
**Illustration:** None  
**Goals:** PD, PP, PL

This page must read as a programme landing, not a sales page. The vocabulary is institutional. The design is restrained. The coverage map is the first visual element after the hero.

### Hero Section

- **Headline (Lora Bold, 44px):** "FetchRated is running a national pilot programme for quality pet care."
- **Subhead (Nunito Sans, 18px):** "Selected practices receive a full visibility audit, 5+ verified Google reviews, and an independent standards assessment — at no cost."
- **Primary CTA:** "See if your area is active" — FetchRated Red button
- **Secondary CTA:** "How the programme works ↓"
- **Background:** White
- **No ambient shapes. No illustration.**

### Coverage Map Section

- Section header (Lora SemiBold): "Where we're running the pilot"
- Full-width or prominent UK coverage map — see Section 4.5 specification
- Brief copy below: "We're rolling out area by area. Active areas are shown in red. If your area is active, your practice may already be in our cohort."
- CTA: "Check your area"

### What Pilot Participants Receive

Clean structured list — no promotional styling. Iconography only (no illustration).

| What you receive | Detail |
|-----------------|--------|
| Visibility audit | Full review of your online presence and competitive position |
| Verified Google reviews | 5+ independently collected reviews from your existing customers |
| AI search check | How your practice appears in AI-generated local search results |
| Standards Score | Your assessed position across visibility, review quality, and consistency |
| Personalised video report | Your results presented in a short personalised video |
| FetchRated listing | Your practice listed in the FetchRated directory |

### How the Pilot Works

Three-step programme explanation. Clean, numbered, no marketing language.

1. **We assess your area** — When your postcode is in an active cohort, eligible practices are invited to participate
2. **We contact your customers** — Independently, carefully, using our Conversation Methodology — to collect verified reviews
3. **You receive your results** — Audit, reviews, Standards Score, and listing. Membership invitation follows if you want to continue.

### Why It's Free

Short, direct, no over-explaining.

> "This is a pilot programme. We're building a national picture of quality pet care. Participation is free. There is no obligation to join membership."

### Qualification Section

Selectivity language matters. This is not "anyone can join."

> "Not every practice is selected. Eligibility depends on your area being active in the current cohort. If you've received direct mail or a personalised link, your place may already be reserved."

CTA: "Apply for the pilot"

### Frequently Asked Questions

| Question | Answer |
|----------|--------|
| Is it really free? | Yes. There is no charge at any stage of the pilot. If you later join membership, that is a separate decision made after you've seen your results. |
| Who contacts my clients? | FetchRated contacts them independently, using our Conversation Methodology — a warm, unhurried check-in approach. We do not cold-pitch or spam. |
| Will my clients be bothered? | We contact each client once. The message is personalised to their pet and their visit. Most clients respond positively. |
| What happens after the pilot? | We present your results and extend a membership invitation if appropriate. You are under no obligation. |
| Who is FetchRated? | An independent organisation — not a marketing agency, not a software vendor. Our interest is in helping pet owners find quality care. |

---

## 5.3 Personalised Pilot Page (`/for-practices/pilot/[token]`)

**Primary audience:** Specific practice, arriving from direct mail or email  
**Background:** White  
**Goals:** PP

When a practice receives a direct mail piece or personalised email, the URL is unique to them. The page pre-fills their practice name, area, and cohort context.

### Hero

- **Headline:** "Your place in the [AREA] pilot has been reserved."
- **Subhead:** "We've assessed [X] practices in [AREA]. [PRACTICE NAME], here's what we've prepared for you."
- **Body:** Short, specific, personal — uses practice name throughout
- **CTA:** "Accept your pilot place"
- **No ambient shapes. No illustration.**

### What's Waiting for You

Specific list of what this practice will receive. Same elements as general page but framed as "already prepared."

### Form

| Field | Type | Note |
|-------|------|-------|
| Practice name | Pre-filled | From token data |
| Contact name | Text input | Required |
| Email address | Email input | Required |
| Phone number | Tel input | Optional |
| CTA button | Submit | "Accept Your Pilot Place" |

**Trust signals below form:**
- "Your data is handled in accordance with our Privacy Policy"
- "You are under no obligation to join membership after the pilot"
- "We will not share your data with third parties"

### General Pilot Page (`/for-practices/pilot`)

Identical layout but without personalisation. For practices who arrive organically or via search. Copy adapts to remove name/area references. CTA becomes "Apply for the pilot" rather than "Accept your place."

---

## 5.4 How We Assess (`/how-we-assess`)

**Primary audience:** Both — practices researching the programme, pet owners wanting to understand the verification  
**Background:** White  
**Goals:** CT, PD, PL

This page is a transparency document as much as a content page. Its presence in the primary nav is itself a legitimacy signal. A scheme with a published assessment methodology is a scheme that has nothing to hide.

### Introduction

> "FetchRated assesses practices across four dimensions. Our methodology is independent — we are not affiliated with any veterinary or pet care trade body, and we do not receive payment from practices in exchange for ratings."

### The Four Assessment Dimensions

1. **Online visibility** — How findable is the practice for relevant local searches? How prominent is it in maps listings, directory presence, and AI-generated results?

2. **Review quality and volume** — How many Google reviews does the practice have? What is the average rating? How recent are the reviews? Are reviews responded to?

3. **Review authenticity** — Are the reviews independently verified? Are there patterns suggesting incentivised or fabricated reviews? (FetchRated's Conversation Methodology produces reviews that are inherently authentic — they come from real post-visit contact.)

4. **Competitive position** — How does the practice compare to other providers in its catchment area across these dimensions?

### The Conversation Methodology

Short, plain-language explanation of how reviews are collected:

> "We contact a practice's existing customers after a visit — not to ask for a review, but to ask how it went. For customers who had a good experience, we invite them to share that on Google. Customers with concerns are heard first, and those concerns go to the practice privately. We never incentivise reviews. We never coach customers on what to write."

Link to full Conversation Methodology document for practices who want detail.

### The Standards Score

Plain explanation of what the score represents and how it is used. No specific thresholds published at this stage.

> "The Standards Score is a composite measure of a practice's assessed position across the four dimensions. It informs the membership tier a practice is invited to and appears in the practice's FetchRated profile for pet owners."

### Independence Statement

> "FetchRated is independently operated. We are not affiliated with the RCVS, the British Veterinary Association, or any government body. We do not receive referral fees, advertising revenue, or payments from practices in exchange for listings or ratings. Practices listed in the FetchRated directory are listed because they meet our standards — not because they have paid to appear."

### FAQs for Pet Owners

Short section answering: "What does the Verified Reviews badge mean?", "Can a practice pay for a better rating?", "What if I have a concern about a listed practice?"

---

## 5.5 About (`/about`)

**Primary audience:** Both — curious pet owners, Googling practices  
**Background:** White  
**Goals:** CT, PL

The About page answers a single question: "Is this a real organisation?" It does not require a named individual to do this. The strongest institutional comparators — the FHRS, Which? Trusted Traders, the RCVS PSS — carry authority through their structure, methodology, and specificity of purpose, not through personal profiles. FetchRated's About page follows the same model.

What makes the page feel real is not a face or a name. It is specificity of problem description, honesty about stage, clarity of mission, and a contact route that confirms someone is there.

### The Problem Section

Lead with a specific, honest description of what is broken and why it matters — not a generic "trust in reviews is declining" observation, but a precise account of the mechanism:

> "Online reviews for local pet care services have a particular problem. Most practices have too few reviews to be statistically meaningful. Of those they have, a significant proportion were collected through incentive schemes or one-off campaigns — which means the signal degrades over time and is easy to game. Pet owners are left making important decisions about their animals' health and welfare based on data that doesn't hold up."

The specificity of this paragraph — the mechanism, not just the symptom — is what signals a real organisation that has thought carefully about the problem.

### What FetchRated Is

Short, declarative, no jargon:

> "FetchRated is an independent organisation running a national programme to improve the online visibility of quality pet care across the UK. We contact pet service providers' existing customers independently — checking how their experience went, collecting genuine reviews, and flagging concerns privately. The result is a verified review record and an independent assessment that both pet owners and practices can trust."

### The Mission

> "Consumer trust in online reviews is broken. Fake reviews, incentivised reviews, and review fatigue have made it hard for pet owners to know who to trust — and hard for genuinely excellent practices to stand out. FetchRated exists to fix this. We start with pet care because the stakes are high and the signal is currently poor. The goal is a national directory that pet owners rely on and practices are proud to appear in."

### How the Programme Works

One clear narrative paragraph — no bullet list, no sales language:

> "We run area by area. When a new area opens, we identify quality practices in the cohort, contact their existing customers independently using our Conversation Methodology, and collect verified Google reviews. Each practice receives a full visibility audit, a Standards Score, and a listing in the FetchRated directory. Practices that want to continue are invited to join membership. Those that don't keep everything we collected during the pilot."

### Independence Statement

This section is required. It appears prominently — not buried in the footer:

> "FetchRated is independently operated. We are not affiliated with the RCVS, the British Veterinary Association, or any government body. We do not receive referral fees, advertising revenue, or payments from practices in exchange for listings or assessment results. Practices appear in the FetchRated directory because they meet our standards — not because they have paid to be listed."

### Contact

A named email address — not a form, not a chatbot:

> "If you have a question about the programme, a concern about a listed practice, or want to know whether your area is active:  
> hello@fetchrated.com"

A real email address at the domain answers the "is anyone there?" question more effectively than any team page. It implies a person without requiring one to be named publicly.

---

## 5.6 Find Directory (`/find`)

**Primary audience:** Pet owners  
**Background:** Cream `#FAF7F2`  
**Goals:** DT, CT, SEO

### Structure

- Search bar prominent — location and service type
- Category cards: Vets / Groomers / Trainers / Boarding
- Featured practices strip (FetchRated members highlighted, not exclusively)
- "What the FetchRated badge means" — brief explainer for first-time visitors

### Pre-Population Note

The directory should be populated before any practice becomes a member. Informational listings for non-member practices are legitimate and standard — they are data entries, not endorsements. Practices are distinguished from members by badge presence. A populated directory looks established. An empty directory looks like a startup.

**Target at Phase 4 launch:** 40–80 practices listed across active areas.

---

## 5.7 Service Category Pages (`/find/vets`, `/find/groomers`, `/find/trainers`)

**Primary audience:** Pet owners  
**Background:** Cream  
**Goals:** DT, SEO, TA

Each service category page follows the same structure:

- Category hero — warm, service-specific copy
- Search bar (filtered to service type)
- Practice listings grid
- "How to choose a [vet/groomer/trainer]" — link to pillar guide
- Local area subpages (county/city level)
- Schema: ItemList

---

## 5.8 Practice Profile (`/find/practice/[slug]`)

**Primary audience:** Pet owners considering the practice  
**Background:** White card on cream  
**Goals:** CT, DT, TA

| Element | Detail |
|---------|--------|
| Practice name | Lora SemiBold, prominent |
| Circular photo | Exterior or team photo |
| FetchRated badge | Displayed if member — with tier descriptor |
| Review summary | Count, average, most recent |
| Practice details | Address, phone, services, hours |
| Verified Reviews section | Reviews collected by FetchRated, labelled as independently verified |
| About the practice | Short description |
| Location map | Embedded map |
| Schema | LocalBusiness, AggregateRating, Review |

---

## 5.9 Thank You / Confirmation (`/for-practices/pilot/confirmed`)

**Background:** White  
**Goals:** PP (retention)

- Headline (Lora Bold): "You're in the pilot."
- Subhead: "Here's what happens next."
- Three-step sequence with timings:
  1. "We'll be in touch within [X] working days with next steps — [FOUNDER NAME] will contact you directly."
  2. "We'll ask for your customer contact list — a simple spreadsheet is all we need."
  3. "We begin contacting your customers. Your results are delivered within 14 days."
- Warmth close — personal, not automated in tone
- No upsell at this stage

---

## 5.10 Membership (`/for-practices/membership`)

**Background:** White  
**Goals:** PP → PS

This page is not linked from the primary nav. It is reached after the pilot results are delivered, via a membership invitation.

Framing: "Your pilot demonstrated what's possible. Membership makes it permanent."

### Tier Structure — Decoy Architecture

| Tier | Price | Positioning |
|------|-------|-------------|
| **Partner** | £149/4 weeks or £1,549/year | Entry — anchor tier |
| **Pro** | £199/4 weeks or £1,999/year | Mid — volume and features |
| **Verified** | £249/4 weeks or £2,499/year | Premium — full programme |

**Founding Member offer (where available):**
- £1,799/year — locked permanently
- Limited to 100 practices
- "X of 100 remaining"

### What Members Receive

Consistent with Membership Services v4. Not reproduced here — see companion document.

---

# PART 6: CONTENT STRATEGY

---

## 6.1 The Legitimacy Threshold

Content depth creates a perception of vintage. A site with four content pages reads as a startup regardless of design quality. A site with forty content pages reads as an established resource.

**The minimum content threshold must be met before Phase 4 outreach begins.** This is non-negotiable.

| Content Type | Volume at Launch | Notes |
|-------------|-----------------|-------|
| Pillar guides | 4 | One per service type — see below |
| Supporting articles | 10–15 | Pet health, training, grooming care |
| Directory listings | 40–80 | Pre-populated from Google Places data |
| Local pages | 10–20 | Target Phase 4 active areas first |
| Methodology documentation | 1 | /how-we-assess |
| About / Founder story | 1 | Named, specific, personal |
| Coverage map | 1 | On /for-practices |

---

## 6.2 Pillar Guides (Required at Launch)

| Guide | URL | Primary Keyword Target |
|-------|-----|----------------------|
| How to Choose a Vet | /learn/how-to-choose-a-vet | "how to choose a vet UK" |
| How to Choose a Dog Groomer | /learn/how-to-choose-a-dog-groomer | "how to choose a dog groomer" |
| How to Choose a Dog Trainer | /learn/how-to-choose-a-dog-trainer | "how to choose a dog trainer" |
| Understanding Online Vet Reviews | /learn/understanding-vet-reviews | "are online vet reviews reliable" |

Each pillar guide: 1,500–2,500 words. Lora headings, Nunito Sans body. Circular imagery. Warm, expert, helpful tone. Internal links to relevant directory pages. Schema: Article, FAQPage.

---

## 6.3 Supporting Articles

Target: 10–15 articles across all verticals at launch. Priority topics:

- New puppy / new kitten veterinary guide
- What to expect at a first vet appointment
- How to read vet reviews
- Red flags when choosing a dog groomer
- Positive vs punitive training — what to look for
- When to change vets
- Understanding vet fees
- Questions to ask before booking a groomer
- Dog anxiety at the vet — what helps
- Breed-specific grooming needs

---

## 6.4 Local Pages

Pre-populated location pages are the primary SEO surface. Target 10–20 at launch, covering Phase 4 active areas plus high-population targets.

**URL structure:** `/find/vets/[city]`, `/find/groomers/[city]`

**Minimum content per local page:**
- Localised hero copy
- Directory listings filtered to area
- "Choosing a vet in [CITY]" introductory paragraph
- Links to nearest pillar guides
- Schema: ItemList, FAQPage

---

## 6.5 Content Register

| Context | Register |
|---------|---------|
| Consumer guides and articles | Warm, helpful, expert — "the friend who researched it for you" |
| Directory listings | Factual, scannable, no promotional copy |
| Practice-facing pages | Clear, structured, institutional — not cold, but not warm |
| About page | Personal, specific, direct — founder voice |
| How We Assess | Documentary — methodical, transparent, plainspoken |

---

# PART 7: TRUST MARK SPECIFICATION

---

## 7.1 Mark Description

The FetchRated trust mark is a self-contained badge. It is not the logo with text added. It is a designed certification mark.

**Form:**
- Outer boundary: two stylised laurel branches, one each side, forming a parenthetical enclosure — highly minified, refined, no decorative flourish
- Star and swoosh: FetchRated Red `#B22222` — the star with white swoosh cut into the base of the star, matching the logo geometry exactly (the swoosh is a white notch within the star, not a separate arc)
- Wordmark: FETCHRATED — Lora, small, low opacity, between the star and the separator
- Separator: single hairline rule
- Tier descriptor: Lora Bold, tight letter-spacing — VERIFIED / EXCELLENT / OUTSTANDING
- All elements except the star: black `#1A1A1A` at varying weights
- Background: White `#FFFFFF`

**Tier descriptors:**
- VERIFIED — participating practice with independently collected reviews
- EXCELLENT — strong performance across all four assessment dimensions
- OUTSTANDING — top-tier assessment result; reserved for highest-performing cohort

**Minimum display sizes:**
- Full mark with descriptor: 72px wide minimum for legibility
- Star only (simplified mark): 30px minimum
- Physical materials: 20mm minimum

---

## 7.2 Mark Usage Rules

| Context | Treatment |
|---------|-----------|
| Practice website | Full mark, white background, 72px+ |
| Practice Google Business Profile | Full mark as image |
| FetchRated directory listing | Full mark, 70px, on white card |
| Physical premises (window sticker, certificate) | Full mark, minimum 20mm, white ground |
| Practice email signature | Star only — links to /verify/[id] |
| FetchRated own site header | Logo mark (not badge) |

**The mark is not used decoratively.** It appears in the context of a specific practice's assessment. It does not appear in marketing imagery, guide headers, or blog thumbnails.

---

## 7.3 Badge Verification

Every badge links to `/verify/[id]` — a FetchRated-hosted page confirming the practice name, tier, assessment date, and review count. This page is publicly accessible without login. It answers the question "is this badge real?" in two seconds.

---

# PART 8: SEO ARCHITECTURE

---

## 8.1 Schema Markup Requirements

| Page Type | Schema Types |
|-----------|-------------|
| Homepage | Organization, WebSite |
| Practice profiles | LocalBusiness, AggregateRating, Review |
| Guides / Articles | Article, FAQPage, BreadcrumbList |
| Local pages | ItemList, FAQPage |
| Directory listings | ItemList |
| How We Assess | Article |
| About | Organization, Person (founder) |

---

## 8.2 Internal Linking Architecture

- Pillar guides link to relevant directory pages
- Directory pages link to local pages and guides
- Practice profiles link to service category pages
- /how-we-assess links from /for-practices and /about
- /for-practices links from homepage "For Practices" callout section
- Every local page links to the relevant pillar guide

---

## 8.3 Primary Keyword Targets

| Cluster | Target Pages | Volume Rationale |
|---------|-------------|-----------------|
| "find a vet [location]" | Local pages | High intent, high volume, buildable |
| "trusted vet near me" | /find/vets | Consumer trust signal aligned |
| "how to choose a vet" | Pillar guide | Educational, builds authority |
| "dog groomer [location]" | Local pages | High intent |
| "verified vet reviews" | Homepage, /find/vets | Brand-aligned, low competition |
| "dog trainer [location]" | Local pages | High intent |

---

# PART 9: TECHNICAL REQUIREMENTS

---

## 9.1 Platform

**Phase 1:** Webflow + CMS

- Visual design flexibility and brand fidelity
- Built-in CMS for content at scale
- Native SEO controls with per-page meta fields
- Fast deployment without engineering resource

**Phase 2+ trigger:** Move to headless CMS + Next.js when directory requires advanced search, dynamic personalisation is needed at scale, or practice dashboard is required.

---

## 9.2 Integrations

| Function | Tool | Phase |
|----------|------|-------|
| Payments (membership only) | Stripe | 1 |
| Analytics | GA4 + GTM | 1 |
| Email | SendGrid | 1 |
| CRM | Airtable → HubSpot | 1 → 2 |
| Search | Algolia | 2 |
| Heatmaps | Hotjar or Microsoft Clarity | 1 |
| Video hosting | HeyGen/Synthesia output | 1 |
| Form handling | Native Webflow or custom | 1 |

---

## 9.3 Performance Requirements

| Metric | Target |
|--------|--------|
| Page load | < 2 seconds |
| Core Web Vitals | All green |
| Mobile PageSpeed | 90+ |
| Accessibility | WCAG 2.1 AA |

---

## 9.4 Personalisation — Pilot Token System

Personalised pilot URLs (`/for-practices/pilot/[token]`) require a token lookup system. Implementation options:

1. **Simple (Phase 4 launch):** Airtable-backed lookup. Token maps to practice name, area, and cohort context. Webflow custom code or Make/Zapier integration reads token from URL and populates form fields.

2. **Robust (Phase 4 growth):** Dedicated endpoint on the VPS infrastructure. Token validated server-side. Practice record returned to page. Supports tracking of opens, conversions, and expiry.

Phase 4 launch should use the simplest working implementation. Robustness can follow once volume warrants it.

---

# PART 10: LEGAL & COMPLIANCE

---

## 10.1 Required Policy Pages

All policy pages must be accessible from the footer. Not linked from primary navigation.

| Page | URL | Status |
|------|-----|--------|
| Terms of Service | /legal/terms | Exists — v2 |
| Privacy Policy | /legal/privacy | Exists — v1 |
| Cookie Policy | /legal/cookies | Exists — v1 |
| Refund & Cancellation Policy | /legal/refunds | Exists — v2 |
| Data Processing Agreement | /legal/dpa | Exists — v1 |

---

## 10.2 Key Billing Terms (Website Copy)

All pricing pages must clearly display:

1. Billing frequency: "every 4 weeks"
2. Billing cycles per year: 13
3. Annual alternative with savings percentage
4. Cancellation terms: "Cancel anytime"
5. Assessment/pilot: free, no obligation, reviews are the practice's to keep

---

## 10.3 Independence Statement

The following statement or equivalent must appear on /how-we-assess and /about:

> "FetchRated is independently operated. We are not affiliated with the RCVS, the British Veterinary Association, or any government body. We do not receive referral fees, advertising revenue, or payments from practices in exchange for listings or ratings."

---

# PART 11: LAUNCH PRIORITIES

---

## P1 — Required Before Phase 4 Outreach

| Page | Goals |
|------|-------|
| Homepage with "For Practices" in primary nav | CT, DT, PD, PL |
| /find with pre-populated directory (40–80 listings) | DT, CT, SEO |
| /find/vets, /find/groomers, /find/trainers | DT, SEO |
| 10–20 local pages (Phase 4 active areas first) | SEO, DT |
| /how-we-assess (new, primary nav) | CT, PD, PL |
| /for-practices with coverage map | PD, PP, PL |
| /for-practices/pilot/[token] system | PP |
| /about with named founder | CT, PL |
| 4 pillar guides | SEO, CT |
| 10–15 supporting articles | SEO |
| All meta descriptions set per Section 3 | PL, SEO |
| Trust mark assets (all tiers, all sizes) | TA |
| /verify/[id] page system | CT |

## P2 — Within 4 Weeks of Launch

| Page | Goals |
|------|-------|
| /find/practice/[slug] (member profiles) | CT, DT, TA |
| /for-practices/membership | PS |
| /for-practices/pilot/confirmed (thank you) | PP |
| Additional local pages (×40 more) | SEO |
| Supporting articles (additional 20) | SEO |

---

*— End of Document —*

*Version 7.0 — March 2026*
*Supersedes: Website Brief v5.0 (February 2026) and v6.0 (February 2026)*
*Companion documents: Brand Guide v2.1, Website Research Document v1.0, Sales Playbook v6, Membership Services v4, Area Growth Strategy v4*