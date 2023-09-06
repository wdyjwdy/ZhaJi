const Test = () => {
  const token = localStorage.getItem('note-jwt') as string
  return (
    <div>
      <button onClick={() => {
        fetch('http://127.0.0.1:5000/token', {headers: {Authorization: token}})
      .then(res => res.json())
      .then(json => console.log(json))
      .catch(e => console.log(e))
      }}>fetch</button>
    </div>
  )
}

export default Test