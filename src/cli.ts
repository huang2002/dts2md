#!/usr/bin/env node
import { Program } from '3h-cli';
import { transformGlob } from './transformGlob';
import { promises as fsPromises } from "fs";
import { join } from 'path';

const defaults = {
    glob: '*',
    index: 'API.md',
};

const program = new Program('dts2md', {
    title: 'Generate API reference from your type declaration files.'
});

program
    .option({
        name: '--input',
        alias: '-i',
        value: '<dir>',
        help: 'The input root'
    })
    .option({
        name: '--output',
        alias: '-o',
        value: '<dir>',
        help: 'The output root'
    })
    .option({
        name: '--log',
        alias: '-l',
        help: 'Log transform info'
    })
    .option({
        name: '--index',
        alias: '-I',
        value: '[file]',
        help: `Generate an index file (default file name: ${defaults.index})`
    })
    .option({
        name: '--keep-ext',
        help: 'Keep file extensions of links in the index file'
    })
    .option({
        name: '--encoding',
        alias: '-e',
        value: '<encoding>',
        help: 'The encoding of source files (default: utf8)'
    })
    .option({
        name: '--help',
        alias: '-h',
        help: 'Show help info'
    })
    .rest({
        value: '<globs...>',
        help: `Source file globs (default: ${defaults.glob})`
    })
    .parse(process.argv)
    .then(args => {
        const { options } = args;
        if (options.has('--help')) {
            return program.help();
        }
        const glob = args.rest.length ? args.rest : defaults.glob,
            outputRoot = args.getOption('--output')[0];
        return transformGlob(glob, {
            inputRoot: args.getOption('--input')[0],
            outputRoot,
            encoding: args.getOption('--encoding')[0]
        }).then(results => {
            if (options.has('--log')) {
                results.forEach(result => {
                    console.log(`${result.name}: ${result.source} -> ${result.destination}`);
                });
            }
            if (options.has('--index')) {
                const indexFile = options.get('--index')![0] || defaults.index,
                    indexFilePath = join(outputRoot, indexFile),
                    keepExt = options.has('--keep-ext'),
                    index = results.map(result => {
                        const { name } = result,
                            link = keepExt ? name + '.md' : name;
                        return `- [${name}](${link})`;
                    }).join('\n');
                return fsPromises.writeFile(
                    indexFilePath,
                    `# API Reference\n\n${index}\n`
                ).then(() => {
                    console.log('index: ' + indexFilePath);
                });
            }
        });
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });
