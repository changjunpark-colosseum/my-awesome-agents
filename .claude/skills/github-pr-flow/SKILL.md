---
name: github-pr-flow
description: Use when preparing to submit a pull request or verify changes before merging
---

# GitHub PR Flow

## Overview

Standardized process for creating high-quality Pull Requests that provide full context and adhere to project conventions.

## When to Use

- When you have completed a unit of work and are ready to merge
- Before running `gh pr create`
- When asked to "upload a PR" or "submit changes"

## Workflow

1.  **Context Verification**
    - Check `ai_context/work-log/` for latest task details to include in PR description.
    - Verify strict adherence to `ai_context/conventions/commit-convention.md`.

2.  **Pre-flight Checks**
    - Run local tests: `npm test` (or relevant command)
    - Run linting: `npm run lint`
    - Ensure build passes: `npm run build`

3.  **Template Usage**
    - Read `ai_context/template/pr-template.md`.
    - If missing, use the default template below.

4.  **Creation**
    - Create PR using GitHub CLI:
      ```bash
      gh pr create --title "feat: <title>" --body-file <temp-body-file>
      ```

## Quick Reference

- **Template**: `ai_context/template/pr-template.md`
- **Conventions**: `ai_context/conventions/commit-convention.md`
- **Command**: `gh pr create`

## Default PR Template (Fallback)

```markdown
## 概要

[작업 요약]

## 작업 내용

- [세부 작업 1]
- [세부 작업 2]

## 주의사항

[Review Point]
```

## Common Mistakes

- Skipping the `ai_context` check
- Using generic PR titles (e.g. "update code")
- Forgetting to run tests before PR
