---
layout: page
title: Sifter
description: Encoding-based sampling for distributed Tracing
research: true
---

Distributed tracing is a core component of cloud and datacenter systems, and provides visibility into their end-to-end
runtime behavior. To reduce computational and storage overheads, most tracing frameworks do not keep all traces,
but sample them uniformly at random. While effective at reducing overheads, uniform random sampling inevitably
captures redundant, common-case execution traces, which are less useful for analysis and troubleshooting tasks. In
this work we present Sifter, a general-purpose framework for biased trace sampling. Sifter captures qualitatively more
diverse traces, by weighting sampling decisions towards edge-case code paths, infrequent request types, and 
anomalous events. Sifter does so by using the incoming stream of traces to build an unbiased low-dimensional model that
approximates the system’s common-case behavior. Sifter then biases sampling decisions towards traces that are poorly
captured by this model. We have implemented Sifter, integrated it with several open-source tracing systems, and evaluate
with traces from a range of open-source and production distributed systems. Our evaluation shows that Sifter 
effectively biases towards anomalous and outlier executions, is robust to noisy and heterogeneous traces, is efficient and
scalable, and adapts to changes in workloads over time.