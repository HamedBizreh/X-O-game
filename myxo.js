const startBtn = document.querySelector('.startBtn');
const playerOneInput = document.getElementById('inputOne');
const playerTwoInput = document.getElementById('inputTwo');
let gameBoardP1Name = document.getElementById('playerOne');
let gameBoardP2Name = document.getElementById('playerTwo');
let playerOneName = '';
let playerTwoName = '';
let warningApeared = false;
startBtn.addEventListener('click', (e)=>{
playerOneName = playerOneInput.value.trim();
playerTwoName = playerTwoInput.value.trim();
const popUpDiv = document.querySelector('.loadPopUp');
const enterNamesDiv = document.querySelector('.enterNames');
if(playerOneName == '' || playerTwoName == ''){
	  if(!warningApeared){
	  let warning = document.createElement('p');
	  warning.textContent = '*Please Enter Both Names*';
	  warning.classList.add('warningNote');
	  enterNamesDiv.appendChild(warning);
		warningApeared = true;
	}
	return;
};
gameBoardP1Name.textContent = `Player ❌: ${playerOneName}`;
gameBoardP2Name.textContent = `Player ⭕: ${playerTwoName}`;
gameBoardP1Name.textContent += ` (Now)`;
popUpDiv.style.display = 'none';
enterNamesDiv.style.display = 'none';
});
const cells = document.querySelectorAll('.cell');
let currentPlayer = 'x';
let gameOver = false;
let movesCounter = 0;
for (let cell of cells){
	cell.addEventListener('click', (e)=>{
		if(gameOver)return;
		if(cell.textContent !== '')return;
		cell.textContent = currentPlayer;
		cell.classList.add('XO');
		movesCounter++;
		const winner = currentPlayer;
		if(winCondition(cells)){
			setTimeout(()=>popUpWinner(winner), 500);
			gameOver = true;
		};
		if(!winCondition(cells) && movesCounter===9 ){
			setTimeout(()=>popUpDraw(winner), 500);
			gameOver = true;
		};
		currentPlayer = currentPlayer === 'x' ? 'o' : 'x';
		changeTurn();
	});
};
function winCondition(cells){
	winningCombonations = [
		[0,1,2], [3,4,5], [6,7,8],
		[0,3,6], [1,4,7], [2,5,8],
		[0,4,8], [2,4,6]
	];
	for(let [a,b,c] of winningCombonations){
		const v1 = cells[a].textContent;
		const v2 = cells[b].textContent;
		const v3 = cells[c].textContent;
		if(v1 !== '' && v1 == v2 && v2 == v3){
			return true;
		}	
	};
	return false;
}
function changeTurn(){
	if(currentPlayer === 'x'){
		gameBoardP1Name.textContent = `Player ❌: ${playerOneName} (Now)`;
    gameBoardP2Name.textContent = `Player ⭕: ${playerTwoName}`;
	}
	else{
		gameBoardP2Name.textContent = `Player ⭕: ${playerTwoName} (Now)`;
    gameBoardP1Name.textContent = `Player ❌: ${playerOneName}`;
	}
	return;
}
const winnerPopUp = document.getElementById('winnerPopUp');
function popUpWinner(winner){
	if(winner === 'x')
		winnerPopUp.textContent = `Congrats ${playerOneName} You Won !🎉🍾`;
	else
		winnerPopUp.textContent = `Congrats ${playerTwoName} You Won !🎉🍾`;
	let note = document.createElement('p');
	note.textContent = 'Click The Screen To Restart The Game.';
	note.classList.add('note');
	winnerPopUp.appendChild(note);
	winnerPopUp.style.display = 'flex';
	winnerPopUp.addEventListener('click', (e)=>{
		window.location.reload();
	});
};
function popUpDraw(){
	winnerPopUp.textContent = `Hmmm Draw, Competition On Fire !🔥`;
	let note = document.createElement('p');
	note.textContent = 'Click The Screen To Restart The Game.';
	note.classList.add('note');
	winnerPopUp.appendChild(note);
	winnerPopUp.style.display = 'flex';
	winnerPopUp.addEventListener('click', (e)=>{
		window.location.reload();
	});
};