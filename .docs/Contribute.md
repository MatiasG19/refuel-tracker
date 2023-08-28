# Contribute

Contributions are welcome, whether you have dicovered a bug or have an idea to improve the app.

1. Create issue
2. Fork project
3. Create fix/feature/etc branch
4. Make and test changes
5. Create pullrequest and attach issue

## Issues

Always create an issue when contributing, whether you contribute fixes, improvments, etc. This way others can follow along. Also make sure to use the of the available labels.

### Features

For new features and and major changes create an issue with a `feature` label. New features have to be approved first.

## Pullrequest

When creating a pullrequest, make sure to fill out the pullrequest template and to

Checklist before pullrequest:

- [ ] Tests created
- [ ] Changes tested on latest device API
- [ ] Self review of code
- [ ] Pipline ok

### Naming conventions

`[breaking] type(affected_code_keyword): Descriptive title`

**(Optional) [breaking]:**

Breaking "label" for breaking changes to app. Must be within brackets.

**(Optional) affected_code_keyword:**

Keyword(s) for affected part of code. Can be comma seperated when multiple parts of code are affected. Perenthesis are optionial when no keyword is neccessary.

**type:**

| type          | description                               |
| ------------- | ----------------------------------------- |
| feat          | feature for app                           |
| fix           | fix for app                               |
| test          | fix or add test                           |
| chore or base | housekeeping tasks, package updates, etc. |
| docs          | changes to documentation                  |
| pipe or bot   | changes to CI/CD pipline or bot           |

**Examples:**

`feat(graph): Improve graph data layout`

`[breaking] feat(database): Remove field`

`fix(backup): Add new premissions to Android`

`docs: Update contribution guide`

## Versioning

[Semantic versioning](https://semver.org/)
