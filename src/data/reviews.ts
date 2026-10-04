/**
 * Real customer reviews, copied word for word from GM Roofing's Yelp page
 * (https://www.yelp.com/biz/gm-roofing-sacramento). Never edit a quote.
 * Location is the reviewer's location as Yelp shows it.
 */
export type Review = { quote: string; name: string; location?: string; source?: string; rating?: number };

export const reviewsUrl = "https://www.yelp.com/biz/gm-roofing-sacramento";

export const reviews: Review[] = [
  {
    quote:
      "Giovanni was extremely communicative, was very fast in his response and he and his crew did a great job. We had a leak from pigeon clutter under our solar panels that meant GM had to coordinate a solar contractor to do the removal and reinstall. All went off seamlessly and he also pigeon proofed everything so we can avoid this in the future. They earned a customer for life. Thanks GM!",
    name: "BW R.",
    location: "Rancho Cordova, CA",
    source: "Yelp",
    rating: 5,
  },
  {
    quote:
      "We cannot recommend Giovanni and his team highly enough. He came the next day to give us his bid, was prepared and able to answer all our questions. His communication was excellent and transparent throughout the process. He shared photos during the work each day to show their progress and at the end shared full documentation including a drone video! The workers were respectful and hardworking and always on time.",
    name: "Kara C.",
    location: "Mountain View, CA",
    source: "Yelp",
    rating: 5,
  },
  {
    quote:
      "Giovanni and his team were amazing. They went well above my expectations. He gave me a very reasonable quote and was totally up front, didn't try to upsell any services. He provided quality pictures of all work before and after, and even had drone footage. They showed up on time and completed the work as promised. I highly recommend GM Roofing.",
    name: "John I.",
    location: "Roseville, CA",
    source: "Yelp",
    rating: 5,
  },
  {
    quote:
      "I recently had a large amount of roof repair to my cement tile roof along with some gutter repair. Giovanni and his crew did excellent work. He was always punctual, friendly, respectful and knowledgeable, and his pricing was very reasonable. The clean up after the project was also outstandingly good. I would hire them again.",
    name: "Michael M.",
    location: "California",
    source: "Yelp",
    rating: 5,
  },
  {
    quote:
      "GM Roofing easily scores 5 stars, and deserves more. From beginning to end of our roof replacement project, Giovanni was nothing but professional, kind, communicative, punctual, attentive, and a pleasure to interact with. His pricing is more than competitive. We would not hesitate to hire GM Roofing again for any and every roof-related project.",
    name: "A.L.",
    location: "California",
    source: "Yelp",
    rating: 5,
  },
];
