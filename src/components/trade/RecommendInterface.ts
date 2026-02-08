export interface tradeRecommendation{
  id : string,
  priority : number,
  local : number,
  qr : number
}

export interface tradeRecommendationResult{
  give : tradeRecommendation[],
  take : tradeRecommendation[],
}