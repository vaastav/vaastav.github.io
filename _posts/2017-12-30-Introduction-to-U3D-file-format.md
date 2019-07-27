---
layout: post
title: "A Beginner's Introduction to U3D file format"
date: 2017-12-30
keywords:
  - u3d
  - 3dpdf
tags:
  - tech
---

This post will serve as a simple introduction to the U3D file format specificaton for any person who needs to write an output or input stream for U3D objects or is genuinely interested in 3D formats. The goal of this post is to provide the details, DOs and DONTs for everything required to write a U3D writer.

This post will also contain an annotated U3D file and other important things which are needed to understand the file format and implement a basic U3D writer which will help in writing a mesh with textures, with vertex colors, with both textures and image colors and without both textures and vertex colors. 

If after reading this post, you would still like to read the official file format specification then it be found [here](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-363%204th%20Edition.pdf)

## What is U3D?

Before we start looking at the U3D file format, for those who don't know what U3D is, this is an introduction section for U3D.
U3D is a compressed file format standard for 3D omputer graphics data.
The goal of U3D is to provide a format to write 3D mesh data so as to embed it into PDF file. U3D along with PRC are the two file formats aimed at providing people a way to embed 3D mesh data into PDF files.  

Personally, for my job, I have only used 3D data to write meshes with corresponding textures to a U3D object. Although, you can write a lot more cool stuff with U3D like animation data which I won't be covering in this post.

### Supported Elements

If you plan to embed, your U3D objects in a PDF, then you should read this [document](http://www.adobe.com/content/dam/Adobe/en/devnet/acrobat/pdfs/U3DElements.pdf) first as Adobe Acrobat only supports a subset of the elements that U3D provides. 
Additionaly, Adobe also doesn't support some of the texture modes like those of texture generation but I will talk about them later when I get into the details.

## External Library

As part of the consortium, Intel released a library which is available on sourceforge.

## File Format Essentials

This part contains all the essential things you need to know about the U3D file format.

## Data Types in U3D files

+ U8 : An unsigned 8 bit integer

+ U16 : An unsigned 16 bit integer

+ U32 : An unsigned 32 bit integer

+ U64 : An unsigned 64 bit integer

+ I16 : A signed 16 bit integer

+ F32: An IEEE single precision float.

+ F64: An IEEE double precision float.

## Strings in U3D

Strings in a U3D file are written a bit differently than other ata types like uint32,float32,float64 amongst other data types.

All data types except strings are directly written to the file in little-endian order. But strings are not written this way. 

The structure for writing a string is as follows:

+ 2 bytes :  Size of the string. This decides how many bytes will a string take.

+ _size_ bytes : The string itself encoded with the character encoding speicified in the file header block. 

From now on, the term STRING will act as a placeholder for the aforementioned structure of writing a string.

## Other Notes

The bytes in the file are written in Little-Endian order. If you don't know what endianness is, here is a [link](https://www.cs.umd.edu/class/sum2003/cmsc311/Notes/Data/endian.html).

## U3D File Structure

The U3D file is made up of 3 different types of blocks.

- File Header Block
- Declaration Block
- Continuation Block

Each block must be 32-bit or 4-byte aligned with each other. This basically means a new block must **ONLY** start at an address which is divisible by 4. For more on aligned addresses and alignment, please read [this](http://www.songho.ca/misc/alignment/dataalign.html).

Here is an image describing the structure of the blocks in U3D file which has been successful for me.

![file_structure]({{ "assets/u3d_file_structure.png" | absolute_url }})

### What is a Block?

All Blocks in U3D have the same structure.

+ 4 bytes, U32 : BlockType - Identifies the kind of data present in this block
+ 4 bytes, U32 : DataSize - Size of the data section in bytes. **Does not include any padding**
+ 4 bytes, U32 : MetaDataSize - Size of the meta data section in bytes. **Does not include any padding**
+ *DataSize* bytes : Data - Interpreted w.r.t to the block type
+ 0-3 bytes : Padding. Added to maintain 32-bit alignment for the start of the metadata section
+ *MetaDataSize* bytes : Metadata - An array of Key/Value Pairs. I personally have never used metadata and this is very much optional as you can just put the MetaDataSize to be 0, but I will try in the future and update the post. But for the purpose of this post, metadata is always absent as the metadata size is always 0.
+ 0-3 bytes : Padding. Added to maintain 32-bit alignment for the start of the next block.

**NOTE: Any padding byte must have the value 0x00.**

## File Header Block

This is the first block in the U3D file and it contains information describing the total size of the file, the total size of the declaration blocks, the character encoding of all the strings in the file and an optional scaling factor which provides the scaling factor by which values must be multiplied to be converted into meters.

### Structure of the File Header Block

+ 4 bytes, U32 : The Blocktype of the File Header lock. This value is 0x00443355 for the File Header Block.

+ 4 bytes, U32 : The size of the data contained by this block.

+ 4 bytes, U32 : The size of the metadata contained by this block.

+ 2 bytes, I16 : The major version of the file. This value has to be 0 as per the official specification.

+ 2 bytes, I16 : The minor version of the file. This can be any value but for sanity's sake, the examples will use the value 0 for this.

+ 4 bytes, U32 : The profile identifier. This is used to identify optional features in the file. The options can be combined by a bitwise OR operation. 

The options are as follows:

	0x00000000 : No optional features used

	0x00000002 : Uses extensibility features. This indicates that the file may use New Object Type blocks.

	0x00000004 : No compression mode. This means that file doesn't contain any compressed values.

	0x00000008 : Defined units. This indicates that the objects in the file are defined with units.

+ 4 bytes, U32 : The declaration size which is the total size of all the declaration blocks in the file

+ 8 bytes, U64 : The file size which is the total size of the whole file.

+ 4 bytes, U32 : The Character encoding of all the strings in the file. This value is the MIB enum value which can be found at http://www.iana.org/assignments/character-sets

+ 8 bytes, F64 : The units scaling factor. This value converts every value in the file to meters. This value is only present if the Profile Identifier has Defined Units flag set.

## Modifier Chain Block

Modifier Chain Blocks are used to contain the declaration blocks for an object and its modifiers.

If an object does not have any modifiers, then the declaration block for that object is not required to be contained in a modifier chain block. But it is safe to always have the object declared inside a modifier chain block.

If an object has modifiers then the declaration blocks for the objects and its modifiers shall be contained in the data section of a modifier chain block.

### Structure of the Modifier Chain Block

+ 4 bytes, U32 : BlockType. This value is 0XFFFFFF14.

+ 4 bytes, U32 : Data size of the modifier chain block. The data size for the modifier chain block includes the size of the contained modifier declaration blocks.

+ 4 bytes, U32 : Metadata size of the modifier chain block.

+ STRING bytes : Modifier Chain Name. Name of the modifier chain and also the name of all the modifiers in the chain.

+ 4 bytes, U32 : Modifier Chain Type. This indicates the type of modifier chain. The options are as follows:

	0 - Node modifier chain
	
	1 - Model Resource Modifier Chain
	
	2 - Texture Resource Modifier Chain
	
+ 4 bytes : Modifier chain attributes. It is a bitfield indicating the presence of optional information about the modifier chain. As this is optional and not used by Adobe, this isn't covered in this post. Hence this value will always be 0.

+ _variable_ bytes : Modifier Chain Padding. This can be of 0 to 3 bytes with the value 0 as it is only inserted to maintain 32-bit alignment for the start of the modifier count field.

+ 4 bytes, U32 : Modifier Count. Number of modifiers in the modifier chain.

+ variable bytes : Modifier Declaration Block(s). This is the declaration block(s) for a modifier(s). The name(s) of the declaration block(s) must match the name of the modifier chain block it is a part of.

## Node Blocks

Nodes are the entities that populate the scene graph. Each node type contains a name, the number of aprents it has, the name of each parent, and a transform for each parent specifying the position and orientation of the node relative to the parent. 

For this report, I will only be covering the Model Node.

## Model Node Block

The Model Node contains: a name, the number of parents, the parents' names and a transform relative to each parent. The Model Node also contains the name of a resource modifier chain. A model node is the first modifier in a node modifier chain. 

### Structure of the Model Node Block

+ 4 bytes, U32 : Blocktype. The value for this block is 0xFFFFFF22

+ 4 bytes, U32 : Data size of the block.

+ 4 bytes, U32 : MetaDataSize of the block.

+ STRING bytes : Model Node Name. Name of this node.

+ 4 bytes : Parent Node Count. For the scope of this report, parent data is not used as there is always only 1 node present in the file and thus this value is always 0.

+ STRING bytes : Model Resource Name. Name of the resource modifier chain associated with this node.

+ 4 bytes, U32 : Model Visibility. This is used to indicate whether the front facing or back facing surface should be drawn. The possible values are:

	0 - Not visible
	
	1 - Front visible
	
	2 - Back Visible
	
	3 - Front and Back Visible
	
## CLOD Mesh Generator Blocks

This contains the data needed to create a continuous level of detail mesh. This data includes vertices, normal vectors, faces, shader lists and level of detail information of the base mesh and updates. 

For the purpose of this report, all the mesh information is contained inside the base mesh and there are no updates. Essentially there is only 1 level of detail containing all the information.

## CLOD Mesh Declaration Block

This block contains the declaration information for a continuous level of detail mesh generator. The declaration information is sufficient to allocate space for the mesh data and create the mesh generator object. The actual mesh data is contained in the following continuation blocks.

This block must be a part of a resource modifier chain.

### Structure of the CLOD Mesh Declaration Block

+ 4 bytes, U32 : Blocktype. The value for this block is 0xFFFFFF31

+ 4 bytes, U32 : Data Size of the block.

+ 4 bytes, U32 : Metadata size of the block.

+ STRING bytes : Mesh Name. This is the name of the CLOD mesh generator. This name is also the name of the resource modifier chain that contains the CLOD mesh generator.

+ 4 bytes, U32 : Chain Index. This is position of the mesh generator in the resource modifier chain. This value must be 0 for this blocktype.

+ variable bytes : Max Mesh Description. 

+ 8 bytes :  CLOD Description

+ 44 bytes : Resource Description

+ 4 bytes : Bone Count. As Skeleton Description is out of the scope of this report and is not covered here as it is mainly for animations; The bone count will always be 0.

#### Max Mesh Description

This is a sub-part of the CLOD Mesh Declaration block and it describes the size of the mesh at full resolution ( highest level of detail ). For this report, the highest level of detail is 1 as all the information is present in a single level.

Structure of this part is as follows:

+ 4 bytes, U32 : Mesh Attributes. This is a colection of flags combined using the bitwise OR operator.

The available flags are:

	0x00000000 - Default: The faces in the mesh have a normal index at each corner.
	
	0x00000001 - Exclude Normals: The faces in the mesh do not have a normal index at each corner.
	
+ 4 bytes, U32 : Face Count. Number of faces in the mesh.

+ 4 bytes, U32 : Position Count. Number of positions in the position array.

+ 4 bytes, U32 : Normal Count. Number of normals in the normal array.

+ 4 bytes, U32 : Diffuse Color Count. Number of colors in the diffuse color array.

+ 4 bytes, U32 : Specular Color Count. Number of colors in the specular color array.

+ 4 bytes, U32 : Texture Coord Count. Number of texture coordinates in the texture coordinate array.

+ 4 bytes, U32 : Shading Count. Number of shading descriptions used in the mesh. Each shading description cooresponds to one shader list in the shading group.

+ variable bytes : Shading Descriptions. There are Shading Count number of Shading Descriptions present. 

#### Shading Description

This is a sub-part of the Max Mesh Descriptions and it indicates which per vertex attributes, in addition to position and normal, are used by each shader list.

Structure of each Shading Description is as follows:

+ 4 bytes, U32 : Shading Attributes. A collection fo flags combined using the binary OR operator. These are used to indicate the usage of per vertex colors.

Options are as follows:

	0x00000000 - The shader list uses neither diffuse colors nor specular colors.
	
	0x00000001 - The shader list uses per vertex diffuse colors.
	
	0x00000002 - The shader list uses per vertex specular colors.
	
	0x00000003 - The shader list uses both diffuse and specular colors, per vertex
	
+ 4 bytes, U32 : Texture layer count. Number of texture layers used by this shader list.

+ 4 x _Texture Layer Count_ bytes : Texture Coord Dimensions. Number of dimensions in the texture coordinate vector for each texture coordinate layer.

+ 4 bytes, U32 : Original Shading ID. The original shading index for this list.

#### CLOD Description

It is a sub-part of the CLOD Mesh Declaration Block and it describes the range of resolutions available for the continuous level of detail mesh.

Structure of the CLOD Description is as follows:

+ 4 bytes, U32 : Minimum Resolution. This is the number of positions in the base mesh. If this is 0 then there is no base mesh.

+ 4 bytes, U32 : Final Maximum Resolution. Number of positions in the base mesh. If this is equal to the Minimum Resolution, then the base mesh is the entire mesh and CLOD mechanism cannot change the resolution of the mesh.

#### Resource Description

This is a sub-part of the CLOD Mesh Declaration Block and contains information about Quality factors, Inverse Quantization and Resource Parameters.

Structure of the Resource Description is as follows:

+ 4 bytes, U32 : Position Quality Factor. Factor associaed with quantization of positions. This is for information only and is not used.

+ 4 bytes, U32 : Normal Quality Factor. Factor associated with quantization of positions. This is for information only and is not used.

+ 4 bytes, U32 : Texture Coord Quality Factor. Factor associated with quantization of texture coordinates

+ 4 bytes, F32 : Position Inverse Quant. This is the inverse quantization factor used in the reconstruction of position vectors.

+ 4 bytes, F32 : Normal Inverse Quant. This is the inverse quantization factor used in the reconstruction of normal vectors.

+ 4 bytes, F32 : Texture Coord Inverse Quant. This is the inverse quantization factor used in the reconstruction of texture coordinates.

+ 4 bytes, F32 : Diffuse Color Inverse Quant. This is the inverse quantization factor used in the reconstruction of diffuse colors.

+ 4 bytes, F32 : Specular Color Inverse Quant. This is the inverse quantization factor used in the reconstruction of specular colors.

+ 4 bytes, F32 : Normal Crease Parameter. This is for merging normals.

+ 4 bytes, F32 : Normal Update Parameter. This is for dropping the correction on the normals in the mesh.

+ 4 bytes, F32 : Normal Tolerance Parameter. This is used to consider equivalency between two normals.

## CLOD Base Mesh Continuation Block

This block contains the base information for a continuous level of detail mesh generator. For the purpose of this report, the base mesh contains all the mesh as there is only one level of detail.

### Structure of CLOD Base Mesh Continuation Block

+ 4 bytes, U32 : Blocktype. The value for this block is 0xFFFFFF3B

+ 4 bytes, U32 : Data Size of the block.

+ 4 bytes, U32 : Metadata Size of the block.

+ STRING bytes : Mesh Name. Name of the CLOD mesh generator. This name is also the name of the resource modifier chain that contains the CLOD mesh generator.

+ 4 bytes, U32 : Chain Index. Position of the CLOD mesh generator in the resource modifier chain. The value of Chain Index shalle be 0 for this block.

+ 4 bytes, U32 : Base Face Count. Number of faces in the base mesh.

+ 4 bytes, U32 : Base Position Count. Number of positions used y the mesh in the position array.

+ 4 bytes, U32 : Base Normal Count. Number of normals used by the base mesh in the normal array.

+ 4 bytes, U32 : Base Diffuse Color Count. Number of colors used by the base mesh in the diffuse color array.

+ 4 bytes, U32 : Base Specular Color Count. Number of colors used by the base mesh in the specular color array.

+ 4 bytes, U32 : Base Texture Coord Count. Number of texture coordinates used by the base mesh in the texture coordinate array.

+ variable bytes : Base Mesh Data

#### Base Mesh Data

This is a subpart of the CLOD Base Mesh Continuation Block and it contains the data stored in the base mesh. 

The structure is as follows : 

+ _Base Position Count_ x 12 bytes, 3 x F32 : Base Positions Array. This is the list of all x,y and z coordinates of the positions.

+ _Base Normal Count_ x 12 bytes, 3 x F32 : Base Normals Array. This is the list of all x,y and z coordinates of the 3D normals.

+ _Base Diffuse Color Count_ x 16 bytes, 4 x F32 : Base Diffuse Colors Array. This is the list of all RGBA colors. All RGBA values range from 0.0 to 1.0

+ _Base Specular Color Count_ x 16 bytes, 4 x F32 : Base Specular Color Array. This is the list of all RGBA colors. All RGBA values range from 0.0 to 1.0-3

+ _Base Texture Coord Count_ x 16 bytes, 4 x F32 : Base Texture Coordinate Array. This is the list of all 4D Texture Coordinates.

+ _Base Face Count_ * variable bytes : Base Face Array. List of all faces in the base mesh.

#### Base Face

This is a subpart of the Base Mesh Data. Base Face is a face in the base mesh. the face contains an index into the shader list description array and indices into the various mesh arrays for each corner.

+ 4 bytes, U32 : Shading ID. Index of the shader list descriptions used for this face.

+ variable bytes : Base Corner Info x 3. Base Corner Info for all the 3 corners

#### Base Corner Info

This is a sub-part of Base Face and it contains the indices into the various mesh arrays for a corner of a face on the 

Structure of the Base Corner is as follows:

+ 4 bytes, U32 : Base Position Index.

+ 0 or 4 bytes, U32 : Base Normal Index. It is absent if the Mesh Attributes in the Max Mesh Description indicates Exclude Normals.

+ 0 or 4 bytes, U32 : Base Diffuse Color Index. It is present iff shader list description used by this mesh indicates diffuse colors are used.

+ 0 or 4 bytes, U32 : Base Specular Color Index. It is present iff shader list description used by this mesh indicates specular colors are used.

+ 4 x _Texture Layer Count_ bytes : Base Texture Coord Index. Texture Layer count in the shading description determines the number of times Base Texture Coord Index is repeated at this corner.

## Shading Modifier Block 

This describes the shading group that is used in the drawing of a mesh. This block must have a Model Node declared prior to it. This must be a part of the node modifier chain.

### Structure of a Shading Modifier Block

+ 4 bytes, U32 : Blocktype. This value is 0xFFFFFF45

+ 4 bytes, U32 : Size of the data contained in this block.

+ 4 bytes, U32 : Size of the metadata contained in this block.

+ STRING bytes : Shading Modifier Chain. It is the same as the name of the modifier chain that contains this modifier.

+ 4 bytes, U32 : Chain Index. Position of this modifier in the modifier chain.

+ 4 bytes, U32 : Shadng Attributes. It is a collection of flags combined using the binary OR operator.

The options are as follows:

	0x00000001 - Mesh: the shading group is applied to the renderable mesh group.
	
	0x00000002 - Line: The shading group is applied to the renderable line group.
	
	0x00000004 - Point: The shading group is applied to the renderable point group.
	
	0x00000008 - Glyph: The shading group is applied to the glyph string.
	
+ 4 bytes, U32 : Shader List Count. The number of shader lists in the shading group.

+ 4 x _Shader List Count_ bytes : Shader Count(s). List of shader count in each shader list.

+ STRING x _Shader Count_ x _Shader List Count_ bytes : Shader Name(s). Names of all shader in each shader list in all of all the shader lists.

## Lit Texture Shader Block

This contains information needed to determine the appearance of a surface during rendering. It includes references to Material Resources and Texture resources and how to combine those resources when rendering.

### Structure of the Lit Texture Shader Block

+ 4 bytes, U32 : Blocktype. The vakue for this block is 0xFFFFFF53

+ 4 bytes, U32 : Data Size of the block.

+ 4 bytes, U32 : Metadata size of the block.

+ STRING bytes : Lit TextureShader Name. Used to identify this shader.

+ 4 bytes, U32 : Lit Texture Shader Attributes. It is a bit field that stores information about the shader. The attributes are comined by a bitwise OR operation.

The options are:

	0x00000001: Lighting Enabled
	
	0x00000002: Alpha Test Enabled
	
	0x00000004: Use Vertex Color
	
+ 4 bytes, F32 : Alpha Test Reference. Value used in comparisons when alpha test is enabled.

+ 4 bytes, U32 : Alpha Test Function. Function for comaprison for alpha values.

The options are:

	0x00000610: NEVER: The test never passes. No pixels are drawn.
	
	0x00000611: LESS: The rendered alpha value must be less than the reference value.
	
	0x00000612: GREATER: The rendered alpha value must be greater than the reference value.
	
	0x00000613: EQUAL: The rendered alpha value must be equal to the reference value.
	
	0x00000614: NOT_EQUAL: The rendered alpha value must not be equal to the reference value.
	
	0x00000615: LEQUAL: The rendered alpha value must be less than or equal to the reference value.
	
	0x00000616: GEQUAL: The rendered alpha value must be greater than or equal to the reference value.
	
	0x00000617: ALWAYS: The test always passes. No pixels are rejected.
	
+ 4 bytes, U32 : Color Blend Function. This is the function used to blend rendered pixels and the existing frame buffer.

The options are:

	0x00000604: FB_ADD: Add the RGB components into the framebuffer.
	
	0x00000605: FB_MULTIPLY: Multiply the RGB components into the framebuffer.
	
	0x00000606: FB_ALPHA_BLEND: Linear blend the RGB components into the framebuffer based on the rendered alpha value.
	
	0x00000607: FB_INV_ALPHA_BLEND: Linear blend the RGB components into the framebuffer based on the inverse of the rendered alpha.
	
+ 4 bytes, U32 : Render Pass Enable Flags. This determines which passes this shader uses. Each bit (1 << n ) in the flags determines if the shader is used in pass n.

+ 4 bytes, U32 : Shader Channels. A bit field that determines which of the model's texture coordinate layers are used for this shader. The least 8 significant 8 bits are used to store this inoformation.

+ 4 bytes, U32 : Alpha Texture Channels. It is a bit field that determines which texture layers should use the alpha component if an alpha component exists. The Alpha Texture Channel bit shall not be set if the corresponding Shader Channel bit is not set.

+ STRING bytes : Material Name. Name of the material associated with this shader.

+ variable bytes : Texture Information

#### Texture Information

This is a sub-part of the Lit Texture Shader and it identifies the texture used by a particular shader channel. it also describes how the textures are blended and which texture coordinates to use for that shader channel.

+ String bytes : Texture Name. Name of the etxture resource that is used for this texture layer.

+ 4 bytes, F32 : Texture Intensity. Scale factor applied to the color components of the texture.

+ 1 byte, U8 : Blend Function. It determines how the current texture layer is combined with the result from previous layers.

The options are:

	0 - Multiply: blended = current * previous
	
	1 - Add: blended = current + preious
	
	2 - Replace : blended  = current
	
	3 - Blend : blended = current * currentAlpha + previous * ( 1 - currentAlpha )
	
+ 1 byte, U8 : Blend Source. Indicates whether the blending operation combines the current layer with the result from previous layers using a blending constant or the alpha value from each pixel.

The options are:

	0 - Alpha value of each pixel
	
	1 - Blending constant
	
+ 4 bytes, F32 : Blend Constant. the blending constant used when combining the results.

+ 1 byte, U8 : Texture Mode. Indicates the source of the texture coordinates used to map the texture onto the model.

The options are:

	0x00: TM_NONE - The shader does not generate texture coordinates
	
	0x01: TM_PLANAR - This is not supported by Adobe and hence isn't covered here.
	
	0x02: TM_CYLINDRICAL - This is not supported by Adobe and hence isn't covered here.
	
	0x03: TM_SPHERICAL - This is not supported by Adobe and hence isn't covered here.
	
	0x04: TM_REFLECTION - The shader performs a spherical reflection mapping. This is used to generate texture coordinates for reflection mapping when using a specially designed spherical reflection texture. This is not supported by the software renderer and may not be supported by older or built-in graphics cards.
	
+ 64 bytes, 16 x F32 : Texture Transform Matrix. 4 x 4 mcolumn-major matrix which operates on the texture coordinates in this texture coordinate layer of the model. texture rotation and scaling is not fully supported in Adobe.

+ 64 bytes, 16 x F32 : Texture Wrap Transform Matrix Element. This is not parsed and not used by Adobe. The 4 x 4 identity matrix should be written as a placeholder.

+ 1 byte, U8 : Texture Repeat. It indicates whether or not the texture in the specified texture layer should be tiled beyond the coordinate range. It is a bitfield and the values below are combined using a bitwise OR operator.

The options are:

	0x01 - Repeat in the direction of the first texture coordinate dimension.
	
	0x02 - Repeat in the direction of the second texture coordinate dimension.
	
## Material Resource Block

This block contains information defining how a material interacts with light in a scene.

### Structure of a Material Resource Block

+ 4 bytes, U32 : Blocktype. The value for this block is 0xFFFFFF54

+ 4 bytes, U32 : Data Size of this block.

+ 4 bytes, U32 : MetaDataSize of this block.

+ STRING bytes : Material Resource Name. Name used to identify this material.

+ 4 bytes, U32 : Material Attributes. A collection of flags that define which of the material attributes specified below are enabled and are combined using the bitwise OR operator.

The options are:

	0x00000001 - Ambient
	
	0x00000002 - Diffuse
	
	0x00000004 - Specular
	
	0x00000008 - Emissive
	
	0x00000010 - Reflectivity
	
	0x00000020 - Opacity
	
+ 12 bytes, 3 x F32 : Ambient Color. RGB value that defines the material's appearance in ambient light. The values range from 0.0 to 1.0

+ 12 bytes, 3 x F32 : Diffuse Color. RGB value that defines the material's appearance in diffuse light. The values range from 0.0 to 1.0

+ 12 bytes, 3 x F32 : Specular Color. RGB value that defines the material's appearance in specular light. The values range from 0.0 to 1.0

+ 12 bytes, 3 x F32 : Emissive Color. RGB value that defines the light the matrial appears to give off. The values range from 0.0 to 1.0

+ 4 bytes, F32 : Reflectivity. This meaures how shiny a material appears to be.

+ 4 bytes, F32 : Opacity. Measure of an object's transparency. Ranges from 0.0 to 1.0

## Texture Resource Blocks

These blocks contain information for creating a texture iage to be applie to geometry. The 2 blocks are the Texture Declaration Block and Texture Continuation Block

## Texture Declaration Block

This block describes the texture image and the continuation images. This block must be a modifier in the texture modifier chain block.

### Structure of the Texture Declaration Block

+ 4 bytes, U32 : Blocktype. The value for this block is 0xFFFFFF55

+ 4 bytes, U32 : Data Size of this block.

+ 4 bytes, U32 : Metadata size of this block

+ STRING bytes : Texture Name. Name used to identify the texture.

+ 4 bytes, U32 : Texture Height. Height of the texture in pixels. Should be greater than 0.

+ 4 bytes, U32 : Texture Width. Width of the texture in pixels. Should be greater than 0.

+ 1 byte, U8 : Texture Image Type. This identifies the color channels present in the texture image.

The valid values are:

	0x01 - alpha component
	
	0x0E - color RGB
	
	0x0F - color RGBA
	
	0x10 - luminance (greyscale)
	
	0x11 - luminance and alpha

+ 4 bytes, U32 : Continuation Image Count . number of continuation images used to compose the texture image. This number is restricted to 1.

+ 1 byte, U8 : Compression Type. This defines the scheme used to compress the Image Data in the texture continuation blocks.

The options are:

	0x01 - JPEG-24
	
	0x02 - PNG 
	
	0x03 - JPEG-8
	
	0x04 -TIFF. This option is not supported in Adobe
	
+ 1 byte, U8 : Texture Image Channels. Indicates which color channels of the texture image are composed using this continuation image. the txture image channel bits can be cobined using the OR operator.

The options are:

	0x01: alpha channel
	
	0x02: blue channel
	
	0x04: green channel
	
	0x08: red channel
	
	0x10: luminance ( red, blue and greent channels )

+ 2 bytes, U16 : Continuation Image Attributes. Contains additional information about the continuation image.

The valid values are:

	0x0000: default attributes
	
	0x0001: external continuation image file reference.
	
+ 4 bytes, U32 : Image Data Byte Count. The sum of the number of bytes of Image Data in all the continuation blocks for this continuation image.

## Texture Continuation Block

This block contains image data for a continuation image previously desrcibed in the texture declaration.

+ 4 bytes, U32 : Blocktype. the value for this block is 0xFFFFFF5C

+ 4 bytes, U32 : Data Size of this block.

+ 4 bytes, U32 : Metadata size of this block.

+ STRING bytes : Texture Name. Naem of the texture resource with which this continuation block is associated.

+ 4 bytes, U32 : Continuation Image Index. This value is an index into the sequence of continuation image formats in the texture declaration. This value is 0 as Adobe limits the number of continuation image blocks to 1 for every Texture Resource block.

+ Image Data Byte Count bytes : Image Data. This is an image file of the supported type embedded into the U3D file

## Example

The example is a complete U3D file containing a texture-less mesh with no vertex colors of a standard cube.

```
;; File Header Block
; Blocktype 0x00443355
55 33 44 00 
; Data Size: 32 bytes
20 00 00 00 
; Metadata Size: 0 bytes
00 00 00 00
; Major Version: 0 
00 00
; Minor Version: 0 
00 00
; Profile Identifier Value: 0x0000000C - No compression mode and Units are defined
0C 00 00 00 
; Declaration Size: 297 bytes
29 01 00 00 
; File Size: 639 bytes
7F 02 00 00 00 00 00 00 
; Character Encoding: 106. This coresponds to UTF8
6A 00 00 00
; Units scaling Factor: 1.0
00 00 00 00 00 00 F0 3F 

;; Node Modifier Chain Block
; BlockType: 0xFFFFFF14
14 FF FF FF
; Data Size: 68 bytes
44 00 00 00 
; Metadata Size: 0 bytes
00 00 00 00
; Size of the Name of the Modifier Chain: 8 bytes  
08 00 
; Name of the Modifier Chain: MeshNode
4D 65 73 68 4E 6F 64 65
; Modifier Chain Type: 0. Node Modifier Chain 
00 00 00 00
; Modifier Chain Attributes 
00 00 00 00
; Padding or 32-bit alignment 
00 00
; Modifier Count: 1 
01 00 00 00
;; Model Node Block
; Blocktype: 0xFFFFFF22 
22 FF FF FF
; Data Size: 32 bytes 
20 00 00 00 
; MetaData Size: 0 bytes
00 00 00 00
; Size of the model node name: 8 bytes 
08 00
; Model Node name : MeshNode 
4D 65 73 68 4E 6F 64 65
; Parent Node Count: 0 
00 00 00 00
; Size of the name of the resource modifier chain : 12 bytes 
0C 00
; Name of the resource modifier chain: MeshResource 
4D 65 73 68 52 65 73 6F 75 72 63 65
; Visibility : 3 - Both front and back visible 
03 00 00 00

;; Resource Modifier Chain Block
; Blocktype 0xFFFFFF14 
14 FF FF FF
; Data Size: 160 bytes 
A0 00 00 00
; MetaData Size: 0 bytes 
00 00 00 00 
; Size of the name of the modifier chain : 12 bytes
0C 00
; Name of the modifier chain: MeshResource 
4D 65 73 68 52 65 73 6F 75 72 63 65
; Modifier Chain Type: 1 - Resource Modifier Chain 
01 00 00 00
; Modifier Chain Attributes : 0
00 00 00 00
; Padding for 32-bit alignment 
00 00
; Modifier Count : 1 
01 00 00 00
;; CLOD Mesh Declaration
; Blocktype : 0xFFFFFF31 
31 FF FF FF
; Data Size: 142 bytes 
8E 00 00 00
; MetaData Size: 0 bytes 
00 00 00 00
; Size of the name of Mesh Declaration : 12 bytes 
0C 00 
; Name of the Mesh Declaration: MeshResource
4D 65 73 68 52 65 73 6F 75 72 63 65 
; Chain Index : 0
00 00 00 00 
;; Max Mesh Description
; Mesh Attributes: 0x00000001 - Exclude Normals
01 00 00 00
; Face Count: 12 
0C 00 00 00 
; Positon Count : 8
08 00 00 00
; Normal Count : 0 
00 00 00 00 
; Diffuse Color Count: 0
00 00 00 00 
; Specular Color Count: 0
00 00 00 00 
; Texture Coord Count: 0
00 00 00 00 
; Shading Count: 1
01 00 00 00 
;; Shading Description
; Shading Attributes : 0x00000000 - Shader doesn't use diffuse or specular colors
00 00 00 00
; Texture Layer Count: 0
00 00 00 00 
; Original Shading ID: 0
00 00 00 00
;; CLOD Description 
; Minimum Resolution: 8
08 00 00 00 
; Final Maximum Resolution: 8
08 00 00 00
;; Resource Description
; Position Quality Factor : 0 
00 00 00 00 
; Normal Quality Factor : 0
00 00 00 00
; Texture Coord Quality Factor 
00 00 00 00 
; Position Inverse Quant : 1.0
00 00 80 3F 
; Normal Inverse Quant : 1.0
00 00 80 3F 
; Texture Coord Inverse Quant : 1.0
00 00 80 3F 
; Diffuse Color Inverse Quant : 1.0
00 00 80 3F 
; Specular Inverse Quant : 1.0
00 00 80 3F 
; Normal Crease Parameter : 0.0
00 00 00 00 
; Normal Update Parameter : 0.0
00 00 00 00
; Normal Tolerance Parameter : 0.0 
00 00 00 00 
; Bone Count : 0
00 00 00 00 
; Padding for 32-bit alignment
00 00 

;; CLOD Mesh Continuation
; Blocktype: 0xFFFFFF3B
3B FF FF FF 
; Data Size: 330 bytes
4A 01 00 00 
; Metadata Size: 0 bytes
00 00 00 00 
; Size of the name of the Mesh Declaration: 12 bytes
0C 00 
; Name of the mesh declaration : MeshResource
4D 65 73 68 52 65 73 6F 75 72 63 65 
; Chain Index: 0
00 00 00 00 
; Base Face Count : 12
0C 00 00 00 
; Base Position Count : 8
08 00 00 00
; Base Normal Count : 0 
00 00 00 00 
; Base Diffuse Color Count : 0
00 00 00 00 
; Base Specular Color Count : 0
00 00 00 00 
; Base Texture Coord Count : 0
00 00 00 00 
;; Positons Array
; Position 1: ( 0, 0, 0 )
00 00 00 00 00 00 00 00 00 00 00 00 
; Position 2: ( 1.0, 0, 0 )
00 00 80 3F 00 00 00 00 00 00 00 00
; Position 3: ( 0, 1.0, 0 ) 
00 00 00 00 00 00 80 3F 00 00 00 00 
; Position 4: ( 0, 0, 1.0 )
00 00 00 00 00 00 00 00 00 00 80 3F 
; Position 5: ( 1.0, 1.0, 0 )
00 00 80 3F 00 00 80 3F 00 00 00 00 
; Position 6: ( 1.0, 0, 1.0 ) 
00 00 80 3F 00 00 00 00 00 00 80 3F 
; Position 7: ( 0, 1.0, 1.0 )
00 00 00 00 00 00 80 3F 00 00 80 3F
; Position 8 : ( 1.0, 1.0, 1.0 ) 
00 00 80 3F 00 00 80 3F 00 00 80 3F 
;; Face Array
; Face 1 Original Shading Index: 0
00 00 00 00 
; Face 1 Position Indices ( 0, 1, 2 )
00 00 00 00 
01 00 00 00 
02 00 00 00 
; Face 2 Original Shading Index: 0
00 00 00 00 
; Face 2 Position Indices ( 1, 2, 4 )
01 00 00 00 
02 00 00 00 
04 00 00 00 
; Face 3 Original Shading Index: 0
00 00 00 00
; Face 3 Position Indices ( 0, 2, 3 ) 
00 00 00 00 
02 00 00 00 
03 00 00 00 
; Face 4 Original Shading Index: 0
00 00 00 00 
; Face 4 Position Indices ( 2, 3, 6 )
02 00 00 00 
03 00 00 00 
06 00 00 00 
; Face 5 Original Shading Index: 0
00 00 00 00 
; Face 5 Position Indices ( 0, 1, 3 )
00 00 00 00 
01 00 00 00 
03 00 00 00 
; Face 6 Original Shading Index: 0
00 00 00 00 
; Face 6 Position Indices ( 1, 3, 5 )
01 00 00 00 
03 00 00 00 
05 00 00 00 
; Face 7 Original Shading Index: 0
00 00 00 00 
; Face 7 Position Indices ( 1, 4, 5 )
01 00 00 00 
04 00 00 00 
05 00 00 00 
; Face 8 Original Shading Index: 0
00 00 00 00 
; Face 8 Position Indices ( 4, 5, 7 )
04 00 00 00 
05 00 00 00 
07 00 00 00 
; Face 9 Original Shading Index: 0
00 00 00 00 
; Face 9 Position Indices ( 4, 6, 7 )
04 00 00 00 
06 00 00 00 
07 00 00 00 
; Face 10 Original Shading Index: 0
00 00 00 00 
; Face 10 Position Indices ( 2, 4, 6 )
02 00 00 00 
04 00 00 00 
06 00 00 00 
; Face 11 Original Shading Index: 0
00 00 00 00 
; Face 11 Position Indices ( 3, 5, 6 )
03 00 00 00 
05 00 00 00 
06 00 00 00 
; Face 12 Original Shading Index: 0
00 00 00 00 
; Face 3 Position Indices ( 5, 6, 7 )
05 00 00 00 
06 00 00 00 
07 00 00 00 
; Padding for 32-bit alignment
00 00
```