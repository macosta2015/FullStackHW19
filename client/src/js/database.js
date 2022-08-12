import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });
  export const putDb = async (content) => {
    console.log('PUT to the database');
    const jateDb = await openDB('jate', 1);
    const tx = jateDb.transaction('jate', 'readwrite');
    const store = tx.objectStore('jate');
    const result = await store.put({content: content});

    console.log('🚀 - data saved to the database', result);
}

export const getDb = async () => {
    
    console.log('GET from the database');
    const jatetDb = await openDB('jate', 1);
    const tx = jatetDb.transaction('jate', 'readonly');
    const store = tx.objectStore('jate');
    const result = await store.getAll();

    console.log('result.value', result);
};

// // TODO: Add logic to a method that accepts some content and adds it to the database
// export const putDb = async (content) => console.error('putDb not implemented');

// // TODO: Add logic for a method that gets all the content from the database
// export const getDb = async () => console.error('getDb not implemented');

initdb();
