
async function handleData() {

  d3.select('#svg')

  let data = await d3.csv('AllActivitiesTestTrimmedUp.csv')
  const margin = { top: 30, right: 20, bottom: 10, left: 40 }
  const width = 900 - (margin.left + margin.right)
  const height = 400 - (margin.top + margin.bottom)

  const getActivityTypes = (data) => {
    const activityList = Array.from(new Set(data.map((activity) => {
      return activity.activityType
    }))).map(name => ({name, count: 0}))
    activityList.forEach(activity => {
      activity.count = data.filter(d => d.activityType === activity.name).length
    });
    return activityList
  }
  
  const activityCountByType = getActivityTypes(data)

  const xScale = d3.scaleBand()
    .domain(activityCountByType)
    .range([margin.left, width + margin.left])
    .padding(0.05)

  const xScaleName = d3.scaleBand()
    .domain(activityCountByType.map(d => d.name))
    .range([margin.left, width + margin.left])
    .padding(0.05)
  const activityExtent = d3.extent(activityCountByType, d => d.count)
  const yScale = d3.scaleLinear()
    .domain(activityExtent)
    .range([height, margin.top])

  const svg = d3
    .select('#svg')

  const title = svg
    .append('g')

  title
    .append('text')
    .text('Activity Types and # Recorded')
    .attr('transform', `translate(${width / 2 - (margin.left + margin.right)}, 20)`)
    .attr('class', 'graphText')

  const barGroup = svg.append('g')

  barGroup
    .selectAll('rect')
    .data(activityCountByType)
    .enter()
    .append('rect')
    .attr('class', d => d.name)
    .attr('x', d => xScale(d))
    .attr('y', d => yScale(d.count))
    .attr('height', d => height - yScale(d.count))
    .attr('width', xScale.bandwidth())
    .attr('fill', `orange`)
    .attr('opacity', 0.25)

  const bottomAxis = d3.axisBottom(xScaleName)
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