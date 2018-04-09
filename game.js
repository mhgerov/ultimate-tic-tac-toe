function Game() {
	//properties
	this.board = genBoard(1);
	this.turn = 'X';
	this.lastMove = ''; //e.g. 'r2c3'

	//methods
	this.playTurn = function (global, local) {
		/*check for legal move
		 *	Game is not over -> !this.board.winner
		 *	Picked spot is empty -> this.board[global][local] == ''
		 *	Picked region is correct
		 *		Region is based off last move -> global == this.lastMove
		 *		OR
		 *		Any region is fine if lastMove pointed to finished board -> this.board[lastmove].winner
		 *	Local board is not won -> !this.board[global].winner
		 */
		if (!this.board.winner && this.board[global][local] == '' && (global == this.lastMove || this.board[lastMove].winner) && !this.board[global].winner) {
			//Mark board
			this.board[global][local] = this.turn;
			//Change turn
			this.turn == 'X' ? this.turn = 'O' : this.turn = 'X';
			this.lastMove = local
			/* check for winner locally
			 * check column
			 * check diagonal
			 * check all spots full -> tie
			 */
			if (
				(this.board[global]['r'+local[1]+'c1'] == this.board[global]['r'+local[1]+'c2'] && this.board[global]['r'+local[1]+'c2'] == this.board[global]['r'+local[1]+'c3']) ||
				(this.board[global]['r1c'+local[3]] == this.board[global]['r2c'+local[3]] && this.board[global]['r2c'+local[3]] == this.board[global]['r3c'+local[3]]) ||
				(this.board[global].r1c1 == this.board[global].r2c2 && this.board[global].r2c2 == this.board[global].r3c3) || 
				(this.board[global].r1c3 == this.board[global].r2c2 && this.board[global].r2c2 == this.board[global].r3c1)
			) this.board[global].winner = this.board[global][local];
			//check for local draw
			//board full AND no winner
			if (!this.board[global].winner) {
				var full = true;
				for (var r = 1; r<=3; r++) {
					for (var c = 1; c<=3; c++) {
						if (this.board[global]['r'+r+'c'+c] == '') {
							full = false;
							break;
						}
					}
					if (!full) break;
				}
				if (full) this.board[global].winner = 'tie';
			}
			//check for winner globally
		} else {
			console.log('Not a legal move')
		}
	}

	//helper functions
	/*
	 * r1c1 | r1c2 | r1c3
	 * ------------------
	 * r2c1 | r2c2 | r2c3
	 * ------------------
	 * r3c1 | r3c2 | r3c3
	 */
	function genBoard(level) {
		var obj = {};
		obj.winner = false;
		if (level==0) {
			for (var r=1; r<=3; r++) {
				for (var c=1; c<=3; c++) {
					obj['r'+r+'c'+c] = '';
				}
			}
		} else {
			for (var r=1; r<=3; r++) {
				for (var c=1; c<=3; c++) {
					obj['r'+r+'c'+c] = genBoard(level-1);
				}
			}
		}
		return obj;
	}
}
