// project.js - purpose and description here
// Author: Your Name
// Date:

// NOTE: This is how we might start a basic JavaaScript OOP project

// Constants - User-servicable parts
// In a longer project I like to put these in a separate file

// define a class
class MyProjectClass {
  // constructor function
  constructor(param1, param2) {
    // set properties using 'this' keyword
    this.property1 = param1;
    this.property2 = param2;
  }
  
  // define a method
  myMethod() {
    // code to run when method is called
  }
}

function main() {
  const fillers = {
    person: [
      "Friend",
      "Neighbor",
      "Grandma",
      "Mom",
      "Dad",
      "Parent",
      "Uncle",
      "Aunt",
      "Pibling",
      "Cousin",
      "Enemy",
      "Weird little freak",
    ],
    emotion: [
      "bad",
      "in good health",
      "in that spike pit I set up for you",
      "in a burning house",
      "happy and healthy",
      "not at war",
      "at war",
      "doing meh",
      "never",
      "while you're waiting for me to show up",
      "on a really comfy big chair in a library",
      "seconds before the end",
    ],
    event: [
      "funeral",
      "birthday",
      "graduation",
      "cult celebration",
      "boxing match where you were paid to lose",
      "soccer game",
      "speedrun of Dragon Quest III",
      "annual viewing of the critically acclaimed 'Kung Fu Panda'",
      "swimming lesson",
      "house burning down",
      "ritualistic execution",
      "Minesweeper championship game",
    ],
    time: [
      "just last week",
      "five minutes ago",
      "two hundred years ago",
      "as foretold a millenia ago",
      "as prophesized at the dawn of this era",
      "just right now",
      "",
    ],
    something: [
      "an execution to watch",
      "my dog's birthday",
      "to prep for the end of the world",
      "your dog's birthday",
      "literally anything else",
      "to watch paint dry",
      "to watch WALL-E",
      "to run a marathon backwards",
      "my annual viewing of the critically acclaimed 'Kung Fu Panda'",
      "to get a haircut",
      "to play Minecraft",
      "to save somebody from a burning building",
    ],
    will_wont: ["will", "won't"],
    emotion2: [
      "Yours truly,",
      "Love,",
      "Please never contact me again,",
      "From,",
      "Hate,",
      "",
    ],
  };
  
  const template = `Dear $person, 
  
  I hope this letter finds you $emotion. I'm really sorry I couldn't be there for your $event, but $time I had $something.
  
  Sorry, I $will_wont try to make it to the next one.
  
  $emotion2
  **Your name here**
  
  
  `;
  
  // STUDENTS: You don't need to edit code below this line.
  
  const slotPattern = /\$(\w+)/;
  
  function replacer(match, name) {
    let options = fillers[name];
    if (options) {
      return options[Math.floor(Math.random() * options.length)];
    } else {
      return `<UNKNOWN:${name}>`;
    }
  }
  
  function generate() {
    let story = template;
    while (story.match(slotPattern)) {
      story = story.replace(slotPattern, replacer);
    }
  
    /* global box */
    box.innerText = story;
  }
  
  /* global clicker */
  clicker.onclick = generate;
  
  generate();
}

// let's get this party started - uncomment me
main();