(async ()=>{
  try{
    const res = await fetch('http://localhost:3000/api/auth/reset', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: '082bbafe177d84871822e52a887afc8a1c331bbf97ac86f2910e26dea369321e', password: 'newpassword123' })
    })
    const text = await res.text();
    console.log('Status:', res.status)
    console.log('Body:', text)
  }catch(e){
    console.error(e)
  }
})()