---
layout: page
title: Tracey
description: Distributed Trace Comparison and Aggregation using NLP techniques
img: /assets/img/tracey.png
research: true
---

Distributed systems are widespread in usage.
Yet, they continue to be marred by bugs. Distributed
tracing is a widely adopted approach
that gives engineers visibility into cloud systems.
Existing tracing tools support analysis
of a single request and are most useful for debugging
correctness issues.

However, diagnosing an issue in the processing
of a request, requires comparing the execution
of a buggy request to a non-buggy request
or even an aggregate set of requests. Some issues
even require comparing the behavior of
two different sets of requests to identify a potential
issue. Existing trace analysis tools either
do not support these use cases or produce
an output that is not understandable.

To rectify this, we propose a new
approach for performing trace comparison and
aggregation. The key insight of our approach
is to derive a text representation for each trace
and then perform aggregation and comparison
on texts. The benefit of this approach is twofold:
we can leverage text summarization and
comparison algorithms; the output produced
is text which is understandable for users. We
present algorithms for generating a text representation
from a trace, summarization of these
text representations to generate a summary of
traces, and comparison of traces.

Full report is available [here](/assets/pdf/tracey_report.pdf).
Source Code is available [here](https://github.com/vaastav/Tracey).