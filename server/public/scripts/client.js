console.log( 'js' );

function getKoalas(){
  console.log( 'in getKoalas' );
  // axios call to server to get koalas
  axios({
    method: 'GET',
    url: '/koalas'
  })
  .then((response) => {
    const koalaTable = document.querySelector('#viewKoalas');
    const allTheKoalas = response.data;
    koalaTable.innerHTML = ''
    for (let koala of allTheKoalas){
      koalaTable.innerHTML += `
      <tr>
        <td>${koala.name}</td>
        <td>${koala.age}</td>
        <td>${koala.gender}</td>
        <td>${koala.readyToTransfer}</td>
        <td>${koala.notes}</td>
      `
      if (koala.readyToTransfer === "Y"){
        koalaTable.innerHTML += `
          <td>''</td>
          <td>Add a delete button in here</td>
        </tr>
        `
      } else {
        koalaTable.innerHTML += `
          <td>Add a mark ready button in here</td>
          <td>Add a delete button in here</td>
        </tr>
        `
      }
    }
  })
  .catch((error) => {
    console.log(error);
  })
} // end getKoalas

function saveKoala(){
  console.log( 'in saveKoala' );
  // axios call to server to get koalas
 
}

getKoalas();
