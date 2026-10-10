export type Ingredient = {
  name: string;
  measure: string;
};

export type Recipe = {
  id: string;
  name: string;
  category: string;
  imageUrl: string;
  ingredients: Ingredient[];
  instructions: string;
};
