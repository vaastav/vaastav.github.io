---
layout: page
title: Blueprint
description: A Toolchain for Highly-Reconfigurable Microservice Applications
img: /assets/img/blueprint.png
research: true
---

Paper accepted at SOSP 2023.

## Abstract

Researchers and practitioners care deeply about the performance and correctness of microservice applications. Over time, it may be necessary to change, reconfigure, or redesign some aspects of an application, for example in response to changing workloads and deployment conditions, or due to the emergence of undesirable phenomena. Yet today it is immensely time-consuming to re-design a microservice application due to tightly-coupled design choices dispersed, at the code-level, across potentially dozens of services.

In this work we argue that a core requirement for developing, optimizing, and maintaining microservice applications is the ability to rapidly Configure, Build, and Deploy (CBD) new variants of an application that alter or improve its design. We focus on three core use-cases: (1) updating the design to use different components, libraries, and mechanisms; (2) identifying and reproducing problematic behaviors caused by different designs; and (3) prototyping and evaluating potential solutions to such behaviors.

We present Blueprint, a microservice development toolchain that enables rapid CBD. With just a few lines of code, users can easily reconfigure an application’s design; Blueprint will then generate a fully-functioning variant of the application under the new design. Blueprint introduces flexible zero-cost abstractions for developing applications that enforce a strict separation of concerns between application-level logic, lower-level infrastructure components, and implementation and configuration choices. Blueprint is open-source and extensible; it supports a wide variety of reconfigurable design dimensions; and we have ported all major microservice benchmarks to it. Our evaluation demonstrates how Blueprint simplifies the three core use-cases with orders-of-magnitude less code change.

## Relevant Links

Blueprint code can be found [here](https://github.com/Blueprint-uServices/blueprint). The original version is available [here](https://gitlab.mpi-sws.org/cld/blueprint/blueprint-compiler).

Video from the Eurosys Doctoral Workshop 2021 can be found [here](https://www.youtube.com/watch?v=HeKYeBk0CZk&t=1s).

Poster from SOSP 2021 Student Research Competition can be found [here](https://vaastavanand.com/assets/pdf/millenial2021sospsrc.pdf).
