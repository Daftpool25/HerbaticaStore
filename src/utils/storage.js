const storage = {

    get (key) {
    const value = localStorage.getItem(key)

    if (value) {return  JSON.parse (value)}
    else{return false}
    },
    
    set (key, value) {
    localStorage.setItem (key, JSON.stringify (value))
    },
    
    remove (key) {
    localStorage.removeItem (key);
    },
    
    clear ( ) {
    localStorage.clear ( );
    },
    
};

export default storage;