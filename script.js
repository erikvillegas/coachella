function updateTimeLine() {
  const img = document.getElementById('schedule-img');
  const timeLine = document.getElementById('time-line');

  // Simulated time for testing
  const now = new Date();
  now.setHours(19);
  now.setMinutes(55);

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

// Recalculate on load, scroll, resize, and time tick
document.addEventListener('DOMContentLoaded', () => {
  updateTimeLine();
  setInterval(updateTimeLine, 60000);
});

window.addEventListener('resize', updateTimeLine);
window.addEventListener('scroll', updateTimeLine);