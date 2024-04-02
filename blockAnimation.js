
//Leer la layer3 y dibujar su correspondiente sprite
function BlockAnimation(map, level) {
	this.map = map;
	this.coins = [];
	this.queryblock = [];
	this.bricks = [];
	this.num_collected_coins = 0;
	this.num_broken_blocks = 0;
	this.level = level;
	this.coinColisionAudio = AudioFX('sounds/smb_coin.wav');
	this.breakBlockAudio = AudioFX('sounds/smb_breakblock.wav');
	this.powerupAudio = AudioFX('sounds/smb_powerup.wav');

}

BlockAnimation.prototype.update = function (deltaTime) {
	var atb = this.map.getBlockAnimationData();

	if (this.coins.length < 1)
		this.coins = this.createCoinAnimation(atb[0], atb[1], atb[2], atb[3], atb[4]);
	if (this.queryblock.length < 1)
		this.queryblock = this.createQueryBlockAnimation(atb[0], atb[1], atb[2], atb[3], atb[4]);
	if (this.bricks.length < 1)
		this.bricks = this.createBrickAnimation(atb[0], atb[1], atb[2], atb[3], atb[4]);

	this.coins.forEach(coin => coin.update(deltaTime));
	this.queryblock.forEach(queryblock => queryblock.update(deltaTime));
	this.bricks.forEach(brick => brick.update(deltaTime));
	this.piece1 && this.piece1.update(deltaTime);
	this.piece2 && this.piece2.update(deltaTime);
	this.piece3 && this.piece3.update(deltaTime);
	this.piece4 && this.piece4.update(deltaTime);
}

//OPosX, OPosY: origen de coordenadas del mapa
//tileX, tileY: el ancho y alto del tile en pixels
//layer: json de la capa 3
BlockAnimation.prototype.createCoinAnimation = function (OPosX, OPosY, tileX, tileY, layer) {
	var coins = [];
	for (var j = 0, pos = 0; j < layer.height; j++)
		for (var i = 0; i < layer.width; i++, pos++) {
			var tiledId = layer.data[pos];
			if (tiledId == 36 && this.level == 1) //11 in world2
				coins.push(new Coin(OPosX + i * tileX, OPosY + j * tileY));
			if (tiledId == 11 && this.level == 2) //11 in world2
				coins.push(new Coin(OPosX + i * tileX, OPosY + j * tileY));
		}
	return coins;
}

BlockAnimation.prototype.createQueryBlockAnimation = function (OPosX, OPosY, tileX, tileY, layer) {
	var queryblock = [];
	for (var j = 0, pos = 0; j < layer.height; j++)
		for (var i = 0; i < layer.width; i++, pos++) {
			var tiledId = layer.data[pos];
			if (tiledId == 2 && this.level == 1)
				queryblock.push(new QueryBlock(OPosX + i * tileX, OPosY + j * tileY, this.map));
			if (tiledId == 5 && this.level == 2)
				queryblock.push(new QueryBlock(OPosX + i * tileX, OPosY + j * tileY, this.map));
		}
	return queryblock;
}

BlockAnimation.prototype.createBrickAnimation = function (OPosX, OPosY, tileX, tileY, layer) {
	var bricks = [];
	for (var j = 0, pos = 0; j < layer.height; j++)
		for (var i = 0; i < layer.width; i++, pos++) {
			var tiledId = layer.data[pos];
			if (tiledId == 3 && this.level == 1)
				bricks.push(new Brick(OPosX + i * tileX, OPosY + j * tileY, this.map));
			if (tiledId == 8 && this.level == 2)
				bricks.push(new Brick(OPosX + i * tileX, OPosY + j * tileY, this.map));
		}
	return bricks;
}

BlockAnimation.prototype.draw = function () {
	this.coins.forEach(coin => coin.draw());
	this.queryblock.forEach(queryblock => queryblock.draw());
	this.bricks.forEach(brick => brick.draw());
	this.piece1 && this.piece1.draw();
	this.piece2 && this.piece2.draw();
	this.piece3 && this.piece3.draw();
	this.piece4 && this.piece4.draw();
}

BlockAnimation.prototype.checkCollision = function (player) {
	var playerColisionBox = player.collisionBox();
	var playerColisionTop = player.collisionTop();

	this.coins.forEach(coin => {
		if (playerColisionBox.intersect(coin.collisionBox()) && coin.active) {
			coin.active = false;
			if (!coin.once) {
				this.coinColisionAudio.stop();
				this.coinColisionAudio.play();
				coin.once = true;
			}
			this.num_collected_coins += 1;
			console.log("+1 coin: ", this.num_collected_coins);
		}
	});

	this.queryblock.forEach(queryblock => {
		if (playerColisionTop.intersect(queryblock.collisionDown())) {
			if (queryblock.sprite.currentAnimation == 0) {
				this.coinColisionAudio.stop();
				this.coinColisionAudio.play();
			}
			queryblock.hit = true;
		}
		//TODO: this.mushroom object exists ?
		if (queryblock.mushroom.active && playerColisionBox.intersect(queryblock.mushroom.collisionBox())) {
			queryblock.mushroom.active = false;
			queryblock.mushroom.play = false;
			//grow to Super Mario
			player.state = SUPER_MARIO;
			player.transforming = true;
		}
		if (queryblock.star.active && playerColisionBox.intersect(queryblock.star.collisionBox())) {
			queryblock.star.active = false;
			queryblock.star.play = false;
			//grow to Star Mario
			player.changeStarAnimation(true);
		}
	});

	this.bricks.forEach(brick => {
		if (playerColisionTop.intersect(brick.collisionDown())) {
			brick.hit = true;

			if (player.state == SUPER_MARIO) {
				brick.break = true;
				if (brick.active == true) {
					this.num_broken_blocks += 1;
					this.breakBlockAudio.stop();
					this.breakBlockAudio.play();

					this.piece1 = new BPiece(brick.x, brick.y);
					this.piece2 = new BPiece(brick.x + 16, brick.y);
					this.piece3 = new BPiece(brick.x, brick.y + 16);
					this.piece4 = new BPiece(brick.x + 16, brick.y + 16);
					this.piece3.right = false;
					this.piece1.right = false;
				}
				//this.bricks = this.bricks.filter((b) => b.x != brick.x || b.y != brick.y);
				//console.log(this.bricks);
			}
		}
	});

	return [this.num_collected_coins, this.num_broken_blocks]

}