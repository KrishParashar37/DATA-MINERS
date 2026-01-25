import tajMahal from './assets/images/tajmahal1.jpeg';
import qutubMinar from './assets/images/Qutubminar1.jpeg';
import redFort from './assets/images/Redfort.jpeg';
import ajantaCaves from './assets/images/AjantaCaves1.jpeg';
import elloraCaves from './assets/images/ElloraCaves.jpeg';
import konarkTemple from './assets/images/KonarkSuntemple1.jpeg';
import khajuraho from './assets/images/Khajurao1.jpeg';
import hampi from './assets/images/Humpi.jpg.jpeg';
import sanchiStupa from './assets/images/Sachi Stupa.jpg.jpeg';
import kaziranga from './assets/images/kaziranga 2.jpg.jpeg';

export const heritages = [
  {
    id: 1,
    name: "Taj Mahal",
    location: "Agra, UP",
    category: "Monument",
    image: tajMahal,
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
    description: "A Buddhist complex, famous for its Great Stupa, on a hilltop at Sanchi Town. A masterpiece of Buddhist architecture.",
    era: "3rd century BC",
    coordinates: { lat: 23.4813, lng: 77.7399 },
  },
];
