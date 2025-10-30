# Contributing to CronoStar Card

First off, thank you for considering contributing to CronoStar Card! It's people like you that make the open-source community such a great place. We welcome any and all contributions.

## Where do I go from here?

If you've noticed a bug or have a feature request, [make one](https://github.com/FoliniC/cronostar-card/issues/new/choose)! It's generally best if you get confirmation of your bug or approval for your feature request this way before starting to code.

## Fork & create a branch

If this is something you think you can fix, then [fork CronoStar Card](https://github.com/FoliniC/cronostar-card/fork) and create a branch with a descriptive name.

A good branch name would be (where issue #38 is the ticket you're working on):

```bash
git checkout -b 38-add-amazing-new-feature
```

## Get the project running

To get the project running, you'll need to have Node.js and npm installed. You can follow the development setup instructions in the [README.md](README.md).

```bash
# Install dependencies
npm install

# Start the development server (watches for changes and rebuilds)
npm run watch
```

## Make your changes

Make your changes to the source code in the `src/` directory. Ensure you follow the existing code style.

## Testing your changes

To test your changes, you'll need to link your development version of the card to your Home Assistant instance.

1.  Run the build script:
    ```bash
    npm run build
    ```
2.  Copy the generated `dist/cronostar-card.js` file to your Home Assistant's `config/www` directory.
3.  Add the card to your Lovelace resources with a version query string to avoid caching issues (e.g., `/local/cronostar-card.js?v=1.2.3`).
4.  Reload your Home Assistant dashboard and test the changes.

## Commit your changes

Make sure your commit messages are clear and descriptive. Reference the issue number you are working on.

```bash
git commit -m "feat: Add amazing new feature (fixes #38)"
```

## Submitting a pull request

When you're done with the changes, create a pull request, also known as a PR.

-   Don't forget to [link the PR to the issue](https://docs.github.com/en/issues/tracking-your-work-with-issues/linking-a-pull-request-to-an-issue) if you are solving one.
-   Enable the checkbox to [allow maintainer edits](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/allowing-changes-to-a-pull-request-branch-created-from-a-fork) so the branch can be updated for a merge.
-   We may ask for changes to be made before a PR can be merged, either using [suggested changes](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests/incorporating-feedback-in-your-pull-request) or by providing feedback.

## Code of Conduct

By participating in this project, you agree to abide by the [Code of Conduct](CODE_OF_CONDUCT.md). Please be excellent to each other.
