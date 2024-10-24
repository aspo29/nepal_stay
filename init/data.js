const sampleAccommodations = [
    {
        title: "Serene Himalayan Lodge",
        description:
            "Nestled in the heart of the Himalayas, this peaceful lodge offers breathtaking views of snow-capped peaks and lush valleys. Ideal for trekking enthusiasts.",
        image: {
            url: "https://mountainlodgesofnepal.com/wp-content/uploads/2021/09/S1-Namche-lodge-near-mountain-range.jpg",
            filename: "S1-Namche-lodge",
        },
        price: 1000,
        location: "Namche Bazaar",
        country: "Nepal",
        geometry: {
            type: "Point",
            coordinates: [86.7270, 27.8104]
        }
    },
    {
        title: "Heritage Hotel in Kathmandu",
        description:
            "Stay in a beautifully restored Newari-style building in the historic heart of Kathmandu. Perfect for exploring ancient temples and bustling markets.",
        image: {
            url: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/28/b5/84/04/caption.jpg?w=1200&h=-1&s=1",
            filename: "Heritage-Hotel-Kathmandu",
        },
        price: 1500,
        location: "Kathmandu",
        country: "Nepal",
        geometry: {
            type: "Point",
            coordinates: [85.324, 27.7172] 
        }
    },
    {
        title: "Lakeside Resort in Pokhara",
        description:
            "Relax by the tranquil Phewa Lake at this resort. Enjoy stunning sunsets over the Annapurna range and explore the vibrant lakeside area.",
        image: {
            url: "https://www.kayak.sg/rimg/himg/24/de/c1/expediav2-441168-3385699614-223629.jpg?width=1366&height=768&crop=true",
            filename: "Lakeside-Resort-Pokhara",
        },
        price: 2000,
        location: "Pokhara",
        country: "Nepal",
        geometry: {
            type: "Point",
            coordinates: [83.9856, 28.2096]
        }
    },
    {
        title: "Traditional Nepali Homestay",
        description:
            "Experience authentic Nepali hospitality in this cozy homestay. Enjoy home-cooked meals and learn about local culture from your hosts.",
        image: {
            url: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/584786812.jpg?k=0810c7e6abe558cdb2b1fb9d7fde96578149724fd245551c02233a7e4cfa58ae&o=&hp=1",
            filename: "Nepali-Homestay-Bhaktapur",
        },
        price: 800,
        location: "Bhaktapur",
        country: "Nepal",
        geometry: {
            type: "Point",
            coordinates: [85.4273, 27.6716] 
        }
    },
    {
        title: "Luxury Mountain Resort",
        description:
            "Pamper yourself in luxury while surrounded by breathtaking mountain views. This resort offers a perfect blend of comfort and adventure.",
        image: {
            url: "https://ik.imgkit.net/3vlqs5axxjf/TW-Asia/uploadedImages/Industry/Luxury/Shinta-Mani-Mustang-exterior.jpg?tr=w-1200%2Cfo-auto",
            filename: "Luxury-Resort-Nagarkot",
        },
        price: 5000,
        location: "Nagarkot",
        country: "Nepal",
        geometry: {
            type: "Point",
            coordinates: [85.5036, 27.6961]
        }
    },
    {
        title: "Himalayan View Tea House",
        description:
            "Stay at this charming tea house and enjoy spectacular views of the Annapurna range. Ideal for trekkers looking for a comfortable stopover.",
        image: {
            url: "https://www.holymountaintreks.com/uploads/2019/03/teahousetrekinnepal.jpg",
            filename: "Himalayan-Tea-House",
        },
        price: 600,
        location: "Annapurna Circuit",
        country: "Nepal",
        geometry: {
            type: "Point",
            coordinates: [83.9453, 28.5940]
        }
    },
    {
        title: "Boutique Hotel in Patan",
        description:
            "Discover the ancient charm of Patan in this boutique hotel, featuring traditional architecture and modern amenities.",
        image: {
            url: "https://images.scottdunn.com/c_fill,f_auto,q_auto,h_450,w_620/nepal/accommodation/the-inn-patan/725339-exterior-the-inn-patan-kathmandu-nepal-indian-sub-continent-asia.jpeg",
            filename: "Boutique-Hotel-Patan",
        },
        price: 1800,
        location: "Patan",
        country: "Nepal",
        geometry: {
            type: "Point",
            coordinates: [85.3245, 27.6698] 
        }
    },
    {
        title: "Eco Lodge in Chitwan",
        description:
            "Explore the rich wildlife of Chitwan National Park while staying in this eco-friendly lodge. Perfect for nature lovers.",
        image: {
            url: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/01/6e/ac/d5/main-quad-of-the-lodge.jpg?w=700&h=-1&s=1",
            filename: "Eco-Lodge-Chitwan",
        },
        price: 2500,
        location: "Chitwan",
        country: "Nepal",
        geometry: {
            type: "Point",
            coordinates: [84.4740, 27.5085]
        }
    },
    {
        title: "Riverside Resort in Sauraha",
        description:
            "Unwind by the Rapti River in this tranquil resort, offering guided jungle safaris and close encounters with wildlife.",
        image: {
            url: "https://q-xx.bstatic.com/xdata/images/hotel/max500/523763815.jpg?k=9c08b1cba8014b4e5dde18836d92768c48e862fdd1d2edc2fdc2adca6c964f4e&o=",
            filename: "Riverside-Resort-Sauraha",
        },
        price: 1500,
        location: "Sauraha",
        country: "Nepal",
        geometry: {
            type: "Point",
            coordinates: [84.4853, 27.5028]
        }
    },
    {
        title: "Mountain View Hotel in Pokhara",
        description:
            "Wake up to the stunning views of the Annapurna range. This hotel is perfect for travelers looking for adventure and relaxation.",
        image: {
            url: "https://www.pokharalodge.com/wp-content/uploads/slider/cache/f602577cea993af2aa7d9c4bc9b2f185/hotel-pokhara-lodge-5.jpg",
            filename: "Mountain-View-Hotel-Pokhara",
        },
        price: 3000,
        location: "Pokhara",
        country: "Nepal",
        geometry: {
            type: "Point",
            coordinates: [83.9856, 28.2096]
        }
    },
];

module.exports = { data: sampleAccommodations };