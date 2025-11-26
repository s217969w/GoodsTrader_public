export interface tradeRecommendation{
  id : string,
  priority : number,
}

export interface tradeRecommendationResult{
  give : tradeRecommendation[],
  take : tradeRecommendation[],
}