import {ImageSourcePropType} from 'react-native';

export type TonboardingContent = {
  image: ImageSourcePropType;
  title: string;
  description: string;
};

export const onboardingData: TonboardingContent[] = [
  {
    image: require('../../assets/frame1.png'),
    title: 'Now reading books will be easier',
    description:
      ' Discover new worlds, join a vibrant reading community. Start your reading adventure effortlessly with us.',
  },
  {
    image: require('../../assets/frame2.png'),
    title: 'Your Bookish Soulmate Awaits',
    description:
      'Let us be your guide to the perfect read. Discover books tailored to your tastes for a truly rewarding experience.',
  },
  {
    image: require('../../assets/frame3.png'),
    title: 'Start Your Adventure',
    description:
      "Ready to embark on a quest for inspiration and knowledge? Your adventure begins now. Let's go!",
  },
];

export const signInFields = [
  {
    label: 'Email',
    name: 'email',
    keyboardType: 'email-address',
    secureText: false,
    placeholder: 'Your email',
  },
  {
    label: 'Password',
    name: 'password',
    keyboardType: 'numbe',
    secureText: true,
    placeholder: 'Your password',
  },
];

export const signUpFields = [
  {
    label: 'Name',
    name: 'name',
    keyboardType: 'email-address',
    secureText: false,
    placeholder: 'Your name',
  },
  {
    label: 'Email',
    name: 'email',
    keyboardType: 'email-address',
    secureText: false,
    placeholder: 'Your email',
  },
  {
    label: 'Password',
    name: 'password',
    keyboardType: 'default',
    secureText: true,
    placeholder: 'Your password',
  },
];

type dataType = {
  image: string[];
  title: string;
  description: string;
  price: number;
  id: number;
  rating: number;
  category? : string
}


export const bookData:dataType[] = [
  {
    id: 1,
    title: 'The kite runner',
    image: [
      'https://m.media-amazon.com/images/I/81IzbD2IiIL._AC_UF1000,1000_QL80_.jpg',
      'https://souq.thebookshop.ae/cdn/shop/products/9781526604736-1_800x.jpg?v=1609335482',
    ],
    price: 337,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Viverra dignissim ac ac ac. Nibh et sed ac, eget malesuada.',
    rating: 3,
    category : "Novel"
  },
  {
    id: 2,
    title: 'The subtle art of not giving a fu**',
    image: [
      'https://m.media-amazon.com/images/I/71t4GuxLCuL._AC_UF350,350_QL50_.jpg',
      'https://m.media-amazon.com/images/I/61w9iNq8diL._AC_UF1000,1000_QL80_.jpg',
    ],
    price: 450,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Viverra dignissim ac ac ac. Nibh et sed ac, eget malesuada.',
      rating : 2,
      category : "Self help"
  },
  {
    id: 3,
    title: 'Shoe dog',
    image: [
      'https://m.media-amazon.com/images/I/71AqHmnXppL._AC_UF1000,1000_QL80_.jpg',
      'https://m.media-amazon.com/images/I/61w9iNq8diL._AC_UF1000,1000_QL80_.jpg',
    ],
    price: 500,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Viverra dignissim ac ac ac. Nibh et sed ac, eget malesuada.',
      rating : 4,
      category : "Auto biography"
  },
  {
    id : 4,
    title : "Atomic habbits",
    image : [
      "https://images-cdn.ubuy.co.in/657123a74949522764448542-atomic-habits-an-easy-proven-way-to.jpg",
      "https://gyaanstore.com/cdn/shop/products/81DCnP7ntKL.jpg?v=1701690380&width=1445"
    ],
    price : 499,
    description : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Viverra dignissim ac ac ac. Nibh et sed ac, eget malesuada",
    rating : 5,
    category : "Self help"
  },
  {
    id : 5,
    title : "The trials of apollo",
    image : [
      "https://m.media-amazon.com/images/I/91jtddezwOL._AC_UF1000,1000_QL80_.jpg",
      "https://m.media-amazon.com/images/I/81gAAwslLlL._AC_UF1000,1000_QL80_.jpg"
    ],
    price : 1162,
    description : "hello this is description",
    rating : 4,
    category : "Novel"
  },
  {
    id : 6,
    title : 'The ultimate sales machine',
    image : [
      "https://m.media-amazon.com/images/I/71ySYJNhz3L._AC_UF1000,1000_QL80_.jpg",
      "https://m.media-amazon.com/images/I/91dxLzocEHL._AC_UF1000,1000_QL80_.jpg"
    ],
    price : 393,
    description : "This revised edition expands on these proven concepts, with checklists to get faster ROIs, Core Story Frameworks to get your company to number one in your marketplace, and a bonus, never-before-revealed chapter from Chet, “How to Live a Rich and Full Life,” that will put you in the best possible mindset to own your career.",
    rating : 4,
    category : "Finance"
  }
];

export const authorData = [
    {
      id : 1,
      authorName : 'Mark manson',
      profileImg : "https://markmanson.net/wp-content/uploads/2024/04/mark-manson-2024.jpg",
      profession : "self-help author"
    },
    {
      id : 2,
      authorName : "Josh Kaufman",
      profileImg : "https://america.cgtn.com/wp-content/uploads/2015/12/Josh-Kaufman.jpg",
      profession : "author"
    },
    {
      id : 3,
      authorName : "James Clear",
      profileImg : "https://i0.wp.com/blog.rescuetime.com/wp-content/uploads/2018/01/james-clear-smiling-wide-1400-1.jpg?fit=1400%2C870&ssl=1",
      profession  : "writer"
    },
    {
      id : 4,
      authorName : "Phil Knight",
      profileImg : 'https://cdn.britannica.com/18/250018-050-F2A4DFC5/Phil-Knight-Nike-2017.jpg',
      profession : "former ceo of nike"
    }
]

export const homeCarouselData:string[] =[
   "https://m.media-amazon.com/images/I/91jtddezwOL._AC_UF1000,1000_QL80_.jpg",
   "https://m.media-amazon.com/images/I/81hMWhbHKAL._AC_UF1000,1000_QL80_.jpg",
   "https://m.media-amazon.com/images/I/616BYPbOCyL._AC_UF1000,1000_QL80_.jpg"
]

export const categoryData:string[] = [
   "All",
   "Finance",
   "Novel",
   "Self help",
   "Auto biography",
   "Science",
   "Space"
]