---
layout: post
title: Summary of the PACMI 2026 Panel Discussion on Systems Research in the AGI Era
date: 2026-09-29
keywords:
  - panel
tags:
  - research
  - tech
excerpt: Summary of the PACMI 2026 co-located with SOSP 2026 in Prague, Czechia
---

# About the Panel

The [PACMI 2026](https://sites.google.com/view/pacmi/) workshop at SOSP 2026 in Prague, Czechia
organized a timely panel discussion on what systems research would look like in the current era
with the rise of the AI models.
The panelists were Laurent Bindschaedler (MPI-SWS), Ana Klimovic (ETH Zürich), and Shivaram Venkatraman (ETH Zürich)
with Kostis Kaffes (Columbia University) serving as the moderator.

In this blog post, I will be discussing some of the key topics and themes of the panel discussion, the thoughts of the panelists, audience participation,
and some of my personal thoughts.

## Panel Summary

### Are we in the AGI era?

The starting theme of the panel was whether the panelists agreed if we were in an AGI era. 
The panelists agreed that we are not in an AGI era currently especially given that there is no agreed upon definition
of what AGI truly means.
The models have improved intelligence but the models today have the capability today for being so good but also stupid. 
Models today are good at things that we can easily verify but it is unknown what these things will be good in the future.

### What's different about working in AI now?

The quality of output is much better now. The use of AI in systems research was clunky
as researchers typically used small models on the critical path of the system execution.
This meant that the use of the models and AI in systems code needed to be surgical.
But now, models are more capable and have the ability to generate code.
SO, now they are moere usable in the system context because they are not limited to the critical path.
There are open questions in model design and harness design and we may keep switching between these two problems
in the coming years but one thing we may see more of is model selection, i.e., which model to use for which task.

### What research should we be doing?

Models are improving at a breakneck speed! Harnesses that are required for a specific model version
can become obsolete for the next generation of the same model. Any research that tries to box in the
capabilities of the model is not very likely to survive model improvements.

**Open-Weight Models:** These models while not as performant as the proprietary models but they can be useful from a privacy and efficiency point-of-view. However, currently these models lack the ecosystem for getting the user feedback in the loop to improve these models.
Training these models remains super hard and inefficient.

**Specialized Models:** Smaller specialized models could prove to be more efficient than the large language models. 

**Stronger Guarantees:** We should be developing techniques that can provide stronger guarantees about the system and ways to more efficiently verify the outputs of the models.

**Industry Problems:** We also should not be restricting ourselves in terms of the problems we tackle. Benefit of academia is that we can take different approaches than industry to tackle problems.

### What will SOSP look like in 2030?

Given the attack of LLMs on the field of mathematics, one might be inclined to believe the pessimistic worst-case scenario
that maybe by 2030, SOSP would cease to exist. Given the "Navier Stokes" incident and the subsequent release of lean proofs
for various open math problems, the doom-scroller in me thinks that the pessimistic case might just become the reality of our world.

However, the panelists did provide a far more believable scenario that there will be an cambrian explosion of papers with certain themes. Formal Verification papers,
New Hardware systems papers, and Bespoke systems papers will probably dominate the SOSP schedule in the coming years.
We may even see a collapse in reliability of systems (the reliability researcher in me was very happy to hear this as this hopefully indicates some sort of job security :P).
Finally, there was consensus that with the speed of advancement on show at the moment, one really can not predict what is going to happen in the next few months let alone in the next few years.

If you want to provide your opinion or thoughts on what SOSP will/should look like in 2030, consider completing this very short [survey](https://forms.gle/Lk3gZgBfm4xBqomZ9) that I have set up.

### What should we be teaching students?

Clearly, the rise of LLMs and agents has not just been disruptive in research but also in teaching.
While the purists (which I think I am one of?) believe that students should learn the fundamentals of computer science,
this may not be what students believe is the actual thing they want to learn.

The panelists also shared the purist viewpoint that it is important to learn the fundamentals and nothing about the first couple
of years of undergraduate should change as that is the period that teaches the students to learn the fundamentals.
For later years and masters courses, the projects could instead focus on getting students to use AI to build better systems or policies in constrained settings to better teach students on how to interact with models.
Panelists also thought that the people who are most effective with agents are the people that truly understand the concepts
at a fundamental level. But there was a shared concern among the panelists that now they probably have to justify why they are teaching
certain material to the students. Another concern was how do we actually check if students are actually learning and not just offloading
the actual programming tasks to their favourite LLM. The panelists believe that the future of grading is going to be in-class grading
which might require students to explain what they did and how they did it. 

The thing we ideally want to teach students is that for anything they build, they will be the ones held responsible and accountable for their software.
This has been implicit so far in almost all courses, the rise of LLMs necessitates that this becomes an explicit learning goal.