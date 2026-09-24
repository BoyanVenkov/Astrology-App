const CACHE_NAME = 'resonance-audio-v1'

/**
 * Resolves a remote audio URL to something playable, fetching it at most
 * once per device. First play of a given clip needs the network; every
 * play after that — including offline — is served from the Cache Storage
 * copy via a local blob URL. Callers own the returned blob URL and must
 * revoke it (revokeCachedAudioSrc) once they're done with it.
 */
export async function resolveCachedAudioSrc(url: string): Promise<string> {
  if (!('caches' in window)) return url
  try {
    const cache = await caches.open(CACHE_NAME)
    const cached = await cache.match(url)
    if (cached) return URL.createObjectURL(await cached.blob())

    const res = await fetch(url)
    if (!res.ok) return url
    await cache.put(url, res.clone())
    return URL.createObjectURL(await res.blob())
  } catch {
    return url
  }
}

export function revokeCachedAudioSrc(src: string): void {
  if (src.startsWith('blob:')) URL.revokeObjectURL(src)
}
