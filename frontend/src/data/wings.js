export const wingsSection = {
  label: 'Our Wings Across Nepal',
  heading: 'Wings Across Nepal',
  text: 'Explore our regional wings across Nepal — pins mark wing bases, colored areas show district coverage.',
}

export const wingsPage = {
  heading: 'Our Wings',
  text: 'Wings are our regional fan groups across Nepal. Each wing organizes local events, screenings, and community activities.',
}

export const wingMapConfig = {
  center: [28.2, 84.0],
  zoom: 7,
  geoJsonUrl: '/data/nepal-districts.geojson',
  color: '#c8102e',
}

// coords = [lat, lng]; districts match DIST_EN in public/data/nepal-districts.geojson
export const wings = [
  {
    slug: 'jumla-wing',
    name: 'Jumla Wing',
    base: 'Jumla',
    coords: [29.25, 82.25],
    districts: ['Jumla'],
    members: 30,
    founded: 2024,
    bodMembers: 11,
    galleryCount: 9,
    contact: 'Samundra Rawal',
    description: 'More about this wing coming soon.',
  },
  {
    slug: 'kathmandu-wing',
    name: 'Kathmandu Wing',
    base: 'Kathmandu',
    coords: [27.7172, 85.324],
    districts: ['Bhaktapur', 'Kathmandu', 'Lalitpur'],
    members: 250,
    founded: 2015,
    bodMembers: 13,
    galleryCount: 48,
    contact: 'Bishwash Lamichhane (9803686004)',
    description:
      'The flagship wing of Real Madrid Fan Club Nepal, based in the capital city. Kathmandu Wing leads the largest match screenings, charity drives, and football events in the country, uniting Madridistas from every corner of the valley.',
    head: {
      name: 'Sushil Thapa',
      title: 'Regional Head, Kathmandu Wing',
      message:
        'As Regional Head of the Kathmandu Wing, it is my honor to lead a community that bleeds white and gold every match-day. Our wing was the spark that ignited Madridismo in Nepal — and we continue to set the standard for passion, organization, and brotherhood. Hala Madrid!',
    },
    bod: [
      { name: 'Sushil Thapa', role: 'Regional Head' },
      { name: 'Anush Bhandari', role: 'Deputy Regional Head' },
      { name: 'Bibek Dahal', role: 'Deputy Regional Head' },
      { name: 'Saurav Ranjit', role: 'Secretary' },
      { name: 'Sabin Dhital', role: 'Deputy Secretary' },
      { name: 'Unnati Shrestha', role: 'Treasurer' },
      { name: 'Beeswas Lamichhane', role: 'Event Head' },
      { name: 'Susmita Thakuri', role: 'Program Coordinator' },
      { name: 'Alish Bhattarai', role: 'Program Coordinator' },
      { name: 'Nishant Shrestha', role: 'Program Coordinator' },
      { name: 'Safala Lamichhane', role: 'Member' },
      { name: 'Manoj Timalsina', role: 'Advisor' },
      { name: 'Sumit Khanal', role: 'Advisor' },
    ],
  },
  {
    slug: 'nuwakot-wing',
    name: 'Nuwakot Wing',
    base: 'Nuwakot',
    coords: [27.91, 85.16],
    districts: ['Nuwakot'],
    members: 50,
    founded: 2021,
    bodMembers: 19,
    galleryCount: 21,
    contact: 'Ramesh Neupane',
    description: 'More about this wing coming soon.',
  },
  {
    slug: 'pokhara-wing',
    name: 'Pokhara Wing',
    base: 'Pokhara',
    coords: [28.2096, 83.9856],
    districts: ['Kaski'],
    members: 150,
    founded: 2019,
    bodMembers: 17,
    galleryCount: 27,
    contact: 'Bhanubhakta Lamsal',
    description:
      'Nestled by the lakes of Pokhara, this wing brings together fans from the western region of Nepal. Known for its scenic match-day meet-ups by Phewa Lake and an active youth football initiative.',
  },
  {
    slug: 'butwal-wing',
    name: 'Butwal Wing',
    base: 'Butwal',
    coords: [27.6864, 83.4324],
    districts: ['Rupandehi'],
    members: 80,
    founded: 2021,
    bodMembers: 13,
    galleryCount: 8,
    contact: 'Aswin KC',
    description:
      'Representing the heart of Lumbini Province, the Butwal Wing organizes screenings, futsal tournaments, and fan engagement events across the Rupandehi region.',
  },
  {
    slug: 'province1-wing',
    name: 'Province 1 Wing',
    base: 'Province 1',
    coords: [26.66, 87.27],
    districts: ['Sunsari'],
    members: 120,
    founded: 2020,
    bodMembers: 17,
    galleryCount: 22,
    contact: 'Roman Chamlagain',
    description:
      'The eastern stronghold of Madridismo in Nepal. Province 1 Wing is famous for its loud, passionate match-day atmosphere and strong community presence in eastern Nepal.',
  },
  {
    slug: 'chitwan-wing',
    name: 'Chitwan Wing',
    base: 'Chitwan',
    coords: [27.59, 84.5],
    districts: ['Chitawan'],
    members: 95,
    founded: 2019,
    bodMembers: 13,
    galleryCount: 21,
    contact: 'Aayush Khanal',
    description:
      'Based in the green plains of Chitwan, this wing combines football passion with social initiatives, including jungle clean-ups and grassroots football programs for kids.',
  },
]
