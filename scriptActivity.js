
async function handleData() {

  d3.select('#svgActivity')

  let data = await d3.csv('AllActivitiesTestTrimmedUp.csv')
  const margin = { top: 30, right: 20, bottom: 10, left: 40 }
  const width = 900 - (margin.left + margin.right)
  const height = 400 - (margin.top + margin.bottom)

  const svg = d3
    .select('#svgActivity')
  const runningData = getDataForActivity(data, "Treadmill Running")
  const parseTime = d3.timeParse("%Y-%m-%d")
  runningData.forEach(d => d.date = parseTime(d.Date))

  const dateExtent = d3.extent(runningData, d => d.date)

  const xScale = d3.scaleTime()
    .domain(dateExtent)
    .range([margin.left, width + margin.left])
    .nice()
  const distanceExtents = d3.extent(runningData, d => d.Distance)

  const yScale = d3.scaleLinear()
    .domain(distanceExtents)
    .range ([height, margin.top])

  const linegen = d3.line()
    .x(d => xScale(d.date))
    .y(d => yScale(d.Distance))
    .curve(d3.curveLinear)

  function getDataForActivity(data, activityInput) {
    const arr = data
      .filter(d => d.activityType === activityInput)
      .filter(d => !isNaN(d.Distance))
      .map(d => {
        d.Distance = parseFloat(d.Distance)
        return d
      })
    return arr
  }

  const title = svg
    .append('g')

  title
    .append('text')
    .text('Treadmill Run and Distance in Km')
    .attr('transform', `translate(${width / 2 - (margin.left + margin.right)}, 20)`)
    .attr('class', 'graphText')

  const graph = svg
    .append('g')

  graph
    .append('path')
    .attr('d', linegen(runningData))
    .attr('stroke-width', 3)
    .attr('stroke', 'cornflowerblue')
    .attr('fill', 'none')

  const bottomAxis = d3.axisBottom(xScale)
  const leftAxis = d3.axisLeft(yScale)

  svg
    .append('g')
    .attr('transform', `translate(0, ${height})`)
    .call(bottomAxis)

  svg
    .append('g')
    .attr('transform', `translate(${margin.left}, 0)`)
    .call(leftAxis)

}

handleData()