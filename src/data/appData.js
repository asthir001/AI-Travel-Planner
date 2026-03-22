// ─── Countries & States ───────────────────────────────────────────────────────

export const COUNTRIES = [
  {
    code: 'IN', name: 'India', currency: '₹', flag: '🇮🇳',
    states: [
      { code: 'IN-MH', name: 'Maharashtra', cities: ['Mumbai', 'Pune', 'Nagpur', 'Nashik', 'Aurangabad'] },
      { code: 'IN-DL', name: 'Delhi', cities: ['New Delhi', 'Noida', 'Gurgaon', 'Faridabad', 'Ghaziabad'] },
      { code: 'IN-KA', name: 'Karnataka', cities: ['Bangalore', 'Mysore', 'Hubli', 'Mangalore'] },
      { code: 'IN-TN', name: 'Tamil Nadu', cities: ['Chennai', 'Coimbatore', 'Madurai', 'Salem', 'Trichy'] },
      { code: 'IN-KL', name: 'Kerala', cities: ['Kochi', 'Thiruvananthapuram', 'Kozhikode', 'Thrissur'] },
      { code: 'IN-RJ', name: 'Rajasthan', cities: ['Jaipur', 'Jodhpur', 'Udaipur', 'Kota', 'Ajmer'] },
      { code: 'IN-GA', name: 'Goa', cities: ['Panaji', 'Margao', 'Vasco da Gama', 'Mapusa'] },
      { code: 'IN-HP', name: 'Himachal Pradesh', cities: ['Shimla', 'Manali', 'Dharamshala', 'Kullu'] },
      { code: 'IN-UT', name: 'Uttarakhand', cities: ['Dehradun', 'Haridwar', 'Rishikesh', 'Nainital', 'Mussoorie'] },
      { code: 'IN-GJ', name: 'Gujarat', cities: ['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot'] },
      { code: 'IN-WB', name: 'West Bengal', cities: ['Kolkata', 'Howrah', 'Siliguri', 'Durgapur'] },
      { code: 'IN-PB', name: 'Punjab', cities: ['Amritsar', 'Ludhiana', 'Chandigarh', 'Jalandhar'] },
    ],
  },
  {
    code: 'GB', name: 'United Kingdom', currency: '£', flag: '🇬🇧',
    states: [
      { code: 'GB-ENG', name: 'England', cities: ['London', 'Manchester', 'Birmingham', 'Liverpool', 'Leeds'] },
      { code: 'GB-SCT', name: 'Scotland', cities: ['Edinburgh', 'Glasgow', 'Aberdeen', 'Inverness'] },
      { code: 'GB-WLS', name: 'Wales', cities: ['Cardiff', 'Swansea', 'Newport'] },
      { code: 'GB-NIR', name: 'Northern Ireland', cities: ['Belfast', 'Derry', 'Lisburn'] },
    ],
  },
  {
    code: 'US', name: 'United States', currency: '$', flag: '🇺🇸',
    states: [
      { code: 'US-CA', name: 'California', cities: ['Los Angeles', 'San Francisco', 'San Diego', 'Sacramento'] },
      { code: 'US-NY', name: 'New York', cities: ['New York City', 'Buffalo', 'Albany', 'Rochester'] },
      { code: 'US-TX', name: 'Texas', cities: ['Houston', 'Austin', 'Dallas', 'San Antonio'] },
      { code: 'US-FL', name: 'Florida', cities: ['Miami', 'Orlando', 'Tampa', 'Jacksonville'] },
      { code: 'US-IL', name: 'Illinois', cities: ['Chicago', 'Springfield', 'Rockford'] },
    ],
  },
  {
    code: 'AU', name: 'Australia', currency: 'A$', flag: '🇦🇺',
    states: [
      { code: 'AU-NSW', name: 'New South Wales', cities: ['Sydney', 'Newcastle', 'Wollongong'] },
      { code: 'AU-VIC', name: 'Victoria', cities: ['Melbourne', 'Geelong', 'Ballarat'] },
      { code: 'AU-QLD', name: 'Queensland', cities: ['Brisbane', 'Gold Coast', 'Sunshine Coast'] },
      { code: 'AU-WA', name: 'Western Australia', cities: ['Perth', 'Fremantle', 'Bunbury'] },
    ],
  },
  {
    code: 'CA', name: 'Canada', currency: 'C$', flag: '🇨🇦',
    states: [
      { code: 'CA-ON', name: 'Ontario', cities: ['Toronto', 'Ottawa', 'Hamilton', 'London'] },
      { code: 'CA-QC', name: 'Quebec', cities: ['Montreal', 'Quebec City', 'Laval'] },
      { code: 'CA-BC', name: 'British Columbia', cities: ['Vancouver', 'Victoria', 'Surrey'] },
      { code: 'CA-AB', name: 'Alberta', cities: ['Calgary', 'Edmonton', 'Red Deer'] },
    ],
  },
  {
    code: 'DE', name: 'Germany', currency: '€', flag: '🇩🇪',
    states: [
      { code: 'DE-BE', name: 'Berlin', cities: ['Berlin'] },
      { code: 'DE-BY', name: 'Bavaria', cities: ['Munich', 'Nuremberg', 'Augsburg'] },
      { code: 'DE-HH', name: 'Hamburg', cities: ['Hamburg'] },
      { code: 'DE-NW', name: 'North Rhine-Westphalia', cities: ['Cologne', 'Düsseldorf', 'Dortmund'] },
    ],
  },
  {
    code: 'FR', name: 'France', currency: '€', flag: '🇫🇷',
    states: [
      { code: 'FR-IDF', name: 'Île-de-France', cities: ['Paris', 'Versailles'] },
      { code: 'FR-PAC', name: "Provence-Alpes-Côte d'Azur", cities: ['Marseille', 'Nice', 'Toulon', 'Cannes'] },
      { code: 'FR-ARA', name: 'Auvergne-Rhône-Alpes', cities: ['Lyon', 'Grenoble', 'Clermont-Ferrand'] },
    ],
  },
];

// ─── Fallback holidays for India (when API fails) ─────────────────────────────

export const INDIA_FALLBACK_HOLIDAYS_2026 = [
  { date: '2026-01-01', name: 'New Year\'s Day', global: true, counties: null },
  { date: '2026-01-14', name: 'Makar Sankranti / Pongal', global: false, counties: ['IN-TN', 'IN-GJ', 'IN-KA'] },
  { date: '2026-01-26', name: 'Republic Day', global: true, counties: null },
  { date: '2026-02-19', name: 'Chhatrapati Shivaji Maharaj Jayanti', global: false, counties: ['IN-MH'] },
  { date: '2026-03-08', name: 'Holi', global: false, counties: ['IN-DL', 'IN-RJ', 'IN-MH', 'IN-GJ', 'IN-UT', 'IN-HP', 'IN-PB', 'IN-WB'] },
  { date: '2026-03-29', name: 'Ram Navami', global: true, counties: null },
  { date: '2026-04-02', name: 'Good Friday', global: true, counties: null },
  { date: '2026-04-14', name: 'Dr. Ambedkar Jayanti', global: true, counties: null },
  { date: '2026-04-14', name: 'Tamil New Year (Vishu)', global: false, counties: ['IN-TN', 'IN-KL'] },
  { date: '2026-04-21', name: 'Mahavir Jayanti', global: true, counties: null },
  { date: '2026-05-01', name: 'Maharashtra Day / Labour Day', global: false, counties: ['IN-MH', 'IN-KA', 'IN-TN', 'IN-KL', 'IN-WB', 'IN-GJ'] },
  { date: '2026-05-12', name: 'Buddha Purnima', global: true, counties: null },
  { date: '2026-06-27', name: 'Eid ul-Adha', global: true, counties: null },
  { date: '2026-07-17', name: 'Muharram', global: true, counties: null },
  { date: '2026-08-15', name: 'Independence Day', global: true, counties: null },
  { date: '2026-08-22', name: 'Ganesh Chaturthi', global: false, counties: ['IN-MH', 'IN-GA', 'IN-KA'] },
  { date: '2026-09-16', name: 'Milad-un-Nabi', global: true, counties: null },
  { date: '2026-10-02', name: 'Gandhi Jayanti', global: true, counties: null },
  { date: '2026-10-20', name: 'Dussehra', global: true, counties: null },
  { date: '2026-11-08', name: 'Diwali', global: true, counties: null },
  { date: '2026-11-10', name: 'Govardhan Puja', global: false, counties: ['IN-DL', 'IN-MH', 'IN-RJ', 'IN-GJ'] },
  { date: '2026-11-19', name: 'Guru Nanak Jayanti', global: false, counties: ['IN-PB', 'IN-DL', 'IN-HP', 'IN-UT', 'IN-RJ'] },
  { date: '2026-12-25', name: 'Christmas Day', global: true, counties: null },
];

export const INDIA_FALLBACK_HOLIDAYS_2025 = [
  { date: '2025-01-01', name: 'New Year\'s Day', global: true, counties: null },
  { date: '2025-01-14', name: 'Makar Sankranti / Pongal', global: false, counties: ['IN-TN', 'IN-GJ', 'IN-KA'] },
  { date: '2025-01-26', name: 'Republic Day', global: true, counties: null },
  { date: '2025-02-26', name: 'Maha Shivratri', global: true, counties: null },
  { date: '2025-03-14', name: 'Holi', global: false, counties: ['IN-DL', 'IN-RJ', 'IN-MH', 'IN-GJ', 'IN-UT', 'IN-HP', 'IN-PB', 'IN-WB'] },
  { date: '2025-04-10', name: 'Good Friday', global: true, counties: null },
  { date: '2025-04-14', name: 'Dr. Ambedkar Jayanti', global: true, counties: null },
  { date: '2025-04-18', name: 'Ram Navami', global: true, counties: null },
  { date: '2025-04-30', name: 'Buddha Purnima', global: true, counties: null },
  { date: '2025-05-01', name: 'Maharashtra Day / Labour Day', global: false, counties: ['IN-MH', 'IN-KA', 'IN-TN', 'IN-KL', 'IN-WB', 'IN-GJ'] },
  { date: '2025-06-07', name: 'Eid ul-Adha', global: true, counties: null },
  { date: '2025-07-06', name: 'Muharram', global: true, counties: null },
  { date: '2025-08-15', name: 'Independence Day', global: true, counties: null },
  { date: '2025-08-27', name: 'Janmashtami', global: true, counties: null },
  { date: '2025-09-05', name: 'Ganesh Chaturthi', global: false, counties: ['IN-MH', 'IN-GA', 'IN-KA'] },
  { date: '2025-10-02', name: 'Gandhi Jayanti', global: true, counties: null },
  { date: '2025-10-02', name: 'Dussehra', global: true, counties: null },
  { date: '2025-10-20', name: 'Diwali', global: true, counties: null },
  { date: '2025-11-05', name: 'Guru Nanak Jayanti', global: false, counties: ['IN-PB', 'IN-DL', 'IN-HP', 'IN-UT', 'IN-RJ'] },
  { date: '2025-12-25', name: 'Christmas Day', global: true, counties: null },
];

// ─── Destinations Database ────────────────────────────────────────────────────

export const DESTINATIONS = [
  {
    id: 'goa',
    name: 'Goa',
    state: 'Goa',
    tagline: 'Sun, Sand & Portuguese Charm',
    emoji: '🏖️',
    types: ['beaches', 'food', 'culture'],
    bestMonths: [9, 10, 11, 0, 1, 2, 3],
    avoidMonths: [5, 6, 7],
    seasonalWarning: { months: [5, 6, 7], message: 'Peak monsoon — heavy rains & rough seas. Some resorts close. Best avoided.' },
    distanceFrom: {
      'Mumbai': { km: 580, train: '8-10h', flight: '1.5h', road: '9h' },
      'Pune': { km: 450, train: '12h', flight: null, road: '8h' },
      'Bangalore': { km: 560, train: '12h', flight: '1.5h', road: '9h' },
      'Hyderabad': { km: 680, train: '14h', flight: '1.5h', road: '12h' },
    },
    costPerPerson: { budget: 8000, midrange: 20000, premium: 50000 },
    minDays: 2,
    highlights: ['Baga & Calangute Beach', 'Dudhsagar Falls', 'Old Goa Churches', 'Anjuna Flea Market', 'Portuguese cuisine'],
    itineraries: {
      3: [
        { day: 1, title: 'Arrival & North Goa', activities: ['Check into beach resort', 'Baga & Calangute Beach', 'Sunset at Fort Aguada', 'Dinner at beachside shack'] },
        { day: 2, title: 'Heritage & Culture', activities: ['Old Goa UNESCO Churches', 'Fontainhas Latin Quarter', 'Panjim city walk', 'Casino night (optional)'] },
        { day: 3, title: 'South Goa & Departure', activities: ['Colva & Palolem Beach', 'Spice plantation visit', 'Local market shopping', 'Departure'] },
      ],
      4: [
        { day: 1, title: 'Arrival & Beach Day', activities: ['Check in', 'Baga Beach', 'Sunset cruise on Mandovi River', "Tito's Lane nightlife"] },
        { day: 2, title: 'Water Sports & Heritage', activities: ['Calangute water sports (parasailing, jet ski)', 'Old Goa Churches afternoon', 'Spice plantation evening dinner'] },
        { day: 3, title: 'Dudhsagar Adventure', activities: ['Dudhsagar Falls full-day trek', 'Jungle jeep safari', 'Evening at South Goa beach'] },
        { day: 4, title: 'Markets & Departure', activities: ['Palolem beach sunrise', 'Anjuna flea market', 'Souvenir shopping', 'Departure'] },
      ],
    },
    packingTips: ['Sunscreen SPF 50+', 'Swimwear & flip flops', 'Mosquito repellent', 'Light cotton clothes', 'Waterproof bag'],
  },
  {
    id: 'manali',
    name: 'Manali',
    state: 'Himachal Pradesh',
    tagline: 'Where Mountains Touch the Sky',
    emoji: '🏔️',
    types: ['mountains', 'adventure'],
    bestMonths: [2, 3, 4, 5, 8, 9],
    avoidMonths: [],
    seasonalWarning: { months: [11, 0, 1], message: 'Roads may be blocked due to heavy snowfall (−10°C to −20°C). Carry heavy gear and check road status.' },
    distanceFrom: {
      'Delhi': { km: 540, train: null, flight: null, road: '12-14h' },
      'Chandigarh': { km: 310, train: null, flight: null, road: '8h' },
      'Amritsar': { km: 420, train: null, flight: null, road: '10h' },
    },
    costPerPerson: { budget: 9000, midrange: 22000, premium: 45000 },
    minDays: 3,
    highlights: ['Rohtang Pass', 'Solang Valley', 'Old Manali', 'Hidimba Temple', 'Beas River Rafting'],
    itineraries: {
      4: [
        { day: 1, title: 'Delhi → Manali (overnight)', activities: ['Board overnight Volvo bus from Delhi', 'Arrive Manali morning', 'Rest & acclimatize', 'Old Manali evening walk'] },
        { day: 2, title: 'Solang Valley Adventure', activities: ['Solang Valley', 'Paragliding & zorbing', 'Snow activities (winter) / trekking (summer)', 'Mall Road evening'] },
        { day: 3, title: 'Rohtang / Sissu', activities: ['Rohtang Pass (permit needed, closed Oct-May)', 'Sissu village & waterfall (alternative)', 'Hidimba Temple', 'Tibetan market'] },
        { day: 4, title: 'Vashisht & Departure', activities: ['Vashisht hot springs (natural sulphur bath)', 'Naggar Castle', 'Shopping for woolens', 'Board overnight bus back'] },
      ],
    },
    packingTips: ['Heavy winter jacket', 'Thermal innerwear', 'Snow boots', 'UV sunglasses', 'Altitude medicine (Diamox)', 'Power bank'],
  },
  {
    id: 'coorg',
    name: 'Coorg (Kodagu)',
    state: 'Karnataka',
    tagline: "Scotland of India",
    emoji: '🌿',
    types: ['nature', 'wellness', 'mountains'],
    bestMonths: [9, 10, 11, 0, 1, 2, 3, 4],
    avoidMonths: [],
    seasonalWarning: { months: [6, 7, 8], message: 'Heavy monsoon rains — leeches on trails, slippery roads. But waterfalls are spectacular. Pack rain gear.' },
    distanceFrom: {
      'Bangalore': { km: 260, train: null, flight: null, road: '5-6h' },
      'Mysore': { km: 120, train: null, flight: null, road: '3h' },
      'Kochi': { km: 280, train: null, flight: null, road: '5h' },
    },
    costPerPerson: { budget: 7000, midrange: 15000, premium: 35000 },
    minDays: 2,
    highlights: ['Abbey Falls', "Raja's Seat", 'Coffee Plantation Walk', 'Dubare Elephant Camp', 'Namdroling Monastery'],
    itineraries: {
      3: [
        { day: 1, title: 'Arrival & Plantation Walk', activities: ['Drive from Bangalore', 'Check into homestay', 'Coffee estate guided tour', 'Home-cooked Coorgi dinner (pandi curry!)'] },
        { day: 2, title: 'Waterfalls & Elephants', activities: ['Abbey Falls trek (45 min)', 'Dubare Elephant Camp (river crossing with elephants!)', "Raja's Seat sunset", 'Local Coorgi rice beer experience'] },
        { day: 3, title: 'Golden Temple & Departure', activities: ['Namdroling Golden Temple (Tibetan Buddhist)', 'Bylakuppe Tibetan settlement', 'Shopping (Coorg coffee, cardamom, wine)', 'Return to Bangalore'] },
      ],
    },
    packingTips: ['Rain jacket', 'Trekking shoes', 'Mosquito repellent', 'Light layers (cooler evenings)', 'Camera for wildlife'],
  },
  {
    id: 'rishikesh',
    name: 'Rishikesh',
    state: 'Uttarakhand',
    tagline: 'Adventure & Spirituality on the Ganga',
    emoji: '🎯',
    types: ['adventure', 'wellness'],
    bestMonths: [8, 9, 10, 2, 3, 4],
    avoidMonths: [],
    seasonalWarning: { months: [5, 6, 7], message: 'River rafting banned June–September due to monsoon flooding. Avoid for adventure activities.' },
    distanceFrom: {
      'Delhi': { km: 240, train: '5-6h (to Haridwar + cab)', flight: null, road: '5-6h' },
      'Dehradun': { km: 42, train: null, flight: null, road: '1h' },
      'Chandigarh': { km: 270, train: null, flight: null, road: '5h' },
    },
    costPerPerson: { budget: 5000, midrange: 12000, premium: 28000 },
    minDays: 2,
    highlights: ['River Rafting (Grade 3-5)', 'Bungee Jumping (83m)', 'Laxman Jhula', 'Ganga Aarti at Triveni Ghat', 'Beatles Ashram'],
    itineraries: {
      3: [
        { day: 1, title: 'Arrival & River Adventure', activities: ['Arrive Rishikesh', 'White water rafting (16km stretch)', 'Check into riverside camp', 'Sunset Ganga Aarti at Triveni Ghat'] },
        { day: 2, title: 'Extreme Sports Day', activities: ["India's highest bungee jump (83m)", 'Giant swing & zip-line', 'Cafe hopping in Laxman Jhula area', 'Beatles Ashram visit'] },
        { day: 3, title: 'Yoga & Nature', activities: ['Sunrise yoga session (many free classes)', 'Neer Garh Waterfall trek', 'Ayurvedic massage', 'Return journey'] },
      ],
    },
    packingTips: ['Quick-dry clothes', 'Waterproof sandals', 'Sunscreen', 'Light jacket (evenings cold)', 'Swimwear for rafting'],
  },
  {
    id: 'udaipur',
    name: 'Udaipur',
    state: 'Rajasthan',
    tagline: 'City of Lakes & Palaces',
    emoji: '🏛️',
    types: ['heritage', 'culture', 'food'],
    bestMonths: [9, 10, 11, 0, 1, 2],
    avoidMonths: [],
    seasonalWarning: { months: [4, 5, 6], message: 'Extreme heat 42–46°C. Avoid outdoor sightseeing midday. Stay hydrated.' },
    distanceFrom: {
      'Jaipur': { km: 395, train: '6h', flight: '1h', road: '5-6h' },
      'Ahmedabad': { km: 250, train: '5h', flight: null, road: '4h' },
      'Mumbai': { km: 740, train: '12h', flight: '1.5h', road: '12h' },
      'Delhi': { km: 650, train: '12h', flight: '1.5h', road: '11h' },
    },
    costPerPerson: { budget: 7000, midrange: 18000, premium: 55000 },
    minDays: 2,
    highlights: ['City Palace', 'Lake Pichola boat ride', 'Jag Mandir island', 'Saheliyon ki Bari', 'Vintage Car Museum'],
    itineraries: {
      3: [
        { day: 1, title: 'Lakes & Palaces', activities: ['City Palace Museum', 'Jagdish Temple', 'Lake Pichola sunset boat ride', 'Rooftop dinner with lake & palace view'] },
        { day: 2, title: 'Heritage Immersion', activities: ['Saheliyon ki Bari gardens', 'Bagore ki Haveli folk show (evening)', 'Vintage Car Museum', 'Fateh Sagar Lake'] },
        { day: 3, title: 'Local Markets & Departure', activities: ['Hathi Pol market (block prints, jewelry)', 'Mewar school of painting workshop', 'Dal Baati Churma breakfast', 'Departure'] },
      ],
    },
    packingTips: ['Breathable cotton clothes', 'Sunscreen & wide-brim hat', 'Comfortable walking shoes', 'Scarf/dupatta (temples)', 'Cash for markets'],
  },
  {
    id: 'andaman',
    name: 'Andaman Islands',
    state: 'Andaman & Nicobar Islands',
    tagline: 'Where the Ocean Glows Blue',
    emoji: '🐚',
    types: ['beaches', 'adventure'],
    bestMonths: [10, 11, 0, 1, 2, 3, 4],
    avoidMonths: [4, 5, 6, 7, 8, 9],
    seasonalWarning: { months: [5, 6, 7, 8, 9], message: 'Cyclone season & rough seas — ferries may be suspended. Most resorts closed. Avoid travel.' },
    distanceFrom: {
      'Chennai': { km: 1370, train: null, flight: '2h', road: null },
      'Kolkata': { km: 1300, train: null, flight: '2.5h', road: null },
      'Bangalore': { km: 1800, train: null, flight: '2.5h (via Chennai)', road: null },
      'Mumbai': { km: 2300, train: null, flight: '3h (via Chennai)', road: null },
    },
    costPerPerson: { budget: 18000, midrange: 35000, premium: 80000 },
    minDays: 4,
    highlights: ['Radhanagar Beach (Asia Top 10)', 'Cellular Jail & Sound show', 'Scuba Diving', 'Glass-bottom boat', 'Neil Island bioluminescence'],
    itineraries: {
      4: [
        { day: 1, title: 'Port Blair Arrival', activities: ['Fly into Port Blair', 'Cellular Jail tour', 'Light & Sound show (evening)', 'Settle into hotel', 'Corbyn\'s Cove Beach'] },
        { day: 2, title: 'Havelock Island', activities: ['Morning ferry to Havelock (Swaraj Dweep)', 'Radhanagar Beach (sunset is magical)', 'Snorkeling at Elephant Beach', 'Night at Havelock resort'] },
        { day: 3, title: 'Scuba & Kayaking', activities: ['PADI certified dive (Nemo Reef, Minerva Ledge)', 'Glass-bottom boat cruise', 'Kayaking through mangroves', 'Beach bonfire (some resorts)'] },
        { day: 4, title: 'Neil Island & Return', activities: ['Morning ferry to Neil Island (Shaheed Dweep)', 'Natural Bridge rock formation', 'Bharatpur Beach snorkeling', 'Return ferry & flight home'] },
      ],
    },
    packingTips: ['Rash guard (UV protection)', 'Underwater camera/GoPro', 'Reef-safe sunscreen only', 'Light clothing', '⚠️ Book inter-island ferries MONTHS in advance!'],
  },
  {
    id: 'ladakh',
    name: 'Ladakh',
    state: 'Ladakh (UT)',
    tagline: 'Land of High Passes & Ancient Monasteries',
    emoji: '⛰️',
    types: ['mountains', 'adventure', 'culture'],
    bestMonths: [5, 6, 7, 8, 9],
    avoidMonths: [],
    seasonalWarning: { months: [10, 11, 0, 1, 2, 3, 4], message: 'Manali-Leh & Srinagar-Leh roads closed. Only accessible by flight. Temperature −20°C to −30°C. Roads reopen typically in May.' },
    distanceFrom: {
      'Delhi': { km: 1000, train: null, flight: '1.5h', road: '2-day drive (Manali-Leh Highway)' },
      'Chandigarh': { km: 890, train: null, flight: null, road: '2-day drive' },
    },
    costPerPerson: { budget: 20000, midrange: 38000, premium: 85000 },
    minDays: 5,
    highlights: ['Pangong Tso Lake', 'Nubra Valley camel safari', 'Khardung La (world\'s highest motorable road)', 'Thiksey Monastery', 'Magnetic Hill'],
    itineraries: {
      5: [
        { day: 1, title: 'Arrival & Acclimatize', activities: ['Fly to Leh (3,500m altitude)', 'REST — do not exert yourself! (altitude sickness risk)', 'Shanti Stupa for easy sunset walk', 'Light dinner, early bed'] },
        { day: 2, title: 'Leh Monasteries Circuit', activities: ['Thiksey Monastery (resembles Potala Palace, Lhasa)', 'Hemis Monastery (largest in Ladakh)', 'Shey Palace ruins', 'Leh Palace & Leh market evening'] },
        { day: 3, title: 'Nubra Valley', activities: ['Drive over Khardung La (5,359m)', 'Nubra Valley cold desert', 'Double-hump Bactrian camel safari at Hunder', 'Camp night at Nubra'] },
        { day: 4, title: 'Pangong Lake', activities: ['Drive to Pangong Tso via Chang La (5,360m)', 'Arrive at the iconic blue lake (full day)', 'Photography golden hour', 'Camp night by the lake'] },
        { day: 5, title: 'Return & Departure', activities: ['Pangong sunrise photography', 'Drive back to Leh (4h)', 'Souvenir shopping (pashmina, turquoise)', 'Flight home'] },
      ],
    },
    packingTips: ['Altitude sickness pills (Diamox — start 2 days before)', 'Windproof down jacket', 'SPF 100 sunblock (high UV at altitude)', 'UV400 sunglasses', 'Power bank (cold drains batteries)', '⚠️ Limited ATMs in Leh — carry enough cash'],
  },
  {
    id: 'ooty',
    name: 'Ooty (Udhagamandalam)',
    state: 'Tamil Nadu',
    tagline: 'Queen of Hill Stations',
    emoji: '🌄',
    types: ['nature', 'wellness', 'mountains'],
    bestMonths: [2, 3, 4, 5, 9, 10, 11],
    avoidMonths: [],
    seasonalWarning: { months: [6, 7], message: 'Heavy Southwest monsoon — landslides possible on ghat roads. Check road status.' },
    distanceFrom: {
      'Bangalore': { km: 275, train: '7h (Nilgiri Mountain Railway from Mettupalayam)', flight: null, road: '5h' },
      'Chennai': { km: 540, train: '8h (Mettupalayam + NMR)', flight: null, road: '8h' },
      'Coimbatore': { km: 85, train: '3h (Nilgiri Mountain Railway)', flight: null, road: '2.5h' },
      'Kochi': { km: 280, train: null, flight: null, road: '5h' },
    },
    costPerPerson: { budget: 6000, midrange: 14000, premium: 30000 },
    minDays: 2,
    highlights: ['Nilgiri Mountain Railway (UNESCO)', 'Botanical Gardens', 'Doddabetta Peak', 'Mudumalai Tiger Reserve', 'Tea & chocolate factories'],
    itineraries: {
      3: [
        { day: 1, title: 'Toy Train & Gardens', activities: ['Nilgiri Mountain Railway ride from Mettupalayam (heritage UNESCO)', 'Government Botanical Gardens', 'Ooty Lake boating', 'Charing Cross market — homemade chocolate!'] },
        { day: 2, title: 'Peaks & Wildlife', activities: ["Doddabetta Peak (Nilgiris' highest, 2,637m)", 'Tea factory tour & tasting', 'Mudumalai National Park safari (evening)', 'Village homestay dinner'] },
        { day: 3, title: 'Coonoor & Departure', activities: ['Sim\'s Park Coonoor', 'Lamb\'s Rock viewpoint', 'Dolphin\'s Nose viewpoint', 'Return journey'] },
      ],
    },
    packingTips: ['Warm jacket (18°C–25°C, colder at night)', 'Comfortable walking shoes', 'Camera (foggy mornings are ethereal)', 'Book Toy Train tickets well in advance!'],
  },
  {
    id: 'hampi',
    name: 'Hampi',
    state: 'Karnataka',
    tagline: 'Ruins of the Vijayanagara Empire',
    emoji: '🏛️',
    types: ['heritage', 'culture', 'adventure'],
    bestMonths: [9, 10, 11, 0, 1, 2],
    avoidMonths: [],
    seasonalWarning: { months: [4, 5, 6], message: 'Extremely hot (38-42°C). Avoid midday outdoor exploration.' },
    distanceFrom: {
      'Bangalore': { km: 350, train: '8h (overnight train recommended)', flight: null, road: '6h' },
      'Goa': { km: 340, train: '5h (via Hospet)', flight: null, road: '6h' },
      'Hyderabad': { km: 380, train: '8h', flight: null, road: '6h' },
    },
    costPerPerson: { budget: 5000, midrange: 12000, premium: 22000 },
    minDays: 2,
    highlights: ['Virupaksha Temple (working 7th century temple!)', 'Hampi Bazaar ruins', 'Stone Chariot at Vittala Temple', 'Boulder bouldering', 'Coracle ride on Tungabhadra'],
    itineraries: {
      3: [
        { day: 1, title: 'Arrival & Ruins Exploration', activities: ['Arrive Hospet/Hampi', 'Hampi Bazaar & Virupaksha Temple', 'Hemakuta Hill sunset (360° boulder view)', 'Hippie Island (Virupapura Gadde) evening'] },
        { day: 2, title: 'Royal Enclosure & Vittala', activities: ['Vittala Temple complex (stone chariot!)', 'Royal Enclosure ruins', 'Elephant Stables', 'Coracle boat ride on Tungabhadra'] },
        { day: 3, title: 'Bouldering & Departure', activities: ['Sunrise from Matanga Hill (30min climb)', 'Rock bouldering or cycling through ruins', 'Anegundi village (Kishkinda from Ramayana)', 'Departure'] },
      ],
    },
    packingTips: ['Breathable cotton (it\'s HOT)', 'Hat & sunscreen', 'Comfortable walking shoes (uneven boulders)', 'Camera', 'Respect dress code at temples'],
  },
  {
    id: 'jaisalmer',
    name: 'Jaisalmer',
    state: 'Rajasthan',
    tagline: 'The Golden City of the Desert',
    emoji: '🐪',
    types: ['heritage', 'adventure', 'culture'],
    bestMonths: [9, 10, 11, 0, 1, 2],
    avoidMonths: [],
    seasonalWarning: { months: [4, 5, 6, 7], message: 'Temperature 45-50°C in summer. Virtually unbearable for outdoor activities. Monsoon brings rare but heavy rains.' },
    distanceFrom: {
      'Jaipur': { km: 570, train: '10h', flight: '1h', road: '8h' },
      'Jodhpur': { km: 295, train: '5h', flight: null, road: '4.5h' },
      'Delhi': { km: 780, train: '12h (overnight)', flight: '1.5h', road: '12h' },
    },
    costPerPerson: { budget: 7000, midrange: 18000, premium: 40000 },
    minDays: 2,
    highlights: ['Sam Sand Dunes (camel safari & camp)', 'Jaisalmer Fort (living fort!)', 'Patwon ki Haveli', 'Desert Festival (Feb)', 'Kuldhara abandoned village'],
    itineraries: {
      3: [
        { day: 1, title: 'Arrival & Golden Fort', activities: ['Arrive Jaisalmer', 'Jaisalmer Fort walk (living fort with 3000 residents)', 'Patwon ki Haveli & Nathmal ki Haveli', 'Sunset at Vyas Chatri viewpoint'] },
        { day: 2, title: 'Desert Camp Overnight', activities: ['Kuldhara abandoned village (ghost town!)', 'Drive to Sam Sand Dunes', 'Camel safari at sunset', 'Overnight desert camp with folk music & stars'] },
        { day: 3, title: 'Desert Dawn & Departure', activities: ['Sunrise over dunes (4:30am — worth it!)', 'Jeep safari in Thar Desert', 'Bada Bagh cenotaphs', 'Departure'] },
      ],
    },
    packingTips: ['Lightweight loose clothes (cotton)', 'Shawl/scarf for cold desert nights (drops 20°C)', 'Sunblock & lip balm', 'Closed shoes (hot sand)', 'Cash (limited ATMs)'],
  },
];

// ─── Vacation types definition ────────────────────────────────────────────────

export const VACATION_TYPES = [
  { id: 'beaches', label: 'Beaches & Coastal', emoji: '🏖️', color: '#0ea5e9', description: 'Sun, sand, waves & water sports' },
  { id: 'mountains', label: 'Mountains & Trekking', emoji: '🏔️', color: '#10b981', description: 'Peaks, snow, trails & fresh air' },
  { id: 'heritage', label: 'Heritage & Sightseeing', emoji: '🏛️', color: '#f59e0b', description: 'History, forts, temples & architecture' },
  { id: 'nature', label: 'Nature & Wildlife', emoji: '🌿', color: '#22c55e', description: 'Forests, safaris & eco-retreats' },
  { id: 'culture', label: 'Culture & Festivals', emoji: '🎭', color: '#ec4899', description: 'Art, traditions, festivals & local life' },
  { id: 'wellness', label: 'Wellness & Retreat', emoji: '🧘', color: '#8b5cf6', description: 'Yoga, spa, meditation & healing' },
  { id: 'adventure', label: 'Adventure & Sports', emoji: '🎯', color: '#ef4444', description: 'Rafting, bungee, climbing & thrills' },
  { id: 'food', label: 'Food & City Exploration', emoji: '🍜', color: '#f97316', description: 'Local cuisine, markets & urban vibes' },
];

// ─── Get AI-suggested vacation types based on context ────────────────────────

export function getSuggestedTypes(month, totalDays, userCity) {
  const suggestions = [];

  // Season-based logic (0=Jan, 11=Dec)
  const isSummer = month >= 3 && month <= 6;
  const isWinter = month === 11 || month <= 2;
  const isMonsoon = month >= 5 && month <= 8;
  const isPostMonsoon = month >= 8 && month <= 10;

  if (isSummer) {
    suggestions.push({ id: 'mountains', reason: 'Perfect escape from summer heat!', priority: 1 });
    suggestions.push({ id: 'wellness', reason: 'Hill station wellness retreats are ideal in summer', priority: 2 });
  }
  if (isWinter) {
    suggestions.push({ id: 'beaches', reason: 'Peak beach season — perfect weather!', priority: 1 });
    suggestions.push({ id: 'heritage', reason: 'Pleasant weather for outdoor heritage sites', priority: 2 });
    suggestions.push({ id: 'adventure', reason: 'Cool weather perfect for outdoor activities', priority: 2 });
  }
  if (isMonsoon) {
    suggestions.push({ id: 'nature', reason: 'Waterfalls & forests at their lush best!', priority: 1 });
    suggestions.push({ id: 'wellness', reason: 'Ayurvedic retreats shine in monsoon season', priority: 1 });
  }
  if (isPostMonsoon) {
    suggestions.push({ id: 'mountains', reason: 'Clear skies, washed hills & fresh air', priority: 1 });
    suggestions.push({ id: 'adventure', reason: 'Post-monsoon is prime adventure season', priority: 1 });
  }

  // Duration-based
  if (totalDays >= 5) {
    suggestions.push({ id: 'heritage', reason: 'Longer trip lets you explore history deeply', priority: 3 });
  }
  if (totalDays <= 3) {
    suggestions.push({ id: 'food', reason: 'Short trip? A city food tour is perfect!', priority: 2 });
    suggestions.push({ id: 'culture', reason: 'Dive into local culture in a quick getaway', priority: 2 });
  }

  // Always suggest culture & food
  suggestions.push({ id: 'culture', reason: 'Every season is right for cultural discovery', priority: 4 });
  suggestions.push({ id: 'food', reason: 'Local cuisine is always worth exploring', priority: 4 });

  // Deduplicate — keep highest priority (lowest number)
  const seen = {};
  return suggestions
    .sort((a, b) => a.priority - b.priority)
    .filter(s => {
      if (seen[s.id]) return false;
      seen[s.id] = true;
      return true;
    });
}

// ─── Get filtered destinations ────────────────────────────────────────────────

export function getDestinations(vacationType, month, totalDays, userCity, budget) {
  return DESTINATIONS
    .filter(d => {
      if (!d.types.includes(vacationType)) return false;
      if (d.minDays > totalDays) return false;
      return true;
    })
    .map(d => {
      let score = 0;
      // Season score
      if (d.bestMonths.includes(month)) score += 30;
      if (d.avoidMonths.includes(month)) score -= 20;
      // Budget score
      const cost = d.costPerPerson[budget] || d.costPerPerson.midrange;
      if (cost < 15000) score += budget === 'budget' ? 20 : 5;
      if (cost > 30000) score += budget === 'premium' ? 20 : 0;
      // City proximity
      const dist = d.distanceFrom[userCity];
      if (dist) {
        if (dist.km < 400) score += 20;
        else if (dist.km < 700) score += 10;
      }
      return { ...d, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 4);
}
