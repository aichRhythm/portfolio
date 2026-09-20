export type OffTheClockType = "music" | "travel" | "snippet";

export type OffTheClockMedia = {
  url: string;
  type: "image" | "video";
  poster?: string;
};

export type OffTheClockEntry = {
  type?: OffTheClockType;
  title: string;
  caption: string;
  date?: string;
  location?: string;
  media?: OffTheClockMedia;
  links?: { label: string; url: string }[];
};

/**
 * Every field except `title` and `caption` is optional. Entries without
 * `media` render the amber gradient placeholder; add a `url` to light them up.
 */
export const offTheClock: OffTheClockEntry[] = [
  {
    type: "travel",
    title: "Where the land runs out",
    caption:
      "Cabo de Rama — a fort at the edge of India, holding the sea back with old stone.",
    location: "Goa",
    date: "2025",
    media: { url: "/media/cabo-de-rama.webp", type: "image" },
  },
  {
    type: "travel",
    title: "Momo and a mountain",
    caption:
      "A hill café with a two-item menu — momos and tea — and a view that does the rest.",
    location: "Kurseong",
    date: "2025",
    media: { url: "/media/chandelier.webp", type: "image" },
  },
  {
    type: "travel",
    title: "A valley Christmas",
    caption:
      "A Christmas party in a Himalayan valley, the kind of night where the cold stays outside and the music stays in.",
    location: "Manali",
    date: "2025",
    media: { url: "/media/christmas-performance.webp", type: "image" },
  },
  {
    type: "travel",
    title: "The bottom of the map",
    caption:
      "Kochi's coast, where the fishing boats drift in and the sun goes down in instalments. A few days of salt and slow.",
    location: "Kochi",
    date: "2026",
    media: { url: "/media/fishing.webp", type: "image" },
  },
  {
    type: "travel",
    title: "Fog, with a mountain in it",
    caption:
      "The hills I grew up near, pulling their usual trick — half here, half weather, all memory.",
    location: "Kurseong",
    date: "2023",
    media: { url: "/media/foggy-peak.webp", type: "image" },
  },
  {
    type: "travel",
    title: "A road that becomes weather",
    caption:
      "A mountain road that stops being a road somewhere near the clouds. Same fog, same hills, same way home.",
    location: "Kurseong",
    date: "2023",
    media: { url: "/media/foggy-road.webp", type: "image" },
  },
  {
    type: "travel",
    title: "Good company, high altitude",
    caption:
      "Manali with a friend who doesn't need me to be impressive. We mostly drank chai and let the mountains carry the conversation.",
    location: "Manali",
    date: "2025",
    media: { url: "/media/friend.webp", type: "image" },
  },
  {
    type: "travel",
    title: "A corner of Hadimba",
    caption:
      "The dark underside of the Hadimba temple roof, where the cedar pillars swallow the light. Quieter up here than the crowds below.",
    location: "Manali",
    date: "2025",
    media: { url: "/media/hadimba-temple.webp", type: "image" },
  },
  {
    type: "travel",
    title: "No signal, no hurry",
    caption:
      "Sitting with my back to the camera above Kasol, because some views are better kept to yourself.",
    location: "Kasol",
    date: "2025",
    media: { url: "/media/hike.webp", type: "image" },
  },
  {
    type: "travel",
    title: "The blue city, from above",
    caption:
      "Jodhpur from Mehrangarh Fort — a hundred thousand blue houses stacked like a thought that won't quite settle.",
    location: "Jodhpur",
    date: "2021",
    media: { url: "/media/jodhpur.webp", type: "image" },
  },
  {
    type: "music",
    title: "Let Her Go (cover)",
    caption:
      "My take on a song that's harder to sing than it sounds. One take, because the second wasn't any better.",
      date: "2026",
      location: "Bengaluru",
    media: {
      url: "/media/let-her-go.mp4",
      type: "video",
      poster: "/media/let-her-go-poster.webp",
    },
  },
  {
    type: "travel",
    title: "Still standing",
    caption:
      "A dead tree holding its ground in a Kullu valley snowstorm. The wind had opinions; the tree didn't.",
    location: "Kullu Valley",
    date: "2025",
    media: { url: "/media/lone-tree.webp", type: "image" },
  },
  {
    type: "travel",
    title: "Ridges, as far as home",
    caption:
      "The layered ridges near Siliguri — the view I've been looking at since before I had words for it.",
    location: "Siliguri",
    date: "2025",
    media: { url: "/media/peaks-across.webp", type: "image" },
  },
  {
    type: "travel",
    title: "Palace of pigeons",
    caption:
      "A small temple rising out of a Udaipur lake, claimed by every pigeon in the city. The birds got the best address in town.",
    location: "Udaipur",
    date: "2021",
    media: { url: "/media/pigeon-palace.webp", type: "image" },
  },
  {
    type: "travel",
    title: "Rainbow, uncut",
    caption:
      "A rainbow forming over the rocks near a waterfall — the kind of thing you miss if you're looking at your phone.",
    location: "Kochi",
    date: "2026",
    media: {
      url: "/media/rainbow-over-the-rocks.mp4",
      type: "video",
      poster: "/media/rainbow-over-the-rocks-poster.webp",
    },
  },
  {
    type: "travel",
    title: "Kochi, on fire",
    caption:
      "A sunset in Kochi that needed no filter and no words. Adding both anyway.",
    location: "Kochi",
    date: "2026",
    media: { url: "/media/sunset-kochi.webp", type: "image" },
  },
  {
    type: "travel",
    title: "A door in the trunk",
    caption:
      "A hollowed tree in a forest near Manali — just big enough to step inside and briefly unsubscribe from everything.",
    location: "Manali",
    date: "2025",
    media: { url: "/media/tree-hollow.webp", type: "image" },
  },
  {
    type: "travel",
    title: "Exactly what it looks like",
    caption:
      "A rooster, a coconut tree, a waterbody, Goa. I have no further context, and none is required.",
    location: "Goa",
    date: "2025",
    media: { url: "/media/wth.webp", type: "image" },
  },
];
