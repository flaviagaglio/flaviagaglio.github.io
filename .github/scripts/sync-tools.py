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

Each tool's own repo links its "by Flavia Gaglio" byline straight back to
https://flaviagaglio.github.io, so the copy here is synced verbatim - no
per-tool patching needed.
"""
import sys
import urllib.request

TOOLS = ["passwords", "keys", "mode-finder"]
RAW_URL = "https://raw.githubusercontent.com/flaviagaglio/{repo}/main/index.html"


def fetch(repo: str) -> str:
    url = RAW_URL.format(repo=repo)
    with urllib.request.urlopen(url, timeout=30) as resp:
        return resp.read().decode("utf-8")


def main() -> int:
    changed = []
    for repo in TOOLS:
        html = fetch(repo)

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
