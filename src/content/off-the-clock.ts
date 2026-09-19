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
    title: "Fort off the coast",
    caption:
      "The ocean from a fort on the edge of India. A few days of quiet and sun.",
    location: "Goa",
    date: "2025",
    media: { url: "/media/cabo-de-rama.webp", type: "image" },
  },
  {
    type: "travel",
    title: "Comfy cafe in the hills",
    caption:
      "A cafe that serves only momos and tea, with a view of the mountains.",
    location: "Kurseong",
    date: "2025",
    media: { url: "/media/chandelier.webp", type: "image" },
  },
  {
    type: "travel",
    title: "Good views, good people and good music",
    caption: "A Christmas party in a valley in the Himalayas.",
    location: "Manali",
    date: "2025",
    media: { url: "/media/christmas-performance.webp", type: "image" },
  },
  {
    type: "travel",
    title: "By the sea, at the very south of India",
    caption:
      "Some of the most beautiful coastline in India, and a few days of quiet and sun.",
    location: "Kochi",
    date: "2026",
    media: { url: "/media/fishing.webp", type: "image" },
  },
  {
    type: "travel",
    title: "A peak almost obscured by fog",
    caption: "A vignette from the hills in the Himalayas I grew up near.",
    location: "Kurseong",
    date: "2023",
    media: { url: "/media/foggy-peak.webp", type: "image" },
  },
  {
    type: "travel",
    title: "A twisting mountain road almost fully obscured by fog",
    caption: "Again, a vignette from the hills in the Himalayas I grew up near.",
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
    media: { url: "/media/let-her-go.mp4", type: "video" },
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
    media: { url: "/media/rainbow-over-the-rocks.mp4", type: "video" },
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
