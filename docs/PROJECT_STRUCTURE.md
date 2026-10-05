# Project structure

This repository is organized to keep CRUD logic easy to navigate and extend.

## Suggested layout
```text
.
├── README.md
├── LICENSE
├── .gitignore
├── .env.example
├── docs/
│   ├── ARCHITECTURE.md
│   ├── SETUP.md
│   └── API.md
├── src/
│   ├── routes/
│   ├── services/
│   ├── models/
│   └── utils/
├── tests/
├── scripts/
└── config/
```

## Notes
- Keep service logic separate from route handlers.
- Document the CRUD lifecycle for future contributors.
- Keep environment variables out of version control.
