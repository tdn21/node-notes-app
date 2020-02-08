const yargs = require('yargs')
const notes = require('./notes.js')


// Add command to add new note
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title: {
            describe: 'Note Title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Note Body',
            demandOption: 'true',
            type: 'string'
        }
    },
    handler(argv) {
        notes.addNote(argv.title , argv.body)
    }
})

// Remove command to remove a note
yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    builder: {
        title: {
            describe: 'Note Title',
            demandOption: true,
            type: 'string'
        }},
    handler(argv) {
        notes.removeNote(argv.title)
    }
})

// List command to list of notes
yargs.command({
    command: 'list',
    describe: 'List your notes',
    handler() {
        notes.listNotes()
    }
})

// Read command to read a note
yargs.command({
    command: 'read',
    describe: 'Read a note',
    builder: {
        title: {
            describe: 'Note Title',
            demandOption: true,
            type: 'string'
        }},
    handler(argv) {
        notes.readNote(argv.title)
    }
})

yargs.parse()