// Auto-Generated Random Paragraphs for typing
const paragraphs = [
    "Typing fast with all ten fingers is a skill every programmer should master. It allows you to write code efficiently and focus more on logic and problem-solving. Practice is key—start slow and build speed over time. Remember, accuracy is more important than speed initially. With dedication, you'll find typing becomes second nature.",
  
    "Programming is not just about writing code but doing it effectively. When you can type quickly, you save valuable time during debugging and implementation. Speedy typing helps keep up with your ideas as they flow. Start by learning proper finger placement on the keyboard. Over time, muscle memory will take over, making typing effortless.",
  
    "Becoming a fast typist begins with using the correct typing posture. Sit up straight, keep your wrists elevated, and position your fingers over the home row keys. This setup minimizes fatigue and improves speed. For programmers, this is essential as long coding sessions require comfort and efficiency. Good habits early on lead to long-term success.",
  
    "Learning programming and touch typing go hand in hand. As you practice coding, focus on typing with all your fingers instead of looking at the keyboard. Over time, your brain will map key locations automatically. The combination of programming logic and typing proficiency makes you a faster, more productive developer.",
  
    "The journey to mastering typing involves consistency and patience. Begin by practicing frequently used code snippets and keywords. This way, your fingers will adapt to the patterns programmers often use. Over weeks, you'll notice significant improvements in speed and accuracy. Pairing this with coding challenges enhances both skills.",
  
    "Did you know that the world's fastest typists often use the same strategies as programmers? They focus on precision first, then gradually increase speed. Programmers can adopt this mindset by typing carefully written code to avoid errors. Once you prioritize accuracy, you'll find speed comes naturally.",
  
    "Touch typing is not only a skill for speed but also for multitasking. Programmers often need to think critically while typing. Using all ten fingers frees up your mind to focus on logic and creativity. By practicing daily, you'll eventually type code as easily as thinking about it.",
  
    "Fast typing doesn't mean rushing through code. Instead, it’s about maintaining a steady pace with minimal mistakes. Use online typing games or apps to improve your skills while having fun. As a programmer, this also strengthens your ability to type complex syntax correctly without second-guessing.",
  
    "Typing with ten fingers boosts productivity and reduces stress during coding marathons. Imagine typing a function or debugging a file without hesitations—this is what mastery feels like. Consistency is key, so practice coding frequently while aiming to improve your typing speed and accuracy simultaneously.",
  
    "Programming and typing are like two sides of the same coin. When you improve one, the other often follows. Typing code quickly allows you to experiment and iterate faster, which is critical in problem-solving. Embrace daily practice, and you’ll soon type like a pro and code with confidence."
  ];

// Selecting DOM elements
const typingText = document.querySelector(".typing-text p");
const inpField = document.querySelector(".wrapper .input-field");
const tryAgainBtn = document.querySelector(".content button");
const timeTag = document.querySelector(".time span b");
const mistakeTag = document.querySelector(".mistake span");
const wpmTag = document.querySelector(".wpm span");
const cpmTag = document.querySelector(".cpm span");

// Declaring variables for game logic
let timer;
let maxTime = 60;
let timeLeft = maxTime;
let charIndex = 0;
let mistakes = 0;
let isTyping = false;

// Load a random paragraph and display it
function loadParagraph() {
  const randomIndex = Math.floor(Math.random() * paragraphs.length);
  typingText.innerHTML = [...paragraphs[randomIndex]]
    .map(char => `<span>${char}</span>`)
    .join("");

  typingText.firstElementChild.classList.add("active");
  
  // Automatically focus the input field on keydown or click
  const focusInput = () => inpField.focus();
  document.addEventListener("keydown", focusInput);
  typingText.addEventListener("click", focusInput);
}

// Typing Logic Function
function handleTyping() {
  const characters = typingText.querySelectorAll("span");
  const typedChar = inpField.value[charIndex];

  if (charIndex >= characters.length || timeLeft <= 0) return finishGame();

  if (!isTyping) startTimer();

  //Allowing user to backspace
  if (typedChar == null) {
      if (charIndex > 0) {
          charIndex--; // Move back to the previous character
          if (characters[charIndex].classList.contains("incorrect")) mistakes--;
          characters[charIndex].classList.remove("correct", "incorrect", "active"); // Reduce mistake count if an incorrect character is deleted
      }

  } else { // Check Character if correct or incorrect
      const isCorrect = characters[charIndex].innerText === typedChar;
      characters[charIndex].classList.add(isCorrect ? "correct" : "incorrect");
      if (!isCorrect) mistakes++;
      charIndex++;
  }

//Update activated character
  characters.forEach(span => span.classList.remove("active"));
  if (charIndex < characters.length) characters[charIndex].classList.add("active");

  updateStats();
}
 // Timer function
function startTimer() {
  isTyping = true;
  timer = setInterval(() => {
      if (--timeLeft >= 0) {
          timeTag.innerText = timeLeft;
          updateStats(); // Update WPM during countdown
      } else {
          clearInterval(timer); // Stopping the timer
          finishGame();
      }
  }, 1000);
}

// Update WPM, CPM, and mistakes
function updateStats() {
  const wpm = Math.max(Math.round(((charIndex - mistakes) / 5) / ((maxTime - timeLeft) / 60)), 0);
  wpmTag.innerText = wpm;
  cpmTag.innerText = charIndex - mistakes;
  mistakeTag.innerText = mistakes;
}

// Reset the game
function resetGame() {
  clearInterval(timer);
  [timeLeft, charIndex, mistakes, isTyping] = [maxTime, 0, 0, false];
  inpField.value = "";
  [timeTag, wpmTag, mistakeTag, cpmTag].forEach(tag => tag.innerText = 0);
  loadParagraph();
}

// End the game
function finishGame() {
  clearInterval(timer);
  inpField.value = "";  const wpm = Math.max(Math.round(((charIndex - mistakes) / 5) / ((maxTime - timeLeft) / 60)), 0);
  
  typingText.innerHTML = `
    <p style="text-align: center; font-size: 1.5rem; font-weight: bold; color: #ff0000;">Time is up</p>
    <p style="text-align: center; font-size: 1.5rem; color: #00FF00;">Your WPM is: ${wpm} !</p>`;
}

// Starting/initializing the game
loadParagraph();
inpField.addEventListener("input", handleTyping);
tryAgainBtn.addEventListener("click", resetGame);

// Keydown sound effect
const sound = new Audio('assets/audio/keydown.wav');
let soundEnabled = true;

// Eventlistener for keydown sound effect
document.addEventListener('keydown', () => {
  if (soundEnabled) {
    sound.currentTime = 0;
    sound.play();
  }
});