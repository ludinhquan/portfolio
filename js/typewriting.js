const jobs = ["Web Developer", "Programmer", "Designer"];
let index = 0;
let count = 0;

(function type() {
  let currentJob = count === jobs.length ? jobs.join(", ") : jobs[count];
  const textContent = currentJob.slice(0, ++index);
  document.getElementById("typing").textContent = textContent;

  if (index === currentJob.length) {
    index = 0;
    count = count === jobs.length ? 0 : count + 1;
    setTimeout(() => {
      setTimeout(type, 80);
    }, 500);
  } else {
    setTimeout(type, 80);
  }
})();
