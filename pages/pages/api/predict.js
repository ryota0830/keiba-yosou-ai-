export default function handler(req, res) {
  const { horses } = req.body;

  const predictScore = (horse) => {
    let score = 0;
    if (horse.weightDiff > 0) score += 10;
    if (horse.jockeyWinRate > 0.2) score += 15;
    if (horse.previousRank <= 3) score += 20;
    if (horse.stadiumWinRate > 0.15) score += 10;
    return score;
  };

  const results = horses.map(h => ({
    ...h,
    score: predictScore(h)
  }));

  res.status(200).json(results);
}
