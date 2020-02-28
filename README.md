# dts2md

## Introduction

`dts2md` is an API reference generator for TypeScript, which transforms your type declaration files into markdown documentation.

Typically, you write documentation comments in your TypeScript source files, use TypeScript compiler to generate type declaration files, and use `dts2md` to generate final API reference from the type declaration files which contains the comments.

The API reference of `dts2md` is just generated using the package itself, which is available at the [wiki](https://github.com/huang2002/dts2md/wiki) page.

## Usage

The package has a built-in cli, so you can just install and use it in the command line.

```txt
$ dts2md --help
Generate API reference from your type declaration files.

Usage:
  dts2md [options] -- <globs...>

Options:
  --input, -i <dir>             The input root
  --output, -o <dir>            The output root
  --log, -l                     Log transform info
  --index, -I [file]            Generate an index file (default file name: API.md)
  --keep-ext                    Keep file extensions of links in the index file
  --encoding, -e <encoding>     The encoding of source files (default: utf8)
  --help, -h                    Show help info
  -- <globs...>                 Source file globs (default: *)

```

If you want to specify more generating options, you can use `dts2md` as a dependency and create your own generating script. The API reference is available at the [wiki](https://github.com/huang2002/dts2md/wiki) page.

By default, the code from each type declaration file is transformed and then displayed in a fenced code block in generated markdown documentation.

During transformation, transform reducers are applied one by one, each of which modifies the code. Specifically, there is a built-in reducer that convert break marks(`/** dts2md break */`) into line breaks, to provide custom line breaks because the TypeScript compiler may remove original line breaks. You can use `dts2md` programmatically and compose the reducers to customize your documentation.

## Links

- [API Reference](https://github.com/huang2002/dts2md/wiki)
