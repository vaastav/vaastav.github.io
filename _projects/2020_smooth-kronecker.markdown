---
layout: page
title: Smooth Kronecker
description: Kronecker Graph Generator with Smooth degree distributions
img: /assets/img/skron.png
research: true
---

Graphs and graph-processing have become increasingly important. This has led to an explosion in the development of 
graph-processing systems, each of which is evaluated relative to its predecessors. In the absence ofa large corpus of 
real-world graphs, synthetic generators provide an easy way to construct graphs of varying sizes. The most widely used 
generator is the Kronecker generator. Unfortunately, the Kronecker generator was not designed to produce graphs for 
benchmarking and when used in this fashion, it is problematic in two ways.First, the fraction of zero-degree vertices scales 
with the graph size, dramatically reducing the effective size of the connected graph. Second, the generator produces a vertex 
degree distribution not found in real world set-tings. We demonstrate these phenomena and present the Smooth Kronecker 
Generator, which remedies the vertex degree distribution problem without changing the statistical properties of the graph.

Full paper is available [here](/assets/pdf/anand2020smooth.pdf).
Github code is available [here](https://github.com/dmargo/smooth_kron_gen).