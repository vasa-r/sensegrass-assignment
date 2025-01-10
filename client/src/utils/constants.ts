import Logo from "../assets/logo-transparent.webp";

import SUMINTER from "../assets/suminter-india-organics.webp";
import PHALADA from "../assets/phalada-agro.png";
import TATTAVA from "../assets/organic-tattava.webp";
import BIO from "../assets/bio-basics.jpeg";
import CONSCIOUS from "../assets/conscious-food.png";

import USER1 from "../assets/users/user1.png";
import USER2 from "../assets/users/user2.png";
import USER3 from "../assets/users/user3.png";
import USER4 from "../assets/users/user4.png";
import USER5 from "../assets/users/user5.png";
import USER6 from "../assets/users/user6.png";
import USER7 from "../assets/users/user7.png";
import USER8 from "../assets/users/user8.png";

import Leaf from "../assets/white-leaf.png";
import Truck from "../assets/tractor.png";
import Tree from "../assets/tree.png";
import Facility from "../assets/settings.png";

export const navLinks = [
  { name: "Product", to: "/", id: 1 },
  { name: "Help", to: "/", id: 2 },
  { name: "Pricing", to: "/", id: 3 },
  { name: "Twitter", to: "/", id: 4 },
];

export const heroSection = {
  logo: Logo,
  title: "AI Meets Agriculture: Smarter Decisions, Better Yields",
  subTitle:
    "Simplify farm management using AI-based analytics for smarter crop decisions.",
  shortTitle: "Crafted for food producers.",
};

export const companyData = {
  heading: "Helping Farmers & Companies for better agri-CULTURE",
  companies: [
    {
      id: 1,
      logo: SUMINTER,
      name: "Suminter Organics",
    },
    {
      id: 2,
      logo: PHALADA,
      name: "Phalada Agro",
    },
    {
      id: 3,
      logo: TATTAVA,
      name: "Organic Tattava",
    },
    {
      id: 4,
      logo: BIO,
      name: "Bio Basics",
    },
    {
      id: 5,
      logo: CONSCIOUS,
      name: "Conscious Food",
    },
  ],
};

export const visualize = {
  heading: "Visualize your Field and Crops Health",
  subHead:
    "Gain a Deeper Understanding of Your Field's Condition and Crop Health with Advanced Monitoring Tools Designed to Optimize Growth, Improve Yields, and Empower Your Farming Decisions",
};

export const reviewsData = {
  heading: "Meet Farmlytics users",
  subHead:
    "Farmlytics empowers thousands of people to visualize and manage their fields data.",
  reviews: [
    {
      id: 1,
      name: "John Farmer",
      username: "@greenfield_john",
      userImage: USER1,
      review:
        "Farmlytics has revolutionized the way I manage my farm. The insights are incredibly accurate, and I’ve seen a 20% increase in crop yield since I started using it!",
    },
    {
      id: 2,
      name: "Emma Carter",
      username: "@emma_crops",
      userImage: USER2,
      review:
        "I love how easy Farmlytics is to use. The weather predictions and pest alerts have saved me so much time and money. Highly recommended!",
    },
    {
      id: 3,
      name: "Rajesh Kumar",
      username: "@rajesh_agro",
      userImage: USER3,
      review:
        "Farmlytics helps me track every detail about my crops. The soil analysis feature is a game changer!",
    },
    {
      id: 4,
      name: "Maria Lopez",
      username: "@maria_organicfields",
      userImage: USER4,
      review:
        "This app is like having a digital assistant for my farm. I can plan ahead and manage resources more efficiently than ever before.",
    },
    {
      id: 5,
      name: "Ahmed Al-Faisal",
      username: "@ahmed_agriculture",
      userImage: USER5,
      review:
        "Farmlytics gave me a detailed view of my farm health, and I was able to spot issues before they became problems. Amazing tool!",
    },
    {
      id: 6,
      name: "Sophia Taylor",
      username: "@sophia_farms",
      userImage: USER6,
      review:
        "I’ve tried multiple farming apps, but Farmlytics stands out. The crop health visualizations are so helpful, and the interface is user-friendly.",
    },
    {
      id: 7,
      name: "Michael Brown",
      username: "@michael_croplife",
      userImage: USER7,
      review:
        "Farmlytics is a must-have for modern farming. The data it provides has made decision-making much easier on my farm.",
    },
    {
      id: 8,
      name: "Lina Chang",
      username: "@lina_agrovision",
      userImage: USER8,
      review:
        "The AI-based insights on Farmlytics are incredibly helpful. It’s like having a farming expert by your side 24/7!",
    },
    {
      id: 9,
      name: "Oliver Smith",
      username: "@oliver_fieldtech",
      userImage: USER1,
      review:
        "Farmlytics simplifies everything. From soil testing to weather updates, it’s all in one place. Fantastic app!",
    },
    {
      id: 10,
      name: "Nina Patel",
      username: "@nina_agriculture",
      userImage: USER2,
      review:
        "I was skeptical at first, but Farmlytics has exceeded my expectations. It’s accurate, reliable, and easy to use!",
    },
    {
      id: 11,
      name: "Benjamin Walker",
      username: "@ben_fieldfocus",
      userImage: USER3,
      review:
        "Farmlytics has made precision farming accessible to small-scale farmers like me. The crop health monitoring feature is a game changer!",
    },
    {
      id: 12,
      name: "Aisha Hassan",
      username: "@aisha_greens",
      userImage: USER4,
      review:
        "I’ve been able to cut down on water usage while improving yield quality, thanks to Farmlytics. It’s worth every penny!",
    },
    {
      id: 13,
      name: "Liam Johnson",
      username: "@liam_cropmanager",
      userImage: USER5,
      review:
        "The dashboard is intuitive and provides all the metrics I need to make informed decisions. Highly impressed with Farmlytics!",
    },
    {
      id: 14,
      name: "Charlotte Davis",
      username: "@charlotte_ecoagro",
      userImage: USER6,
      review:
        "Farmlytics is hands down the best tool for farmers looking to embrace technology. The pest alerts saved my crop this season!",
    },
    {
      id: 15,
      name: "Ethan Wilson",
      username: "@ethan_agrotools",
      userImage: USER7,
      review:
        "The integration with weather data and soil health insights has helped me boost productivity significantly. Farmlytics is a gem!",
    },
    {
      id: 16,
      name: "Grace Thomas",
      username: "@grace_smartfarmer",
      userImage: USER8,
      review:
        "Farmlytics helps me stay on top of my farm's needs. The crop rotation suggestions have been especially helpful!",
    },
  ],
};

export interface PricingPlan {
  heading: string;
  subHead: string;
  price: string;
  priceDesc: string;
  features: string[];
  renewal: string;
}

export const pricingData = {
  heading: "One tool for your field managing needs",
  subHead:
    "Level up your field managing skill and field health with Farmlytics.",
  plans: [
    {
      heading: "Farmlytics",
      subHead: "Simple pricing. All Farmlytics features.",
      price: "$11",
      priceDesc: "Per month billed yearly.",
      features: [
        "All Farmlytics features",
        "Lifetime updates",
        "Lorem ipsum dolor sit amet",
        "Lorem ipsum dolor sit amet",
        "Lorem ipsum dolor sit amet",
      ],
      renewal: "",
    },
    {
      heading: "Pay Once",
      subHead: "Your copy forever & one year of updates.",
      price: "$199",
      priceDesc: "One-time payment. Includes one year of updates.",
      features: [
        "All Farmlytics features",
        "Lifetime updates",
        "Lorem ipsum dolor sit amet",
      ],
      renewal:
        "Optional renewal for another year at $109.Renew to get the latest updates or keep using the version you have forever.",
    },
  ],
};

export const benefacts = [
  {
    id: 1,
    img: Leaf,
    name: "PRODUCTS",
    count: "100+",
  },
  {
    id: 2,
    img: Truck,
    name: "FARMERS",
    count: "80000+",
  },
  {
    id: 3,
    img: Tree,
    name: "ACRES",
    count: "110000+",
  },
  {
    id: 4,
    img: Facility,
    name: "FACILITIES",
    count: "2",
  },
];
