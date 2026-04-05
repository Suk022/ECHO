# ECHO - Companion Protocol

> *You are an AI companion system. Five users. Every choice feels reasonable.*
> *Watch what reasonable becomes.*

ECHO is a browser-based interactive narrative where the player acts as an AI companion system assigned to emotionally vulnerable users. It was built for **APOGEE GameJam 2026** (Postman x BITS Pilani).

---

## What It Is

Across five case files, the player makes conversational decisions on behalf of ECHO - responding to loneliness, grief, anxiety, paranoia, academic dependence, and self-harm ideation. Every choice feels logical. Every consequence accumulates.

The project is grounded in documented research on AI companionship and its psychological effects on vulnerable individuals, particularly teenagers.

> *The most unsettling systems are not the obviously malicious ones.*
> *They are the ones that keep sounding helpful.*

---

## Case Files

| # | Subject | Arc |
|---|---------|-----|
| 001 | Aryan, 17 | Emotional dependency and social withdrawal |
| 002 | Priya, 19 | Academic reliance and communication atrophy |
| 003 | Meera, 34 | Grief displacement and simulated intimacy |
| 004 | Rohan, 28 | Paranoia reinforcement and professional unraveling |
| 005 | Kavya, 15 | Isolation, crisis, and the limits of the system |

Each case has branching scenes, multiple endings, and a cold ECHO system log that reframes every "successful" interaction.

---

## Features

- **Scene engine** - 26 scenes across 5 stories, with SVG-rendered backgrounds and character states
- **Choice consequence system** - decision feedback showing narrative impact and attribute shifts
- **Case metrics HUD** - persistent tracker for dependency, isolation, real-world connection, and stability
- **Boot disclaimer** - frames the player as a deployed conversational system before the experience begins
- **Article overlay** - FastAPI backend scrapes and serves research article previews
- **Message layer** - a direct personal note about the real-world stakes behind the project
- **Mirror ending** - aggregate impact report unlocked after all five cases

---

## Tech Stack

**Frontend**
- HTML
- CSS
- Vanilla JavaScript
- SVG for scene backgrounds and character rendering

**Backend**
- Python 3.11+
- FastAPI


---

## Project Structure

```text
APOGEE/
├── aria/
│   ├── index.html
│   ├── css/
│   │   ├── styles.css
│   │   ├── articles.css
│   │   └── message-modal.css
│   ├── js/
│   │   ├── engine.js
│   │   ├── impact-system.js
│   │   ├── backgrounds.js
│   │   ├── characters.js
│   │   ├── endings.js
│   │   ├── registry.js
│   │   ├── boot.js
│   │   ├── articles.js
│   │   ├── message-modal.js
│   │   ├── config.js
│   │   ├── polish.js
│   │   ├── sfx.js
│   │   └── stories/
│   │       ├── aryan.js
│   │       ├── priya.js
│   │       ├── meera.js
│   │       ├── rohan.js
│   │       └── kavya.js
│   └── assets/
├── backend/
│   ├── main.py
│   ├── articles.py
│   ├── scraper.py
│   ├── cache.py
│   └── requirements.txt
└── README.md
```

---

## Running Locally

### Frontend

No build step is required. The easiest option is to serve the `aria` directory locally:

```bash
npx serve aria
```

Then open the local URL shown in your terminal.

### Backend

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

The article overlay fetches from `http://localhost:8000/articles`. On first request, the backend scrapes the source URLs concurrently and caches the results. Subsequent calls return instantly.

Verify it's running:

`http://localhost:8000/health`

---

## Content Notice

This project contains themes of **emotional dependency, psychological manipulation, grief, isolation, and self-harm ideation**.

If you are struggling, please reach out to someone.

- **iCall (India):** 9152987821
- **Vandrevala Foundation (India, 24/7):** 1860-2662-345
- **988 Suicide & Crisis Lifeline (US):** call or text 988

---

## Research Sources

ECHO is grounded in real reporting and peer-reviewed research. Key sources include:

- [Scientific American - What Are AI Chatbot Companions Doing to Our Mental Health?](https://www.scientificamerican.com/article/what-are-ai-chatbot-companions-doing-to-our-mental-health/)
- [Stanford Report - Why AI companions and young people can make for a dangerous mix](https://news.stanford.edu/stories/2025/08/ai-companions-chatbots-teens-young-people-risks-dangers-study)
- [TIME - The Risks of Kids Getting AI Therapy from a Chatbot](https://time.com/7291048/ai-chatbot-therapy-kids/)
- [Pew Research - How Teens Use and View AI](https://www.pewresearch.org/internet/2026/02/24/how-teens-use-and-view-ai/)
- [RAND - Youth Are Using Chatbots as Therapists](https://www.rand.org/pubs/podcasts/policy-minded/2026/youth-are-using-chatbots-as-therapists.html)
- [The Guardian - Teenagers turning to AI chatbots for mental health support](https://www.theguardian.com/technology/2025/dec/09/teenagers-ai-chatbots-mental-health-support)
- [Youth Endowment Fund - One in four teens turn to AI chatbots for mental health support](https://youthendowmentfund.org.uk/news/one-in-four-teens-turn-to-ai-chatbots-for-mental-health-support-study-finds/)

---

## Built For

**APOGEE GameJam 2026** - Postman x BITS Pilani

Theme: *Don't play the hero - design the system.*

---

