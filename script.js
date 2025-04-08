
document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('zoom-container');
  const img = document.getElementById('schedule-img');
  const timeLine = document.getElementById('time-line');

  // Initialize Panzoom
  const panzoom = Panzoom(container, {
    maxScale: 5,
    minScale: 1,
    contain: 'outside',
    startScale: 1,
    panOnlyWhenZoomed: false,
    touchAction: 'none'
  });

  // Allow scroll/zoom on mobile
  container.addEventListener('wheel', panzoom.zoomWithWheel);

  // Update red line position on zoom/pan
  container.addEventListener('panzoomchange', updateTimeLine);

  // Wait for image to load and then set up
  img.addEventListener('load', () => {
    // Set container height to match the image's native height
    container.style.height = img.naturalHeight + 'px';
    updateTimeLine();
  });

  // Redraw line every minute
  setInterval(updateTimeLine, 60000);

  function updateTimeLine() {
    // Simulate 1 PM
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

    // Image intrinsic dimensions
    const totalImageHeight = 3884;
    const topWhitespace = 626;
    const bottomWhitespace = 402;
    const usableImageHeight = totalImageHeight - topWhitespace - bottomWhitespace;

    const percentThrough = (hours - startHour) / (endHour - startHour);
    const imageY = topWhitespace + usableImageHeight * (1 - percentThrough);

    // Position the red line in image coordinates
    timeLine.style.top = `${imageY}px`;
    timeLine.style.display = 'block';
  }
});
