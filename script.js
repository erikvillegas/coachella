
// Enable zoom + pan using Panzoom.js
document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('zoom-container');
  const img = document.getElementById('schedule-img');
  const timeLine = document.getElementById('time-line');

  // Init panzoom
  const panzoom = Panzoom(container, {
    contain: 'outside',
    maxScale: 5,
    minScale: 1
  });

  container.parentElement.addEventListener('wheel', panzoom.zoomWithWheel);

  // Update line position on load and periodically
  updateTimeLine();
  setInterval(updateTimeLine, 60000);

  // Update on pan or zoom
  container.addEventListener('panzoomchange', updateTimeLine);

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

    if (!img.complete || img.naturalHeight === 0) {
      requestAnimationFrame(updateTimeLine);
      return;
    }

    const rect = img.getBoundingClientRect();

    // Image intrinsic dimensions
    const totalImageHeight = 3884;
    const totalImageWidth = 5364;

    const topWhitespace = 626;
    const bottomWhitespace = 402;
    const leftWhitespace = 200;
    const rightWhitespace = 164;

    const usableImageHeight = totalImageHeight - topWhitespace - bottomWhitespace;
    const usableImageWidth = totalImageWidth - leftWhitespace - rightWhitespace;

    const percentThrough = (hours - startHour) / (endHour - startHour);
    const imageY = topWhitespace + usableImageHeight * (1 - percentThrough);
    const screenY = rect.top + (imageY / totalImageHeight) * rect.height;

    const screenX = rect.left + (leftWhitespace / totalImageWidth) * rect.width;
    const screenWidth = (usableImageWidth / totalImageWidth) * rect.width;

    timeLine.style.top = `${screenY}px`;
    timeLine.style.left = `${screenX}px`;
    timeLine.style.width = `${screenWidth}px`;
    timeLine.style.display = 'block';
  }
});
