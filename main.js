
        // shuffle
         function shuffle(array) {
            for (let i = array.length - 1; i > 0; i-- ) {
             const j = Math.floor(Math.random() * (i + 1));
             [array[i], array[j]] = [array[j], array[i]];
            }
           return array;
        }

        function initGame(){
            const grid = document.querySelector('.grid');
            const card = Array.from(grid.children);
            console.log("Oorspornkelijke volgorde:", card.map(c => c.querySelector('.card-input').dataset.value));

            grid.innerHTML = '';
            const shuffled = shuffle(card);
            console.log('Geschudde volgorde:', shuffled.map(c => c.querySelector('.card-input').dataset.value));
        
            shuffled.forEach(card => grid.appendChild(card));
        }

        let firstCard = null;
        let secondCard = null;
        let lockBoard = false;

        function flipCard(){
            if (lockBoard) return;
            if (this == firstCard) return;

            this.classList.add('flipped');

            if(!firstCard) {
                firstCard = this;
                return;
            }
            secondCard = this;

            checkForMatch();
        }

        function checkForMatch(){
            const isMatch = firstCard.dataset.value == secondCard.dataset.value
            isMatch ? handleMatch() : handleMismatch();
        }

        function handleMatch (){
            firstCard.removeEventListener('click', flipCard);
            secondCard.removeEventListener('click', flipCard);
            resetBoard();
        }

        function handleMismatch() {
            lockBoard = true;
            setTimeout(() => {
                firstCard.classList.remove('flipped');
                secondCard.classList.remove('flipped');
                resetBoard();
            }, 1000);
        }
            
        function resetBoard (){
            [firstCard, secondCard] = [null, null];
            lockBoard = false;
        }

        // DOM
         document.addEventListener('DOMContentLoaded', () => {
            initGame();
            
        //Nieuwspel
            document.querySelector('.btn-reset').addEventListener('click', function() {
                document.querySelectorAll('.card-input').forEach(cb => cb.checked = false);
                initGame();
            }); 

            const wrappers = document.querySelectorAll('.card-wrapper');

            wrappers.forEach(wrapper => {
                    const input = wrapper.querySelector('.card-input');
                    wrapper.dataset.value = input.dataset.value;

                    wrapper.addEventListener('click', flipCard);                     
                });
            });
  