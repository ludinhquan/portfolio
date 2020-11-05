function type({
  words,
  elementId,
  index = 0,
  count = 0,
  textContent = "",
  timeCharacterTypingDelay = 80,
  timeWordTypingDelay = 500,
}) {
  let currentJob = count === words.length ? words.join(", ") : words[count];

  textContent += currentJob[index++];

  document.getElementById(elementId).textContent = textContent;

  const delayTypingFn = () =>
    setTimeout(
      () => type({ elementId, words, index, count, textContent }),
      timeCharacterTypingDelay
    );

  // End of word
  if (index === currentJob.length) {
    index = 0;
    textContent = "";
    count = count === words.length ? 0 : count + 1;
    setTimeout(delayTypingFn, timeWordTypingDelay);
  } else {
    delayTypingFn();
  }
}
