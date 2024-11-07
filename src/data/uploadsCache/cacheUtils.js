const CACHE_KEY = 'openbooks_file_cache';

export const saveToCache = async (userId, fileRef, file) => {
    try {
        const cache = JSON.parse(localStorage.getItem(CACHE_KEY) || '{}');
        if (!cache[userId]) {
            cache[userId] = {};
        }
        
        // Store file data as base64 string
        const reader = new FileReader();
        const fileData = await new Promise((resolve, reject) => {
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });

        cache[userId][fileRef] = {
            data: fileData,
            type: file.type,
            name: file.name,
            cachedAt: new Date().toISOString()
        };

        localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
        return true;
    } catch (error) {
        console.error('Error saving to cache:', error);
        return false;
    }
};

export const getFromCache = (userId, fileRef) => {
    try {
        const cache = JSON.parse(localStorage.getItem(CACHE_KEY) || '{}');
        return cache[userId]?.[fileRef] || null;
    } catch (error) {
        console.error('Error reading from cache:', error);
        return null;
    }
};

export const clearCache = (userId = null) => {
    try {
        if (userId) {
            const cache = JSON.parse(localStorage.getItem(CACHE_KEY) || '{}');
            delete cache[userId];
            localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
        } else {
            localStorage.removeItem(CACHE_KEY);
        }
        return true;
    } catch (error) {
        console.error('Error clearing cache:', error);
        return false;
    }
}; 