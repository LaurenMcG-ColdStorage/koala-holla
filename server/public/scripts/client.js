console.log( 'js' );

function getKoalas(){
  console.log( 'in getKoalas' );
  // axios call to server to get koalas
  axios({
    method: 'GET',
    url: '/koalas'
  })
  .then((response) => {
    renderKoalas(response);
  })
  .catch((error) => {
    console.log(error);
  })
} // end getKoalas

function saveKoala(){
  console.log( 'in saveKoala' );
  //Gather data locations
  const koalaName = document.querySelector('#nameIn');
  const koalaAge = document.querySelector('#ageIn');
  const koalaGender = document.querySelector('#genderIn');
  const koalaTransfer = document.querySelector('#readyForTransferIn');
  const koalaNotes = document.querySelector('#notesIn');
  //Build new koala object
  const newKoala = {
    name: koalaName.value,
    age: koalaAge.value,
    gender: koalaGender.value,
    readyToTransfer: koalaTransfer.value,
    notes: koalaNotes.value
  };
  //Axios Post to update database
  axios({
    method: 'POST',
    url: '/koalas',
    data: newKoala
  })
  .then((response) => {
    
  })
  .catch((error) => {
    console.log(error);
  })
  
  // axios call to server to get koalas
  axios({
    method: 'GET',
    url: '/koalas',
  })
  .then((response) => {
    console.log(newKoala);
    renderKoalas(response);
  })
  .catch((error) => {
    console.log(error);
  })
}

function renderKoalas(response){
  const koalaTable = document.querySelector('#viewKoalas');
    const allTheKoalas = response.data;
    koalaTable.innerHTML = ''
    for (let koala of allTheKoalas){
      if (koala.readyToTransfer === "Y"){
      koalaTable.innerHTML += `
      <tr>
        <td>${koala.name}</td>
        <td>${koala.age}</td>
        <td>${koala.gender}</td>
        <td>${koala.readyToTransfer}</td>
        <td>${koala.notes}</td>
        <td></td>
        <td>Add a delete button in here</td>
      </tr>
        `
      } else {
        koalaTable.innerHTML += `
        <tr>
          <td>${koala.name}</td>
          <td>${koala.age}</td>
          <td>${koala.gender}</td>
          <td>${koala.readyToTransfer}</td>
          <td>${koala.notes}</td>
          <td>Add a mark ready button</td>
          <td>Add a delete button in here</td>
        </tr>
          `
      }
    }
}

getKoalas();
