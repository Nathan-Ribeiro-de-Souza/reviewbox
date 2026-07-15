import { useContext } from "react";
import { ReviewsContext } from "../contexts/ReviewsContext/ReviewsContext";

export function useReviews(){
  const context = useContext(ReviewsContext)

  if(!context){
    throw new Error('useReviews deve ser usado dentro de um ReviewsProvider')
  }
  
  return context
}