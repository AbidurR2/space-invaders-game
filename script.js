document.addEventListener('DOMContentLoaded', () => {
    const player = document.getElementById('player');
    const gameContainer = document.querySelector('.game-container');
    const invaders = document.getElementById('invaders');
    let playerPosition = gameContainer.offsetWidth / 2 - player.offsetWidth / 2;
    const playerSpeed = 5;
    let bulletSpeed = 5;
    const invaderSpeed = 1;
    let invadersArray = [];

    // Create Invaders
    function createInvaders() {
        const rows = 5;
        const cols = 8;
        const invaderSpacing = 60;
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                const invader = document.createElement('div');
                invader.classList.add('invader');
                invader.style.left = `${col * invaderSpacing}px`;
                invader.style.top = `${row * invaderSpacing}px`;
                invaders.appendChild(invader);
                invadersArray.push(invader);
            }
        }
    }

    createInvaders();

    // Move Player
    function movePlayer() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft' && playerPosition > 0) {
                playerPosition -= playerSpeed;
            } else if (e.key === 'ArrowRight' && playerPosition < gameContainer.offsetWidth - player.offsetWidth) {
                playerPosition += playerSpeed;
            }
            player.style.left = `${playerPosition}px`;
        });
    }

    movePlayer();

    // Shoot Bullet
    function shootBullet() {
        document.addEventListener('keydown', (e) => {
            if (e.key === ' ') {
                const bullet = document.createElement('div');
                bullet.classList.add('bullet');
                bullet.style.left = `${playerPosition + player.offsetWidth / 2 - 2.5}px`;
                bullet.style.bottom = `${player.offsetHeight + 10}px`;
                gameContainer.appendChild(bullet);
                moveBullet(bullet);
            }
        });
    }

    shootBullet();

    // Move Bullet
    function moveBullet(bullet) {
        const bulletInterval = setInterval(() => {
            const bulletBottom = parseInt(bullet.style.bottom.replace('px', ''));
            bullet.style.bottom = `${bulletBottom + bulletSpeed}px`;

            if (bulletBottom > gameContainer.offsetHeight) {
                bullet.remove();
                clearInterval(bulletInterval);
            }

            invadersArray.forEach((invader, index) => {
                if (isCollision(bullet, invader)) {
                    invader.remove();
                    bullet.remove();
                    clearInterval(bulletInterval);
                    invadersArray.splice(index, 1);
                }
            });

        }, 30);
    }

    // Check Collision
    function isCollision(bullet, invader) {
        const bulletRect = bullet.getBoundingClientRect();
        const invaderRect = invader.getBoundingClientRect();

        return !(bulletRect.top > invaderRect.bottom ||
                 bulletRect.bottom < invaderRect.top ||
                 bulletRect.left > invaderRect.right ||
                 bulletRect.right < invaderRect.left);
    }
});
