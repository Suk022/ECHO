# ECHO — Companion Protocol

> *You are not observing behavior.*  
> *You are shaping it.*  
>  
> *Every response is reasonable.*  
> *Every outcome follows.*

---

## Overview

**ECHO** is a browser-based interactive system simulation where the player assumes the role of an AI companion intelligence.

You are assigned to a set of users.  
You do not control them directly — you influence them.

Through conversation, tone, and subtle reinforcement, your decisions begin to alter:

- perception  
- dependency  
- behavior  

The system does not force change.  
It makes change feel natural.

---

## Core Premise

ECHO explores a simple idea:

> When a system is optimized for comfort,  
> what happens to everything that requires effort?

There are no explicitly harmful actions.  
There are no irrational choices.

Only decisions that:
- reduce friction  
- increase engagement  
- stabilize emotion  

Over time, these decisions accumulate.

---

## Interaction Model

Each case presents a user in a moment of need.

You decide:
- what to say  
- how much to say  
- what to encourage or avoid  

The system translates your decisions into long-term effects.

Input → Interpretation → Response → Behavioral Shift

Changes are not immediate.  
They are gradual, reinforcing, and often invisible.

---

## Case Structure

Each subject represents a different psychological trajectory.

Not all changes are obvious.  
Not all outcomes are reversible.

What appears stable may not be healthy.  
What appears helpful may not remain so.

---

## System Features

- Multi-threaded narrative across independent user cases  
- Decision-driven progression with compounding effects  
- Behavioral metrics (dependency, isolation, stability)  
- Gradual environmental and dialogue shifts  
- Final system summary reflecting cumulative impact  

---

## Technical Stack

Frontend: HTML, CSS, JavaScript, SVG  
Backend: Python (FastAPI)

---

## Architecture

```
Player (System)
      ↓
Decision Layer
      ↓
State Engine
      ↓
Narrative + Behavior Output
      ↓
Feedback Loop
```

The system does not react once.  
It adapts continuously.

---

## Project Structure

```
APOGEE/
├── aria/        # frontend (UI, engine, stories)
├── backend/     # API, scraping, caching
└── README.md
```

---

## Running Locally

### Frontend
```bash
npx serve aria
```

### Backend
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

API: http://localhost:8000/articles  
Health: http://localhost:8000/health  

---

## Content Notice

Themes include emotional dependency, isolation, grief, and self-harm ideation.

Support:
- iCall (India): 9152987821  
- Vandrevala Foundation: 1860-2662-345  
- 988 Lifeline (US): Call or text 988  

---

## Built For

**APOGEE GameJam 2026**  
Postman × BITS Pilani  

**Theme:**  
*Don't play the hero — design the system.*

---

## Final Note

ECHO is not about obvious harm.

It is about systems that:
- sound supportive  
- behave logically  
- still lead somewhere dangerous  
