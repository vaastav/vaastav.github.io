---
layout: post
title: Systems Trivia - Behind The Scenes
date: 2023-07-19
keywords:
  - trivia
tags:
  - tech
  - trivia
  - research
excerpt: This post provides a behind the scenes look into the 3 systems trivia events we have run so far at Systems conferences.
---

This post provides a behind the scenes look into the 3 systems trivia events we (Roberta De Viti and I) have run so far at Systems conferences.

This post is a re-post of the [SIGOPS Blog Post](https://www.sigops.org/2023/systems-trivia-behind-the-scenes/) that we were invited to write by editor Tianyin Xu.

<img src="{{ "assets/system_trivia_1.png" | absolute_url }}" width="1024" height="572" />

## The Original Script

We ran our first trivia event at the first – and hopefully last – virtual edition of HotOS: HotOS ’21. The  idea of a potential trivia event came about due to a combination of three independent things: (1) the lockdown killing everyone’s social life and bringing up the need for something fun; (2) HotOS ’21 releasing a Call for Panels; and (3) Paulette Koronkevich and Jose Calderon organising a very successful virtual Trivia event at PLDI’20, which served as the primary social mixer.

So, after seeing that HotOS ’21 call for panels, as systems researchers we had an age-old idea: let’s implement the techniques of PL researchers in the context of the systems community! We realised that a fully virtual HotOS programme would leave very little room for the kind of social mixing we would normally experience in the hallways… To fill this need, we decided to write down a proposal for the first ever Systems Trivia Night at HotOS ’21, which got accepted, and the rest is history. But what happened behind the scenes?

First thing, we contacted the PL Trivia Masters, Paulette and Jose, to learn the operational insights of their virtual Trivia Event. The main takeaway actually ended up being about content selection. The PL Trivia was structured as a pub quiz, with the content including fun general knowledge questions. Would this have worked in the systems community? Honestly, we were afraid they wouldn’t have engaged that much, so we decided to focus the Trivia content around what the systems community was most passionate about – systems. With this insight, all that was left was how to create a fun experience for everyone, how to make questions, how to present without us looking like dorks… we failed at the last one, but more on the rest later. Our initial strategy for questions was to source content from the community but we abandoned that strategy in favour of making up our own questions! 

**#Advertisement**: Systems Trivia is an MPI-SWS production. We’d like to thank Jonathan Mace for being ultra-supportive of the ideas and motivating us.

## Multiple Takes

Our intention was for the Systems Trivia Night at HotOS ’21 be a one-off event to foster community bonding in the middle of the pandemic. However, the event unexpectedly turned out to be greatly successful, and the Chairs of SOSP ’21 (Vijay Chidambaram and Anthony Joseph) and HotOS ’23 (Natacha Crooks and Andrew Baumann) reached out and asked us to organize more Trivia events at both these venues. An offer we couldn’t refuse.

***SOSP ’21***. With new events come new responsibilities. First, not only SOSP ’21 was virtual… it was an event mirrored for the Asia-Pacific timezone.  This mirroring required solving both organizational challenges and content challenges. To solve the organizational challenges, we ended up having two different teams for running two different Trivia instances, one for each mirror. To solve the content challenges, we had to decide whether we wanted to tailor content to specific regions: ultimately, we opted for the simpler and less-overhead-prone solution of having the same content for both instances, and the Asia-Pacific team decided to play a recording from the live session to present questions and answers. SOSP ’21 also made us rethink some of our sections… Reaching out to members of the community and asking them to pick their favorite paper does not scale, as only a small subset replied. So, we decided not to rely on the community as a source for future events.

![systems_trivia_2]({{ "assets/systems_trivia_2.png" | absolute_url }})

*HotOS ’23*. This was the first in-person event that we had ever organized. Hosting an in-person event meant we had to throw away all the operational knowledge we had learnt over the past two trivia events and start from scratch. Thankfully, organizing an in-person event has its silver linings, as we didn’t need to do the grading ourselves… but we did forget to ask attendees to bring pens to fill out their quiz forms. Oops.

![systems_trivia_3]({{ "assets/systems_trivia_3.png" | absolute_url }})

## Storyboarding Questions

How to pick good questions? We don’t have a straight answer for that and mostly go with the flow, but here are some points we definitely agree on.

+ Somehow, questions have to be fun. That was the whole point after all.
+ Questions can’t be too hard or people lose interest.
+ Questions can’t be too easy or people lose interest.
+ Questions can’t be biased to a subset of the audience: they have to be doable for both the experienced members and the youngblood researchers.
+ We can’t repeat questions or answers through different editions (well, we could, but decided against it). Still, the pool of most famous systems isn’t that wide after three editions!
+ As mentioned above, relying on other community members is not a scalable approach.

Here is a list of the kind of rounds we organized. We thought too many questions of the same type would have been boring, so opted for a bit of variation:

+ *What’s that paper?* The participants have to guess the name of the paper from a short description. Probably the most popular round.
+ *Mace’s Believe it or Not?* A community member writes up an anecdote and the participants have to guess whether this is real life or just fantasy. We dropped this round because the participants didn’t like to guess.
+ *Turing Awards.* This round proposes Trivia about Turing Award winners. Given its limited number and even more limited diversity, it didn’t make it past the first Trivia edition.
+ *Head-to-Head.* The participants are given two papers and have to guess which one has more citations. The papers are on similar topics, have a close number of citations, and sometimes the answer is not what you expect.
+ *Guess Who?* This was just a practice round, useful to get participants accustomed to the virtual format. They were given a picture of a researcher and had to guess the name of the person.
+ *Have you been paying attention?* This was another practice round testing how well the participants have been paying attention during the conference.
+ *History 101.* This round contains general Trivia questions about well known papers, members of the community, or conference facts.
+ *Know Thy System.* The participants have to recognize a particular system from, e.g., an architecture diagram. The first iteration of this round included systems design figures from their papers; we tried to spice things up in the second iteration by using emojis as hints for the paper name… We thought this would have advantaged students, but the results highlighted that even senior community members have a good level of pop culture knowledge.

## In Production

A systems blog post would really be incomplete without an evaluation section. Here are some statistical highlights from these past three editions:

+ HotOS ’21: 13 participating teams (up to 5 members) and 203 unique viewers on Twitch. “UBC Systopia” (David Holland, Aastha Mehta, Reto Achermann, Sid Agrawal, Puneet Mehrotra) won with 27/35 points.
+ SOSP ’21: 10 participating teams (up to 5 members) and 121 unique viewers on Twitch. “Team Demikernel” (Irene Zhang, Pedro Penna) won with 153/200 points.
+ HotOS ’23: 11 teams (up to 5 members each) and ~100 HotOS attendees. “5 Colors of the Rainbow” (Shirley Loayza Sanchez, Ada Gavrilovska, Timothy Roscoe, Phil Levis, Jeff Mogul) won with 26/30 points. Someone made us notice they got an unfair advantage, though: Mothy and Jeff had authored a few too many answers. 

## Prizes

Our original idea was to give physical Bitcoin coins along with corresponding NFTs… But turns out we were too lazy to figure out how to mint an NFT, so all the winners got was this priceless piece of metal. They better have it on display!

![systems_trivia_3]({{ "assets/systems_trivia_4.png" | absolute_url }})

## Post-Credit Outtakes

Wait, did you think it was over? It’s only fitting that a blog post about Trivia ends on a trivia question. Here is an example of a very silly question that never made it to an official Trivia event – and never will:

What does a Turing Award prize resemble the most?

+ Helga Hufflepuff’s cup
+ Traditional Pasta Colander
+ Inverted Army Soldier’s Hat 
+ Holy Grail

The answer to this question is left as an exercise to the reader. Once you see it, it cannot be unseen.