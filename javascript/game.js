// script.js

// Array of emojis
const emojis = ['😀', '🎉', '🌟', '🍀', '🐶', '🐱', '🍕', '🍎', '🌈', 
                '🚀', '💖', '⚽', '🎈', '🍓', '🍩','📱', '💵', '🤖',
                '👨🏽‍💼', '🚩', '🐈', '🔆', '🧪'];
// Variables to track game state
let firstCard, secondCard;
let hasFlippedCard = false;
let lockBoard = false;
let matchedPairs = 0;

// Function to select random emojis for the game
function getRandomEmojis(numPairs) {
    const shuffledEmojis = emojis.sort(() => 0.5 - Math.random());
    const selectedEmojis = shuffledEmojis.slice(0, numPairs);
    return selectedEmojis.concat(selectedEmojis).sort(() => 0.5 - Math.random());
}

// Function to create the game board
function createGameBoard(emojis) {
    const gameBoard = document.getElementById('game-board');
    gameBoard.innerHTML = ''; // Clear existing cards

    emojis.forEach(emoji => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.emoji = emoji;
        card.innerHTML = '<span>' + emoji + '</span>';  // Add emoji to card
        card.querySelector('span').style.display = 'none';  // Hide emoji initially
        gameBoard.appendChild(card);

        card.addEventListener('click', flipCard); // Add click event to flip the card
    });
}

// Function to handle card flipping
function flipCard() {
    if (lockBoard) return; // Prevent flipping if the board is locked
    if (this === firstCard) return; // Prevent flipping the same card

    this.querySelector('span').style.display = 'block';  // Show the emoji
    this.classList.add('flipped'); // Add flipped class to show emoji
    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this; // Store the first flipped card
        return;
    }

    secondCard = this; // Store the second flipped card
    checkForMatch(); // Check for a match
}

// Function to check for a match
function checkForMatch() {
    const isMatch = firstCard.dataset.emoji === secondCard.dataset.emoji;
    isMatch ? disableCards() : unflipCards();
}

// Function to disable matched cards
function disableCards() {
    matchedPairs++;
    if (matchedPairs === 8) {
        document.getElementById('status').textContent = 'You won! All pairs matched!';
    }
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
}

// Function to unflip unmatched cards
function unflipCards() {
    lockBoard = true; // Lock the board for a brief moment
    setTimeout(() => {
        firstCard.querySelector('span').style.display = 'none';
        secondCard.querySelector('span').style.display = 'none';
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        resetBoard();
    }, 1000);
}

// Function to reset the board state
function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

// Example function to start the game
function startGame() {
    const numPairs = 8; // Number of pairs you want to use
    const emojiPairs = getRandomEmojis(numPairs);
    createGameBoard(emojiPairs); // Create the game board with selected emojis
}

// Call startGame() when the page loads or when the Play button is clicked
document.addEventListener('DOMContentLoaded', startGame);
