# Commit Convention

The commit message format is:

```
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

## Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation only changes
- `style`: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
- `refactor`: A code change that neither fixes a bug nor adds a feature
- `perf`: A code change that improves performance
- `test`: Adding missing tests or correcting existing tests
- `chore`: Changes to the build process or auxiliary tools and libraries such as documentation generation

## Scope

Optional, but encouraged. Specifies where the commit change is located.

## Subject

- Use imperative mood ("Change" not "Changed" nor "Changes")
- No dot at the end

## Example

```
feat(auth): add google oauth login

Implemented google oauth login flow including backend API endpoints and frontend login button.

Resolves: #123
```
