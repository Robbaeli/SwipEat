import { Recipe } from "@/types/recipes";
export const dummyRecipes: Recipe[] = [
  {
    id: "1",
    name: "Spicy Arrabiata Penne",
    category: "Vegetarian",
    imageUrl:
      "https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg",
    ingredients: [
      { name: "Penne", measure: "400g" },
      { name: "Olive oil", measure: "1/4 cup" },
      { name: "Garlic", measure: "3 cloves" },
    ],
    instructions: "Cook the pasta according to the package instructions...",
  },
  {
    id: "2",
    name: "Teriyaki Chicken",
    category: "Non-Vegetarian",
    imageUrl:
      "https://www.themealdb.com/images/media/meals/58oia61564916529.jpg",
    ingredients: [
      { name: "Chicken", measure: "500g" },
      { name: "Soy sauce", measure: "1/4 cup" },
      { name: "Garlic", measure: "2 cloves" },
    ],
    instructions: "Marinate the chicken and cook it in a pan until done...",
  },
  {
    id: "3",
    name: "Vegetable Stir Fry",
    category: "Vegetarian",
    imageUrl:
      "https://www.themealdb.com/images/media/meals/wqurxy1511453156.jpg",
    ingredients: [
      { name: "Broccoli", measure: "200g" },
      { name: "Carrots", measure: "100g" },
      { name: "Soy sauce", measure: "2 tbsp" },
    ],
    instructions:
      "Stir fry the vegetables in a wok with soy sauce until tender...",
  },
  {
    id: "4",
    name: "Beef Tacos",
    category: "Non-Vegetarian",
    imageUrl:
      "https://www.themealdb.com/images/media/meals/qtuwxu1468233098.jpg",
    ingredients: [
      { name: "Beef", measure: "500g" },
      { name: "Taco shells", measure: "8" },
      { name: "Lettuce", measure: "100g" },
    ],
    instructions:
      "Cook the beef and assemble the tacos with lettuce and sauce...",
  },
];
