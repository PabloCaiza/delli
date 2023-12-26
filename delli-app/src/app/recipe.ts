export interface Recipe {
  id: string,
  title: string,
  duration: string,
  imageUrl:string,
  link: string,
  steps: string[],
  ingredients: string[]
}
