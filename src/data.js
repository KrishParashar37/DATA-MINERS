import tajMahal from './assets/images/tajmahal1.jpeg';
// Taj Mahal Gallery
import taj1 from './assets/images/Images/Taj mahal/Taj Mahal Sunrise Tour from Delhi by Akbran Tours Company_.jpg';
import taj2 from './assets/images/Images/Taj mahal/Taj Mahal.jpg';

import qutubMinar from './assets/images/Qutubminar1.jpeg';
// Qutub Gallery
import qutub1 from './assets/images/Images/Qutub minor/Qutub Minar and Complex.jpg';
import qutub2 from './assets/images/Images/Qutub minor/download (1).jpg';

import redFort from './assets/images/Redfort.jpeg';
// Red Fort Gallery
import redfort1 from './assets/images/Images/Red Fort/First time in New Delhi_ How to survive (and have a good time).jpg';
import redfort2 from './assets/images/Images/Red Fort/download (2).jpg';

import ajantaCaves from './assets/images/AjantaCaves1.jpeg';
// Ajanta Gallery
import ajanta1 from './assets/images/Images/Ajanta caves/Ajanta Caves, Maharashtra.jpg';
import ajanta2 from './assets/images/Images/Ajanta caves/Ajanta Caves.jpg';

import elloraCaves from './assets/images/ElloraCaves.jpeg';
// Ellora Gallery
import ellora1 from './assets/images/Images/Ellora caves/Ellora Caves.jpg.jpeg';
import ellora2 from './assets/images/Images/Ellora caves/Kailash Temple, Ellora Caves, India.jpg';
import ellora3 from './assets/images/Images/Ellora caves/The Ellora Caves Complex.jpg';

import konarkTemple from './assets/images/KonarkSuntemple1.jpeg';
// Konark Gallery
import konark1 from './assets/images/Images/Sun temple/Konark Sun temple.jpg (3).jpeg';
import konark2 from './assets/images/Images/Sun temple/Konark sun temple (2).jpg';

import khajuraho from './assets/images/Khajurao1.jpeg';
// Khajuraho Gallery
import khajuraho1 from './assets/images/Images/Khajurao/Temples Tour of Khajuraho.jpg';
import khajuraho2 from './assets/images/Images/Khajurao/download (3).jpg';

import hampi from './assets/images/Humpi.jpg.jpeg';
// Hampi Gallery
import hampi1 from './assets/images/Images/Hampi/The best time to visit Hampi.jpg';
import hampi2 from './assets/images/Images/Hampi/hampi stone chariot the antique stone art piece from unique angle with amazing blue sky image is taken at hampi karnataka india_ it is the most impressive and truly splendid architecture in hampi_.jpg';

import sanchiStupa from './assets/images/Sachi Stupa.jpg.jpeg';
// Sanchi Gallery
import sanchi1 from './assets/images/Images/Sachi stup/Sanchi.jpg';

import kaziranga from './assets/images/kaziranga 2.jpg.jpeg';
// Kaziranga Gallery
import kaziranga1 from './assets/images/Images/Kaji ranga national park/kaziranga_main.jpg';


export const heritages = [
  {
    id: 1,
    name: "Taj Mahal",
    location: "Agra, UP",
    category: "Monument",
    image: tajMahal, // Main Thumbnail
    images: [tajMahal, taj1, taj2], // Gallery
    description: "The iconic white marble symbol of love, built by Mughal Emperor Shah Jahan.",
    era: "1632–1653",
    coordinates: { lat: 27.1751, lng: 78.0421 }, // Taj Mahal
  },
  {
    id: 2,
    name: "Qutub Minar",
    location: "Delhi",
    category: "Monument",
    image: qutubMinar,
    images: [qutubMinar, qutub1, qutub2],
    description: "The world's tallest brick minaret, a masterpiece of Indo-Islamic architecture.",
    era: "1192",
    coordinates: { lat: 28.5244, lng: 77.1855 },
  },
  {
    id: 3,
    name: "Red Fort",
    location: "Delhi",
    category: "Monument",
    image: redFort,
    images: [redFort, redfort1, redfort2],
    description: "A historic fort made of red sandstone, symbolizing Mughal power and Indian independence.",
    era: "1639",
    coordinates: { lat: 28.6562, lng: 77.2410 },
  },
  {
    id: 4,
    name: "Ajanta Caves",
    location: "Maharashtra",
    category: "Art",
    image: ajantaCaves,
    images: [ajantaCaves, ajanta1, ajanta2],
    description: "Ancient Buddhist rock-cut caves famous for their magnificent paintings and sculptures.",
    era: "2nd century BC",
    coordinates: { lat: 20.5519, lng: 75.7033 },
  },
  {
    id: 5,
    name: "Ellora Caves",
    location: "Maharashtra",
    category: "Monument",
    image: elloraCaves,
    images: [elloraCaves, ellora1, ellora2, ellora3],
    description: "A unique complex featuring Hindu, Buddhist, and Jain caves in one place.",
    era: "600–1000 AD",
    coordinates: { lat: 20.0268, lng: 75.1771 },
  },
  {
    id: 6,
    name: "Konark Sun Temple",
    location: "Odisha",
    category: "Monument",
    image: konarkTemple,
    images: [konarkTemple, konark1, konark2],
    description: "A 13th-century temple designed in the shape of a gigantic chariot of the Sun God, Surya.",
    era: "1250",
    coordinates: { lat: 19.8876, lng: 86.0945 },
  },
  {
    id: 7,
    name: "Khajuraho Temples",
    location: "MP",
    category: "Art",
    image: khajuraho,
    images: [khajuraho, khajuraho1, khajuraho2],
    description: "A group of monuments famous for their intricate and detailed Nagara-style architectural symbolism and erotic sculptures.",
    era: "950–1050",
    coordinates: { lat: 24.8318, lng: 79.9199 },
  },
  {
    id: 8,
    name: "Hampi",
    location: "Karnataka",
    category: "Monument",
    image: hampi,
    images: [hampi, hampi1, hampi2],
    description: "The magnificent ruins of the Vijayanagara Empire, featuring temples, markets, and monuments.",
    era: "14th century",
    coordinates: { lat: 15.3350, lng: 76.4600 },
  },
  {
    id: 9,
    name: "Kaziranga National Park",
    location: "Assam",
    category: "Nature",
    image: kaziranga,
    images: [kaziranga, kaziranga1],
    description: "A world heritage site famous for hosting two-thirds of the world's great one-horned rhinoceroses.",
    era: "Established 1905",
    coordinates: { lat: 26.5775, lng: 93.1711 },
  },
  {
    id: 10,
    name: "Sanchi Stupa",
    location: "MP",
    category: "Monument",
    image: sanchiStupa,
    images: [sanchiStupa, sanchi1],
    description: "A Buddhist complex, famous for its Great Stupa, on a hilltop at Sanchi Town. A masterpiece of Buddhist architecture.",
    era: "3rd century BC",
    coordinates: { lat: 23.4813, lng: 77.7399 },
  },
];
