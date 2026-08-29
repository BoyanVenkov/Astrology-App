export interface City {
  name: string
  country: string
  lat: number
  lon: number
  tz: string
}

/**
 * A compact set of well-known cities for the birth-place picker. Not
 * exhaustive — the onboarding form also accepts manual coordinates.
 * lat/lon in decimal degrees (N/E positive); tz is the IANA zone.
 */
export const CITIES: City[] = [
  { name: 'London', country: 'United Kingdom', lat: 51.5072, lon: -0.1276, tz: 'Europe/London' },
  { name: 'Dublin', country: 'Ireland', lat: 53.3498, lon: -6.2603, tz: 'Europe/Dublin' },
  { name: 'Paris', country: 'France', lat: 48.8566, lon: 2.3522, tz: 'Europe/Paris' },
  { name: 'Madrid', country: 'Spain', lat: 40.4168, lon: -3.7038, tz: 'Europe/Madrid' },
  { name: 'Barcelona', country: 'Spain', lat: 41.3874, lon: 2.1686, tz: 'Europe/Madrid' },
  { name: 'Lisbon', country: 'Portugal', lat: 38.7223, lon: -9.1393, tz: 'Europe/Lisbon' },
  { name: 'Amsterdam', country: 'Netherlands', lat: 52.3676, lon: 4.9041, tz: 'Europe/Amsterdam' },
  { name: 'Brussels', country: 'Belgium', lat: 50.8503, lon: 4.3517, tz: 'Europe/Brussels' },
  { name: 'Berlin', country: 'Germany', lat: 52.52, lon: 13.405, tz: 'Europe/Berlin' },
  { name: 'Munich', country: 'Germany', lat: 48.1351, lon: 11.582, tz: 'Europe/Berlin' },
  { name: 'Zurich', country: 'Switzerland', lat: 47.3769, lon: 8.5417, tz: 'Europe/Zurich' },
  { name: 'Vienna', country: 'Austria', lat: 48.2082, lon: 16.3738, tz: 'Europe/Vienna' },
  { name: 'Rome', country: 'Italy', lat: 41.9028, lon: 12.4964, tz: 'Europe/Rome' },
  { name: 'Milan', country: 'Italy', lat: 45.4642, lon: 9.19, tz: 'Europe/Rome' },
  { name: 'Copenhagen', country: 'Denmark', lat: 55.6761, lon: 12.5683, tz: 'Europe/Copenhagen' },
  { name: 'Oslo', country: 'Norway', lat: 59.9139, lon: 10.7522, tz: 'Europe/Oslo' },
  { name: 'Stockholm', country: 'Sweden', lat: 59.3293, lon: 18.0686, tz: 'Europe/Stockholm' },
  { name: 'Helsinki', country: 'Finland', lat: 60.1699, lon: 24.9384, tz: 'Europe/Helsinki' },
  { name: 'Warsaw', country: 'Poland', lat: 52.2297, lon: 21.0122, tz: 'Europe/Warsaw' },
  { name: 'Prague', country: 'Czechia', lat: 50.0755, lon: 14.4378, tz: 'Europe/Prague' },
  { name: 'Budapest', country: 'Hungary', lat: 47.4979, lon: 19.0402, tz: 'Europe/Budapest' },
  { name: 'Bucharest', country: 'Romania', lat: 44.4268, lon: 26.1025, tz: 'Europe/Bucharest' },
  { name: 'Sofia', country: 'Bulgaria', lat: 42.6977, lon: 23.3219, tz: 'Europe/Sofia' },
  { name: 'Varna', country: 'Bulgaria', lat: 43.2141, lon: 27.9147, tz: 'Europe/Sofia' },
  { name: 'Plovdiv', country: 'Bulgaria', lat: 42.1354, lon: 24.7453, tz: 'Europe/Sofia' },
  { name: 'Burgas', country: 'Bulgaria', lat: 42.5048, lon: 27.4626, tz: 'Europe/Sofia' },
  { name: 'Athens', country: 'Greece', lat: 37.9838, lon: 23.7275, tz: 'Europe/Athens' },
  { name: 'Thessaloniki', country: 'Greece', lat: 40.6401, lon: 22.9444, tz: 'Europe/Athens' },
  { name: 'Istanbul', country: 'Turkey', lat: 41.0082, lon: 28.9784, tz: 'Europe/Istanbul' },
  { name: 'Ankara', country: 'Turkey', lat: 39.9334, lon: 32.8597, tz: 'Europe/Istanbul' },
  { name: 'Kyiv', country: 'Ukraine', lat: 50.4501, lon: 30.5234, tz: 'Europe/Kyiv' },
  { name: 'Moscow', country: 'Russia', lat: 55.7558, lon: 37.6173, tz: 'Europe/Moscow' },
  { name: 'Saint Petersburg', country: 'Russia', lat: 59.9311, lon: 30.3609, tz: 'Europe/Moscow' },
  { name: 'Belgrade', country: 'Serbia', lat: 44.7866, lon: 20.4489, tz: 'Europe/Belgrade' },
  { name: 'Zagreb', country: 'Croatia', lat: 45.815, lon: 15.9819, tz: 'Europe/Zagreb' },
  { name: 'Reykjavik', country: 'Iceland', lat: 64.1466, lon: -21.9426, tz: 'Atlantic/Reykjavik' },

  { name: 'New York', country: 'United States', lat: 40.7128, lon: -74.006, tz: 'America/New_York' },
  { name: 'Boston', country: 'United States', lat: 42.3601, lon: -71.0589, tz: 'America/New_York' },
  { name: 'Washington', country: 'United States', lat: 38.9072, lon: -77.0369, tz: 'America/New_York' },
  { name: 'Miami', country: 'United States', lat: 25.7617, lon: -80.1918, tz: 'America/New_York' },
  { name: 'Atlanta', country: 'United States', lat: 33.749, lon: -84.388, tz: 'America/New_York' },
  { name: 'Chicago', country: 'United States', lat: 41.8781, lon: -87.6298, tz: 'America/Chicago' },
  { name: 'Houston', country: 'United States', lat: 29.7604, lon: -95.3698, tz: 'America/Chicago' },
  { name: 'Dallas', country: 'United States', lat: 32.7767, lon: -96.797, tz: 'America/Chicago' },
  { name: 'Denver', country: 'United States', lat: 39.7392, lon: -104.9903, tz: 'America/Denver' },
  { name: 'Phoenix', country: 'United States', lat: 33.4484, lon: -112.074, tz: 'America/Phoenix' },
  { name: 'Los Angeles', country: 'United States', lat: 34.0522, lon: -118.2437, tz: 'America/Los_Angeles' },
  { name: 'San Francisco', country: 'United States', lat: 37.7749, lon: -122.4194, tz: 'America/Los_Angeles' },
  { name: 'Seattle', country: 'United States', lat: 47.6062, lon: -122.3321, tz: 'America/Los_Angeles' },
  { name: 'Toronto', country: 'Canada', lat: 43.6532, lon: -79.3832, tz: 'America/Toronto' },
  { name: 'Montreal', country: 'Canada', lat: 45.5019, lon: -73.5674, tz: 'America/Toronto' },
  { name: 'Vancouver', country: 'Canada', lat: 49.2827, lon: -123.1207, tz: 'America/Vancouver' },
  { name: 'Mexico City', country: 'Mexico', lat: 19.4326, lon: -99.1332, tz: 'America/Mexico_City' },
  { name: 'Bogotá', country: 'Colombia', lat: 4.711, lon: -74.0721, tz: 'America/Bogota' },
  { name: 'Lima', country: 'Peru', lat: -12.0464, lon: -77.0428, tz: 'America/Lima' },
  { name: 'Santiago', country: 'Chile', lat: -33.4489, lon: -70.6693, tz: 'America/Santiago' },
  { name: 'Buenos Aires', country: 'Argentina', lat: -34.6037, lon: -58.3816, tz: 'America/Argentina/Buenos_Aires' },
  { name: 'São Paulo', country: 'Brazil', lat: -23.5558, lon: -46.6396, tz: 'America/Sao_Paulo' },
  { name: 'Rio de Janeiro', country: 'Brazil', lat: -22.9068, lon: -43.1729, tz: 'America/Sao_Paulo' },

  { name: 'Cairo', country: 'Egypt', lat: 30.0444, lon: 31.2357, tz: 'Africa/Cairo' },
  { name: 'Lagos', country: 'Nigeria', lat: 6.5244, lon: 3.3792, tz: 'Africa/Lagos' },
  { name: 'Nairobi', country: 'Kenya', lat: -1.2921, lon: 36.8219, tz: 'Africa/Nairobi' },
  { name: 'Johannesburg', country: 'South Africa', lat: -26.2041, lon: 28.0473, tz: 'Africa/Johannesburg' },
  { name: 'Cape Town', country: 'South Africa', lat: -33.9249, lon: 18.4241, tz: 'Africa/Johannesburg' },
  { name: 'Casablanca', country: 'Morocco', lat: 33.5731, lon: -7.5898, tz: 'Africa/Casablanca' },
  { name: 'Addis Ababa', country: 'Ethiopia', lat: 9.03, lon: 38.74, tz: 'Africa/Addis_Ababa' },

  { name: 'Dubai', country: 'United Arab Emirates', lat: 25.2048, lon: 55.2708, tz: 'Asia/Dubai' },
  { name: 'Tel Aviv', country: 'Israel', lat: 32.0853, lon: 34.7818, tz: 'Asia/Jerusalem' },
  { name: 'Jerusalem', country: 'Israel', lat: 31.7683, lon: 35.2137, tz: 'Asia/Jerusalem' },
  { name: 'Riyadh', country: 'Saudi Arabia', lat: 24.7136, lon: 46.6753, tz: 'Asia/Riyadh' },
  { name: 'Tehran', country: 'Iran', lat: 35.6892, lon: 51.389, tz: 'Asia/Tehran' },
  { name: 'Karachi', country: 'Pakistan', lat: 24.8607, lon: 67.0011, tz: 'Asia/Karachi' },
  { name: 'Delhi', country: 'India', lat: 28.6139, lon: 77.209, tz: 'Asia/Kolkata' },
  { name: 'Mumbai', country: 'India', lat: 19.076, lon: 72.8777, tz: 'Asia/Kolkata' },
  { name: 'Bengaluru', country: 'India', lat: 12.9716, lon: 77.5946, tz: 'Asia/Kolkata' },
  { name: 'Chennai', country: 'India', lat: 13.0827, lon: 80.2707, tz: 'Asia/Kolkata' },
  { name: 'Kolkata', country: 'India', lat: 22.5726, lon: 88.3639, tz: 'Asia/Kolkata' },
  { name: 'Dhaka', country: 'Bangladesh', lat: 23.8103, lon: 90.4125, tz: 'Asia/Dhaka' },
  { name: 'Bangkok', country: 'Thailand', lat: 13.7563, lon: 100.5018, tz: 'Asia/Bangkok' },
  { name: 'Singapore', country: 'Singapore', lat: 1.3521, lon: 103.8198, tz: 'Asia/Singapore' },
  { name: 'Kuala Lumpur', country: 'Malaysia', lat: 3.139, lon: 101.6869, tz: 'Asia/Kuala_Lumpur' },
  { name: 'Jakarta', country: 'Indonesia', lat: -6.2088, lon: 106.8456, tz: 'Asia/Jakarta' },
  { name: 'Manila', country: 'Philippines', lat: 14.5995, lon: 120.9842, tz: 'Asia/Manila' },
  { name: 'Ho Chi Minh City', country: 'Vietnam', lat: 10.8231, lon: 106.6297, tz: 'Asia/Ho_Chi_Minh' },
  { name: 'Hong Kong', country: 'China', lat: 22.3193, lon: 114.1694, tz: 'Asia/Hong_Kong' },
  { name: 'Beijing', country: 'China', lat: 39.9042, lon: 116.4074, tz: 'Asia/Shanghai' },
  { name: 'Shanghai', country: 'China', lat: 31.2304, lon: 121.4737, tz: 'Asia/Shanghai' },
  { name: 'Taipei', country: 'Taiwan', lat: 25.033, lon: 121.5654, tz: 'Asia/Taipei' },
  { name: 'Seoul', country: 'South Korea', lat: 37.5665, lon: 126.978, tz: 'Asia/Seoul' },
  { name: 'Tokyo', country: 'Japan', lat: 35.6762, lon: 139.6503, tz: 'Asia/Tokyo' },
  { name: 'Osaka', country: 'Japan', lat: 34.6937, lon: 135.5023, tz: 'Asia/Tokyo' },

  { name: 'Sydney', country: 'Australia', lat: -33.8688, lon: 151.2093, tz: 'Australia/Sydney' },
  { name: 'Melbourne', country: 'Australia', lat: -37.8136, lon: 144.9631, tz: 'Australia/Melbourne' },
  { name: 'Brisbane', country: 'Australia', lat: -27.4698, lon: 153.0251, tz: 'Australia/Brisbane' },
  { name: 'Perth', country: 'Australia', lat: -31.9523, lon: 115.8613, tz: 'Australia/Perth' },
  { name: 'Auckland', country: 'New Zealand', lat: -36.8485, lon: 174.7633, tz: 'Pacific/Auckland' },
  { name: 'Honolulu', country: 'United States', lat: 21.3069, lon: -157.8583, tz: 'Pacific/Honolulu' },
]

const norm = (s: string): string =>
  s
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')

/** Prefix-first fuzzy search over "City, Country". */
export function searchCities(query: string, limit = 8): City[] {
  const q = norm(query.trim())
  if (q.length < 2) return []
  const scored: { city: City; score: number }[] = []
  for (const city of CITIES) {
    const name = norm(city.name)
    const hay = `${name}, ${norm(city.country)}`
    let score = -1
    if (name.startsWith(q)) score = 0
    else if (name.includes(q)) score = 1
    else if (hay.includes(q)) score = 2
    if (score >= 0) scored.push({ city, score })
  }
  scored.sort((a, b) => a.score - b.score || a.city.name.localeCompare(b.city.name))
  return scored.slice(0, limit).map((s) => s.city)
}
