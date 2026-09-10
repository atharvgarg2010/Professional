/**
 * Photography data — single source of truth.
 * 
 * Rules:
 * - Do NOT invent title, description, or EXIF. Leave fields empty string if Atharv hasn't supplied them.
 * - Do NOT render a panel section for empty fields (handled in DetailView).
 * - aspectRatio = width / height of source image.
 * - Supply photos in Atharv's ranked order — rank 1 reads first in grid.
 */

export interface Photo {
  id: string;
  src: string;
  aspectRatio: number;       // width / height — required for CLS-free layout reservations
  title: string;             // empty string = not supplied yet
  description: string;       // empty string = not supplied yet
  location: string;          // empty string = not supplied yet
  year: string;
  details?: {
    camera?: string;
    lens?: string;
    settings?: string;
  };
}

// ─── Atharv's photo roster ────────────────────────────────────────────────────
// Supply: title, description, location, year, optional EXIF.
// Supply remaining photos in ranked order by appending to this array.
// aspectRatio values below are estimated — update with real values from image metadata.

export const photos: Photo[] = [
  {
    id: '01',
    src: '/photography/_DSC0007.JPG',
    aspectRatio: 1.5098,      // 4928×3264 — measured
    title: 'Innocence in Bloom',
    description: 'There\'s a quiet magic in the way a young pup looks at the world—eyes wide with wonder, wrapped in a playful floral shirt. Sitting amidst the morning grass, this golden companion reminds us to pause, breathe, and find joy in life\'s simplest moments.',
    location: 'Delhi',
    year: '2025',
    details: {},
  },
  {
    id: '02',
    src: '/photography/_DSC0009.JPG',
    aspectRatio: 0.8,         // Simulated portrait ratio for preview
    title: 'Whispers of the Woods',
    description: 'Every deep ridge and vibrant amber hue tells a story of seasons past. This ancient bark is a testament to resilience, standing tall against time, and offering a silent, comforting embrace to anyone who takes a moment to listen.',
    location: 'Delhi',
    year: '2025',
    details: {},
  },
  {
    id: '03',
    src: '/photography/_DSC0066.JPG',
    aspectRatio: 1.0,         // Simulated square ratio for preview
    title: 'Suspended Dreams',
    description: 'Caught in a dramatic beam of golden light, this lone sneaker feels like a leap frozen in time. It speaks to the journey of chasing ambitions, reminding us that every great step forward begins with a single, bold leap into the unknown.',
    location: 'Delhi',
    year: '2025',
    details: {},
  },
  {
    id: '04',
    src: '/photography/_DSC0126.JPG',
    aspectRatio: 0.66,        // Simulated tall portrait ratio for preview
    title: 'Luminous Trails',
    description: 'Surrounded by dancing ribbons of light in the dark, this bottle holds more than just a scent—it captures a memory waiting to be lived. The vibrant energy around it reflects the spark of confidence we feel when we step out into the night.',
    location: 'Delhi',
    year: '2025',
    details: {},
  },
  {
    id: '05',
    src: '/photography/_DSC0423.JPG',
    aspectRatio: 1.25,        // Simulated 5:4 ratio for preview
    title: 'The Road\'s Companion',
    description: 'Gleaming in the soft daylight, the classic curves of this Hunter 350 invite endless possibilities. It\'s not just a machine; it\'s a promise of freedom, crisp morning air, and the heartwarming thrill of discovering new horizons.',
    location: 'Delhi',
    year: '2025',
    details: {},
  },
  {
    id: '06',
    src: '/photography/nature-1.jpg',
    aspectRatio: 1.0,         // Estimated aspect ratio
    title: 'A Moment\'s Rest',
    description: 'Perched high above the bustling world, this little voyager finds a fleeting sanctuary. It\'s a gentle reminder that no matter how long the flight, there is always a peaceful ledge waiting to offer rest and reflection.',
    location: '',
    year: '2026',
    details: {},
  },
  {
    id: '07',
    src: '/photography/nature-2.jpg',
    aspectRatio: 1.5,         // Estimated aspect ratio
    title: 'Golden Wings',
    description: 'Basking in the golden hour\'s glow, this delicate dragonfly is a symbol of transformation and grace. Its iridescent wings catch the light, whispering a beautiful truth: that even the most fleeting moments can leave a lasting impact on our hearts.',
    location: '',
    year: '2026',
    details: {},
  },
  {
    id: '08',
    src: '/photography/horses.jpg',
    aspectRatio: 0.6621,
    title: 'Silent Companions',
    description: 'Grazing peacefully against a majestic, barren landscape, these horses embody the quiet resilience of nature. A serene moment of connection and untamed freedom.',
    location: '',
    year: '2026',
    details: {},
  },
  {
    id: '09',
    src: '/photography/camel.jpg',
    aspectRatio: 0.6621,
    title: 'Desert Companion',
    description: 'A quiet moment of rest between a traveler and his camel, sitting together on the sun-baked earth. The deep textures of the camel\'s coat and the man\'s weary posture speak volumes of their shared journey.',
    location: '',
    year: '2026',
    details: {},
  },
  // ─── SUPPLY REMAINING PHOTOS HERE ─────────────────────────────────────────
  // Copy the object above and fill in real data. Keep in ranked order.
];
