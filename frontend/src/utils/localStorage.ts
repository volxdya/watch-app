export function getItem(key: string, defaultVal: string = ""): string {
    return localStorage.getItem(key) ?? defaultVal;
}

export function setItem(key: string, value: string): void {
    localStorage.setItem(key, value);
}

export function removeItem(key: string): void {
    localStorage.removeItem(key);
}