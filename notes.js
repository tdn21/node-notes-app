const fs = require('fs')
const chalk = require('chalk')


//----Reusable Functions----// 

//loadNotes function to load notes from notes.json file
const loadNotes = function () {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        return JSON.parse(dataBuffer.toString())
    } catch (e) {
        return []
    }
}

//writeNotes function to rewrite notes.json file
const writeNotes = function (notes) {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json',dataJSON)
}



//----Functions to be exported----// 

//addNote function to add a new note
const addNote = function( title, body) {
    const notes = loadNotes()
    var count = 0
    notes.forEach(note => (note.title === title) ? ++count : count)
    if(count >= 1) 
    {
        console.log(chalk.red.inverse('Note title already taken!'))
    }
    else{
        notes.push( { 
            title : title,
            body : body
        } )
        writeNotes(notes)
        console.log(chalk.green.inverse("Added your note!"))
    } 
}

//removeNote function to remove a note
const removeNote = function( title ) {
    var notes = loadNotes()

    var count = 0
    notes.forEach(note => (note.title === title) ? ++count : count)
    
    if(count >= 1) 
    {
        notes = notes.filter(note => note.title !== title) 
        writeNotes(notes)
        console.log(chalk.green.inverse('Note successfully removed!'))
    }
    else {
        console.log(chalk.red.inverse("No Note FOUND...Check Note TITLE!"))
    } 

}

//listNotes function to list all notes
const listNotes = function() 
{    
    const notes = loadNotes()
    
    notes.length>0
    ? (notes.forEach(note => console.log(chalk.green(note.title)))) 
    : (console.log(chalk.green.inverse("No notes to work on !!")))
}

//readNote function to read a note
const readNote = function(title) 
{    
    const notes = loadNotes()
    
    if(notes.length>0) {
        note = notes.filter(note => note.title === title)
    
        console.log(chalk.magenta("Note title : ") + chalk.yellow(note[0].title))
        console.log(chalk.cyan("Description : ") + chalk.yellow(note[0].body))
    }    
    else
        console.log(chalk.red.inverse("No Note FOUND...Check Note TITLE!"))
}



module.exports = {
    addNote : addNote,
    removeNote : removeNote,
    listNotes : listNotes,
    readNote : readNote
}