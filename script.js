document.addEventListener('DOMContentLoaded', () => {
  const panzoomArea = document.getElementById('panzoom-area');
  const img = document.getElementById('schedule-img');
  const timeLine = document.getElementById('time-line');

  // Initialize Panzoom on the area that holds image + red line
  const panzoom = Panzoom(panzoomArea, {
    maxScale: 5,
    minScale: 1,
    contain: 'outside',
    startScale: 1,
    panOnlyWhenZoomed: false,
    touchAction: 'none'
  });

  // Allow pinch-to-zoom and scroll
  panzoomArea.addEventListener('wheel', panzoom.zoomWithWheel);
  panzoomArea.addEventListener('panzoomchange', updateTimeLine);

  // When the image loads (or if already loaded), size the container and draw the line
  if (img.complete) {
    panzoomArea.style.height = img.naturalHeight + 'px';
    updateTimeLine();
  } else {
    img.addEventListener('load', () => {
      panzoomArea.style.height = img.naturalHeight + 'px';
      updateTimeLine();
    });
  }

  // Redraw the line every minute
  setInterval(updateTimeLine, 60000);

  function updateTimeLine() {
    // Simulate 1 PM for testing
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

    // Based on intrinsic image dimensions (make sure these match your image)
    const totalImageHeight = 3884;
    const topWhitespace = 626;
    const bottomWhitespace = 402;
    const usableImageHeight = totalImageHeight - topWhitespace - bottomWhitespace;

    const percentThrough = (hours - startHour) / (endHour - startHour);
    const imageY = topWhitespace + usableImageHeight * (1 - percentThrough);

    timeLine.style.top = `${imageY}px`;
    timeLine.style.display = 'block';
  }
});