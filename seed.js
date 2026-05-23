require('dotenv').config();
const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  title:       { type: String, required: true },
  description: { type: String, required: true },
  price:       { type: Number, required: true },
  location:    { type: String, required: true },
  beds:        { type: Number, default: 1 },
  baths:       { type: Number, default: 1 },
  area:        { type: String, default: '' },
  tag:         { type: String, default: 'Luxury' },
  category:    { type: String, default: 'Residential' },
  imageUrl:    { type: String, default: null },
}, { timestamps: true });

const Property = mongoose.model('Property', propertySchema);

const properties = [
  { title: 'Kanke Heritage Bungalow', location: 'Kanke Road, Ranchi', price: 0.4, beds: 3, baths: 2, area: '1,800 sq ft', description: 'Charming colonial-era bungalow set on a lush half-acre plot with mature sal trees and a manicured garden.', imageUrl: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=800&auto=format&fit=crop', tag: 'Heritage', category: 'Residential' },
  { title: 'Doranda Luxe Apartment', location: 'Doranda, Ranchi', price: 0.7, beds: 3, baths: 3, area: '1,650 sq ft', description: 'Premium gated community apartment with clubhouse, gym, and panoramic views of the Ranchi Lake.', imageUrl: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=800&auto=format&fit=crop', tag: 'Lake View', category: 'Residential' },
  { title: 'Harmu Greens Villa', location: 'Harmu, Ranchi', price: 1.5, beds: 4, baths: 4, area: '3,200 sq ft', description: 'Contemporary duplex villa with private terrace garden, Italian marble flooring, and modular smart-home tech.', imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=800&auto=format&fit=crop', tag: 'Smart Home', category: 'Residential' },
  { title: 'Morabadi Hill Mansion', location: 'Morabadi, Ranchi', price: 3.8, beds: 5, baths: 6, area: '5,800 sq ft', description: 'Hilltop mansion with 360\u00b0 valley views, infinity-edge pool, private cinema, and a rooftop observatory.', imageUrl: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=800&auto=format&fit=crop', tag: 'Hilltop', category: 'Residential' },
  { title: 'Ashok Nagar Penthouse', location: 'Ashok Nagar, Ranchi', price: 6.2, beds: 4, baths: 5, area: '4,500 sq ft', description: 'Exclusive sky penthouse with double-height living, private elevator, wraparound terrace, and Parijat garden.', imageUrl: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=800&auto=format&fit=crop', tag: 'Sky Living', category: 'Residential' },
  { title: 'Main Road Retail Space', location: 'Main Road, Ranchi', price: 0.3, beds: 0, baths: 1, area: '800 sq ft', description: 'Prime ground-floor showroom on Ranchi\u2019s busiest commercial stretch with 25 ft frontage and rear parking.', imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop', tag: 'Showroom', category: 'Commercial' },
  { title: 'Nucleus Tower Office', location: 'Circular Road, Ranchi', price: 1.2, beds: 0, baths: 2, area: '2,200 sq ft', description: 'Fully-furnished plug-and-play office suite in a Grade-A tower with high-speed lifts and 24/7 power backup.', imageUrl: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=800&auto=format&fit=crop', tag: 'Grade-A', category: 'Commercial' },
  { title: 'Tata Centre Business Hub', location: 'Kadru, Ranchi', price: 4.5, beds: 0, baths: 4, area: '8,500 sq ft', description: 'Full-floor corporate office with server room, boardroom, pantry, and dedicated visitor lobby.', imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop', tag: 'Corporate', category: 'Commercial' },
  { title: 'Namkum Farmhouse Plot', location: 'Namkum, Ranchi', price: 0.2, beds: 0, baths: 0, area: '5,000 sq ft', description: 'RERA-approved residential plot near the upcoming Ring Road with clear title and east-facing orientation.', imageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=800&auto=format&fit=crop', tag: 'RERA', category: 'Plots & Land' },
  { title: 'Ormanjhi Hills Land', location: 'Ormanjhi, Ranchi', price: 0.9, beds: 0, baths: 0, area: '1 Acre', description: 'Scenic hilltop land parcel ideal for a weekend retreat or boutique resort. Surrounded by dense forest.', imageUrl: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=800&auto=format&fit=crop', tag: 'Hilltop', category: 'Plots & Land' },
  { title: 'Pundag Premium Plot', location: 'Pundag, Ranchi', price: 2.5, beds: 0, baths: 0, area: '10,000 sq ft', description: 'Corner plot in a premium gated township with underground utilities, wide roads, and a central park view.', imageUrl: 'https://images.unsplash.com/photo-1628624747186-a941c476b7ef?q=80&w=800&auto=format&fit=crop', tag: 'Gated Township', category: 'Plots & Land' },
  { title: 'Tatisilwai Industrial Shed', location: 'Tatisilwai, Ranchi', price: 0.4, beds: 0, baths: 1, area: '3,000 sq ft', description: 'Ready-to-operate industrial shed with 20 ft clear height, loading dock, and 3-phase power connection.', imageUrl: 'https://images.unsplash.com/photo-1565610222536-ef125c59da2e?q=80&w=800&auto=format&fit=crop', tag: 'Ready Unit', category: 'Industrial' },
  { title: 'Adityapur Warehouse Complex', location: 'Adityapur, Ranchi', price: 1.8, beds: 0, baths: 2, area: '12,000 sq ft', description: 'Modern logistics warehouse with cold storage zone, truck-bay access, and proximity to NH-33.', imageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=800&auto=format&fit=crop', tag: 'Logistics', category: 'Industrial' },
  { title: 'Silli Manufacturing Park', location: 'Silli, Ranchi', price: 5.5, beds: 0, baths: 3, area: '2 Acres', description: 'Fully developed manufacturing campus with admin block, workers\u2019 quarters, and effluent treatment plant.', imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop', tag: 'Campus', category: 'Industrial' },
  { title: 'Gomti Nagar Elegance Flat', location: 'Gomti Nagar, Lucknow', price: 0.5, beds: 2, baths: 2, area: '1,200 sq ft', description: 'Tastefully designed 2 BHK in a landscaped society with swimming pool, jogging track, and kids\u2019 zone.', imageUrl: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=800&auto=format&fit=crop', tag: 'Society', category: 'Residential' },
  { title: 'Hazratganj Art Deco Flat', location: 'Hazratganj, Lucknow', price: 0.9, beds: 3, baths: 3, area: '2,100 sq ft', description: 'Restored Art Deco apartment in the cultural heart of Lucknow with hand-carved jaali balconies.', imageUrl: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=800&auto=format&fit=crop', tag: 'Art Deco', category: 'Residential' },
  { title: 'Sushant Golf City Villa', location: 'Sushant Golf City, Lucknow', price: 2.2, beds: 4, baths: 4, area: '3,800 sq ft', description: 'Golf-course-facing designer villa with private garden, home theater, and imported oak-wood interiors.', imageUrl: 'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?q=80&w=800&auto=format&fit=crop', tag: 'Golf View', category: 'Residential' },
  { title: 'Aliganj Royal Mansion', location: 'Aliganj, Lucknow', price: 4.0, beds: 5, baths: 5, area: '6,000 sq ft', description: 'Nawabi-inspired mansion with courtyard fountain, handloom silk curtains, and underground wine cellar.', imageUrl: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=800&auto=format&fit=crop', tag: 'Royal', category: 'Residential' },
  { title: 'Vibhuti Khand Sky Residence', location: 'Vibhuti Khand, Lucknow', price: 7.5, beds: 4, baths: 5, area: '5,200 sq ft', description: 'Ultra-premium sky residence with private rooftop lounge, marble bath suites, and concierge service.', imageUrl: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=800&auto=format&fit=crop', tag: 'Premium', category: 'Residential' },
  { title: 'Aminabad Market Shop', location: 'Aminabad, Lucknow', price: 0.3, beds: 0, baths: 1, area: '600 sq ft', description: 'Heritage bazaar shop with high footfall, double shutter, and mezzanine storage in Lucknow\u2019s oldest market.', imageUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=800&auto=format&fit=crop', tag: 'High Footfall', category: 'Commercial' },
  { title: 'Sahara Tower Office Suite', location: 'Shahnajaf Road, Lucknow', price: 1.5, beds: 0, baths: 2, area: '2,800 sq ft', description: 'Iconic tower office with floor-to-ceiling glass, central AC, and a conference suite overlooking the city.', imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop', tag: 'Iconic', category: 'Commercial' },
  { title: 'Lulu Mall Anchor Space', location: 'Sushant Golf City, Lucknow', price: 8.0, beds: 0, baths: 4, area: '12,000 sq ft', description: 'Premium anchor retail space inside India\u2019s largest mall with assured footfall and valet parking access.', imageUrl: 'https://images.unsplash.com/photo-1567449303078-57ad995bd329?q=80&w=800&auto=format&fit=crop', tag: 'Anchor Retail', category: 'Commercial' },
  { title: 'Faizabad Road Plot', location: 'Faizabad Road, Lucknow', price: 0.2, beds: 0, baths: 0, area: '2,400 sq ft', description: 'Budget-friendly residential plot near the metro corridor with clear title and immediate possession.', imageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=800&auto=format&fit=crop', tag: 'Metro Access', category: 'Plots & Land' },
  { title: 'Chinhat Farmland', location: 'Chinhat, Lucknow', price: 0.7, beds: 0, baths: 0, area: '1.5 Acres', description: 'Fertile agricultural farmland along the highway, ideal for organic farming or weekend country estate.', imageUrl: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=800&auto=format&fit=crop', tag: 'Farmland', category: 'Plots & Land' },
  { title: 'IIM Road Premium Plot', location: 'IIM Road, Lucknow', price: 3.2, beds: 0, baths: 0, area: '8,000 sq ft', description: 'High-value corner plot in Lucknow\u2019s most sought-after institutional belt with wide frontage.', imageUrl: 'https://images.unsplash.com/photo-1628624747186-a941c476b7ef?q=80&w=800&auto=format&fit=crop', tag: 'Premium', category: 'Plots & Land' },
  { title: 'Amausi Industrial Unit', location: 'Amausi, Lucknow', price: 0.5, beds: 0, baths: 1, area: '4,000 sq ft', description: 'Airport-adjacent industrial unit with 24/7 security, heavy-vehicle access, and UPSIDC clearance.', imageUrl: 'https://images.unsplash.com/photo-1565610222536-ef125c59da2e?q=80&w=800&auto=format&fit=crop', tag: 'Airport Zone', category: 'Industrial' },
  { title: 'Chinhat IT Park Space', location: 'Chinhat, Lucknow', price: 2.0, beds: 0, baths: 2, area: '6,500 sq ft', description: 'Modern IT/ITES-ready office space in a STPI-approved park with optical fiber and UPS backup.', imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop', tag: 'IT Park', category: 'Industrial' },
  { title: 'Unnao Industrial Campus', location: 'Unnao Highway, Lucknow', price: 6.0, beds: 0, baths: 4, area: '3 Acres', description: 'Sprawling industrial campus on the Lucknow\u2013Kanpur corridor with rail siding and water treatment plant.', imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop', tag: 'Campus', category: 'Industrial' },
  { title: 'The Amber Crest Villa', location: 'Alibaug, Maharashtra', price: 12.5, beds: 4, baths: 5, area: '5,500 sq ft', description: 'Elegant beachfront brutalist villa with a private infinity pool and uninterrupted Arabian Sea views.', imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800&auto=format&fit=crop', tag: 'Beachfront', category: 'Residential' },
  { title: 'Tuscan Meadows Estate', location: 'Nandi Hills, Bengaluru', price: 8.2, beds: 3, baths: 4, area: '4,200 sq ft', description: 'Warm stone architectural masterpiece surrounded by private vineyards and mist-covered hills.', imageUrl: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=800&auto=format&fit=crop', tag: 'Vineyard', category: 'Residential' },
  { title: 'The Obsidian Pavilion', location: 'Sohna Hills, Gurugram', price: 15.0, beds: 5, baths: 6, area: '7,200 sq ft', description: 'Ultra-modern black glass pavilion overlooking the valley. Features zero-edge pool and private theater.', imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop', tag: 'Modernist', category: 'Commercial' },
  { title: 'Ganges Riverfront Mansion', location: 'Varanasi, Uttar Pradesh', price: 6.8, beds: 3, baths: 3, area: '3,800 sq ft', description: 'Editorial heritage restoration with wide stone terraces opening directly onto panoramic holy river views.', imageUrl: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=800&auto=format&fit=crop', tag: 'Heritage', category: 'Residential' },
  { title: 'Emerald Canopy Cabin', location: 'Wayanad, Kerala', price: 5.5, beds: 2, baths: 3, area: '2,900 sq ft', description: 'High-end glass-and-steel cabin raised on stilts, completely enveloped by dense rainforest canopy.', imageUrl: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?q=80&w=800&auto=format&fit=crop', tag: 'Eco-Luxury', category: 'Plots & Land' },
  { title: 'Aurelia Sky Penthouse', location: 'Worli, Mumbai', price: 24.0, beds: 4, baths: 5, area: '6,100 sq ft', description: 'Sky-high duplex penthouse featuring double-height glass walls and extensive sky gardens facing the sea.', imageUrl: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=800&auto=format&fit=crop', tag: 'Sky Duplex', category: 'Residential' },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    await Property.deleteMany({});
    console.log('Cleared existing properties');

    const result = await Property.insertMany(properties);
    console.log(`Seeded ${result.length} properties`);

    await mongoose.disconnect();
    console.log('Done');
  } catch (err) {
    console.error('Seed error:', err);
    process.exit(1);
  }
}

seed();
