import faker from "faker";

faker.seed(123);

export const data = [...Array(50)].map((item) => ({
  id: {
    isbn13: faker.datatype.uuid(),
    isbn10: faker.datatype.uuid(),
  },
  title: faker.commerce.productName(),
  coverURL: faker.random.image(),
  authors: [
    {
      name: faker.name.firstName() + " " + faker.name.lastName(),
      about: faker.commerce.productDescription(),
      photoURL: faker.image.avatar(),
    },
  ],
  publishers: {
    name: faker.name.firstName(),
    address: faker.address.secondaryAddress(),
    contact_no: faker.phone.phoneNumber(),
  },
  no_of_pages: faker.datatype.number(),
  publish_date: faker.date.past(),
  languages: [
    {
      name: faker.name.firstName(),
    },
  ],
  genres: [
    {
      name: faker.music.genre(),
    },
    {
      name: faker.music.genre(),
    },
    {
      name: faker.music.genre(),
    },
  ],
  rating: faker.random.arrayElement([1, 2, 3, 4, 5]),
  no_of_rating: faker.datatype.number(),
  price: {
    original: Number(faker.commerce.price()),
    final: Number(faker.commerce.price()),
  },
  weight: "220 g",
  dimensions: "20 x 14 x 4 cm",
  hasFastDelivery: faker.datatype.boolean(),
  hasCashOnDelivery: faker.datatype.boolean(),
  isInStock: faker.datatype.boolean(),
  description: faker.commerce.productDescription(),
}));
