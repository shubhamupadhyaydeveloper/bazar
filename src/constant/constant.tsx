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

export const bookData = [
  {
    id: 1,
    title: 'The kite runner',
    image: [
      'https://m.media-amazon.com/images/I/81IzbD2IiIL._AC_UF1000,1000_QL80_.jpg',
      'https://souq.thebookshop.ae/cdn/shop/products/9781526604736-1_800x.jpg?v=1609335482',
    ],
    price: 337,
    description : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Viverra dignissim ac ac ac. Nibh et sed ac, eget malesuada."
  },
  {
    id: 2,
    title: 'The subtle art of not giving a fu**',
    image: [
      'https://m.media-amazon.com/images/I/71t4GuxLCuL._AC_UF350,350_QL50_.jpg',
      'https://m.media-amazon.com/images/I/61w9iNq8diL._AC_UF1000,1000_QL80_.jpg',
    ],
    price: 450,
      description : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Viverra dignissim ac ac ac. Nibh et sed ac, eget malesuada."
    
  },
  {
    id: 3,
    title: 'Shoe dog',
    image: [
      "https://m.media-amazon.com/images/I/71AqHmnXppL._AC_UF1000,1000_QL80_.jpg",
      'https://m.media-amazon.com/images/I/61w9iNq8diL._AC_UF1000,1000_QL80_.jpg',
    ],
    price: 500,
      description : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Viverra dignissim ac ac ac. Nibh et sed ac, eget malesuada."
  },
];
