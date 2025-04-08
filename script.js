document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('zoom-container');
  const img = document.getElementById('schedule-img');
  const timeLine = document.getElementById('time-line');

  // Init panzoom
  const panzoom = Panzoom(container, {
    maxScale: 5,
    minScale: 1,
    contain: 'outside',
    startScale: 1, // ✅ initial zoom level
    panOnlyWhenZoomed: false, // ✅ allow panning even at default zoom
    touchAction: 'none' // Panzoom manages this
  });
  // container.parentElement.addEventListener('wheel', panzoom.zoomWithWheel);

  // Position the line when image loads or zoom/pan happens
  function updateTimeLine() {
    // Simulated time: 1 PM
    const now = new Date();
    now.setHours(13);
    now.setMinutes(0);

    let hours = now.getHours() + now.getMinutes() / 60;
    if (hours < 13) hours += 24;

    const startHour = 13;
    const endHour = 25;
    if (hours < startHour || hours > endHour) {
      timeLine.style.display = 'none';
      return;
    }

    // Image native dimensions
    const totalImageHeight = 3884;
    const topWhitespace = 626;
    const bottomWhitespace = 402;
    const usableImageHeight = totalImageHeight - topWhitespace - bottomWhitespace;

    // Percent of time from bottom (1 PM) to top (1 AM)
    const percentThrough = (hours - startHour) / (endHour - startHour);

    // Y position in image pixels
    const imageY = topWhitespace + usableImageHeight * (1 - percentThrough);

    // Apply image-pixel top value to the red line
    timeLine.style.top = `${imageY}px`;
    timeLine.style.display = 'block';
  }

  img.addEventListener('load', () => {
    updateTimeLine();
  });

  setInterval(updateTimeLine, 60000); // Every minute
  container.addEventListener('panzoomchange', updateTimeLine);
});