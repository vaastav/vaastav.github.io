---
layout: page
title: TraViz
description: Visualization of Distributed System traces
img: /assets/img/traviz.png
research: true
---

TraViz is an interactive visualization tool for exploring and analysing distributed traces
to troubleshoot and debug performance problems in distributed systems. Through the use of composite filtering of
multiple dimensions of the dataset, TraViz provides developers an easy to use way to find outlier traces. With TraViz's
traceview swimlane idiom, the users can drill down into a single trace to analyze the trace for performance issues at the
detail level of an operating system thread. TraViz's comparison idiom allows users to compare the Graphical structure
of 2 traces of interest to highlight the key differences between the traces. The aggregation idiom allows users to find
uncommon occurring events across traces by constructing a luminance coded super graph of all the distributed traces.
Additionally, TraViz is the first visualization tool that provides an integrated view of the static source code of the system
with dynamic information collected about the system via distributed traces which can help the users in identifying
locations in the source code that would be ideal for performance optimizations.

TraViz's traceview swimlane idiom, called TraVista, spawned off into its own mini-project. TraVista extends the popular single trace Gantt chart/swimlane visualization with three types of aggregate data - metric, temporal, and structure data, to contextualize the performance of the offending trace across all traces.

Full TraViz report is available [here](/assets/pdf/traviz_report.pdf).
TraVista pre-print is available [here](/assets/pdf/travista.pdf)
Source Code is available [here](https://github.com/vaastav/TraViz/).