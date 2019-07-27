---
layout: post
title: Reproduction of "Scalability! But at what COST!"
date: 2019-07-11
keywords:
  - COST reproduction
tags:
  - tech
  - research
excerpt: This post summarizes the results of the experiments in the COST paper that I reproduced for my CPSC 508 class assignment.
---

This post summarizes the results of the experiments in the [COST paper](https://www.usenix.org/system/files/conference/hotos15/hotos15-paper-mcsherry.pdf)
that I reproduced for my [CPSC 508, Graduate Operating Systems](https://www.seltzer.com/margo/teaching/CS508.19/syllabus.html) class assignment earlier in the year (January 2019).

## Goal

The goal of this post is to reproduce and verify the results of the experiments presented in
the COST paper.

## Summary of the paper

In the COST paper, the authors provide a new, unbiased metric
for measuring scalability of distributed graph processing systems. The metric provided, called COST i.e.
Configuration that Outperforms a Single Thread, measures the hardware configuration required by systems
to outperform a single-threaded implementation of the same task.

The goal of this paper is to measure the real scalability of distributed graph processing systems without
rewarding systems that bring substantial but parallelizable overheads. The authors additionally aim to
show that single-threaded implementations can significantly outperform "scalable" distributed frameworks
and that they should be used as benchmarks for measuring scalability.

The hypotheses of this paper is two-fold. Firstly, the distributed graph-processing frameworks don't use a good baseline
while measuring their scalability and that this scalability comes at a cost of the overheads that these
systems introduce. Secondly, the single-threaded implementation of the same tasks performed by the system
are a great baseline for measuring the true scalability of these systems.

## Experimental Setup

All experiments were carried out on an Intel(R) Core(TM) i7-8700 CPU @ 3.20GHz with 32GB RAM and 250GB SSD.
The machine was running Ubuntu 16.04 LTS.
For producing the results for the experiment, I used the following tools :

+ [Rust implementations](https://github.com/frankmcsherry/COST) of the graph algorithms provided by the authors to re-run all the single-thread experiments.
+ [WebGraph](http://webgraph.di.unimi.it/) to convert uk-2007-05 dataset into the format required by the rust implementation

The versions of cargo, rust, and java for pre-processing steps and are presented in the following Table

| Language/Software | Version |
| :-----------------: | :-------: |
| Cargo | 1.3.0 |
| Rustc | 1.3.1 |
| Java  | 1.8.0 u191|

**Table 1 : Versions of various softwares and languages used in the study.**

## Preprocessing

Before, one can run the experiments shown in the original paper,
one must complete a bunch of tasks to process the datasets into the correct format required by
the provided code of COST. The timing results for each of these tasks are shown in Table 2 below .
The tasks are listed in the order they must be performed.

| Preprocessing Task | twitter\_rv | uk-2007-05 |
| :-----------------: | :-------: | :-------: |
| Convert to Input Format | 0s | 16946s | 
| Convert to Vertex Order | 156s | 402s | 
| Convert to Hilbert Order | 147s | 276s |
| Finding Max Vertex ID (Vertex) | 1.8s | 14.9s | 
| Finding Max Vertex ID (Hilbert) | 1.5s | 13.3s |
| Total | 306.3 | 17652.2|

**Table 2 : Computation Time (in s) for various preprocessing tasks for Twitter and uk datasets.**

The twitter_rv dataset is already available in the Input format required by the COST framework to convert
the dataset to vertex and hilbert order. Thus, the preprocessing time required for converting this dataset to
input format was labelled as 0.

The uk-2007-05 dataset is only available in binary format which is readable by WebGraph.
The conversion of uk-2007-05 dataset takes
a long time as the code I wrote is not fully optimized to convert the dataset into the format required. 
The code is a modification of the [BreadthFirst Example](https://github.com/lhelwerd/WebGraph/blob/a61c6a1d409d89eb2f0112b2cc837eea409b2774/src/it/unimi/dsi/webgraph/examples/BreadthFirst.java) provided by the WebGraph developers.
The modified code prints every edge to stderr and the script running the code pipes the output on stderr to a file, thus the code
pays a double-write penalty. A faster implementation would be to directly write to the output file in a buffered fashion. 

## Reproduced Experiment Results

| Name | twitter\_rv | uk-2007-05 |
| :----: | :--------: | :----------: | 
| nodes | 41,652,230 | 105,896,555 |
| edges | 1,468,365,182 | 3,738,733,648 |
| size | 5.76GB | 14.72GB |
| txt format size | 25GB | 63GB |
| encoded size | 5.8GB | 14.71GB |

**Table 3 shows the size of the datasets used in the experiments. This table is a reproduction of Table 1 from the original paper**

| Scalable System | cores | twitter\_rv | uk-2007-05 |
| :----: | :--------: | :----------: | :-------: |
| GraphChi~\cite{kyrola2012graphchi} | 2 | 3160s | 6972s |
| Stratosphere~\cite{ewen2012spinning} | 16 | 2250s | - |
| X-Stream~\cite{roy2013x} | 16 | 1488s | - |
| Spark~\cite{gonzalez2014graphx} | 128 | 857s | 1759s |
| Giraph~\cite{gonzalez2014graphx} | 128 | 596s | 1235s |
| GraphLab~\cite{gonzalez2014graphx} | 128 | 249s | 833s |
| GraphX~\cite{gonzalez2014graphx} | 128 | 419s | 462s |
| Single Thread (SSD) | 1 | 300s | 651s |
| Single Thread (RAM) | 1 | 275s | - |
| Single Thread Reproduced (SSD) | 1 | 289.6s | 119.7s |

**Table 4 compares the performance of the scalable systems with that of a single-threaded implementation of 20 iterations of the pagerank algorithm. This table is a reproduction of Table 2 from the original paper. Only the rows labeled as "Reproduced" were reproduced.**

| Scalable System | cores | twitter\_rv | uk-2007-05 |
| :----: | :--------: | :----------: | :-------: |
| Stratosphere~\cite{ewen2012spinning} | 16 | 950s | - |
| X-Stream~\cite{roy2013x} | 16 | 1159s | - |
| Spark~\cite{gonzalez2014graphx} | 128 | 1784s | >=8000s |
| Giraph~\cite{gonzalez2014graphx} | 128 | 200s | >=8000s |
| GraphLab~\cite{gonzalez2014graphx} | 128 | 242s | 714s |
| GraphX~\cite{gonzalez2014graphx} | 128 | 251s | 800s |
| Single Thread (SSD) | 1 | 153s | 417s |
| Vertex Reproduced (SSD) | 1 | 93s | 58.8s |
| Hilbert Reproduced (SSD) | 1 | 30s | 57s|

**Table 5 compares the performance of the scalable systems with that of a single-threaded implementation of label propagation algorithm. I have added the results from using both orderings of vertices as well to the table.This table is a reproduction of Table 3 from the original paper. Only the rows labeled as "Reproduced" were reproduced.**

| Scalable System | cores | twitter\_rv | uk-2007-05 |
| :----: | :--------: | :----------: | :-------: |
| GraphLab~\cite{gonzalez2014graphx} | 128 | 249s | 833s |
| GraphX~\cite{gonzalez2014graphx} | 128 | 419s | 462s |
| Vertex Order (SSD) | 1 | 300s | 651s |
| Vertex Order (RAM) | 1 | 275s | - |
| Hilbert Order (SSD) | 1 | 242s | 256s |
| Hilbert Order (RAM) | 1 | 110s | - |
| Vertex Order Reproduced (SSD) | 1 | 289.6s | 119.7s |
| Hilbert Order Reproduced (SSD) | 1 | 84s | 141.6s|

**Table 6 compares the performance of the scalable systems with that of a single-threaded implementation of 20 iterations of the pagerank algorithm for different orderings of vertices. This table is a reproduction of Table 4 from the original paper. Only the rows labeled as "Reproduced" were reproduced.**

| Scalable System | cores | twitter\_rv | uk-2007-05 |
| :----: | :--------: | :----------: | :-------: |
| GraphLab~\cite{gonzalez2014graphx} | 128 | 242s | 714s |
| GraphX~\cite{gonzalez2014graphx} | 128 | 251s | 800s |
| Single thread (SSD) | 1 | 153s | 417s |
| Union-Find (SSD) | 1 | 15s | 30s |
| Vertex LabelProp Reproduced (SSD) | 1 | 93s | 58.8s |
| Hilbert LabelProp Reproduced (SSD) | 1 | 30s | 57s|
| Vertex Union-Find Reproduced (SSD) | 1 | 24.2s | 11.744s |
| Hilbert Union-Find Reproduced (SSD) | 1 | 5.9s | 13.528s|

**Table 7 compares the performance of the scalable systems with that of single-threaded implementations of label propagation and union-find algorithms. I have added the results from using both orderings of vertices as well to the table. This table is a reproduction of Table 3 from the original paper. Only the rows labeled as "Reproduced" were reproduced.**

## Comparison with the Original

Here is the comparison of the reproduced results with the original results.

Label_Prop : 

| Scalable System | twitter | uk |
| :-------------: | :-----: | :---: |
| Original SSD | 153s | 417s |
| New Hilbert SSD | 30s | 57s |
| New Vertex SSD | 93s | 58.5s |

PageRank : 

| Scalable System | twitter | uk |
| :-------------: | :-----: | :---: |
| Original SSD | 300s | 651s |
| New Vertex SSD | 289.6s | 119.7s |
| New Hilbert SSD | 84s | 141.6s |

Union_Find : 

| Scalable System | twitter | uk |
| :-------------: | :-----: | :---: |
| Original SSD | 15s | 30s |
| New Vertex SSD | 24.2s | 11.744s |
| New Hilbert SSD | 5.9s | 13.528s |

The reproduced results are clearly better than the original results. The primary reasoning behind this is that
since the original paper was published, the hardware and the program toolchain has improved so that we see this increase in 
performance. Additionally, as the original results were produced on a Mac which does not have access to Big Pages that
Linux does have access to. 

After I brought this to the author's attention via a [github issue](https://github.com/frankmcsherry/COST/issues/8),
the author did reproduce the results on the original Macbook used for the experiments, as well as a powerful desktop
with and without Big Pages.
The results were as follows for the twitter dataset : 

| Algorithm | Vertex Ordering | Laptop | Vaastav | Desktop | Desktop+ |
| :-------: | :-------------: | :----: | :-----: | :-----: | :------: |
| pagerank20 | vertex  |  440.58s  | 289.6s | 253.19s |  174.31s |
| pagerank20 | hilbert |  141.72s  |  84.0s |  70.44s |   63.50s |
| label_prop | vertex  |  158.34s  |  93.0s |  86.68s |   73.24s |
| label_prop | hilbert |   57.11s  |  30.0s |  27.99s |   26.09s |
| union_find | vertex  |   34.34s  |  24.2s |  26.56s |   21.43s |
| union_find | hilbert |   12.58s  |   5.9s |   7.14s |    6.69s |

## Bugs Found

I found a couple of issues while preprocessing the graphs. 

1. The stats binary provided by the authors had an overflow bug where the variable reporting the number of edges reporting was 
overflowing as the rust compiler was inferring the type of that variable to be a 32-bit signed integer. Because of this issue, the 
stats binary wasreporting the number of edges for uk-2007-05 dataset to be -556233648 instead of its correct value of
3738733648 . I fixed this (very simple) issue and submitted a [Pull Request](https://github.com/frankmcsherry/COST/pull/6).
The PR was merged on Monday morning 21st January, 2019 at about 2.00 am.
2. All the iterators implicitly assume that the vertex IDs are limited by the max value of an unsigned 32-bit integer (~4.2Billion).
For the datasets in question, the provided code would work perfectly, however if a dataset contains a vertex ID greater than the max 
value it would result in overflow errors and result in incorrect results being produced. Due to time constraints and unfamiliarity of 
rust, I was unable to provide a fix for this issue, however I have notified the authors of the problem by creating an [issue](https://github.com/frankmcsherry/COST/issues/7) on github. The author replied to me and encouraged me to explore this in a
fork. Sadly, I haven't had the time to fix this bug yet!

## Conclusion

In conclusion, COST is a great piece of scientific research not only in terms of contribution but also due to the
fact that it is highly reproducible.