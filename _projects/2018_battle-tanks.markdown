---
layout: page
title: Battle Tanks
description: P2P Battle Royale Game
img: /assets/img/battle.jpg
personal: true
---

Battle Tanks is a a P2P Distributed Battle Royale game written in Go with validation of player actions.

<h4 class="text-center">Features</h4>
<ul>
    <li>A Peer-to-peer network architecture</li>
    <li>A centralized server for game discovery</li>
    <li>Flooding protocol for dissemination of all actions</li>
    <li>Uses client side prediction to validate every action of every player</li>
    <li>Berkeley Algorithm for Clock Synchronization to prevent network congestion by old packets.</li>
    <li>Uses Distributed KV store for stat collection </li>
    <li>Open-ended class project for CPSC 416</li>
</ul>

More info at <a href="https://github.com/vaastav/CS416-Tanks" class="github"><i class="fab fa-github fa-fw fa-2x"></i></a>