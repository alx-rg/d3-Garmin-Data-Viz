console.log('hello worldz')

function handleData()
  const data = await d3.json('titanic-passengers.json')
  console.log(data)

handleData()

// (async function() {
//   try {
//     const jsonResponse = await d3.json("https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json");

//     const data = jsonResponse.data; // array of dates and values
//     const lowestVal = d3.min(data, d => d[1]);
//     const highestVal = d3.max(data, d => d[1]);

//     console.log(lowestVal);
//     console.log(highestVal);
//   } catch(error) {
//     console.log(error);
//   }
// })();