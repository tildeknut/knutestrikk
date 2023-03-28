
import eng from '../lan/en.json' assert { type: 'json' };
import no from '../lan/no.json' assert { type: 'json' };

class Dictionary{
    constructor(...languages){
        this.languagefiles = languages;
        this.dictionary = null;
        
    }
    setLanguage = function(dictionary){
        this.languagefiles = dictionary;
        this.dictionary = dictionary;
        
    }
    get = function(key){
        // Henter riktig verdi basert på key i dictionary.
        console.log(this.dictionary[key])
        return this.dictionary[key];
    }
    keys = function(){
        // retunerer alle keys i dictionary 
        return Object.keys( this.dictionary);
    }
}

let DICTIONARY_KEYS = {
    end:"end"
}

let dictionary = new Dictionary('./test/lan/');
dictionary.setLanguage(eng);
dictionary.get(DICTIONARY_KEYS.end);

export default Dictionary;