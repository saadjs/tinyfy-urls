export function validateUrl(url: string): boolean {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
}

export function validateSlug(slug: string): boolean {
    return /^[a-zA-Z0-9_-]{1,10}$/.test(slug);
}
