'use strict'

const shuffle = (a) => {// Shuffles arrays
    // a = array
    // v = value
    // cI = current index
    // rI = random index
    let cI = a.length, 
        v, 
        rI;

    while (0 !== cI) {// While there remain elements to shuffle...
      // Pick a remaining element...
      rI = Math.floor(Math.random() * cI);
      cI -= 1;
  
      // And swap it with the current element.
      v = a[cI];
      a[cI] = a[rI];
      a[rI] = v;
    }
  
    return a;
}