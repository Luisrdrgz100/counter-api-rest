document.addEventListener('DOMContentLoaded', function () {

    // declarations
    ///////////////
    const baseApiUrl = 'http://localhost:4000';
    const counterNode = document.querySelector('.counter');

    const updateCounterDOM = (value) => {
        counterNode.innerText = String(value)
    }

    // get initial value from backend
    fetch(baseApiUrl + '/data')
        .then(response => response.json())
        .then(data => {
            updateCounterDOM(data.counterValue)
        })

    // Listeners
    ////////////

    // listener for incremente
    document.querySelector('.newBotons .increm').addEventListener('click', () => {
        // increment counter
        fetch(baseApiUrl + '/increment')
            .then(res => res.json())
            .then(data => {
                updateCounterDOM(data.counterValue)
            })
    })
    document.querySelector('.newBotons .decrem').addEventListener('click', () => {
        fetch(baseApiUrl + '/decrement')
            .then(res => res.json())
            .then(data => {
                updateCounterDOM(data.counterValue)
            })
    })

    // listener for increment by
    document.querySelector('header .incrementBy').addEventListener('keyup', (ev) => {

        if (ev.keyCode === 13) {
            let amount = ev.target.value;

            fetch(baseApiUrl + '/incrementBy/' + amount)
                .then(res => res.json())
                .then(data => {
                    updateCounterDOM(data.counterValue)
                    ev.target.value = '';
                })
                .catch(console.error)


        }
    })

})