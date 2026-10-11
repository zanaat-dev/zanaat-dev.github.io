---
title: Why your coding agent shouldn’t know what ‘Active’ means
description: Agents speak roles; trackers speak their own states. Why Baron keeps the two apart, and what breaks when they mix.
date: 2026-10-12
lang: en
project: baron
tags: [agents, work-tracking]
author: Zanaat
status: published
translation: kodlama-ajaniniz-active-in-ne-demek-oldugunu-bilmemeli
---

The first time you let a coding agent touch your tracker, the prompt usually says something like
this: *when you start a task, move it to Active; when the pull request is up, move it to Test.* It
works. It keeps working until the agent meets a second team.

Every tracker has words for the same few moments in a piece of work: it is waiting, someone is on
it, it is being reviewed, it is finished. The words are where they disagree. On one Azure DevOps
team we work with, those moments are `New`, `Active`, `Test` and `Closed`. A Jira project tends to
say *To Do*, *In Progress*, *In Review*, *Done*. A Linear team might call review *Code Review*.
GitHub Issues has two states, `open` and `closed`, and everything in between is a label somebody
invented.

An agent that has learned `Active` has learned one team’s process template, not the work.

## What actually goes wrong

It is rarely a crash. The failures are quiet, and that is the problem.

- **The agent guesses.** Asked to start a task on a Jira board, an agent primed with Azure words
  tries `Active`, gets refused, and improvises: `In Progress`, `Doing`, `Started`. Sometimes it
  lands on the right one. Sometimes it lands on a state that exists but means something else.
- **A state is not the whole picture.** On Azure Boards, an item can be in state `Active` and still
  sit in the wrong board column, because the column is a separate field. The prompt said “move it
  to Active”, the state changed, and the card stayed where it was. Nobody notices until stand-up.
- **The process changes under the prompt.** A team renames a column, adds a QA step, splits review
  in two. Every prompt that spelled the old names is now wrong, and none of them says so.

Each of these is the same mistake: native vocabulary leaked into the place where intent should be.

## Give the agent roles instead

[Baron](https://baron.zanaat.dev/) is the layer we built so a coding agent can work a tracker
without knowing its dialect. The agent never names a native state. It speaks five workflow roles:

`backlog → ready → in_progress → in_review → done`

Being blocked is not one of them. It is a flag that sits beside whatever role an item holds, so
unblocking returns the work to where it actually was instead of to a guess.

Starting a task, in Baron’s `task-start` recipe, is written once, in roles:

```yaml
- do: issue.transition
  as: issue
  with:
    id: ${issue.id}
    role: in_progress
```

The same step runs against Azure DevOps, Jira, Linear and GitHub. What changes per team is not the
recipe; it is a map.

## The map, and who writes it

The translation from roles to native states lives in one committed file, `.baron/policy.json`. For
the Azure DevOps team above it reads:

```json
"roleMap": {
  "azure-devops": {
    "stateKey": "state",
    "states": {
      "backlog": { "state": "New" },
      "in_progress": { "state": "Active", "boardColumn": "In Progress" },
      "in_review": { "state": "Test", "boardColumn": "Test" },
      "done": { "state": "Closed" }
    }
  }
}
```

Two details matter. The board column travels with the state, so “in progress” means the state *and*
the column the team actually looks at. And nobody typed this by hand: `baron init` reads the
tracker’s real states and columns, proposes the map, and a person confirms it. The agent never
decides what `in_review` means on your board. Someone who knows the board does, once.

## When the map has a hole

Look at the map again: there is no `ready`. That team has no such step. Their work goes straight
from `New` to `Active`.

So what happens when a recipe asks for `ready` there? Baron refuses, before anything is written,
and says why:

```text
Role 'ready' has no native mapping for provider 'azure-devops'. Run `baron init` to (re)build
the role map, or add it to policy.roleMap.azure-devops.states.
```

That refusal is the point. A missing capability is never filled in silently. Every gap goes through
a policy the team chose: `error` stops with a message like the one above; `emulate` synthesizes the
missing piece (GitHub has no parent and child issues, so Baron can carry the hierarchy in a
`parent:<id>` label); `degrade` skips the step and logs a warning that says so. What never happens
is the quiet version, where the agent improvises a state and the board drifts.

## Where opinion belongs

Splitting roles from states has a second effect: it separates *what your process is* from *what
your tool calls it*. “When a pull request opens, move the item to review” is process. It lives in a
recipe, as plain YAML the team can read and change. “Review is called `Test` here and sits in the
`Test` column” is vocabulary. It lives in the map. Neither belongs in a prompt.

If you are writing agent instructions today, with Baron or without it, the rule carries over: keep
native names out of the instructions. Name the intent, keep the translation in configuration a
human has confirmed, and make the gaps loud.

Your agent should know your process. It should not need to know what ‘Active’ means.

---

Baron is open source. Install it with `npx @zanaat/baron-cli init`, or read how roles, maps and gap
policies work in the [concepts guide](https://baron.zanaat.dev/docs/concepts/).
