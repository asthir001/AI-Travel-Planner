// ─── Type styles for timeline items ──────────────────────────────────────────
// types: travel, activity, food, rest, checkin, checkout, prep

export const TYPE_STYLES = {
  travel:   { dot: 'border-amber-400 bg-amber-400/30',   title: 'text-amber-300',  line: 'bg-amber-400/20' },
  activity: { dot: 'border-teal-400 bg-teal-400/30',     title: 'text-teal-300',   line: 'bg-teal-400/20' },
  food:     { dot: 'border-orange-400 bg-orange-400/30', title: 'text-orange-300', line: 'bg-orange-400/20' },
  rest:     { dot: 'border-purple-400 bg-purple-400/30', title: 'text-purple-300', line: 'bg-purple-400/20' },
  checkin:  { dot: 'border-blue-400 bg-blue-400/30',     title: 'text-blue-300',   line: 'bg-blue-400/20' },
  checkout: { dot: 'border-slate-400 bg-slate-400/30',   title: 'text-slate-300',  line: 'bg-slate-400/20' },
  prep:     { dot: 'border-yellow-400 bg-yellow-400/30', title: 'text-yellow-300', line: 'bg-yellow-400/20' },
};

// ─── Detailed Itineraries ─────────────────────────────────────────────────────

export const DETAILED_ITINERARIES = {

  // ── GOA ──────────────────────────────────────────────────────────────────
  'goa': {
    4: {
      fromCity: 'Mumbai',
      transport: 'train',
      destinationDays: 2.5,
      nights: 3,
      totalActivities: 16,
      summary: '4 days · 3 nights · Train from Mumbai · Beaches, heritage & waterfalls',
      days: [
        {
          dayNum: 1, title: 'Mumbai → Goa', subtitle: 'Travel Day (9h train)', isTravel: true,
          overnight: 'Beach Resort, North Goa',
          timeline: [
            { time: '06:30', type: 'prep',     emoji: '⏰', title: 'Wake up & final packing', detail: 'Pack sunscreen, swimwear, light cotton clothes. Carry ID proof & printed/e-tickets. Grab packed breakfast — pantry car snacks are basic.' },
            { time: '07:20', type: 'travel',   emoji: '🚂', title: 'Board Mandovi Express at CSMT', detail: 'Platform varies — check the departure board 30 min early. The Konkan Railway route is one of India\'s most scenic. Grab a window seat. Tea & coffee available onboard.' },
            { time: '09:00', type: 'activity', emoji: '🌄', title: 'Konkan Railway scenic stretch begins', detail: 'From Roha onwards the route winds through 92 tunnels, bridges over rain-fed rivers and lush Sahyadri forests. Have your phone camera ready — waterfalls stream right past the windows during monsoon.' },
            { time: '13:00', type: 'food',     emoji: '🍱', title: 'Lunch onboard or at Ratnagiri station stop', detail: 'Pantry car serves veg thali (₹150). At the Ratnagiri halt, vendors sell legendary Alphonso mango ice cream (seasonal, May–Jun). Buy 2.' },
            { time: '16:00', type: 'travel',   emoji: '📍', title: 'Arrive Karmali / Madgaon Station, Goa', detail: '~9 hour journey. Pre-book Ola/Uber from the app or take the official prepaid cab counter (₹700–900 to North Goa). Do NOT take random touts — they overcharge.' },
            { time: '17:30', type: 'checkin',  emoji: '🏨', title: 'Check in to beach resort', detail: 'Drop bags, take a quick shower. Then step outside — smell that salt air. Head to the resort bar for your first cold King\'s Beer or Sula wine. You\'ve arrived.' },
            { time: '19:00', type: 'activity', emoji: '🏰', title: 'Sunset at Fort Aguada', detail: '17th-century Portuguese bastion with sweeping views of the Arabian Sea. The 13m lighthouse glows at golden hour. Free entry, 15 min by scooter/cab from most North Goa resorts. Don\'t miss the cannon line.' },
            { time: '20:30', type: 'food',     emoji: '🦐', title: 'Dinner at a beachside shack', detail: 'Britto\'s (Baga) or Fiesta (Calangute) are classics. Must order: Kingfish curry rice (₹350), prawn balchão (₹400), sol kadhi to digest. Bebinca for dessert. Budget: ₹800–1,200 for two.' },
            { time: '22:30', type: 'rest',     emoji: '🌙', title: 'Rest — long travel day!', detail: 'Sleep early. Open the window and let the sound of waves be your lullaby. Big days ahead.' },
          ],
        },
        {
          dayNum: 2, title: 'Beaches, Water Sports & UNESCO Heritage', subtitle: 'Full Day at Goa', isTravel: false,
          overnight: 'Beach Resort, North Goa',
          timeline: [
            { time: '07:30', type: 'food',     emoji: '☕', title: 'Breakfast at Infantaria Café', detail: 'Calangute\'s most famous café. Try the French toast, croissants and strong filter coffee. Usually a queue by 9am so go early. Budget: ₹200/person.' },
            { time: '09:00', type: 'activity', emoji: '🏖️', title: 'Baga Beach morning swim', detail: 'Best time to swim — calm waves, clearer water, fewer crowds before the beach shacks fill up. The lifeguards are on duty from 8am. Swim only between the flags.' },
            { time: '10:30', type: 'activity', emoji: '🪂', title: 'Water sports at Calangute', detail: 'Parasailing (₹800), banana boat (₹400), jet ski (₹800 for 15 min). Bargain a combo package — you can easily get all three for ₹1,800. Always wear the life jackets; they are non-negotiable.' },
            { time: '13:00', type: 'food',     emoji: '🍛', title: 'Seafood lunch at a beach shack', detail: 'Try the fresh catch of the day board — usually pomfret or kingfish. A good shack lunch for two: ₹600–900. Wash it down with a chilled Kingfisher draught.' },
            { time: '15:00', type: 'activity', emoji: '⛪', title: 'Old Goa UNESCO World Heritage Churches', detail: 'Basilica of Bom Jesus (St. Francis Xavier\'s remains — relics exposed every 10 years), Se Cathedral (largest church in Asia). Dress modestly — no shorts or sleeveless. Free entry. Allow 1.5–2 hours total.' },
            { time: '17:00', type: 'activity', emoji: '🎨', title: 'Fontainhas Latin Quarter walk', detail: 'Goa\'s only surviving Portuguese neighbourhood — pastel-coloured tiled houses, narrow lanes. Look for the Chapel of St. Sebastian. Best light for photography is 5–6pm. Great for street food too.' },
            { time: '18:30', type: 'activity', emoji: '🍹', title: 'Sundowner cocktail at Anjuna Cliff Bar', detail: 'Curlies or Shore Bar (Anjuna Beach) — sit on the cliff edge with a feni cocktail as the sun dips into the sea. The view is worth the overpriced drinks. This is the Goa postcard moment.' },
            { time: '20:00', type: 'food',     emoji: '🦑', title: 'Dinner at Viva Panjim', detail: 'Book in advance (call ahead, no online reservations). Classic Goan restaurant inside a 100-year-old house. Best calamari recheado and xacuti chicken in Goa. Ask for the house Goan wine. Budget: ₹1,200–1,800 for two.' },
            { time: '22:00', type: 'activity', emoji: '🎰', title: 'Optional: Deltin Royale Floating Casino', detail: 'Entry ₹2,500 (includes ₹1,500 chips + unlimited food & drinks). Live music, gaming tables, live entertainment. Dress smart — smart casuals required. Departs from Panjim jetty.' },
          ],
        },
        {
          dayNum: 3, title: 'Dudhsagar Falls & South Goa', subtitle: 'Adventure + Nature Day', isTravel: false,
          overnight: 'South Goa Beach Resort / Camp',
          timeline: [
            { time: '05:30', type: 'prep',     emoji: '⏰', title: 'Early rise — Dudhsagar day!', detail: 'Quick breakfast or carry snacks. Jeep safaris start early. Wear clothes you don\'t mind getting muddy and wet. Carry only a small backpack.' },
            { time: '06:00', type: 'travel',   emoji: '🚙', title: 'Jeep safari departs for Dudhsagar', detail: 'Book with "Dudhsagar Falls Jeep Safari" operators (₹1,200/person, includes forest entry). 90-min rough jeep ride through the Western Ghats forest. Hold the side rail — it\'s bumpy!' },
            { time: '08:30', type: 'activity', emoji: '💧', title: 'Arrive Dudhsagar Falls — swim in the natural pool', detail: '"Sea of Milk" — one of India\'s tallest waterfalls at 310 metres across 4 tiers. The natural plunge pool is crystal clear and cold. Swimming allowed. The roar of the falls is deafening up close. Truly spectacular.' },
            { time: '10:00', type: 'activity', emoji: '🐒', title: 'Forest trek & wildlife spotting', detail: 'The area is inside Bhagwan Mahavir Wildlife Sanctuary. Look for Malabar giant squirrels in the canopy, troops of macaques near the path, and if you\'re very lucky — paw prints of leopards on the trail.' },
            { time: '11:30', type: 'travel',   emoji: '🌿', title: 'Return jeep with Spice Plantation stop', detail: 'Most operators stop at a nearby spice plantation. Walk through vanilla, cardamom, pepper and nutmeg. The guide will crack open nutmeg and let you smell fresh spices. Free samples of feni and kokum juice!' },
            { time: '13:00', type: 'food',     emoji: '🍃', title: 'Authentic Goan thali at spice plantation', detail: 'Sit in the plantation\'s open-air dining area. A traditional Goan thali includes 3-4 curries, rice, chapati and fresh coconut. Usually included in the jeep safari package or ₹250 extra. Worth every rupee.' },
            { time: '15:30', type: 'travel',   emoji: '🚗', title: 'Drive to Palolem Beach, South Goa', detail: 'South Goa is calmer, cleaner, and more scenic than the north. Palolem is a protected crescent beach — no motorised water sports, no loud music. Check into a South Goa resort or beach hut.' },
            { time: '17:30', type: 'activity', emoji: '🚣', title: 'Kayaking in Palolem backwaters', detail: 'Rent kayaks at the beach (₹600/hour) and paddle into the Chauri River mangroves. Keep your eyes open for kingfishers, herons and occasionally mugger crocodiles in the shallower channels.' },
            { time: '20:00', type: 'food',     emoji: '🔥', title: 'Bonfire dinner at beach shack', detail: 'Many Palolem shacks light bonfires after sunset. Order grilled whole fish, calamari and a cold beer. Sit with toes in the sand under a canopy of stars. This is South Goa at its best.' },
          ],
        },
        {
          dayNum: 4, title: 'Last Beach Morning → Mumbai', subtitle: 'Departure Day', isTravel: true,
          overnight: null,
          timeline: [
            { time: '06:30', type: 'activity', emoji: '🌅', title: 'Sunrise walk on the beach — alone', detail: 'Set an alarm. A Goa beach at dawn before the crowds is magical — just you, the sea, and total silence. Take it slow. This is the moment you\'ll describe to people back home.' },
            { time: '08:00', type: 'food',     emoji: '🥐', title: 'Breakfast at Infantaria or German Bakery (Anjuna)', detail: 'Last Goa breakfast! German Bakery in Anjuna has the best granola and banana pancakes. Or return to Infantaria for the famous croissants. Budget: ₹200/person.' },
            { time: '09:30', type: 'activity', emoji: '🛍️', title: 'Souvenir shopping at Anjuna or Calangute market', detail: 'Best buys: genuine Goan cashew feni (₹180/bottle), Goan spiced sausage (chorizo, vacuum packed), hand-stamped block print fabric, silver jhumkas from Tibetan vendors. Bargain hard — start at 40% of asking price.' },
            { time: '11:30', type: 'activity', emoji: '🏊', title: 'Final dip in the sea', detail: 'One last swim. Photograph your feet in the sand. Goa has a gravitational pull. You\'ll already be planning the next trip during this swim.' },
            { time: '13:00', type: 'food',     emoji: '🍴', title: 'Quick lunch + head to Madgaon Station', detail: 'Light lunch near the station area. Pre-book a cab 30 min before departure. Check your return train time — most Mumbai trains depart 3–4pm from Madgaon.' },
            { time: '15:30', type: 'travel',   emoji: '🚂', title: 'Board return train to Mumbai', detail: 'Settle in your seat. You\'ll be back by midnight. Already browsing tickets for next month\'s Goa trip? That\'s normal.' },
            { time: '23:30', type: 'travel',   emoji: '🏠', title: 'Arrive CSMT, Mumbai', detail: 'Home. The tan is real. The memories are realer. You\'ve earned the Goa glow.' },
          ],
        },
      ],
    },
  },

  // ── MANALI ───────────────────────────────────────────────────────────────
  'manali': {
    4: {
      fromCity: 'Delhi',
      transport: 'road',
      destinationDays: 2,
      nights: 3,
      totalActivities: 14,
      summary: '4 days · 3 nights · Overnight Volvo from Delhi · Passes, snow & adventure',
      days: [
        {
          dayNum: 1, title: 'Delhi → Manali', subtitle: 'Overnight Volvo Bus (12–14h)', isTravel: true,
          overnight: 'Volvo Bus (en route)',
          timeline: [
            { time: '15:00', type: 'prep',   emoji: '🎒', title: 'Arrive at ISBT Kashmere Gate', detail: 'Book your Volvo AC bus in advance from HRTC or operators like RedBus. Semi-sleeper Volvo is the best option (~₹700–1,000). Carry warm jacket, neck pillow and snacks for the journey.' },
            { time: '17:30', type: 'travel', emoji: '🚌', title: 'Depart Delhi — Volvo to Manali', detail: 'The bus exits Delhi via NH44. First 2 hours pass through Panipat, Karnal and Ambala — relatively flat. Keep your phone charged; landscapes get dramatic after Chandigarh.' },
            { time: '20:00', type: 'food',   emoji: '🍜', title: 'Dinner halt at a dhaba — usually Murthal or Chandigarh', detail: 'Buses typically halt 30–45 min for dinner. Murthal\'s roadside dhabas are legendary for butter naan and dal makhani. This is where truck drivers and Manali-goers unite over hot food.' },
            { time: '22:00', type: 'travel', emoji: '⛰️', title: 'Enter Himachal Pradesh — mountains begin', detail: 'Past Bilaspur the road starts climbing. The bus sways gently. Pop a Avomine (travel sickness tablet) if prone. Sleep now — you\'ll want energy tomorrow.' },
            { time: '07:00', type: 'travel', emoji: '🌤️', title: 'Arrive Manali next morning', detail: 'Bus drops at the main bus stand. Altitude is 2,050m. Take a moment to breathe the pine-scented mountain air. Book a cab/auto to your hotel (₹100–200 within town).' },
          ],
        },
        {
          dayNum: 2, title: 'Acclimatize & Old Manali Exploration', subtitle: 'Take it Easy — Altitude Day', isTravel: false,
          overnight: 'Hotel, Old Manali or Mall Road',
          timeline: [
            { time: '07:00', type: 'checkin',  emoji: '🏨', title: 'Check in to hotel, freshen up', detail: 'Most hotels allow early check-in if you\'ve arrived by bus from Delhi. Altitude is 2,050m. Don\'t rush. Drink 3–4 litres of water today. Avoid alcohol on Day 1.' },
            { time: '08:30', type: 'food',     emoji: '☕', title: 'Breakfast at Café 1947, Old Manali', detail: 'Old Manali\'s most beloved café. Stacked pancakes, Tibetan butter tea and a wood-fire stove. Sit by the window watching the Beas River. Budget: ₹250/person.' },
            { time: '10:00', type: 'activity', emoji: '🛕', title: 'Hidimba Devi Temple', detail: 'Pagoda-style wooden temple set in a cedar forest — one of Manali\'s oldest. Dedicated to Hidimba, Bhima\'s wife from Mahabharata. The forest surrounding it is peaceful. Entry free; photography allowed.' },
            { time: '11:30', type: 'activity', emoji: '🚶', title: 'Old Manali village stroll', detail: 'Walk the narrow lanes, past apple orchards and local homes. Explore the Manu Temple (said to be where Manu survived the great flood). Very local, very real Himachal.' },
            { time: '13:00', type: 'food',     emoji: '🥟', title: 'Lunch at a Tibetan restaurant in Old Manali', detail: 'Momos (₹80), thukpa soup (₹120) and Tibetan bread. Dylan\'s Toasted & Roasted Café or Drifter\'s Inn are backpacker classics. The yak butter tea will either charm or horrify you.' },
            { time: '15:00', type: 'activity', emoji: '🏪', title: 'Mall Road shopping & exploration', detail: 'Browse woolens (pashmina stoles ₹400–800), local honey, kullu shawls and dried apricots. Mall Road has ATMs, pharmacies and gear shops if you need mountain supplies.' },
            { time: '17:30', type: 'activity', emoji: '🌊', title: 'Beas River bank sunset walk', detail: 'Walk down to the riverbank and listen to the glacial Beas rushing over boulders. The light on the snow peaks at dusk is extraordinary. Bring a jacket — temperature drops fast after 5pm.' },
            { time: '19:30', type: 'food',     emoji: '🍲', title: 'Dinner at Johnson\'s Café', detail: 'Manali\'s most recommended restaurant. Try the trout in lemon butter sauce (river-fresh) and Himachali dham thali. Cosy log-fire ambience. Book a table — it fills up fast. Budget: ₹500–800/person.' },
            { time: '21:30', type: 'rest',     emoji: '🌙', title: 'Early night — big adventure day tomorrow', detail: 'Sleep with the window cracked to hear the pines and river. Temperature will be 8–15°C even in summer. Keep your jacket by the bed.' },
          ],
        },
        {
          dayNum: 3, title: 'Solang Valley & Rohtang Pass', subtitle: 'The Iconic Mountain Day', isTravel: false,
          overnight: 'Hotel, Manali',
          timeline: [
            { time: '06:30', type: 'prep',     emoji: '⏰', title: 'Early start — permits and crowds wait for no one', detail: 'Rohtang Pass entry requires an online permit (₹550/vehicle) booked the day before at rohtangpermits.nic.in. Carry a printed copy. Only 1,200 vehicles allowed per day.' },
            { time: '07:00', type: 'food',     emoji: '🍳', title: 'Quick breakfast at hotel', detail: 'Early hotel breakfast or pack parathas from a roadside stall. You need fuel for a long day at altitude. Don\'t skip this.' },
            { time: '07:30', type: 'travel',   emoji: '🚙', title: 'Drive to Solang Valley (14km)', detail: 'Hire a local taxi/jeep — they know the road better than any app. Solang Valley is at 2,480m. The road passes apple orchards and offers views of Friendship Peak.' },
            { time: '08:30', type: 'activity', emoji: '🪂', title: 'Paragliding from Solang Valley', detail: 'One of the best paragliding sites in India. 15-min tandem flight with a licensed pilot (₹2,500). You\'ll soar over the pine forest with snow peaks around you. Book at the activity counters at the valley base.' },
            { time: '10:00', type: 'activity', emoji: '❄️', title: 'Snow activities at Solang (winter) OR Beas Kund trek base (summer)', detail: 'Winter (Oct–May): snowboarding, skiing, snow scooter rides. Summer (Jun–Sep): short trek towards Beas Kund, rope courses, zorbing. The valley itself is stunning regardless of season.' },
            { time: '12:30', type: 'travel',   emoji: '⛰️', title: 'Drive to Rohtang Pass (3,978m)', detail: '~1 hour from Solang. The road climbs sharply — 51 hairpin turns from Marhi. You may encounter yaks by the roadside. The pass offers a 360° view of the Lahaul-Spiti valley on one side and Kullu valley on the other.' },
            { time: '13:30', type: 'activity', emoji: '🏔️', title: 'Rohtang Pass — top of the world feeling', detail: 'The name means "Pile of Corpses" (from its deadly history) but today it\'s electric. Snow year-round, wild winds, and views that make your breath catch. Allow 45 min — then the altitude will start to bite.' },
            { time: '15:00', type: 'food',     emoji: '🍜', title: 'Hot Maggi noodles at Marhi dhaba', detail: 'On the way back, stop at Marhi (3,300m). The dhaba run by a local Himachali woman serves the best butter Maggi you\'ll ever eat — for ₹50. There is no better meal on this planet at this moment.' },
            { time: '18:00', type: 'travel',   emoji: '🚗', title: 'Return to Manali', detail: 'Downhill drive back. The Kullu valley lights up at dusk like a bowl of fireflies. Stop at the Vashisht hot spring village for a 20-min sulphur dip (₹20) — your muscles will thank you.' },
            { time: '20:00', type: 'food',     emoji: '🫕', title: 'Last Manali dinner', detail: 'Lazy Dog Lounge Bar (riverside) or Drifter\'s Inn rooftop. Order Himachali rajma-chawal or the mushroom pasta — anything feels gourmet after a day in the mountains.' },
          ],
        },
        {
          dayNum: 4, title: 'Manali → Delhi', subtitle: 'Departure Day', isTravel: true,
          overnight: null,
          timeline: [
            { time: '07:00', type: 'food',     emoji: '🥞', title: 'Last breakfast with mountain views', detail: 'One last slow breakfast at your hotel or Café 1947. Order the pancake stack. Watch the peaks catch the morning sun. Take a mental photograph.' },
            { time: '08:30', type: 'activity', emoji: '🌿', title: 'Vashisht village morning walk', detail: 'A short 15-min walk from town. Natural hot sulphur springs, colourful Himachali homes, old temples. Very local, no tourists. Buy local honey (₹200/500g) from the village women.' },
            { time: '10:00', type: 'activity', emoji: '🛍️', title: 'Tibetan market shopping', detail: 'Best buys: Kullu patterned woolen caps (₹150), pashmina stoles (bargain hard), hand-carved yak bone keychains (₹50), local rhododendron jam (₹120). The Tibetan market is more authentic than Mall Road shops.' },
            { time: '14:00', type: 'travel',   emoji: '🚌', title: 'Board return Volvo bus to Delhi', detail: 'Buses depart from main bus stand — check your operator\'s departure time. You\'ll arrive Delhi around 3–4am next morning. Carry warm layers; mountain cold lingers even inside the bus.' },
            { time: '05:00', type: 'travel',   emoji: '🏠', title: 'Arrive Delhi next morning', detail: 'ISBT Kashmere Gate. Still carrying the mountain in your lungs. The Manali effect: Delhi will feel impossibly loud for 2–3 days after this trip.' },
          ],
        },
      ],
    },
  },

  // ── COORG ─────────────────────────────────────────────────────────────────
  'coorg': {
    3: {
      fromCity: 'Bangalore',
      transport: 'road',
      destinationDays: 2,
      nights: 2,
      totalActivities: 12,
      summary: '3 days · 2 nights · Drive from Bangalore · Plantations, waterfalls & elephants',
      days: [
        {
          dayNum: 1, title: 'Bangalore → Coorg + Plantation Day', subtitle: 'Drive (5–6h) + Arrival Evening', isTravel: true,
          overnight: 'Coffee Estate Homestay, Madikeri area',
          timeline: [
            { time: '06:00', type: 'prep',     emoji: '🚗', title: 'Early start from Bangalore — beat the traffic', detail: 'Leave by 6am to avoid Bangalore\'s brutal morning traffic. Take the Mysore Road (NH275) route — smoother and more scenic than other options. Road trip playlist mandatory.' },
            { time: '07:30', type: 'food',     emoji: '🥞', title: 'Breakfast at a highway dhaba near Channapatna', detail: 'Channapatna is famous for wooden toys — but the highway dhabas have exceptional set dosas. Stop for 30 min, stretch your legs, get strong filter coffee (kaapi). Budget: ₹100/person.' },
            { time: '09:00', type: 'activity', emoji: '🎠', title: 'Drive through Mysore — brief visit (optional)', detail: 'If you have time, the 45-min detour to Mysore Palace is worth it — even just the exterior for photos. Or skip and head straight to Coorg to maximise time.' },
            { time: '11:30', type: 'travel',   emoji: '🌲', title: 'Enter the Kodagu district — ghats begin', detail: 'Past Hunsur, the flat Deccan plateau gives way to the Western Ghats. The road climbs through misty hairpin bends. Pull over at the Cauvery-Harangi reservoir viewpoint for a photo — it\'s stunning.' },
            { time: '12:30', type: 'checkin',  emoji: '🏡', title: 'Check in to coffee estate homestay', detail: 'Coorg is famous for homestays on working coffee plantations. Your host family will serve you fresh filter coffee made from beans grown on the property. You can smell the coffee processing from your room.' },
            { time: '14:00', type: 'food',     emoji: '🍛', title: 'Traditional Coorgi lunch with your host family', detail: 'Pandi curry (pork cooked in Coorgi vinegar), kachampuli rice, kadambuttu (rice dumplings) and akki roti. This is home-cooking — the best food you\'ll eat in Coorg. Note: Coorgi food is heavily non-vegetarian.' },
            { time: '15:30', type: 'activity', emoji: '☕', title: 'Guided coffee estate walk', detail: 'Your host takes you through the plantation: arabica vs robusta coffee plants, how berries are hand-picked (Oct–Feb), shade trees, pepper vines climbing coffee stalks. Fascinating 90-min walk. Free with homestay.' },
            { time: '17:30', type: 'activity', emoji: '👑', title: 'Raja\'s Seat sunset viewpoint', detail: '"King\'s Chair" — the outdoor throne where Coorg\'s kings watched sunset. Today it\'s a public garden with a brilliant west-facing view. Bring a jacket — it gets cold fast at 1,525m. Musical fountain show at 7pm (check timings).' },
            { time: '20:00', type: 'food',     emoji: '🍷', title: 'Dinner at homestay + local rice beer', detail: 'Most homestays serve dinner on request (tell them while checking in). Ask for Coorg rice beer (not always openly served — but most hosts offer it to guests who ask nicely). Sit by a wood fire if there is one.' },
          ],
        },
        {
          dayNum: 2, title: 'Abbey Falls + Elephants + Monastery', subtitle: 'Best Day in Coorg', isTravel: false,
          overnight: 'Coffee Estate Homestay',
          timeline: [
            { time: '07:00', type: 'food',     emoji: '☕', title: 'Wake up to freshly brewed estate coffee', detail: 'Your host will bring coffee to your room or call you to the veranda. This is the best cup of coffee you\'ll ever have — estate-fresh, prepared exactly the way Coorgis drink it: strong, black or with a drop of honey.' },
            { time: '08:00', type: 'activity', emoji: '🌫️', title: 'Early morning mist walk through the estate', detail: 'The plantation in early morning mist is ethereal. Walk among the coffee rows. Spot Malabar pied hornbills in the canopy. The dew on the coffee leaves catches the first light beautifully.' },
            { time: '09:30', type: 'travel',   emoji: '🚗', title: 'Drive to Abbey Falls (14km from Madikeri)', detail: '20-min drive. Park at the base and walk 10 min through a spice and coffee plantation to reach the falls. The path itself is beautiful.' },
            { time: '10:00', type: 'activity', emoji: '🌊', title: 'Abbey Falls trek and swimming', detail: '70-foot two-tiered waterfall crashing into a pool. The trail has a swinging bridge over a gorge — thrilling! Swimming is possible at the base during dry season. In monsoon the waterfall is massively powerful but no swimming.' },
            { time: '11:30', type: '  travel', emoji: '🚗', title: 'Drive to Dubare Elephant Camp (30km)', detail: '45 min drive through forest roads. Dubare is on the banks of the Cauvery River inside the Pushpagiri Wildlife Sanctuary. Best to reach by noon for the elephant interaction slot.' },
            { time: '12:30', type: 'activity', emoji: '🐘', title: 'Dubare Elephant Camp — cross the river with elephants!', detail: 'Forest Department runs supervised interaction: feed, bathe and walk with Karnataka Forest Department elephants. The river crossing where elephants wade across the Cauvery is iconic. Entry: ₹400, interaction slot: ₹200 extra. Book slots at the counter early.' },
            { time: '14:00', type: 'food',     emoji: '🍱', title: 'Packed lunch by the Cauvery River', detail: 'Ask your homestay to pack lunch. Or the small stalls outside Dubare sell Coorg-style rice packets and fried fish from the Cauvery. Eating by the river with the forest behind you is simply perfect.' },
            { time: '16:00', type: 'activity', emoji: '🕌', title: 'Namdroling Monastery — Golden Temple, Bylakuppe', detail: 'Drive 40 km to Bylakuppe — India\'s second largest Tibetan settlement. The Namdroling Monastery ("Golden Temple") has three 20m tall gold-painted Buddha statues. The interior murals are breathtaking. Entry free. Photography allowed in the courtyard.' },
            { time: '18:00', type: 'activity', emoji: '🛍️', title: 'Bylakuppe market & Tibetan food', detail: 'Browse the Tibetan market for thangka paintings (₹500–3,000), prayer flags, hand-knotted rugs and Buddhist amulets. Try thukpa and momos at the monastery canteen — remarkably authentic Tibetan food.' },
            { time: '20:30', type: 'food',     emoji: '🔥', title: 'Return to homestay — bonfire dinner', detail: 'Many homestays arrange a bonfire in the estate in the evenings. Your host might play a Coorg folk instrument. Drink local wine (Coorg has decent vineyards) and eat pandi curry under the stars.' },
          ],
        },
        {
          dayNum: 3, title: 'Iruppu Falls + Shopping → Bangalore', subtitle: 'Departure Day', isTravel: true,
          overnight: null,
          timeline: [
            { time: '07:30', type: 'food',     emoji: '🫙', title: 'Last Coorgi breakfast + buy coffee to carry', detail: 'Before leaving, buy fresh-roasted coffee from your estate host (₹200–400/kg). It\'s half the price and twice the quality of anything sold in Bangalore stores. Stock up on cardamom, pepper and vanilla too.' },
            { time: '09:00', type: 'activity', emoji: '🌿', title: 'Optional: Iruppu Falls trek (30 km south)', detail: 'If you have time, the 400m Iruppu Falls (Lakshmana Tirtha River) inside the Brahmagiri Wildlife Sanctuary is spectacular. A short 1-km forested trail. You might spot deer and peacocks on the way.' },
            { time: '11:00', type: 'activity', emoji: '🛍️', title: 'Coorg Cooperative store & spice market, Madikeri', detail: 'The government Coorg Cooperative outlet sells guaranteed-authentic coffee, pepper and honey at fixed prices. Then browse the spice bazaar. Last chance: Coorg orange wine and bamboo shoot pickle are excellent souvenirs.' },
            { time: '13:00', type: 'food',     emoji: '🍽️', title: 'Farewell Coorgi meal at a local restaurant', detail: 'Raju\'s or Hotel East End in Madikeri town does a good thali. Last cup of proper filter kaapi before you re-enter the flat world.' },
            { time: '14:00', type: 'travel',   emoji: '🚗', title: 'Drive back to Bangalore', detail: '5–6 hours via Mysore or NH275. Hit the road by 2pm to avoid Sunday evening traffic jams on Mysore Road (notorious from 7pm onwards). Arrive Bangalore by 8–9pm.' },
          ],
        },
      ],
    },
  },

  // ── RISHIKESH ─────────────────────────────────────────────────────────────
  'rishikesh': {
    3: {
      fromCity: 'Delhi',
      transport: 'road',
      destinationDays: 2,
      nights: 2,
      totalActivities: 13,
      summary: '3 days · 2 nights · Drive from Delhi · Rafting, bungee, yoga & Ganga Aarti',
      days: [
        {
          dayNum: 1, title: 'Delhi → Rishikesh + River Rafting', subtitle: 'Drive (5–6h) + Arrival Afternoon', isTravel: true,
          overnight: 'Riverside Camp / Hostel, Laxman Jhula area',
          timeline: [
            { time: '06:00', type: 'prep',     emoji: '🚗', title: 'Early departure from Delhi', detail: 'Leave by 6am via NH34 (Delhi–Haridwar Highway). The first 2 hours are on flat expressway — easy driving. Past Muzaffarnagar the scenery shifts to sugarcane fields and eventually the Shivalik hills.' },
            { time: '09:30', type: 'food',     emoji: '🍢', title: 'Breakfast halt at Roorkee or Haridwar', detail: 'IIT Roorkee town has good dhabas. Or push to Haridwar for proper aloo puri at a chaat stall near Har ki Pauri. Total drive so far: ~180km.' },
            { time: '11:30', type: 'travel',   emoji: '📍', title: 'Arrive Rishikesh — check in to camp', detail: '45 km beyond Haridwar. The Ganges turns a brilliant jade green here. Riverside camps in the Laxman Jhula area (Shivpuri, Byasi) offer the best experience. Tent or Swiss cottage — your call.' },
            { time: '12:30', type: 'food',     emoji: '🥗', title: 'Lunch at The Little Buddha Café or Ganga Kinare', detail: 'Rishikesh cafés are surprisingly good — Israeli, Italian and Indian menus coexist. The Little Buddha Café on the river has remarkable coffee. Try the banana porridge or the massive falafel wrap.' },
            { time: '14:00', type: 'activity', emoji: '🚣', title: 'White water rafting — 16km stretch', detail: 'The classic Shivpuri-to-Rishikesh route (16 km, ~2.5 hrs). Grade 2–4 rapids including the famous "Golf Course," "Club House," and the thrilling "Three Blind Mice." Cost: ₹600–900 per person. Life jackets and helmets provided.' },
            { time: '17:00', type: 'activity', emoji: '🛶', title: 'Cliff jumping at The Wall (optional add-on)', detail: 'Your rafting guide will stop at a 20-foot cliff over a deep green pool. Jumping is optional but extremely exhilarating. The water is cold and clear enough to see the bottom.' },
            { time: '18:30', type: 'activity', emoji: '🔥', title: 'Ganga Aarti at Triveni Ghat', detail: 'Every evening at 6:30pm sharp — a spiritual fire ceremony on the banks of the Ganga. Priests synchronise their movements with deep bell-ringing and conch shells. Even if you\'re not religious, the scale and energy is overwhelming. Arrive 20 min early for front row.' },
            { time: '20:00', type: 'food',     emoji: '🍕', title: 'Dinner at Chotiwala or Beatles Café', detail: 'Chotiwala is Rishikesh\'s most famous vegetarian restaurant (thali ₹220). Beatles Café near Laxman Jhula is perfect for pizza and pasta by the river. No alcohol in Rishikesh — it\'s a dry town. But the lassi is world-class.' },
          ],
        },
        {
          dayNum: 2, title: 'Extreme Sports + Beatles Ashram + Yoga', subtitle: 'Full Rishikesh Day', isTravel: false,
          overnight: 'Riverside Camp',
          timeline: [
            { time: '06:00', type: 'activity', emoji: '🧘', title: 'Sunrise yoga on the camp\'s river deck', detail: 'Most riverside camps offer a free sunrise yoga session. The mist rising off the Ganga as you hold a warrior pose is not something you\'ll forget. Bring a light layer — it\'s cool at dawn.' },
            { time: '07:30', type: 'food',     emoji: '🫖', title: 'Breakfast at the camp', detail: 'Camps typically serve simple but hearty breakfast: parathas, eggs, porridge, chai. The food is basic — the riverside view at 7am is not.' },
            { time: '09:00', type: 'activity', emoji: '🤸', title: 'Bungee jumping at Jumpin Heights (83m)', detail: 'India\'s highest fixed-platform bungee at 83 metres. Pre-book online — slots fill up fast (₹3,550 including video). The jump is from a platform over a forest gorge, not a bridge. Minimum weight 45kg. No heart conditions.' },
            { time: '10:30', type: 'activity', emoji: '🎢', title: 'Giant Swing + Flying Fox', detail: 'At the same Jumpin Heights facility: Giant Swing (₹2,050 — two people swing over the gorge together) and Flying Fox zip-line (₹1,550). Book as a combo for discounts.' },
            { time: '12:00', type: 'food',     emoji: '☕', title: 'Lunch at the iconic German Bakery, Swarg Ashram', detail: 'Lemon ginger tea, banana cake, thali, and homemade granola. A Rishikesh institution. Sit on the terrace overlooking the river. Budget: ₹250/person.' },
            { time: '13:30', type: 'activity', emoji: '🎵', title: 'Beatles Ashram (Maharishi Mahesh Yogi\'s Chaurasi Kutiya)', detail: 'The ashram where The Beatles stayed in 1968 and wrote much of the White Album. Now an overgrown art gallery. Entry: ₹150. The dome meditation rooms are now covered in psychedelic murals by graffiti artists from around the world. Hauntingly beautiful.' },
            { time: '15:30', type: 'activity', emoji: '🌉', title: 'Ram Jhula & Laxman Jhula suspension bridges', detail: 'Walk across the iconic orange suspension bridges. The view from the middle — jade-green Ganga below, Himalayan foothills ahead — is the defining Rishikesh image. The bridges sway gently as cows, motorbikes, and pilgrims cross together.' },
            { time: '17:00', type: 'activity', emoji: '💆', title: 'Ayurvedic massage at a riverside spa', detail: 'Rishikesh has dozens of legitimate Ayurvedic centres. A 60-min full body abhyanga (oil massage) is ₹800–1,200. Your body after rafting and bungee will thank you endlessly.' },
            { time: '19:00', type: 'activity', emoji: '🕯️', title: 'Evening Aarti with diyas floating on the Ganga', detail: 'Buy a small diya (leaf boat with a flower and oil lamp) for ₹20 from riverside vendors. Light it, make a wish, and set it floating downstream on the Ganga. It\'s cheesy and it\'s wonderful.' },
            { time: '20:30', type: 'food',     emoji: '🫕', title: 'Dinner at Tavern Restaurant or Ramana\'s Organic Café', detail: 'Ramana\'s is the best organic café in Rishikesh — pumpkin soup, herbed millet, seasonal vegetables. Worth the slightly higher price. Alternatively Tavern does great north Indian curries overlooking the bridge.' },
          ],
        },
        {
          dayNum: 3, title: 'Neer Garh Waterfall + Departure', subtitle: 'Morning in Rishikesh → Delhi', isTravel: true,
          overnight: null,
          timeline: [
            { time: '07:00', type: 'food',     emoji: '🍳', title: 'Last breakfast by the river', detail: 'Final morning tea at the riverside camp. The Ganga at 7am is unreal — fishermen casting nets, mountains backlit by early sun. Soak it in before the drive back.' },
            { time: '08:00', type: 'activity', emoji: '🌊', title: 'Neer Garh Waterfall trek (1.5 km)', detail: 'A 1.5km trail through forest leads to this hidden gem — a 3-tiered waterfall that most tourists miss. The walk itself through the forest is lovely. Bring trekking shoes, not sandals. Free entry.' },
            { time: '10:00', type: 'food',     emoji: '🫖', title: 'Chai and shopping in Laxman Jhula market', detail: 'Last chai at a riverside stall (₹15). Then browse: mala beads (₹100–400), singing bowls (₹300–1,500), patchouli oil, rudraksha malas, yoga books. Bargain gently — these are small sellers.' },
            { time: '11:30', type: 'travel',   emoji: '🚗', title: 'Depart Rishikesh for Delhi', detail: 'Leave by 11:30am to avoid the afternoon jam at Haridwar and evening rush into Delhi. Stop at the Haridwar ghats for 20 min for a quick look if you\'re not in a hurry.' },
            { time: '17:00', type: 'travel',   emoji: '🏠', title: 'Arrive Delhi', detail: 'You\'ve left the mountains. The noise of Delhi hits differently now. But you\'re calmer. Rishikesh does that.' },
          ],
        },
      ],
    },
  },

  // ── UDAIPUR ───────────────────────────────────────────────────────────────
  'udaipur': {
    3: {
      fromCity: 'Jaipur',
      transport: 'train',
      destinationDays: 2.5,
      nights: 2,
      totalActivities: 13,
      summary: '3 days · 2 nights · Train from Jaipur · Lakes, palaces & Rajput heritage',
      days: [
        {
          dayNum: 1, title: 'Jaipur → Udaipur + Lake Pichola Evening', subtitle: 'Train (6h) + Arrival', isTravel: true,
          overnight: 'Heritage Hotel, Udaipur Old City',
          timeline: [
            { time: '07:00', type: 'travel',   emoji: '🚂', title: 'Board Mewar Express at Jaipur Junction', detail: 'The 6-hour journey passes through the Aravalli hills. Scenic views of Rajasthani villages, desert landscape and finally the green hills of Mewar. Carry breakfast — pantry car is average.' },
            { time: '13:00', type: 'travel',   emoji: '📍', title: 'Arrive Udaipur Station', detail: 'Take an auto-rickshaw to your hotel (₹100–150 to the old city area). If staying lakeside, insist on drop till the main gate. The old city is a maze of lanes.' },
            { time: '14:00', type: 'checkin',  emoji: '🏨', title: 'Check in + rooftop Lake Pichola view', detail: 'Book a room with a lake view if possible — waking up to City Palace reflecting in Lake Pichola is the quintessential Udaipur experience. Heritage havelis are the best option: rooms from ₹2,500.' },
            { time: '15:30', type: 'activity', emoji: '🏰', title: 'City Palace Museum', detail: 'The largest palace complex in Rajasthan, built over 400 years. 11 palaces within one compound. Guided tour recommended (₹200 extra). Highlight: the Crystal Gallery, the Peacock Courtyard, and the panoramic terrace view over both Lake Pichola and Fateh Sagar.' },
            { time: '17:30', type: 'activity', emoji: '⛵', title: 'Sunset boat ride on Lake Pichola', detail: 'The 60-min boat ride (₹400 RTDC, or private boat ₹700) takes you past Jag Mandir island, the Lake Palace (now a Taj Hotel), and the City Palace waterfront. The sunset reflection on the water and palace is genuinely one of India\'s most beautiful sights.' },
            { time: '19:30', type: 'food',     emoji: '🕯️', title: 'Dinner at a rooftop lakeside restaurant', detail: 'Ambrai, Upré or Sunset Terrace (Fateh Prakash Palace) — all offer the City Palace view with dinner. Order: dal baati churma, laal maas (mutton), ker sangri. Rooftop candlelit setting. Book in advance for window tables. Budget: ₹1,000–1,500/person.' },
          ],
        },
        {
          dayNum: 2, title: 'Full Heritage Day — Gardens, Museums & Folk Show', subtitle: 'Full Day in Udaipur', isTravel: false,
          overnight: 'Heritage Hotel, Udaipur Old City',
          timeline: [
            { time: '07:30', type: 'food',     emoji: '☕', title: 'Breakfast at Millets of Mewar or Cafe Edelweiss', detail: 'Millets of Mewar serves healthy Rajasthani breakfast using millets: bajra roti, millet porridge, fresh lassi. Very good for the stomach after rich dinner. Budget: ₹200/person.' },
            { time: '09:00', type: 'activity', emoji: '🌸', title: 'Saheliyon ki Bari — Garden of Maids', detail: 'Built by Maharana Sangram Singh as a gift for his daughter. Ornate fountains, carved marble pavilions, lotus pool and lush hedgerows. Especially beautiful in morning light before crowds arrive. Entry: ₹50.' },
            { time: '10:30', type: 'activity', emoji: '🚗', title: 'Vintage Car Museum', detail: 'Collection of royal Mewar family vehicles: 1934 Rolls Royce Phantom, a Mercedes once used by Queen Elizabeth II during her India visit, vintage Cadillacs and Austins. If you love old cars, this is extraordinary. Entry: ₹250.' },
            { time: '12:00', type: 'activity', emoji: '🎨', title: 'Mewar School of Miniature Painting workshop', detail: 'Udaipur is the centre of miniature painting tradition. Several studios offer 2-hour workshops (₹500–800 including materials) where a master painter teaches you the technique on handmade paper. You take your artwork home.' },
            { time: '14:00', type: 'food',     emoji: '🍽️', title: 'Lunch at Natraj Dining Hall — Rajasthani thali', detail: 'The most authentic unlimited thali restaurant in Udaipur. 22+ items served in brass utensils by white-uniformed waiters who keep refilling without asking. ₹350/person. Expect a queue at lunch.' },
            { time: '15:30', type: 'activity', emoji: '💧', title: 'Fateh Sagar Lake promenade walk', detail: 'The larger of the two Udaipur lakes. Walk along the 2km promenade. Rent a speedboat (₹200/20 min). The Nehru Island garden in the middle of the lake has a solar observatory and café.' },
            { time: '17:00', type: 'activity', emoji: '🎭', title: 'Bagore ki Haveli folk show (7pm)', detail: 'Book your spot at the Bagore ki Haveli (lakeside, near Gangaur Ghat). The evening Dharohar folk show (7–8pm, ₹100 entry) features Rajasthani Ghoomar dance, puppet show, fire dance and live folk music. Absolutely unmissable.' },
            { time: '19:00', type: 'activity', emoji: '🌃', title: 'Old city evening walk — Jagdish Temple', detail: 'Wander the old city lanes at night — they\'re safer and more magical than during the day. The Jagdish Temple (17th century, active since 1651) is illuminated beautifully at night. Surrounding lanes have great silver jewellery shops.' },
            { time: '20:30', type: 'food',     emoji: '🌙', title: 'Late dinner — dal baati churma one more time', detail: 'You can\'t leave Udaipur without having dal baati churma twice. Jheel\'s Ginger Coffee Bar or Shiv Niwas Palace café for a relaxed nightcap. Try the Rajasthani kulfi with rose syrup.' },
          ],
        },
        {
          dayNum: 3, title: 'Hathi Pol Market + Departure', subtitle: 'Morning Shopping → Train Back', isTravel: true,
          overnight: null,
          timeline: [
            { time: '07:30', type: 'food',     emoji: '🥣', title: 'Breakfast + check out', detail: 'Settle bills, check out. Leave luggage at reception if your train is afternoon. Most hotels allow this for free for checked-out guests.' },
            { time: '08:30', type: 'activity', emoji: '🛍️', title: 'Hathi Pol market — best shopping in Udaipur', detail: 'The city\'s most atmospheric market: block print fabric by the metre (₹80–150/m), silver and kundan jewellery, leather mojari shoes (₹400–800), Rajasthani hand puppets. Best block print: Shilp Gram Emporium near the market.' },
            { time: '10:00', type: 'activity', emoji: '🎨', title: 'Browse miniature painting galleries', detail: 'The area around Jagdish Temple is lined with family-run miniature painting studios. Artists work on bone-dry camel hair brushes with natural pigments. Prices: ₹500–50,000. Even a small piece on handmade paper is a fine souvenir.' },
            { time: '12:00', type: 'food',     emoji: '🫕', title: 'Last Udaipur meal — Millets of Mewar or Jaiwana Haveli', detail: 'Jaiwana Haveli has the best terrace view of the City Palace in daylight. Order a dal baati thali, pay the bill slowly. Take one last look at the lake.' },
            { time: '13:30', type: 'travel',   emoji: '🚂', title: 'Board return train to Jaipur', detail: 'Udaipur City Station. Return in ~6 hours. The scenery on the return trip looks different somehow — probably because you\'re different.' },
          ],
        },
      ],
    },
  },

  // ── ANDAMAN ───────────────────────────────────────────────────────────────
  'andaman': {
    4: {
      fromCity: 'Chennai',
      transport: 'flight',
      destinationDays: 3.5,
      nights: 3,
      totalActivities: 14,
      summary: '4 days · 3 nights · Flight from Chennai · Islands, scuba diving & bioluminescence',
      days: [
        {
          dayNum: 1, title: 'Chennai → Port Blair + First Island Impressions', subtitle: 'Fly (2h) + Arrival Day', isTravel: true,
          overnight: 'Hotel, Port Blair (Aberdeen Bazaar area)',
          timeline: [
            { time: '08:00', type: 'travel',   emoji: '✈️', title: 'Board flight from Chennai to Port Blair', detail: 'Flight takes 2 hours. The approach to Port Blair over the turquoise Andaman Sea is breathtaking — you\'ll be pressing your face against the window. Start planning which island to visit when you see the colour of the water.' },
            { time: '10:00', type: 'checkin',  emoji: '🏨', title: 'Arrive Veer Savarkar Airport, Port Blair + check in', detail: 'Pre-book a hotel or resort. Aberdeen Bazaar area is central and convenient for Day 1 explorations. Budget options: ₹1,200–2,000/night. Beach resorts: ₹4,000–10,000/night. Book Havelock ferries TODAY if you haven\'t already!' },
            { time: '11:30', type: 'activity', emoji: '⚓', title: 'Cellular Jail — India\'s most haunting historic site', detail: 'The British-era prison where India\'s freedom fighters were kept in solitary confinement. The radial design meant no prisoner could see another. Veer Savarkar, Batukeshwar Dutt among those imprisoned here. Entry: ₹30. Allow 2 hours. The history here is deeply moving.' },
            { time: '14:00', type: 'food',     emoji: '🍤', title: 'Seafood lunch at Annapurna or New Lighthouse Restaurant', detail: 'Port Blair has surprisingly good seafood. Try the Andamanese fish curry — lighter than mainland versions. New Lighthouse (near the jetty) is a local favourite. Budget: ₹400–600 for two.' },
            { time: '15:30', type: 'activity', emoji: '🌊', title: 'Corbyn\'s Cove Beach — first Andaman sea swim', detail: 'Port Blair\'s closest beach, 7km from town. The water is calm, clear and warm. You\'ll immediately understand why people fly this far. Snorkelling gear available for hire (₹150). First Andaman sunset — don\'t miss it.' },
            { time: '19:30', type: 'activity', emoji: '🎭', title: 'Light & Sound Show at Cellular Jail', detail: 'Every evening (Bengali/Hindi/English shows — check schedule). The narration by noted actor Om Puri tells the story of the freedom fighters. The jail is lit dramatically. Very emotional experience. Entry: ₹250. Duration: 45 min.' },
            { time: '21:00', type: 'food',     emoji: '🦞', title: 'Dinner at Icy Spicy or Mandalay (ITC Bay Island)', detail: 'If budget allows, Mandalay at ITC Bay Island has the best seafood in Port Blair — lobster, grilled barracuda, crab masala. Otherwise Icy Spicy on Aberdeen Bazaar is excellent value. Sleep early — tomorrow is a big island day.' },
          ],
        },
        {
          dayNum: 2, title: 'Havelock Island — Radhanagar Beach', subtitle: 'Asia\'s Best Beach', isTravel: false,
          overnight: 'Beach Resort or Hut, Havelock Island (Swaraj Dweep)',
          timeline: [
            { time: '06:00', type: 'travel',   emoji: '⛴️', title: 'Morning ferry to Havelock (Swaraj Dweep)', detail: 'Makruzz or Green Ocean fast ferry departs Port Blair at 6:30am (90 min) or Coastal Cruise at 7am (2h 30min). Fast ferries are worth the extra cost. ⚠️ BOOK IN ADVANCE — ferries fill weeks ahead in peak season (Dec–Feb).' },
            { time: '08:30', type: 'checkin',  emoji: '🌴', title: 'Arrive Havelock — check in to beach resort or hut', detail: 'A tuk-tuk from the jetty takes you to your accommodation (₹200–300). Beach Number 5 and Beach Number 7 areas have the best resorts. Even budget beach huts (₹800/night) wake you up 30m from the sea.' },
            { time: '10:00', type: 'activity', emoji: '🏖️', title: 'Radhanagar Beach (Beach No.7) — all morning', detail: 'Consistently ranked Asia\'s best beach. 2km of powder-white sand backed by old-growth forest. The water is warm, clear and absolutely turquoise. No jet skis, no hawkers, no noise. Just the sea. Come before 11am before the day-trippers arrive.' },
            { time: '13:00', type: 'food',     emoji: '🥥', title: 'Lunch at a beachside café, Havelock', detail: 'Full Moon Café or Anju-Coco near Beach No. 5 serve excellent fresh fish, grilled prawns and coconut-based curries. Lunch for two: ₹700–900. Eat slowly.' },
            { time: '14:30', type: 'activity', emoji: '🤿', title: 'Snorkelling at Elephant Beach', detail: 'Take a 30-min boat ride to Elephant Beach — one of the finest snorkelling spots in the Andamans. The reef is accessible from the shore. You\'ll see sea turtles, moray eels, parrotfish and clownfish (Nemos!) without even diving. Gear hire: ₹200.' },
            { time: '17:00', type: 'activity', emoji: '🌅', title: 'Sunset at Radhanagar Beach — the best in Asia', detail: 'Return to Radhanagar for the sunset. The sky turns red-orange-purple with the dark forest silhouette behind you. This is the most-photographed moment in the Andamans. Do not be on your phone for this.' },
            { time: '20:00', type: 'food',     emoji: '🔥', title: 'Seafood barbecue dinner at resort', detail: 'Most Havelock resorts do evening barbecue: fresh-caught tuna, squid, prawns and lobster grilled on the beach. Eat barefoot in the sand with the sound of the sea. Bioluminescence might appear in the waves tonight if you\'re lucky.' },
          ],
        },
        {
          dayNum: 3, title: 'Scuba Diving Day', subtitle: 'Underwater World of the Andamans', isTravel: false,
          overnight: 'Beach Resort, Havelock Island',
          timeline: [
            { time: '07:30', type: 'food',     emoji: '🥞', title: 'Breakfast — fuel for the dive', detail: 'Light breakfast: toast, fruit, juice. Don\'t eat heavy before diving — it causes nausea underwater. Your dive centre will also advise no diving for 12 hours after flying, but since you flew yesterday this is fine.' },
            { time: '09:00', type: 'activity', emoji: '🤿', title: 'PADI Discover Scuba Diving — 2 dives', detail: 'For first-timers: ₹3,500 for a full Discovery Scuba session (classroom + pool briefing + 2 ocean dives with instructor). Dive sites: Nemo Reef, Aquarium, Minerva Ledge. You\'ll descend to 12m with a personal instructor. The visibility is 15–25m. Life-changing.' },
            { time: '12:30', type: 'food',     emoji: '🥗', title: 'Post-dive lunch — you\'ve earned it', detail: 'Diving gives you ferocious hunger. Head to Anju-Coco or Full Moon for a proper meal. Swap stories with other divers — you\'ll have plenty. The post-dive afterglow is real.' },
            { time: '14:00', type: 'activity', emoji: '🚣', title: 'Sea-kayaking through mangroves', detail: 'Rent a kayak (₹600/hr) and paddle into the mangrove creeks at the north end of Havelock. The tunnel of roots over still water is silent and prehistoric-feeling. Watch for monitor lizards basking on the mud banks.' },
            { time: '16:30', type: 'activity', emoji: '🌊', title: 'Free time — last Andaman beach time', detail: 'Last afternoon on the beach. Swim, read, lie flat. No schedule. This is why you came.' },
            { time: '21:00', type: 'activity', emoji: '✨', title: 'Bioluminescent beach at night (after 9pm)', detail: 'Walk into the shallow water at the beach after 9pm. Swirl your hand through the water — it should glow bright electric blue. This is bioluminescent plankton. It\'s real, it\'s magical, and it\'s free. Best visibility on dark moon nights (new moon period).' },
          ],
        },
        {
          dayNum: 4, title: 'Neil Island Morning → Port Blair → Chennai', subtitle: 'Departure Day', isTravel: true,
          overnight: null,
          timeline: [
            { time: '06:00', type: 'activity', emoji: '🌅', title: 'Last Havelock sunrise', detail: 'Walk to Radhanagar Beach for one final sunrise. The sky changes from deep purple to gold in minutes. Fill your phone with photos you won\'t believe you took.' },
            { time: '07:30', type: 'travel',   emoji: '⛴️', title: 'Ferry to Neil Island (Shaheed Dweep)', detail: 'Neil Island is a 1-hour ferry from Havelock. Smaller, quieter, more local. The entire island can be explored in 3–4 hours by rented bicycle or scooter (₹150/day).' },
            { time: '09:00', type: 'activity', emoji: '🪸', title: 'Natural Bridge coral rock formation', detail: 'A natural basalt arch over the sea, carved by waves. Only accessible at low tide — check the tide chart. The rock pools around it have starfish, sea urchins and tiny crabs.' },
            { time: '10:30', type: 'activity', emoji: '🏊', title: 'Bharatpur Beach — best snorkelling in Neil', detail: 'Calm shallow lagoon with extraordinary coral. Even at knee depth you can see sea turtles feeding on the seagrass. Entry: free. Snorkel hire: ₹200. This is snorkelling, not diving — even children can experience it.' },
            { time: '12:30', type: 'travel',   emoji: '⛴️', title: 'Ferry from Neil to Port Blair', detail: '1.5 hours. You\'ll arrive Port Blair by 2–3pm depending on your ferry timing.' },
            { time: '14:30', type: 'food',     emoji: '🦐', title: 'Last Andaman meal near the airport', detail: 'Light meal near Aberdeen Bazaar — the time zone means early check-in for evening flights. Order fried prawn rice one last time.' },
            { time: '16:00', type: 'travel',   emoji: '✈️', title: 'Fly back to Chennai', detail: '2-hour flight. The aerial view of the islands as you lift off — clear water, green forest, zero visible development — is the perfect final image. Andaman islands: unchanged.' },
          ],
        },
      ],
    },
  },

  // ── LADAKH ────────────────────────────────────────────────────────────────
  'ladakh': {
    5: {
      fromCity: 'Delhi',
      transport: 'flight',
      destinationDays: 4.5,
      nights: 4,
      totalActivities: 16,
      summary: '5 days · 4 nights · Fly from Delhi · High-altitude lakes, passes & monasteries',
      days: [
        {
          dayNum: 1, title: 'Delhi → Leh — Acclimatize', subtitle: 'Fly (1.5h) + REST DAY (critical!)', isTravel: true,
          overnight: 'Hotel, Leh (lower altitude area preferred for Day 1)',
          timeline: [
            { time: '06:00', type: 'travel',   emoji: '✈️', title: 'Early morning flight Delhi → Leh', detail: 'Book the earliest possible flight — the Leh approach is only possible in morning hours before afternoon clouds build. The flight over the Himalayas is jaw-dropping. Window seat is mandatory. You\'ll see K2 range, Nun-Kun massif, and the Zanskar mountains.' },
            { time: '08:00', type: 'checkin',  emoji: '🏨', title: 'Arrive Kushok Bakula Rimpochee Airport (3,256m) — check in immediately', detail: '⚠️ DO NOT RUSH. Altitude sickness can affect anyone regardless of fitness. Go directly to your hotel. Do NOT carry heavy bags yourself. Take a pre-booked cab (₹500 from airport to Leh market).' },
            { time: '09:00', type: 'rest',     emoji: '💊', title: 'REST — absolutely critical for the first 4–6 hours', detail: 'Lie down. Breathe slowly. Drink 4 litres of water today minimum. Start Diamox tablets (125mg twice daily) if prescribed by your doctor before the trip. Symptoms of AMS: headache, nausea, dizziness. Tell hotel staff immediately if severe.' },
            { time: '13:00', type: 'food',     emoji: '🍜', title: 'Light lunch — eat less than usual at altitude', detail: 'Your appetite will be reduced on Day 1. A warm bowl of thukpa (Tibetan noodle soup) or plain rice with dal is ideal. Avoid heavy meat and alcohol on Day 1 — both worsen altitude sickness.' },
            { time: '16:00', type: 'activity', emoji: '🕌', title: 'Easy 30-min walk: Shanti Stupa (only if feeling well)', detail: 'If you feel fine after 6 hours of rest, a gentle 30-min walk to Shanti Stupa — a white-domed Buddhist monument — is safe. The panoramic view of Leh town and Stok Kangri (6,153m) behind it at sunset is extraordinary. Walk slowly. Stop if dizzy.' },
            { time: '18:30', type: 'food',     emoji: '🫖', title: 'Butter tea at a local café near Leh market', detail: 'Tibetan butter tea (cha — salty, buttery, milky) is the altitude cure. It sounds horrible. It\'s actually comforting. The Leh market (Main Bazaar Road) has great café choices.' },
            { time: '20:00', type: 'rest',     emoji: '🌙', title: 'Early dinner & sleep by 9pm', detail: 'Eat light: thukpa, butter naan, simple dal. In bed by 9pm. Your body is working hard at altitude. Sleep is the best recovery. Headache tonight is normal — it should be gone by morning.' },
          ],
        },
        {
          dayNum: 2, title: 'Leh Monasteries Circuit', subtitle: 'Ancient Buddhist Gompas', isTravel: false,
          overnight: 'Hotel, Leh',
          timeline: [
            { time: '07:30', type: 'food',     emoji: '☕', title: 'Breakfast — you should feel much better today', detail: 'Appetite returns on Day 2. Tibetan bread with butter and honey, scrambled eggs and coffee. The altitude headache should be gone. If not, rest another half day before sightseeing.' },
            { time: '09:00', type: 'activity', emoji: '🏯', title: 'Thiksey Monastery (19km from Leh)', detail: '12-storey monastery complex resembling the Potala Palace in Lhasa. Built in the 15th century. The highlight is the 15m Maitreya Buddha statue. Arrive for the 6am morning prayer (if staying nearby) or 9am for regular visit. Entry: ₹50.' },
            { time: '10:30', type: 'activity', emoji: '🔔', title: 'Hemis Monastery — largest and richest in Ladakh', detail: '45 km from Leh. Founded in 1630 by Stag-tsang-ras-pa under Royal patronage. The annual Hemis Festival (June–July) draws thousands. The monastery museum has extraordinary thangka paintings and silver stupas. Entry: ₹100.' },
            { time: '12:30', type: 'food',     emoji: '🍽️', title: 'Lunch at a village dhaba near Hemis', detail: 'Local Ladakhi lunch: skyu (traditional pasta in vegetable stew), tsampa (roasted barley porridge) or butter naan with dal. Eat as the monks eat.' },
            { time: '14:00', type: 'activity', emoji: '👑', title: 'Shey Palace ruins & Shey Monastery', detail: 'Former summer capital of Ladakhi kings. The ruined palace overlooks a fertile valley. The monastery has a 7.5m copper-gold plated seated Buddha, the second largest in Ladakh. Entry: ₹30.' },
            { time: '15:30', type: 'activity', emoji: '🏔️', title: 'Leh Palace (restored) & old town walk', detail: 'The 17-storey palace of Sengge Namgyal (17th century) looms over Leh town. The interior is now an ASI museum (entry ₹50). The view from the roof over the old town with Stok Kangri behind it is the best in Leh.' },
            { time: '17:30', type: 'activity', emoji: '🛍️', title: 'Leh Main Bazaar — shop for Ladakhi goods', detail: 'Best buys: turquoise and lapis lazuli jewellery (₹300–3,000), Pashmina shawls (₹2,000–8,000 genuine), hand-knotted wool carpets, thangka paintings, local apricot jam and dried fruit. Check authenticity of Pashmina carefully.' },
            { time: '20:00', type: 'food',     emoji: '🥩', title: 'Dinner at Bon Appetit or The Tibetan Kitchen', detail: 'Bon Appetit (rooftop) has great continental and Ladakhi fusion. Try the sha-phaley (Tibetan meat-stuffed bread) and chang (local barley beer — safe for Day 2+). Budget: ₹400–700/person.' },
          ],
        },
        {
          dayNum: 3, title: 'Nubra Valley via Khardung La', subtitle: 'Highest Motorable Road in the World', isTravel: false,
          overnight: 'Camp or Guest House, Nubra Valley',
          timeline: [
            { time: '06:30', type: 'prep',     emoji: '🎒', title: 'Early start — permit required', detail: 'The Protected Area Permit for Nubra Valley (₹100/person) can be arranged by your hotel/tour operator. Pack warmly — Khardung La (5,359m) is brutally cold even in summer. Carry extra layers, sunblock, lip balm.' },
            { time: '07:30', type: 'travel',   emoji: '🚙', title: 'Drive from Leh to Khardung La (39km, ~2.5h)', detail: 'The road is paved but steep and narrow above the snowline. Your driver will know when to stop for acclimatisation. The views of the Ladakh range from the switchbacks are phenomenal.' },
            { time: '10:00', type: 'activity', emoji: '🏔️', title: 'Khardung La Pass (5,359m) — world\'s highest motorable road', detail: 'Allow only 20–30 min at the top (altitude + cold). Take photos at the sign. Breathe slowly. Don\'t run. Even conditioned athletes get dizzy here. The road continues north into the cold desert valley below.' },
            { time: '12:30', type: 'travel',   emoji: '🏜️', title: 'Descend into Nubra Valley — sand dunes appear!', detail: 'The dramatic transition: from icy mountain pass to sandy cold desert in 1 hour. The valley floor is green with willow trees and rose bushes (Ladakhi roses bloom July–Aug). It looks like Narnia.' },
            { time: '13:30', type: 'food',     emoji: '🍜', title: 'Lunch at a village restaurant in Diskit', detail: 'Diskit is the main town of Nubra. Simple but warm food: rice, dal, sabzi. The hospitality of Ladakhi villagers is legendary. They will often offer you local apricot juice and skyu without being asked.' },
            { time: '14:30', type: 'activity', emoji: '🐪', title: 'Double-hump Bactrian camel safari at Hunder sand dunes', detail: 'The dunes of Hunder are home to wild Bactrian camels — unique to Nubra Valley. A 30-min camel ride on these magnificent two-humped creatures across the dunes (₹300/person) is surreal. Behind you: sand dunes. In front: Himalayan peaks covered in snow.' },
            { time: '16:30', type: 'activity', emoji: '🕌', title: 'Diskit Monastery — 107-foot Maitreya Buddha', detail: 'The 500-year-old monastery overlooking the valley has a 107-foot future-looking Buddha statue installed in 2010. The monastery interior has ancient murals and a demon head preserved in a jar (from a Mongol invader, legend says). Entry: ₹50.' },
            { time: '20:00', type: 'food',     emoji: '⭐', title: 'Dinner at camp + stargazing', detail: 'After dinner, step outside the camp and look up. Zero light pollution, no humidity, 3,000m altitude — the Milky Way is a river of white across the entire sky. Bring a jacket. Stand there for a long time.' },
          ],
        },
        {
          dayNum: 4, title: 'Pangong Tso Lake — India\'s Most Famous Lake', subtitle: 'Iconic Blue-Blue Lake Day', isTravel: false,
          overnight: 'Lakeside Camp, Pangong Tso',
          timeline: [
            { time: '06:00', type: 'travel',   emoji: '🚙', title: 'Drive from Nubra to Pangong via Shyok Valley', detail: 'One of the most beautiful drives in India. The Shyok River changes colour from milky white to crystal blue along the 150km route. Roads are rough in sections — this is a 5-hour drive. Carry water, snacks and camera.' },
            { time: '11:00', type: 'travel',   emoji: '⛰️', title: 'Cross Chang La Pass (5,360m)', detail: 'Third highest motorable pass in the world. Cold, windy and otherworldly. The military checkpoint here checks Inner Line Permits. The chai stall run by the Army serves the most welcome hot tea of your life.' },
            { time: '13:00', type: 'activity', emoji: '💙', title: 'First sight of Pangong Tso — the blue lake', detail: 'Nothing prepares you for it. The lake appears as a thin blue line in the valley floor from the mountain road. As you descend, it grows. Pangong Tso is 134km long, 14,000 feet high, and in three colours simultaneously: turquoise, blue, and cobalt. The Chinese border cuts through its middle.' },
            { time: '13:30', type: 'food',     emoji: '🍜', title: 'Lunch at lakeside camp while staring at the water', detail: 'Most lakeside camps serve simple meals. Eat facing the lake. The colour will distract you from food. This is fine.' },
            { time: '15:00', type: 'activity', emoji: '📸', title: 'Afternoon photography session at the lake', detail: 'The light on Pangong changes every hour. Morning: pale silver. Afternoon: vivid cobalt. Sunset: burning orange. The mountains across the lake are in China and Tibet. The lake is so high the oxygen feels thin but your eyes feel full.' },
            { time: '17:30', type: 'activity', emoji: '🌅', title: 'Sunset at Pangong Tso — unmissable', detail: 'The lakeside rocks glow gold, the water turns dark blue, the sky becomes a purple-orange gradient. Possibly the most beautiful sunset you\'ve ever seen. Thousands of frames taken by thousands of people — and still the moment is yours alone.' },
            { time: '21:00', type: 'activity', emoji: '🌌', title: 'Midnight stargazing by the lake', detail: 'Pangong at night is profound. The Milky Way reflects in the utterly still lake surface — a mirror of stars above and below. Stay up past midnight if you can manage the cold (−5°C to −10°C even in summer). Bring your warmest clothes.' },
          ],
        },
        {
          dayNum: 5, title: 'Pangong Sunrise → Leh → Delhi', subtitle: 'Departure Day', isTravel: true,
          overnight: null,
          timeline: [
            { time: '05:30', type: 'activity', emoji: '🌅', title: 'Pangong Tso sunrise — set the alarm, it\'s worth it', detail: 'The sun rises over the Tibetan plateau and its first light hits the lake in a streak of gold. Birds call from the reeds. The water is perfectly still. You are very small and the world is very beautiful. Remember this.' },
            { time: '07:30', type: 'food',     emoji: '☕', title: 'Breakfast at lakeside camp — last Pangong morning', detail: 'Butter toast, boiled eggs, Tibetan tea. Eat looking at the lake. You\'ve earned this.' },
            { time: '08:30', type: 'travel',   emoji: '🚙', title: 'Drive Pangong → Leh via Chang La (5h)', detail: 'Return journey to Leh. The road seems shorter on the way back. Use the drive time for one last look at the mountains.' },
            { time: '13:30', type: 'activity', emoji: '🛍️', title: 'Last shopping in Leh market', detail: 'Final chance: Ladakhi apricot oil (amazing for skin, ₹300), organic honey (₹400/500g), pashmina (budget ₹2,000 minimum for genuine), dried apricots from local women outside the mosque.' },
            { time: '15:00', type: 'food',     emoji: '🍜', title: 'Final Ladakhi meal — thukpa and sha-phaley', detail: 'The Tibetan Kitchen near the main market. Last bowl of thukpa. Last cup of butter tea (you might actually like it now). Settle your hotel bill and check out.' },
            { time: '17:00', type: 'travel',   emoji: '✈️', title: 'Fly Leh → Delhi', detail: 'The takeoff from Leh on a clear day reveals the entire Ladakh range in one sweep. Snow peaks, blue sky, brown desert below, the silver Indus River snaking through the valley. A final gift from Ladakh. Arrive Delhi by 9pm.' },
          ],
        },
      ],
    },
  },

  // ── OOTY ──────────────────────────────────────────────────────────────────
  'ooty': {
    3: {
      fromCity: 'Bangalore',
      transport: 'road',
      destinationDays: 2,
      nights: 2,
      totalActivities: 11,
      summary: '3 days · 2 nights · Drive from Bangalore · Toy train, tea gardens & peaks',
      days: [
        {
          dayNum: 1, title: 'Bangalore → Ooty + Botanical Gardens', subtitle: 'Drive (5h) + First Evening', isTravel: true,
          overnight: 'Heritage Hotel or Homestay, Ooty',
          timeline: [
            { time: '06:30', type: 'travel',   emoji: '🚗', title: 'Leave Bangalore via Mysore Road', detail: 'Best route: Bangalore → Mysore → Gudalur → Ooty via the scenic Masinagudi road (NH181). The Masinagudi route is famous for elephant sightings at dusk — slower but spectacular.' },
            { time: '09:00', type: 'food',     emoji: '🍛', title: 'Breakfast stop at Kamat Restaurant, Mysore road', detail: 'Famous Kamat chain on the Mysore highway. Idli-vada, masala dosa and filter kaapi. The best South Indian breakfast stop on this route. Budget: ₹150/person.' },
            { time: '11:00', type: 'travel',   emoji: '🌲', title: 'Enter Nilgiris — Mudumalai forest stretch', detail: 'From Gudalur, the route climbs through the Mudumalai Tiger Reserve (Masinagudi route). Drive slowly — wild elephants, gaur and spotted deer frequently cross the road in morning and evening hours.' },
            { time: '12:30', type: 'checkin',  emoji: '🏨', title: 'Arrive Ooty (2,240m) — check in', detail: 'The drive up to Ooty via Coonoor is full of tea garden views. Check into your hotel. Ooty is cool even in summer (18–22°C). Keep a light jacket handy.' },
            { time: '14:00', type: 'activity', emoji: '🌸', title: 'Government Botanical Gardens', detail: 'Spread over 22 hectares across 6 sections including a fossil tree (20 million years old!) and the Toda huts section. The annual flower show in May is spectacular. Entry: ₹50. Best visited in afternoon light.' },
            { time: '16:00', type: 'activity', emoji: '🚣', title: 'Ooty Lake boating', detail: 'Rowing and pedal boats on the scenic lake surrounded by eucalyptus trees. ₹60–100/30 min. The lake was built by John Sullivan (founder of Ooty) in 1824. Very pleasant in the cool afternoon.' },
            { time: '18:00', type: 'activity', emoji: '🍫', title: 'Charing Cross market — Ooty chocolate trail', detail: 'Ooty is famous for home-made chocolate. Visit the street stalls and small shops near Charing Cross for fresh fudge (₹50/100g), chocolate-covered cashews and eucalyptus oil. Try before you buy.' },
            { time: '20:00', type: 'food',     emoji: '🍲', title: 'Dinner at Sidewalk Café or The Ruffles', detail: 'Sidewalk Café near the town center is cosy with a fireplace. Try the pepper chicken and toddy-flavoured Nilgiri tea. Evenings in Ooty are cool (12–15°C) — sit indoors.' },
          ],
        },
        {
          dayNum: 2, title: 'Toy Train + Doddabetta + Tea Factory', subtitle: 'The Best of Nilgiris', isTravel: false,
          overnight: 'Homestay, Ooty',
          timeline: [
            { time: '07:15', type: 'activity', emoji: '🚂', title: 'Nilgiri Mountain Railway — Ooty to Coonoor (UNESCO)', detail: '⚠️ Book tickets in advance at the station or IRCTC. The toy train departs at 7:15am. This steam-powered metre-gauge train has operated since 1908. The 23km ride from Ooty to Coonoor through tea gardens, tunnels and viaducts is one of the world\'s greatest rail journeys. 90 minutes. Worth getting up at 6am for.' },
            { time: '09:00', type: 'food',     emoji: '☕', title: 'Breakfast at Coonoor after the train ride', detail: 'Coonoor has excellent colonial-era cafés. Pastry Corner near the station is famous for plum cake and cream buns. Or Hotel Tamil Nadu has a good breakfast hall with views.' },
            { time: '10:00', type: 'activity', emoji: '🌿', title: 'Sim\'s Park, Coonoor', detail: 'Smaller but more manicured than Ooty\'s botanical garden. Annual fruit show here. Beautiful rose garden and rare Rhododendron arboreum trees. The park was laid in 1874. Entry: ₹30.' },
            { time: '11:30', type: 'activity', emoji: '🪨', title: 'Lamb\'s Rock and Dolphin\'s Nose viewpoints', detail: 'Two iconic Coonoor viewpoints. Dolphin\'s Nose: a 300m rock jutting into the valley — outstanding views of Catherine Falls in the gorge below. Lamb\'s Rock: tea garden panorama. A 3km trek connects them.' },
            { time: '13:30', type: 'travel',   emoji: '🚗', title: 'Drive back to Ooty via tea garden roads', detail: '45 min back from Coonoor through winding tea estate roads. You can stop at any tea estate gate and ask to walk the rows — most are welcoming to respectful tourists.' },
            { time: '15:00', type: 'activity', emoji: '🍵', title: 'Tea factory tour & tasting', detail: 'The Chamraj Tea Estate or Nilgiri Tea Company offers 1-hour tours: watch the full process from withering → rolling → oxidizing → drying → grading. The tasting at the end — 5 teas in 15 minutes — is the highlight. Buy fresh Nilgiri tea at factory price (₹150/100g).' },
            { time: '17:00', type: 'activity', emoji: '⛰️', title: 'Doddabetta Peak — highest point in Nilgiris (2,637m)', detail: 'A short 15-min drive from Ooty. On a clear day you can see Mysore in the plains below. The "Scope House" at the top has a telescope. The walk from the car park to the summit is 500m. Cold and windy — carry a jacket.' },
            { time: '19:30', type: 'food',     emoji: '🔥', title: 'Dinner at Hotel Nahar or Savoy Hotel (heritage)', detail: 'Savoy Hotel (est. 1829) is the oldest hotel in Ooty. Their dining room has original wood-paneled walls. The colonial mutton stew with dinner rolls is exactly what you want on a cold Nilgiri night.' },
          ],
        },
        {
          dayNum: 3, title: 'Mudumalai Safari → Drive to Bangalore', subtitle: 'Wildlife + Departure', isTravel: true,
          overnight: null,
          timeline: [
            { time: '06:30', type: 'activity', emoji: '🐘', title: 'Mudumalai National Park jeep safari', detail: 'Drive 50km down to Mudumalai Tiger Reserve (1.5h). Forest Department safaris depart at 6:30am and 3:30pm. Morning safari is far better — 2 hours in an open jeep (₹250/person + ₹250 jeep entry). Elephant herds, gaur, spotted deer and if lucky — tigers.' },
            { time: '09:00', type: 'food',     emoji: '🍳', title: 'Breakfast at the forest rest house café', detail: 'The TATA Theppakadu canteen inside the reserve makes excellent adai-avial (lentil crepes with coconut curry). Very local, very good. Eat with safari guides for the best stories.' },
            { time: '10:30', type: 'activity', emoji: '🌊', title: 'Optional: Pykara Falls & Lake (back towards Ooty)', detail: '22km from Ooty on the way back. A seasonal waterfall (best after monsoon) and a blue-green lake. Boating available. Worth 1 hour if you have time.' },
            { time: '12:00', type: 'food',     emoji: '🛍️', title: 'Final shopping stop + lunch in Ooty town', detail: 'Higginbotham\'s Bookstore (since 1844), Ooty Cooperative Store for fixed-price Nilgiri products, Variety Hall for hand-embroidered woolens. Last cup of Nilgiri tea and honey cake from Government Coffee House.' },
            { time: '14:00', type: 'travel',   emoji: '🚗', title: 'Drive back to Bangalore (5h)', detail: 'Take the Mysore route back. Hit the road by 2pm to clear Mysore before 4:30pm traffic. Arrive Bangalore 7:30–8:00pm. Your apartment will feel too warm after Ooty.' },
          ],
        },
      ],
    },
  },

  // ── HAMPI ─────────────────────────────────────────────────────────────────
  'hampi': {
    3: {
      fromCity: 'Bangalore',
      transport: 'train',
      destinationDays: 2,
      nights: 2,
      totalActivities: 12,
      summary: '3 days · 2 nights · Overnight train from Bangalore · UNESCO ruins & bouldering',
      days: [
        {
          dayNum: 1, title: 'Bangalore → Hampi (overnight train)', subtitle: 'Train (8h overnight)', isTravel: true,
          overnight: 'Train (en route)',
          timeline: [
            { time: '20:00', type: 'travel',   emoji: '🚂', title: 'Board Hampi Express from Bangalore KSR', detail: 'The Hampi Express (16591) departs KSR Bangalore at 10pm and arrives Hospet at 6am. Book 2AC or sleeper class. Carry dinner — pantry car food is unreliable on this route.' },
            { time: '21:00', type: 'food',     emoji: '🍱', title: 'Dinner on train or before departure', detail: 'Eat before boarding or carry packed dinner. The train passes through Tumkur and Chitradurga district — deccan plateau rolling past your window under moonlight.' },
            { time: '06:00', type: 'travel',   emoji: '📍', title: 'Arrive Hospet Junction — take auto to Hampi (13km)', detail: 'Autos outside Hospet station charge ₹150–200 to Hampi Bazaar. Some continue to Virupapura Gadde (Hippie Island) for ₹250–300. Choose your base side: south (main ruins area) or north (guesthouses, cafés, quieter). ' },
          ],
        },
        {
          dayNum: 2, title: 'Vijayanagara Empire Ruins', subtitle: 'Full UNESCO Heritage Day', isTravel: false,
          overnight: 'Guesthouse, Hampi Bazaar or Hippie Island',
          timeline: [
            { time: '06:30', type: 'activity', emoji: '🌅', title: 'Matanga Hill sunrise — best view in Hampi', detail: '30-min steady climb up giant boulders. At the top: a 360° view of the entire ruined city — temples, bazaars, hills, Tungabhadra River, coconut groves. The sunrise turns all the granite pink. Worth every step. Start by 5:30am for perfect light.' },
            { time: '08:30', type: 'food',     emoji: '🍌', title: 'Breakfast at Mango Tree Restaurant', detail: 'Famous Hampi institution hanging over the Tungabhadra River. The banana pancakes with honey are legendary. Sit by the river watching coracle boats. Budget: ₹200/person.' },
            { time: '10:00', type: 'activity', emoji: '🛕', title: 'Virupaksha Temple complex', detail: '7th century active temple — Hampi\'s oldest and only functioning temple. The main gopuram is 50m tall. An elephant called Lakshmi blesses visitors in the courtyard for a coin (₹10). The inner sanctuary has ancient linga shrines. Always active with pilgrims.' },
            { time: '11:30', type: 'activity', emoji: '🏛️', title: 'Hampi Bazaar ruins (ancient market street)', detail: 'A 750m long ancient street that once housed 50,000 merchants. The colonnaded stone stalls still stand. Close your eyes and imagine it at its peak — the richest city on Earth in 1500 AD, busier than contemporary London or Paris.' },
            { time: '13:00', type: 'food',     emoji: '🍛', title: 'Lunch at a Hampi Bazaar restaurant', detail: 'Several good thali places near the temple. Try the South Indian meals plate with sambar, rasam, 3 subzis and payasam. Budget: ₹150–200.' },
            { time: '14:30', type: 'activity', emoji: '🗿', title: 'Vittala Temple & Stone Chariot — Hampi\'s masterpiece', detail: '3km from main bazaar. The Vittala Temple complex is the finest architectural achievement of the Vijayanagara empire. The stone chariot in the courtyard (carved from a single granite block) is iconic. The musical pillars of the main hall produce different notes when tapped. Entry: ₹600 (foreigners), ₹40 (Indians). Allow 2 hours.' },
            { time: '17:00', type: 'activity', emoji: '🛶', title: 'Coracle boat ride on Tungabhadra River', detail: 'A coracle is a circular bowl-shaped bamboo & tar boat — used here for 500+ years. 20-min ride (₹30/person) to the north bank. Fishermen use them daily. The Hampi skyline from the river is stunning.' },
            { time: '18:30', type: 'activity', emoji: '🌇', title: 'Hemakuta Hill sunset', detail: 'Dotted with small Shaiva temples, this hill between the Virupaksha Temple and Vittala Street is the best sunset spot. Hundreds of boulders to perch on. The ruins in golden light look like a painting.' },
            { time: '20:30', type: 'food',     emoji: '🍕', title: 'Dinner at Goan Corner or Laughing Buddha (Hippie Island)', detail: 'Cross to the north bank by coracle (last crossing around 7:30pm — don\'t miss it or you pay for a bridge taxi). Laughing Buddha and Hampi Boulderer\'s Rest are classic spots. Try the lemon rice and coconut fish curry.' },
          ],
        },
        {
          dayNum: 3, title: 'Royal Enclosure + Bouldering + Departure', subtitle: 'Final Hampi Morning', isTravel: true,
          overnight: null,
          timeline: [
            { time: '07:00', type: 'activity', emoji: '🧗', title: 'Morning boulder climbing session', detail: 'Hampi is a world-class bouldering destination with granite rock problems rated across all grades. Bouldering guides (₹500/hr) know the best local circuits. Even if you\'re a beginner, scrambling on boulders between ruins is uniquely Hampi.' },
            { time: '09:00', type: 'activity', emoji: '👑', title: 'Royal Enclosure & Elephant Stables', detail: 'The Royal Centre: Mahanavami Dibba (coronation platform), Lotus Mahal (Islamic-influenced palace), and 11-bay Elephant Stables in a perfect row. These are the most pristine and least crowded ruins in Hampi. Morning light is ideal. Entry included in Vittala complex ticket.' },
            { time: '11:00', type: 'activity', emoji: '🌿', title: 'Anegundi village — across the river', detail: 'Hire a coracle early morning and visit Anegundi — said to be Kishkinda from the Ramayana, where Hanuman was born. The ancient Anjaneya Hill (Hanuman\'s birthplace) has a 570-step climb with extraordinary views. Very few tourists come here.' },
            { time: '13:00', type: 'food',     emoji: '🍱', title: 'Final lunch in Hampi + souvenir shopping', detail: 'Last banana-leaf meals. Buy: miniature stone chariot replicas (₹300), Vijayanagara-era pattern printed shirts, locally made bronze figures. The market near Virupaksha is best.' },
            { time: '14:30', type: 'travel',   emoji: '🚗', title: 'Auto to Hospet for overnight train / evening bus', detail: 'Evening bus Hospet → Bangalore (7h, ₹350) or book the return Hampi Express train (departs Hospet ~8pm, arrives Bangalore 4:30am). Most travellers prefer the bus for flexibility.' },
          ],
        },
      ],
    },
  },

  // ── JAISALMER ─────────────────────────────────────────────────────────────
  'jaisalmer': {
    3: {
      fromCity: 'Jaipur',
      transport: 'train',
      destinationDays: 2.5,
      nights: 2,
      totalActivities: 12,
      summary: '3 days · 2 nights · Overnight train from Jaipur · Desert forts, dunes & camel camps',
      days: [
        {
          dayNum: 1, title: 'Jaipur → Jaisalmer (overnight train)', subtitle: 'Train (10h overnight)', isTravel: true,
          overnight: 'Train (en route)',
          timeline: [
            { time: '22:00', type: 'travel',   emoji: '🚂', title: 'Board Desert Express at Jaipur Junction', detail: 'The Jaipur-Jaisalmer Express (12957) departs around 11pm. Book 2AC sleeper well in advance — this route is very popular. The train passes through the Thar desert by night.' },
            { time: '08:00', type: 'travel',   emoji: '📍', title: 'Arrive Jaisalmer Station', detail: '10-hour journey. The morning approach to Jaisalmer — honey-gold fort rising from flat desert — is a cinematic sight. Autos to the fort area: ₹100–150. Hotels inside the fort have ceilings carved from sandstone.' },
            { time: '09:00', type: 'checkin',  emoji: '🏨', title: 'Check in to heritage hotel or fort haveli', detail: 'Staying inside the living fort is the authentic experience. Dozens of small havelis have rooms (₹600–3,000/night). The stone walls stay cool even in summer. If you stay outside the fort, rooftop hotels have better views.' },
            { time: '10:00', type: 'food',     emoji: '🥘', title: 'Breakfast at Fort View rooftop café', detail: 'Excellent dahi-puri, poha and chai with a view of the fort walls. Most rooftop cafés in Jaisalmer have the same dramatic backdrop of golden stone.' },
            { time: '11:00', type: 'activity', emoji: '🏰', title: 'Jaisalmer Fort — living fort walk', detail: 'One of the world\'s few living forts: 3,000 people live inside, including five royal palaces, Jain temples, havelis and shops. Self-guided walk (entry free to fort; ₹100 for museum). The Rajput and Jain carving detail on every surface is extraordinary. Allow 3 hours.' },
            { time: '14:30', type: 'food',     emoji: '🍛', title: 'Lunch at Saffron Restaurant (inside fort)', detail: 'Inside the fort walls. Best dal baati churma in Jaisalmer. The panchkuta curry (made from 5 desert vegetables) is unique to Rajasthan. Budget: ₹350/person.' },
            { time: '16:00', type: 'activity', emoji: '🏛️', title: 'Patwon ki Haveli + Nathmal ki Haveli', detail: 'Patwon ki Haveli: 5 interconnected havelis built by a Jain merchant in the 19th century. Staggeringly ornate sandstone facades — over 600 carved arches. Nathmal ki Haveli: carved by two brothers, each doing one half of the façade — they never match perfectly.' },
            { time: '18:00', type: 'activity', emoji: '🌇', title: 'Vyas Chatri sunset viewpoint', detail: 'Royal cenotaphs on a hill overlooking the fort and desert. The golden hour light turns everything amber — fort, desert, sky — into one continuous golden painting. The 360° desert panorama here is unrivalled.' },
            { time: '20:30', type: 'food',     emoji: '🌙', title: 'Dinner at 8 July Restaurant', detail: 'Famous rooftop with the best-value Rajasthani thali in Jaisalmer. Excellent value at ₹280/person unlimited. The owner speaks 6 languages and tells incredible Rajput history stories.' },
          ],
        },
        {
          dayNum: 2, title: 'Sam Sand Dunes & Desert Camp Overnight', subtitle: 'Camel + Stars Night', isTravel: false,
          overnight: 'Desert Camp, Sam Sand Dunes (42km from Jaisalmer)',
          timeline: [
            { time: '08:00', type: 'activity', emoji: '👻', title: 'Kuldhara village — the abandoned ghost town', detail: '25km from Jaisalmer. An entire village abandoned overnight by 1,500 families in 1825 (to escape a tyrannical ruler). Frozen in time. Roofless houses, temples, granaries, streets — all intact. Entry: ₹50. Eerie and fascinating. Go early before tour buses arrive.' },
            { time: '10:00', type: 'activity', emoji: '🦅', title: 'Desert National Park — Great Indian Bustard & blackbuck', detail: 'The last refuge of the critically endangered Great Indian Bustard (national bird). Jeep safaris (₹2,000/jeep, max 4) through the desert scrub landscape. Also: chinkaras, blackbuck, desert foxes and migratory birds in winter.' },
            { time: '13:00', type: 'food',     emoji: '🌵', title: 'Packed lunch in the desert', detail: 'Ask your hotel to pack a simple lunch: dal-roti, pickle, and a thermos of chai. Eating in the middle of the Thar desert is a simple act that feels extraordinary.' },
            { time: '15:30', type: 'travel',   emoji: '🐪', title: 'Drive to Sam Sand Dunes (42km from Jaisalmer)', detail: 'The road to Sam runs through flat desert — occasional camels by the roadside, mud hut villages, a lone tree. As you approach, the dunes rise dramatically from the flat plain.' },
            { time: '16:30', type: 'activity', emoji: '🐫', title: 'Camel safari at sunset — the desert dune experience', detail: 'Your camp operator arranges camel rides. A 1-hour camel trek over the dunes (₹400–600/person) with your guide to the highest dune for sunset. The shadow of your camel stretching across the sand is the Jaisalmer postcard.' },
            { time: '18:00', type: 'activity', emoji: '🌅', title: 'Sunset from the tallest dune at Sam', detail: 'Climb the highest dune on foot (or ride the camel up). The Sun sets directly into the sand horizon in winter months. The sky turns deep red-orange. All around you: silence and dunes. No city, no noise, no light.' },
            { time: '20:00', type: 'activity', emoji: '🎶', title: 'Desert camp — folk music, Kalbelia dance & dinner', detail: 'Back at camp. Most camps arrange a traditional Rajasthani folk show: Kalbelia snake-charmer dance (UNESCO recognised), Manganiyar musicians, fire juggling. Dinner: dal baati, kadhi, churma, kheer. Served in brass utensils around a bonfire.' },
            { time: '22:00', type: 'activity', emoji: '⭐', title: 'Stargazing in Thar — zero light pollution', detail: 'Step away from the camp 100m. The darkness is total. The Milky Way blazes overhead. The silence of the desert is so complete you can hear your own heartbeat. This is why you came to Jaisalmer.' },
          ],
        },
        {
          dayNum: 3, title: 'Desert Dawn → Fort → Departure', subtitle: 'Last Morning + Train Back', isTravel: true,
          overnight: null,
          timeline: [
            { time: '06:00', type: 'activity', emoji: '🌅', title: 'Desert sunrise from camp dune', detail: '5-min walk from camp to the dune crest. The sun rises over flat desert, turning the sand from grey to gold to amber in 10 minutes. The coldness of the desert night (desert nights are cold — carry a shawl) makes the sun feel warm as fire.' },
            { time: '08:30', type: 'food',     emoji: '🍳', title: 'Breakfast at camp + return to Jaisalmer', detail: 'Camp breakfast: aloo-puri, chai, fresh fruit. Then return 42km drive back to Jaisalmer. The morning Thar light is extraordinary.' },
            { time: '10:00', type: 'activity', emoji: '🏰', title: 'Bada Bagh — royal cenotaphs in the desert', detail: '6km north of Jaisalmer. Royal cenotaphs (chhatris) of Jaisalmer maharajas in rows, flanked by windmills and a vast empty desert. The empty beauty is hypnotic. Free entry.' },
            { time: '11:30', type: 'activity', emoji: '🛍️', title: 'Jaisalmer market — final souvenir round', detail: 'Best buys: mirror-work embroidered fabric (₹200–800/metre), hand-painted pottery, leather mojari shoes (handmade, ₹600–1,200), Rajasthani block print quilts. The market near Hanuman Chowk is excellent.' },
            { time: '13:30', type: 'food',     emoji: '🍲', title: 'Last meal — dal baati churma one final time', detail: 'You can\'t leave without one more round. Dine at Trio Restaurant near Amar Sagar Pol. Large portions, courtyard seating, live folk music at lunch. Budget: ₹300/person.' },
            { time: '15:30', type: 'travel',   emoji: '🚂', title: 'Board return train to Jaipur', detail: 'Jaisalmer station. Overnight train back. Arrive Jaipur by 6am. You\'ll be desert-gold and full of sand. Best souvenir.' },
          ],
        },
      ],
    },
  },
};

// ─── Helper: get or generate itinerary for a destination ──────────────────────

export function getDetailedItinerary(destId, duration) {
  return DETAILED_ITINERARIES[destId]?.[duration] || null;
}

// ─── Helper: count total activities from detailed itinerary ───────────────────

export function countActivitiesInItinerary(itinerary) {
  if (!itinerary) return 0;
  return itinerary.days.reduce((sum, day) =>
    sum + day.timeline.filter(t => t.type === 'activity').length, 0,
  );
}

// ─── Dynamic Itinerary Generator — works for ANY destination ──────────────────
// Generates a realistic, timed itinerary from destination metadata alone.
// Used when no hardcoded detailed itinerary exists for a destination.

function travelModeLabel(t) {
  return { train: '🚂 Train', flight: '✈️ Flight', road: '🚗 Drive', bus: '🚌 Bus' }[t] || '🚗 Drive';
}

function getTravelTime(dest, city, transport) {
  const df = dest.distanceFrom?.[city] || Object.values(dest.distanceFrom || {})[0];
  if (!df) return null;
  if (transport === 'flight' && df.flight) return { time: df.flight, km: df.km };
  if (transport === 'train' && df.train) return { time: df.train, km: df.km };
  if (transport === 'road' && df.road) return { time: df.road, km: df.km };
  if (transport === 'bus' && df.road) return { time: df.road, km: df.km };
  return { time: df.train || df.road || df.flight || '4–6h', km: df.km };
}

function hoursFromTime(t) {
  const [h, m] = t.split(':').map(Number);
  return h + m / 60;
}

function addHours(timeStr, hours) {
  const total = hoursFromTime(timeStr) + hours;
  const h = Math.floor(total) % 24;
  const m = Math.round((total % 1) * 60);
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}

// Parse a travel time string like "8-10h" or "1.5h" to a number of hours
function parseTravelHours(timeStr) {
  if (!timeStr) return 4;
  const match = timeStr.match(/(\d+\.?\d*)(?:\s*[-–]\s*(\d+\.?\d*))?h/);
  if (!match) return 4;
  const lo = parseFloat(match[1]);
  const hi = match[2] ? parseFloat(match[2]) : lo;
  return (lo + hi) / 2;
}

// Build Day 1 — travel + arrival + first evening
function buildTravelDay(dest, userCity, transport, travelInfo) {
  const travelHours = travelInfo ? parseTravelHours(travelInfo.time) : 6;
  const isLong = travelHours >= 8;
  const isOvernight = travelHours >= 10;
  const modeLabel = travelModeLabel(transport);
  const km = travelInfo?.km;

  const departTime = isOvernight ? '21:00' : isLong ? '06:00' : '07:00';
  const arriveTime = isOvernight ? '06:00' : addHours(departTime, travelHours);
  const checkinTime = addHours(arriveTime, 0.75);
  const eveningAct1 = addHours(checkinTime, 1.5);
  const eveningAct2 = addHours(eveningAct1, 1.5);
  const dinnerTime  = addHours(eveningAct2, 0.75);

  const timeline = [];

  const transportNoun = { train: 'train', flight: 'flight', road: 'drive', bus: 'bus' }[transport] || 'journey';
  const departPoint = { flight: 'airport', train: 'railway station', road: 'highway', bus: 'bus terminal' }[transport] || 'departure point';

  if (!isOvernight) {
    timeline.push({ time: departTime, type: 'prep', emoji: '🎒',
      title: `Depart ${userCity}`,
      detail: `Head to the ${departPoint}. ${km ? `Distance: ~${km} km.` : ''} Estimated travel time: ${travelInfo?.time || '~6h'}. Carry snacks, water and entertainment for the ${transportNoun}. Check route and conditions before departing.` });

    timeline.push({ time: addHours(departTime, travelHours * 0.4), type: 'food', emoji: '🍱',
      title: 'Mid-journey meal break',
      detail: `A good ${transport === 'flight' ? 'in-flight meal or airport lounge bite' : transport === 'road' ? 'highway dhaba stop — stretch your legs' : 'station or roadside stop'} along the way. Stay hydrated and take breaks on longer journeys.` });
  } else {
    timeline.push({ time: departTime, type: 'travel', emoji: '🌙',
      title: `Overnight ${transportNoun} departs ${userCity}`,
      detail: `Start your overnight ${transportNoun} to ${dest.name}. ${transport === 'road' ? 'Ensure a rested driver or split driving shifts. Night driving on mountain roads requires extra caution.' : 'Carry a light blanket, neck pillow and snacks.'} ${km ? `~${km} km journey.` : ''}` });
  }

  timeline.push({ time: arriveTime, type: 'travel', emoji: '📍',
    title: `Arrive ${dest.name}`,
    detail: `${isOvernight ? (transport === 'road' ? 'After the overnight drive, you\'re here.' : 'Wake up as you arrive.') : ''} Take a pre-booked cab or local transport to your accommodation. First impressions of ${dest.name} — take it slow and absorb the atmosphere.` });

  timeline.push({ time: checkinTime, type: 'checkin', emoji: '🏨',
    title: 'Check in & freshen up',
    detail: `Drop your bags, freshen up. Ask the hotel/homestay host for orientation — best local restaurant, must-see spots, any current weather advisories. Have a first cup of local chai or coffee.` });

  if (dest.highlights.length > 0) {
    timeline.push({ time: eveningAct1, type: 'activity', emoji: '🚶',
      title: `First look — ${dest.highlights[0]}`,
      detail: `A gentle first evening visit to one of ${dest.name}'s highlights. Don\'t rush. This is an orientation walk — get a feel of the place, note what you want to return to tomorrow.` });
  }

  if (dest.highlights.length > 1) {
    timeline.push({ time: eveningAct2, type: 'activity', emoji: '🌅',
      title: 'Sunset at the best viewpoint',
      detail: `Ask a local or your hotel host for the best sunset spot. In ${dest.name} the golden hour transforms the landscape. First sunsets are always the most vivid — you\'re still seeing everything fresh.` });
  }

  timeline.push({ time: dinnerTime, type: 'food', emoji: '🍽️',
    title: 'First dinner — go local',
    detail: `Skip chain restaurants. Ask your hotel for the most authentic local option. Order whatever the table next to you is eating. First meals in a new place are always memorable.` });

  timeline.push({ time: addHours(dinnerTime, 1.5), type: 'rest', emoji: '🌙',
    title: `Rest — ${isLong ? 'long' : 'travel'} day behind you`,
    detail: `Sleep early. Drink water. Big days ahead. Leave the window slightly open to hear the sounds of ${dest.name} at night.` });

  return {
    dayNum: 1,
    title: isOvernight ? `${userCity} → ${dest.name} (overnight)` : `${userCity} → ${dest.name}`,
    subtitle: `${modeLabel} (${travelInfo?.time || 'approx 6h'})`,
    isTravel: true,
    overnight: isOvernight ? `${transport === 'road' ? 'Overnight drive' : transport === 'bus' ? 'Bus' : transport === 'flight' ? 'Red-eye flight' : 'Train'} (en route)` : `Hotel / Homestay, ${dest.name}`,
    timeline,
  };
}

// Build a full activity day (Day 2, 3, etc.)
function buildFullDay(dest, dayNum, allHighlights, isLastFull) {
  // Each full day uses ~3 highlights, cycling through the list
  const offset = (dayNum - 2) * 3;
  const dayHighlights = allHighlights.slice(offset, offset + 3);
  if (dayHighlights.length === 0) return buildGenericFreeDay(dest, dayNum);

  const timeline = [
    { time: '07:00', type: 'food', emoji: '☕',
      title: 'Morning breakfast',
      detail: `Start the day with a proper local breakfast. In ${dest.name}, this often means ${dest.types?.includes('beaches') ? 'coconut-based dishes or seafood' : dest.types?.includes('mountains') ? 'Tibetan bread, thukpa or parathas' : dest.types?.includes('heritage') ? 'traditional thali or chaat' : 'regional specialties'}. Eat well — it\'s a full day.` },

    { time: '09:00', type: 'activity', emoji: '🗺️',
      title: dayHighlights[0],
      detail: `One of ${dest.name}'s most celebrated experiences. Go early to avoid the midday rush and get the best light for photography. Ask a local guide for context — the history and stories behind places like this are often extraordinary.` },

    { time: '11:30', type: 'activity', emoji: '🎯',
      title: dayHighlights[1] || 'Explore the local neighbourhood',
      detail: dayHighlights[1]
        ? `Take time here — this is among the top reasons people visit ${dest.name}. There\'s always more depth than a single visit reveals.`
        : `Wander without a plan for a couple of hours. The best discoveries in ${dest.name} are unplanned — a lane, a stall, a conversation with a local.` },

    { time: '13:30', type: 'food', emoji: '🍛',
      title: 'Lunch at a recommended local spot',
      detail: `Look for restaurants with local clientele, hand-written menus, and no English tourist boards outside. That\'s always the real food. Budget: ₹300–500 for a satisfying local meal in most Indian destinations.` },

    { time: '15:00', type: 'activity', emoji: '✨',
      title: dayHighlights[2] || 'Afternoon exploration',
      detail: dayHighlights[2]
        ? `Afternoon visits are often less crowded than morning. This is a good time to linger, photograph, and ask questions.`
        : `Use the afternoon for a leisurely walk through areas you noticed earlier but didn\'t have time to explore.` },

    { time: '17:30', type: 'activity', emoji: '🌅',
      title: 'Sunset spot — every destination has one',
      detail: `The best sunsets in ${dest.name} are from [ask locally]. The evening light changes everything — ruins glow, water shimmers, mountains turn purple. Plan to be at the best viewpoint 30 minutes before the sun sets.` },

    { time: '20:00', type: 'food', emoji: '🌙',
      title: isLastFull ? 'Last proper dinner in ${dest.name} — make it memorable' : 'Dinner — try something different tonight',
      detail: isLastFull
        ? `Order the dish you\'ve been eyeing all trip. Have the dessert you\'ve been saving. This is the last full night — mark it well.`
        : `Vary from last night — try a different cuisine or restaurant style. Many destinations have surprises in their culinary range.` },
  ];

  return {
    dayNum,
    title: `Day ${dayNum} in ${dest.name}`,
    subtitle: `Full Day — ${dayHighlights[0]}`,
    isTravel: false,
    overnight: `Hotel / Homestay, ${dest.name}`,
    timeline,
  };
}

function buildGenericFreeDay(dest, dayNum) {
  return {
    dayNum,
    title: `Day ${dayNum} — Slow Day in ${dest.name}`,
    subtitle: 'Explore at your own pace',
    isTravel: false,
    overnight: `Hotel / Homestay, ${dest.name}`,
    timeline: [
      { time: '08:00', type: 'food',     emoji: '☕', title: 'Late breakfast', detail: 'A slow morning. Sleep in. Eat a big breakfast. This is the day to do nothing much and enjoy it.' },
      { time: '10:00', type: 'activity', emoji: '🚶', title: 'Free exploration — no agenda', detail: `Wander ${dest.name} without a plan. The best travel memories are often the unplanned ones.` },
      { time: '13:00', type: 'food',     emoji: '🍽️', title: 'Long lunch', detail: 'Find a place you like and sit for a long time. Order too much food. Talk to the person next to you.' },
      { time: '15:00', type: 'activity', emoji: '🛍️', title: 'Shopping & souvenir hunting', detail: `${dest.name} is known for: ${dest.highlights.slice(0, 2).join(', ')}. Look for locally made goods, avoid factory-made \'traditional\' items.` },
      { time: '18:00', type: 'activity', emoji: '🌅', title: 'Sunset & evening stroll', detail: 'Evening is the best time in most Indian destinations — cooler, golden light, local life spilling onto the streets.' },
      { time: '20:30', type: 'food',     emoji: '🍜', title: 'Dinner', detail: 'The last dinner in a new place always hits differently. Savour it.' },
    ],
  };
}

function buildDepartureDay(dest, dayNum, userCity, transport, travelInfo) {
  const travelHours = travelInfo ? parseTravelHours(travelInfo.time) : 6;
  const isLong = travelHours >= 8;
  const departureTime = isLong ? '13:00' : '15:00';
  const modeLabel = travelModeLabel(transport);

  return {
    dayNum,
    title: `${dest.name} → ${userCity}`,
    subtitle: `Departure Day — ${modeLabel}`,
    isTravel: true,
    overnight: null,
    timeline: [
      { time: '07:00', type: 'activity', emoji: '🌅',
        title: `Last morning in ${dest.name}`,
        detail: `Wake up for one final sunrise or morning scene. The place you\'re leaving always looks different on the last morning — more vivid, more loved. Take your time.` },

      { time: '08:30', type: 'food', emoji: '☕',
        title: 'Final breakfast',
        detail: `Your last proper local meal. Order that thing you\'ve been meaning to try all trip. Eat slowly. You\'re in no rush until checkout.` },

      { time: '10:00', type: 'activity', emoji: '🛍️',
        title: 'Last-minute shopping & souvenirs',
        detail: `Best souvenirs are ones that are genuinely local: ${dest.highlights[0]}-related crafts, local food items (spices, sweets, snacks that travel), handmade goods from artisan markets. Skip the mass-produced tourist stuff.` },

      { time: '11:30', type: 'checkout', emoji: '🏨',
        title: 'Check out',
        detail: `Settle bills, collect luggage. Leave your hotel a review if they were good. Ask if you can keep bags there until your departure time.` },

      { time: addHours(departureTime, -1), type: 'food', emoji: '🍴',
        title: `Last meal near the ${transport === 'flight' ? 'airport' : transport === 'train' ? 'station' : 'departure point'}`,
        detail: `A final light meal before the journey home. Don\'t eat too heavy — travel on a full stomach is uncomfortable.` },

      { time: departureTime, type: 'travel', emoji: travelModeLabel(transport)[0],
        title: `${transport === 'flight' ? 'Board flight' : transport === 'train' ? 'Board train' : transport === 'road' ? 'Start drive' : 'Board bus'} to ${userCity}`,
        detail: `${travelInfo?.time ? `Estimated journey: ${travelInfo.time}.` : ''} ${transport === 'road' ? 'Take regular breaks, especially on mountain roads. Fuel up before leaving.' : ''} You\'ll arrive home carrying ${dest.name} in a way that\'s hard to describe.` },

      { time: addHours(departureTime, travelHours), type: 'travel', emoji: '🏠',
        title: `Arrive ${userCity} — home`,
        detail: `Back. Everything looks the same. But you\'re not quite the same. That\'s what a good trip does.` },
    ],
  };
}

/**
 * generateDynamicItinerary — creates a full timed itinerary for ANY destination.
 *
 * For destinations that have a hardcoded entry in DETAILED_ITINERARIES, that is
 * returned instead (richer content). For all others, this function generates a
 * realistic day-by-day schedule from the destination's metadata.
 *
 * @param {object} dest       - destination object from appData.js
 * @param {number} duration   - total trip days
 * @param {string} userCity   - user's starting city
 * @param {string} transport  - 'train' | 'flight' | 'road' | 'bus'
 * @returns {object}          - full itinerary object compatible with DetailedItineraryModal
 */
export function generateDynamicItinerary(dest, duration, userCity, transport) {
  // Always generate dynamically based on user's actual city & transport.
  // Hardcoded itineraries are no longer used — they had baked-in cities
  // that didn't match the user's input. Real itineraries come from Apify
  // via the edge function; this is the local fallback.

  // ── Generate dynamically ───────────────────────────────────────────────────
  const travelInfo = getTravelTime(dest, userCity, transport);
  const travelHours = travelInfo ? parseTravelHours(travelInfo.time) : 6;
  const isOvernightTravel = travelHours >= 10;

  // Spread highlights across full days (excluding travel days)
  const allHighlights = [
    ...dest.highlights,
    ...dest.highlights, // repeat so we never run out
  ];

  const days = [];

  // Day 1: travel + first evening
  days.push(buildTravelDay(dest, userCity, transport, travelInfo));

  // Middle days: full activity days
  const fullDays = isOvernightTravel ? duration - 1 : duration - 2;
  for (let d = 0; d < Math.max(1, fullDays); d++) {
    const isLast = d === Math.max(1, fullDays) - 1;
    days.push(buildFullDay(dest, d + 2, allHighlights, isLast));
  }

  // Last day: departure (only if not overnight return)
  if (duration > 2 || !isOvernightTravel) {
    days.push(buildDepartureDay(dest, duration, userCity, transport, travelInfo));
  }

  // Ensure day numbers are sequential
  days.forEach((d, i) => { d.dayNum = i + 1; });

  const destDays = Math.max(1, duration - (isOvernightTravel ? 1 : 1.5));
  const totalActivities = days.reduce((s, d) =>
    s + d.timeline.filter(t => t.type === 'activity').length, 0,
  );

  return {
    fromCity: userCity,
    transport,
    destinationDays: destDays,
    nights: duration - 1,
    totalActivities,
    summary: `${duration} days · ${duration - 1} nights · ${travelModeLabel(transport)} from ${userCity} · ${dest.tagline}`,
    days,
  };
}
