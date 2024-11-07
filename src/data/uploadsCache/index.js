import { saveToCache as save, getFromCache as get, clearCache as clear } from './cacheUtils';

export const fileCache = {
    save,
    get,
    clear
};

export { saveToCache, getFromCache, clearCache } from './cacheUtils';
export default fileCache; 