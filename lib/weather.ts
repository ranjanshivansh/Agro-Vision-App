export async function getWeather(city: string) {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${process.env.WEATHER_API_KEY}&units=metric`
  );

  const data = await res.json();

  const current = data.list[0];

  return {
    temperature: Math.round(current.main.temp),
    feelsLike: Math.round(current.main.feels_like),
    humidity: current.main.humidity,
    rainfall: current.rain?.["3h"] || 0,
    wind: Math.round(current.wind.speed * 3.6), // km/h
    visibility: Math.round(current.visibility/1000),
    condition: current.weather[0].main,

    forecast: Object.values(
  data.list.reduce((acc: any, item: any) => {
    const date = item.dt_txt.split(" ")[0]; // YYYY-MM-DD

    if (!acc[date]) {
      acc[date] = {
        temps: [],
        min: item.main.temp_min,
        max: item.main.temp_max,
        condition: item.weather[0].main,
        rainChance: 0,
        date: item.dt_txt,
      };
    }

    acc[date].temps.push(item.main.temp);

    // update min/max
    acc[date].min = Math.min(acc[date].min, item.main.temp_min);
    acc[date].max = Math.max(acc[date].max, item.main.temp_max);

    // 🔥 TAKE MAX RAIN PROBABILITY OF DAY
    acc[date].rainChance = Math.max(
      acc[date].rainChance,
      Math.round((item.pop || 0) * 100)
    );

    return acc;
  }, {})
)
  .slice(0, 4) // only 4 days
  .map((day: any) => ({
    temp: Math.round(
      day.temps.reduce((a: number, b: number) => a + b, 0) /
        day.temps.length
    ),
    min: Math.round(day.min),
    max: Math.round(day.max),
    condition: day.condition,
    rainChance: day.rainChance,
    date: day.date,
  })),
  };
}