---
layout: post
title: "Embedding 3D objects in PDFs using U3D files"
date: 2017-12-29
---
# How to embed U3D objects in PDF

This document describes all the things needed to embed U3D objects into a PDF file in order to generate a 3D PDF.

## Requirements

+ MikTeX: For generating PDF files that contain U3D objects [Windows]
+ Adobe Acrobat: v7.0 or higher. For viewing PDF files with U3D objects in it.

### Installing Instructions - Windows

#### Step 1: Install MiKTeX

+ Download the basic MiKTeX installer from 

Download Link: [MikTex](http://miktex.org/download)

+ Double click the basic-miktex-2.9.5872.exe file you just downloaded and follow the instructions on the screen.

#### Step 2: Install media9 package

+ Open command prompt (cmd.exe). You can find it by searching for Command Prompt in the Start Menu

+ Type mpm --install=media9

#### Step 3: Install Adobe Acrobat

+ Download Adobe Acrobat from Adobe's website

Download Link: [Adobe Acrobat](https://get.adobe.com/reader/)

## How to embed U3D objects

### Requirements for making a PDF

For embedding U3D objects you would need to write a .tex file.

This is what the tex file looks like

```
\documentclass[a4paper]{article}
\usepackage{media9}
\usepackage[english]{babel}
\begin{document}
\setlength{\fboxsep}{0pt}
\setlength{\fboxrule}{1pt}
\fbox{\includemedia[
	label = Object,
	activate = pageopen,
	width = 1\linewidth,
	height = 1\linewidth,
	3Dmenu,
	3Dtoolbar,
	3Dviews = Object.vws,
]{}{Object.U3D}}
\end{document}
```

Here the .tex file is referencing a views file which defines all the pre-defined bookmarks to how the objects should be viewed

The views file typically has the file extension .vws but a .txt extension would just work as well

This is what the views file typically looks like

```
VIEW=viewname
	C2W= 1.0 0.0 0.0 0.0 1.0 0.0 0.0 0.0 1.0 0.0 0.0 0.0
	ROO=1.0
	AAC=45.0 
END
```

+ C2W option is the Camera To World Matrix. It is a 3x4 matrix in a column major form.

+ ROO option is the Radius of the Orbit for the Camera. It basically means how far the camera is placed.

+ AAC option is the camera's field of view. This option is absent if the view is in orthographic mode. Then the ORTHO option is used.

+ ORTHO option is the orthographic scaling factor

### Executing the TeX file - Windows

So you need to follow these steps to generate a 3D PDF:

1. Double-Click on the .tex file and it will open the file with TeXMaker

2. Click on the green play button for the pdf generation to start

3. After the pdf is generated it will open up automatically on the default PDF viewer for MikTeX. **You won't be able to see the 3D object in this viewer**

4. Double click on the pdf file generated. It has the same name as the .tex file

OR

1. Open Command Line

2. Navigate to the folder which contains the tex file

3. Execute the following command

```
>pdflatex name_of_tex_file.tex

```
