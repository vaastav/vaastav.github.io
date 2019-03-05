---
layout: page
title: History Lab
description: OCR Article Parser
img: /assets/img/news.jpg
personal: true
---

A python application to download the text file versions of OCR scans of old newspapers and extract all articles related to certain 
keywords. Undertaking for UBC History Lab Course for terms 2017W2 and 2018W1.

<h4 class="text-center">Features</h4>
<ul>
    <li>Uses Python's response library to download all the OCR scans of the newspapers</li>
    <li>Uses levenshtein distance metric to compare words and thus detect the presence of keywords in the article.</li>
    <li>Implemented for UBC History Lab course taught by Dr. Heidi Tworek in January 2018.</li>
    <li>Supports download and extraction from the following sources : 
        <ul>
            
<li>    "ChroniclingAmerica" : chroniclingamerica.loc.gov </li>
    <li>"BC" : open.library.ubc.ca </li>
    <li>"Oregon" : oregonnews.uoregon.edu</li>
    <li>"NewYork" : nyshistoricnewspapers.org</li>
    <li>"Georgia" : gahistoricnewspapers.galileo.usg.edu</li>
    <li>"Newspaper" : newspaper.com</li>

        </ul></li>
</ul>

More info at <a href="https://github.com/vaastav/UBCHistoryLab2017W" class="github"><i class="fab fa-github fa-fw fa-2x"></i></a>