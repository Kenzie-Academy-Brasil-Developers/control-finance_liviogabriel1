/* Desenvolva sua lógica aqui */
function abrirModal() {
  const abrirModalBtn = document.getElementById('abrirModalBtn');
  const modalController = document.getElementById('modal__controller');

  abrirModalBtn.addEventListener('click', function () {
    modalController.showModal();
    setTimeout(function () {
      modalController.classList.add('active');
    }, 10);
  });

  const noValuesContainer = document.querySelector('.noValuesMessage__container');
  noValuesContainer.addEventListener('click', function () {
    modalController.showModal();
    setTimeout(function () {
      modalController.classList.add('active');
    }, 10);
  });

  fecharModal();
}

function fecharModal() {
    const button = document.getElementById('closeModal');
    const modalController = document.getElementById('modal__controller');
    const cancelButton = document.querySelector('.cancel');
    button.addEventListener('click', function() {
      modalController.close()
    })

    cancelButton.addEventListener('click', function() {
      modalController.close()
    })
}

abrirModal()

let selectedOption = null;

function inserirValor() {
  const valorInput = document.querySelector('.modal__input');
  const entradaButton = document.querySelector('.modal__button:nth-of-type(1)');
  const saidaButton = document.querySelector('.modal__button:nth-of-type(2)');

  entradaButton.addEventListener('click', function () {
    selectedOption = 0;
    entradaButton.classList.add('selected');
    saidaButton.classList.remove('selected');
  });

  saidaButton.addEventListener('click', function () {
    selectedOption = 1;
    entradaButton.classList.remove('selected');
    saidaButton.classList.add('selected');
  });

  const insertButton = document.querySelector('.insert');

  insertButton.addEventListener('click', function () {
    if (selectedOption !== null) {
      const newValue = parseFloat(valorInput.value);

      const newId = insertedValues.length + 1;

      insertedValues.push({
        id: newId,
        value: newValue,
        categoryID: selectedOption,
      });

      renderValues(insertedValues);
      calcularSomaValores();
      fecharModal();
      valorInput.value = '';
      entradaButton.classList.remove('selected');
      saidaButton.classList.remove('selected');
      selectedOption = null;
    }
  });
}

const valorInput = document.getElementById('valorInput');

valorInput.addEventListener('focus', function() {
  this.classList.add('focus');
});

valorInput.addEventListener('blur', function() {
  this.classList.remove('focus');
});

const modalButtons = document.querySelectorAll('.modal__button');

modalButtons.forEach((button) => {
  button.addEventListener('click', function() {
    modalButtons.forEach((button) => {
      button.classList.remove('selected');
    });

    this.classList.add('selected');
  });
});

inserirValor();