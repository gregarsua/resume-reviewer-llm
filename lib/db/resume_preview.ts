const DATABASE_NAME = "resume-reviewer";
const STORE_NAME = "resume-previews";
const PREVIEW_KEY = "active-resume";

function openPreviewDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DATABASE_NAME, 1);

    request.onupgradeneeded = () => {
      if (!request.result.objectStoreNames.contains(STORE_NAME)) {
        request.result.createObjectStore(STORE_NAME);
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function savePreviewFile(file: File | null) {
  if (!file || !file.name.toLowerCase().endsWith(".pdf") || !("indexedDB" in window)) {
    await clearPreviewFile();
    return;
  }

  try {
    const database = await openPreviewDatabase();
    await new Promise<void>((resolve, reject) => {
      const transaction = database.transaction(STORE_NAME, "readwrite");
      transaction.objectStore(STORE_NAME).put(file, PREVIEW_KEY);
      transaction.oncomplete = () => resolve();
      transaction.onerror = () => reject(transaction.error);
      transaction.onabort = () => reject(transaction.error);
    });
    database.close();
  } catch (error) {
    console.warn("The resume preview could not be saved locally.", error);
  }
}

export async function getPreviewFile(): Promise<File | null> {
  if (!("indexedDB" in window)) {
    return null;
  }

  try {
    const database = await openPreviewDatabase();
    const file = await new Promise<unknown>((resolve, reject) => {
      const transaction = database.transaction(STORE_NAME, "readonly");
      const request = transaction.objectStore(STORE_NAME).get(PREVIEW_KEY);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
    database.close();
    return file instanceof File ? file : null;
  } catch (error) {
    console.warn("The local resume preview could not be opened.", error);
    return null;
  }
}

export async function clearPreviewFile() {
  if (!("indexedDB" in window)) {
    return;
  }

  try {
    const database = await openPreviewDatabase();
    await new Promise<void>((resolve, reject) => {
      const transaction = database.transaction(STORE_NAME, "readwrite");
      transaction.objectStore(STORE_NAME).delete(PREVIEW_KEY);
      transaction.oncomplete = () => resolve();
      transaction.onerror = () => reject(transaction.error);
      transaction.onabort = () => reject(transaction.error);
    });
    database.close();
  } catch (error) {
    console.warn("The local resume preview could not be cleared.", error);
  }
}
