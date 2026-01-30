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
import hampi2 from './assets/images/Humpi.jpg.jpeg';

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
    description: "The iconic white marble mausoleum stands as an eternal testament to love. Built by Mughal Emperor Shah Jahan in memory of his beloved wife Mumtaz Mahal, who died during childbirth in 1631. Over 20,000 artisans from across India, Persia, and Central Asia worked for 22 years to complete this masterpiece. The monument's beauty changes throughout the day - appearing pinkish in the morning, milky white in the evening, and golden under moonlight. Legend says Shah Jahan planned a black marble tomb for himself across the river, connected by a bridge, but was imprisoned by his son before he could realize this dream. The intricate marble inlay work features 28 types of precious and semi-precious stones. The four minarets are designed to fall outward in case of an earthquake, protecting the main tomb.",
    era: "1632–1653",
    coordinates: { lat: 27.1751, lng: 78.0421 }, // Taj Mahal
    ticketPrice: 50, // Indian citizens
  },
  {
    id: 2,
    name: "Qutub Minar",
    location: "Delhi",
    category: "Monument",
    image: qutubMinar,
    images: [qutubMinar, qutub1, qutub2],
    description: "Standing tall at 73 meters, Qutub Minar is the world's tallest brick minaret and a triumph of Indo-Islamic architecture. Built by Qutb-ud-din Aibak in 1192 to celebrate the victory over the last Hindu kingdom in Delhi, it was completed by his successor Iltutmish. The tower has five distinct stories, each marked by a projecting balcony. The lowest three stories are made of red sandstone, while the fourth and fifth stories are of marble and sandstone. The nearby Iron Pillar, dating back to 4th century AD, has never rusted despite Delhi's harsh climate - a testament to ancient Indian metallurgical skills. According to legend, if you can encircle the pillar with your arms behind your back, your wish will come true. The complex also houses the Quwwat-ul-Islam Mosque, one of the earliest mosques built in India.",
    era: "1192",
    coordinates: { lat: 28.5244, lng: 77.1855 },
    ticketPrice: 35,
  },
  {
    id: 3,
    name: "Red Fort",
    location: "Delhi",
    category: "Monument",
    image: redFort,
    images: [redFort, redfort1, redfort2],
    description: "The magnificent Red Fort served as the residence of Mughal emperors for nearly 200 years. Built by Shah Jahan when he shifted his capital from Agra to Delhi, the fort gets its name from the massive red sandstone walls. The Diwan-i-Khas (Hall of Private Audiences) once housed the legendary Peacock Throne, studded with countless precious gems. The famous Persian inscription reads: 'If there is paradise on Earth, it is here, it is here, it is here.' The fort witnessed the last Mughal emperor Bahadur Shah Zafar's surrender to the British in 1857. Every year on Independence Day, the Prime Minister of India hoists the national flag at its main gate and addresses the nation. The fort complex includes palaces, pavilions, and gardens built in a blend of Persian, Timurid, and Indian architectural styles.",
    era: "1639",
    coordinates: { lat: 28.6562, lng: 77.2410 },
    ticketPrice: 35,
  },
  {
    id: 4,
    name: "Ajanta Caves",
    location: "Maharashtra",
    category: "Art",
    image: ajantaCaves,
    images: [ajantaCaves, ajanta1, ajanta2],
    description: "Hidden in a horseshoe-shaped gorge, the 30 rock-cut Buddhist caves of Ajanta remained lost to the world for over 1000 years until British officer John Smith stumbled upon them during a hunting expedition in 1819. Created between 2nd century BCE and 6th century CE, these caves served as prayer halls and monasteries for Buddhist monks. The exquisite murals depicting the life of Buddha and Jataka tales are considered masterpieces of Buddhist religious art. The paintings were created using natural pigments that have retained their vibrant colors for over 2000 years. Cave 1 houses the famous Padmapani (lotus-bearer) and Vajrapani (thunderbolt-bearer) murals. The intricate carvings and sculptures showcase the evolution of Buddhist art over eight centuries. UNESCO declared it a World Heritage Site in 1983.",
    era: "2nd century BC",
    coordinates: { lat: 20.5519, lng: 75.7033 },
    ticketPrice: 40,
  },
  {
    id: 5,
    name: "Ellora Caves",
    location: "Maharashtra",
    category: "Monument",
    image: elloraCaves,
    images: [elloraCaves, ellora1, ellora2, ellora3],
    description: "Ellora represents the epitome of Indian rock-cut architecture, featuring 34 caves showcasing Buddhist, Hindu, and Jain monuments carved between the 6th and 10th centuries. The crown jewel is Cave 16, the magnificent Kailasa Temple, carved from a single rock - the largest monolithic structure in the world. It took 100 years and three generations of workers to excavate 200,000 tons of rock to create this architectural marvel dedicated to Lord Shiva. The temple is twice the area of the Parthenon in Athens and 1.5 times its height. The complex demonstrates the religious harmony of ancient India, where three major religions coexisted peacefully. Cave 10 houses the only Buddhist chaitya (prayer hall) in Ellora, while the Jain caves display intricate carvings of Tirthankaras and detailed ceiling paintings.",
    era: "600–1000 AD",
    coordinates: { lat: 20.0268, lng: 75.1771 },
    ticketPrice: 40,
  },
  {
    id: 6,
    name: "Konark Sun Temple",
    location: "Odisha",
    category: "Monument",
    image: konarkTemple,
    images: [konarkTemple, konark1, konark2],
    description: "Known as the 'Black Pagoda' by European sailors, the Konark Sun Temple is designed as a colossal chariot of the Sun God Surya, complete with 24 intricately carved stone wheels, each about 10 feet in diameter, pulled by seven horses. Built by King Narasimhadeva I of the Eastern Ganga Dynasty, the temple was constructed using approximately 1,200 artisans over 12 years. The wheels function as sundials, accurately calculating time down to the minute. Legend says the temple was built using magnetic stones, causing ships' compasses to malfunction, leading to numerous shipwrecks. The erotic sculptures here rival those of Khajuraho. The temple was designed so that the first rays of sunrise would illuminate the main deity. Though the main sanctum collapsed centuries ago, the remaining structure showcases the pinnacle of Kalinga architecture.",
    era: "1250",
    coordinates: { lat: 19.8876, lng: 86.0945 },
    ticketPrice: 40,
  },
  {
    id: 7,
    name: "Khajuraho Temples",
    location: "MP",
    category: "Art",
    image: khajuraho,
    images: [khajuraho, khajuraho1, khajuraho2],
    description: "The Khajuraho Group of Monuments represents the zenith of temple architecture in India. Built by the Chandela dynasty between 950-1050 CE, originally comprising 85 temples, only 25 survive today. While famous for erotic sculptures that cover only 10% of the carvings, the temples actually depict various aspects of life - warfare, music, dance, spiritual teachings, and everyday activities. The erotic art represents the tantric tradition and celebrates the union of cosmic energies. The Kandariya Mahadev Temple, the largest and most ornate, stands 31 meters tall with over 900 sculptures. These temples were lost to the world for centuries, hidden by dense forests, until rediscovered by British engineer T.S. Burt in 1838. The temples are aligned to astronomical principles, with the main deity facing the sunrise.",
    era: "950–1050",
    coordinates: { lat: 24.8318, lng: 79.9199 },
    ticketPrice: 40,
  },
  {
    id: 8,
    name: "Hampi",
    location: "Karnataka",
    category: "Monument",
    image: hampi,
    images: [hampi, hampi1, hampi2],
    description: "Once the prosperous capital of the mighty Vijayanagara Empire, Hampi was one of the richest cities in the world during the 14th-16th centuries. Spread across 4,100 hectares with over 1,600 monuments, it rivaled Rome in grandeur. The city was sacked by the Deccan Sultanates in 1565, leaving behind haunting ruins amidst a surreal boulder-strewn landscape. The Virupaksha Temple, still functioning after 1,300 years, features a 50-meter tower. The Stone Chariot at Vittala Temple is an iconic symbol of Hampi, and the temple's musical pillars produce different musical notes when struck. The ancient aqueduct system and sophisticated water management techniques showcase the empire's engineering prowess. According to Hindu mythology, this is Kishkinda, the monkey kingdom mentioned in the Ramayana. Persian and Portuguese travelers described it as one of the most beautiful cities in the world.",
    era: "14th century",
    coordinates: { lat: 15.3350, lng: 76.4600 },
    ticketPrice: 40,
  },
  {
    id: 9,
    name: "Kaziranga National Park",
    location: "Assam",
    category: "Nature",
    image: kaziranga,
    images: [kaziranga, kaziranga1],
    description: "Kaziranga National Park is a conservation success story that has brought the Greater One-Horned Rhinoceros back from the brink of extinction. Home to two-thirds of the world's great one-horned rhinoceros population (approximately 2,400 individuals), this UNESCO World Heritage Site spans 430 square kilometers of floodplains in the Brahmaputra River basin. The park also hosts the highest density of tigers among protected areas in the world and is home to elephants, wild water buffalo, and swamp deer. Every year during monsoons, the Brahmaputra floods the park, forcing animals to migrate to higher grounds in the Karbi Anglong hills. The park's conservation efforts began in 1905 when Lord Curzon's wife, Mary Curzon, was moved by the plight of rhinos and persuaded her husband to protect the area. Elephant and jeep safaris offer glimpses of diverse wildlife, making it a paradise for nature enthusiasts and photographers.",
    era: "Established 1905",
    coordinates: { lat: 26.5775, lng: 93.1711 },
    ticketPrice: 100, // Safari charges additional
  },
  {
    id: 10,
    name: "Sanchi Stupa",
    location: "MP",
    category: "Monument",
    image: sanchiStupa,
    images: [sanchiStupa, sanchi1],
    description: "The Great Stupa at Sanchi is the oldest stone structure in India and one of the most important Buddhist monuments. Commissioned by Emperor Ashoka in the 3rd century BCE after his conversion to Buddhism, it was built to house the relics of Buddha. The stupa's four ornate gateways (toranas) are masterpieces of early Indian sculpture, depicting scenes from Buddha's life and Jataka tales. Interestingly, Buddha is never shown in human form here, represented instead by symbols like the Bodhi tree, footprints, or an empty throne. The site was abandoned after the 13th century and remained forgotten, overgrown by vegetation until British archaeologist General Alexander Cunningham rediscovered it in 1818. The hemispherical dome symbolizes the cosmic egg, while the three-tiered umbrella on top represents the three jewels of Buddhism - Buddha, Dharma, and Sangha. The site includes over 50 monuments spanning 1,200 years of Buddhist architectural evolution.",
    era: "3rd century BC",
    coordinates: { lat: 23.4813, lng: 77.7399 },
    ticketPrice: 30,
  },
];
