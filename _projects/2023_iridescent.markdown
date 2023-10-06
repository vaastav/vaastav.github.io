---
layout: page
title: Iridescent
description: Library for workload-driven online specialization of systems.
img:
research: true
---

### Abstract

Traditionally systems are implemented to be as general as possible to handle a variety of different workloads. This support for generalization comes at a performance cost that could be removed if the system was instead specialized. Thus, there exists a tension between supporting generalization and specialized performance optimization.

Iridescent is a new paradigm that provides developers a systematic way to resolve this tension by allowing the developers to support generalization while also taking advantage of specialization optimization opportunities. Iridescent enables this by dividing the code into two parts: static code that is responsible for general purpose running of the system and dynamic code that lives in the JIT and is specialized based on configuration parameters and observed runtime variables.
