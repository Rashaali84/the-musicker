fetch('/api')
  .then(res => res.json())
  .then(data => {
    console.log(data)
    document.getElementById('root')
      .innerHTML = data.message;
  })
  .catch(err => console.error(err));

