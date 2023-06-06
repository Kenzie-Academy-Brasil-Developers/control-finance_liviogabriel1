function formatCurrency(value) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function calcularSomaValores() {
  const sumValueElement = document.getElementById('sum-value');

  const sum = insertedValues.reduce((total, value) => {
    return total + value.value;
  }, 0);

  sumValueElement.textContent = formatCurrency(sum.toFixed(2));
}

function filterValues(categoryID) {
  let filteredValues = [];

  if (categoryID === 0) {
    filteredValues = insertedValues;
  } else if (categoryID === 1) {
    filteredValues = insertedValues.filter((value) => {
      return value.categoryID === 0;
    });
  } else if (categoryID === 2) {
    filteredValues = insertedValues.filter((value) => {
      return value.categoryID === 1;
    });
  }

  renderValues(filteredValues);
  calcularSomaValores();
}

function renderValues(values) {
  const valuesContainer = document.querySelector('.values ul');
  valuesContainer.innerHTML = '';

  if (values.length > 0) {
    values.forEach((value) => {
      const listItem = document.createElement('li');
      listItem.classList.add('list__items');

      const valueText = document.createElement('span');
      valueText.textContent = `R$ ${value.value.toFixed(2)}`;
      valueText.classList.add('text__span');
      listItem.appendChild(valueText);

      const categoryText = document.createElement('span');
      categoryText.textContent = valuesCategory[value.categoryID];
      categoryText.classList.add('value__span');
      listItem.appendChild(categoryText);

      const imgTrash = document.createElement('img');
      imgTrash.src = './src/assets/trash.svg';
      imgTrash.classList.add('remove');
      imgTrash.alt = 'Trash Icon';
      listItem.appendChild(imgTrash);

      imgTrash.addEventListener('click', () => {
        listItem.remove();
        // Remover o valor excluído do array insertedValues
        const index = insertedValues.findIndex((item) => item.id === value.id);
        if (index !== -1) {
          const deletedValue = insertedValues.splice(index, 1)[0];
          calcularSomaValores();
        }
        if (insertedValues.length === 0) {
          const sumValueElement = document.getElementById('sum-value');
          sumValueElement.textContent = '0,00';
        }
        exibirMensagemSemValores();
      });

      valuesContainer.appendChild(listItem);
    });
  } else {
    const sumValueElement = document.getElementById('sum-value');
    sumValueElement.textContent = '0,00';
  }
}

renderValues(insertedValues);
exibirMensagemSemValores();
calcularSomaValores();
fecharModal();

function exibirMensagemSemValores() {
  const noValuesMessage = document.getElementById('noValuesMessage');
  const registerValue = document.getElementById('registerValue');
  const noValuesContainer = document.querySelector('.noValuesMessage__container');
  
  if (insertedValues.length === 0) {
    noValuesMessage.textContent = 'Nenhum valor cadastrado';
    noValuesMessage.style.display = 'block';
    registerValue.style.display = 'inline';
    noValuesContainer.classList.add('border-visible');
  } else {
    noValuesMessage.style.display = 'none';
    registerValue.style.display = 'none';
    noValuesContainer.classList.remove('border-visible');
  }
}

const menuButtons = document.querySelectorAll('.menu__button');

menuButtons.forEach((button, index) => {
  button.addEventListener('click', function () {
    filterValues(index);

    menuButtons.forEach((button) => {
      button.classList.remove('selected');
    });

    this.classList.add('selected');
  });
});

const insertButton = document.querySelector('.insert');
insertButton.addEventListener('click', function () {
  const valorInput = document.getElementById('valorInput');
  const entradaButton = document.querySelector('.modal__button:nth-of-type(1)');
  const saidaButton = document.querySelector('.modal__button:nth-of-type(2)');

  if (selectedOption !== null && valorInput.value.trim() !== '') {
    const newValue = parseFloat(valorInput.value);
    const newId = insertedValues.length + 1;
    const newCategoryID = selectedOption;

    insertedValues.push({
      id: newId,
      value: newValue,
      categoryID: newCategoryID,
    });

    valorInput.value = '';
    entradaButton.classList.remove('selected');
    saidaButton.classList.remove('selected');
    selectedOption = null;

    renderValues(insertedValues);
    exibirMensagemSemValores();
    calcularSomaValores();
    fecharModal();
  }
});