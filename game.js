function Game() {
	//properties
	this.board = genBoard(1);
	this.winner = false;
	this.turn = 'X';
	this.lastMove = '';

	//methods
	this.playTurn = function (upper, lower) {
		
	}

	//helper functions
	function genBoard(level) {
		var obj = {};
		obj.winner = '';
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
