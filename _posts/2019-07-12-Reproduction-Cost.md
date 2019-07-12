---
layout: post
title: Reproduction of "Scalability! But at what COST!"
date: 2019-07-21
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
| ----------------- | ------- |
| Cargo | 1.3.0 |
| Rustc | 1.3.1 |
| Java  | 1.8.0 u191|
Table 1 : Versions of various softwares and languages used in the study.

## Preprocessing

Before, one can run the experiments shown in the original paper,
one must complete a bunch of tasks to process the datasets into the correct format required by
the provided code of COST. The timing results for each of these tasks are shown in Table 2 below .
The tasks are listed in the order they must be performed.

| Preprocessing Task | twitter\_rv | uk-2007-05 |
| ----------------- | ------- | ------- |
| Convert to Input Format | 0s | 16946s | 
| Convert to Vertex Order | 156s | 402s | 
| Convert to Hilbert Order | 147s | 276s |
| Finding Max Vertex ID (Vertex) | 1.8s | 14.9s | 
| Finding Max Vertex ID (Hilbert) | 1.5s | 13.3s |
| Total | 306.3 | 17652.2|
Table 2 : Computation Time (in s) for various preprocessing tasks for Twitter and uk datasets.

The twitter_rv dataset is already available in the Input format required by the COST framework to convert
the dataset to vertex and hilbert order. Thus, the preprocessing time required for converting this dataset to
input format was labelled as 0.

The uk-2007-05 dataset is only available in binary format which is readable by WebGraph.
The conversion of uk-2007-05 dataset takes
a long time as the code I wrote is not fully optimized to convert the dataset into the format required. 
The code is a modification of the [BreadthFirst Example](https://github.com/lhelwerd/WebGraph/blob/a61c6a1d409d89eb2f0112b2cc837eea409b2774/src/it/unimi/dsi/webgraph/examples/BreadthFirst.java) provided by the WebGraph developers.
The modified code prints every edge to stderr and the script running the code pipes the output on stderr to a file, thus the code
pays a double-write penalty. A faster implementation would be to directly write to the output file in a buffered fashion. 