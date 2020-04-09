#!/usr/bin/env node
import { Program } from '3h-cli';
import { transformGlob } from './transform/transformGlob';

const defaults = {
    glob: '*',
    index: 'API.md',
};

const program = new Program('dts2md', {
    title: 'Generate API reference from your type declaration files.'
});

program
    .action({
        name: 'globs...',
        help: `Source file globs (default: ${defaults.glob})`
    })
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
    .parse(process.argv)
    .then(args => {
        const { options } = args;
        if (options.has('--help')) {
            return program.help();
        }
        const glob = args.actions.length ? args.actions : defaults.glob,
            outputRoot = args.getOption('--output')[0];
        return transformGlob(glob, {
            inputRoot: args.getOption('--input')[0],
            outputRoot,
            encoding: args.getOption('--encoding')[0],
            indexFile: options.has('--index')
                ? (options.get('--index')![0] || defaults.index)
                : undefined,
        }).then(result => {
            if (options.has('--log')) {
                result.entries.forEach(result => {
                    console.log(`${result.name}: ${result.source} -> ${result.destination}`);
                });
                if (result.indexFile) {
                    console.log('index: ' + result.indexFile);
                }
            }
        });
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });
