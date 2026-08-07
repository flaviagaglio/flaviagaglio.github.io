#!/usr/bin/env python3
"""
Pull the latest index.html from each standalone tool repo (passwords, keys,
mode-finder) and write it into public/<tool>/, which is what actually gets
served at flaviagaglio.github.io/<tool>/.

Those repos don't have their own GitHub Pages enabled - this copy is the only
thing that's live. Before this script existed the copy was updated by hand,
which drifted out of sync with the source repo more than once (an insecure
RNG and a broken music-theory bug both stayed live after being fixed
upstream, because nobody re-copied the file). This replaces the manual step.
"""
import re
import sys
import urllib.request

RAW_URL = "https://raw.githubusercontent.com/flaviagaglio/{repo}/main/index.html"

# Each tool's byline links back to https://flaviagaglio.github.io in its own
# repo; the copy served on the portfolio site instead links to that tool's
# project page. This is the one intentional difference from upstream, so it's
# re-applied on every sync rather than being a merge conflict to resolve by hand.
BYLINE_PATCHES = {
    "passwords": (
        '<div class="byline">by Flavia Gaglio</div>',
        '<div class="byline"><a href="/projects/passwords" style="color: inherit; text-decoration: none;">by Flavia Gaglio</a></div>',
    ),
    "keys": None,
    "mode-finder": (
        '<div class="byline">by <a href="https://flaviagaglio.github.io" target="_blank" rel="noopener">Flavia Gaglio</a></div>',
        '<div class="byline"><a href="/projects/mode-finder" style="color: inherit; text-decoration: none;">by Flavia Gaglio</a></div>',
    ),
}


def fetch(repo: str) -> str:
    url = RAW_URL.format(repo=repo)
    with urllib.request.urlopen(url, timeout=30) as resp:
        return resp.read().decode("utf-8")


def main() -> int:
    changed = []
    for repo, patch in BYLINE_PATCHES.items():
        html = fetch(repo)
        if patch:
            old, new = patch
            if old not in html:
                print(f"::error::{repo}: expected byline markup not found, refusing to sync (upstream html structure may have changed - update BYLINE_PATCHES)")
                return 1
            html = html.replace(old, new)

        dest = f"public/{repo}/index.html"
        try:
            with open(dest, "r", encoding="utf-8") as f:
                current = f.read()
        except FileNotFoundError:
            current = None

        if current != html:
            with open(dest, "w", encoding="utf-8") as f:
                f.write(html)
            changed.append(repo)
            print(f"synced {repo}")
        else:
            print(f"{repo}: already up to date")

    # Surface which tools changed to the workflow via an output file, so the
    # commit message can name them instead of just saying "sync".
    with open("/tmp/sync-tools-changed.txt", "w", encoding="utf-8") as f:
        f.write(",".join(changed))

    return 0


if __name__ == "__main__":
    sys.exit(main())
