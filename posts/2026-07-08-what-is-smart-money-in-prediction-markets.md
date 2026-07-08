---
title: "What is smart money in prediction markets?"
description: "Smart money means wallets with a verified record of being right. How to identify them on Polymarket, what following them tells you, and where it breaks."
date: 2026-07-08
slug: what-is-smart-money-in-prediction-markets
tags: [guides]
author: polywatch
markets: []
draft: false
---

"Smart money" gets thrown around loosely in trading circles. In prediction
markets it has an unusually concrete definition, because everything is
on-chain: **smart money is a wallet with a verified, public record of
profitable positions.** Not a big wallet — a *right* wallet. This guide covers
how that record is measured, what it can tell you, and the failure modes that
most "follow the smart money" takes skip.

## Why prediction markets make smart money measurable

In equities, "smart money" is a vibe backed by quarterly 13F filings. On
Polymarket, every position of every wallet is public, timestamped, and settles
to a binary outcome — $1 if right, $0 if wrong. That gives each wallet a real
scoreboard:

- **Realized profit** — money actually made on resolved markets, not paper
  gains that could still evaporate.
- **Hit rate at price** — being right at 90¢ is nearly free; being right at
  30¢ over and over is the interesting skill.
- **Consistency across markets and time** — one great call is luck; fifty
  resolved markets of above-entry-price accuracy is a track record.

This is why wallet leaderboards ranked by *realized* profit are the standard
instrument. Ranking by unrealized P&L or account size instead rewards whoever
happens to be up on one big open position — a lottery-ticket leaderboard, not
a skill leaderboard.

## Smart money vs whales — the distinction that matters

A whale is defined by **size**; smart money is defined by **accuracy**. They
overlap less than you'd expect. A $50K trade from an unranked wallet is a
liquidity event — it moves the price mechanically, and the tape can't tell you
whether it's informed. (We cover reading those in the
[whale watching guide](/blog/polymarket-whale-watching-guide).) A $2K entry
from a wallet with a long profitable record in *that category* carries more
information per dollar than the whale trade does.

The strongest signal on the tape is the intersection: **a top-ranked wallet
taking unusual size.** Skin in the game, from someone with a record, at a
scale they don't normally trade.

## What following smart money actually tells you

Following a ranked wallet is an information feed, not an oracle. What the feed
legitimately tells you:

- **Where accurate traders are paying attention.** Their entry into a sleepy
  market is often the first public sign a market is mispriced or about to
  matter.
- **What probability they were willing to pay.** A skilled wallet buying YES
  at 41¢ is asserting the true chance is meaningfully higher — that's a
  falsifiable claim you can weigh against your own read.
- **When they exit.** Position closes are as informative as opens, and far
  less visible unless you're tracking the wallet directly.

Treat it as one input into your own probability estimate — the same way you'd
treat depth, volume, and time-to-resolution when
[reading any market](/blog/how-to-read-polymarket-like-a-pro).

## Where it breaks: the honest caveats

Any smart-money system that doesn't disclose these is selling something.

1. **Survivorship bias.** Leaderboards show the wallets that won. For every
   skilled-looking record, some number of identical strategies went to zero
   and vanished from view. A 50-market record shrinks the problem but never
   removes it.
2. **Luck clusters.** Binary outcomes produce hot streaks by chance. Wallet
   skill estimates need volume — of *resolved* markets — before they mean
   much.
3. **Regime specificity.** A wallet that crushed election markets has shown
   no edge in sports or crypto. Category-level records beat global ones.
4. **Copying lags.** By the time a large entry is visible, the price has
   usually moved. Mirroring trades after the move systematically pays worse
   prices than the wallet you're copying — another reason the feed is better
   used as attention-direction than as instruction.
5. **Wallets aren't people.** One trader can run several wallets; a "new"
   wallet may be an old hand. Records attach to addresses, not identities.

## How PolyWatch ranks it

PolyWatch maintains a top-50 smart-money leaderboard ranked by realized,
resolved-market profit across Polymarket, recomputed continuously. You can
follow any ranked wallet and get a push notification the next time it opens a
position — including which market, side, and price. It's the
attention-direction use case, automated: the feed tells you *where to look*,
and the analysis stays yours.

PolyWatch is free on [iOS and Android](https://polywatch.org), with
smart-money follows in Pro.
