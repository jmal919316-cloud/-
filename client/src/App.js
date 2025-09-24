import React, { useEffect, useState } from 'react';

const API = process.env.REACT_APP_API_URL || "http://localhost:5000";

function App() {
  const [products, setProducts] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [storeId, setStoreId] = useState('');

  useEffect(() => {
    fetch(API + '/api/products')
      .then(res => res.json())
      .then(setProducts)
      .catch(console.error);
  }, []);

  const register = async () => {
    const res = await fetch(API + '/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password })
    });
    alert((await res.json()).message || 'تم');
  };

  const login = async () => {
    const res = await fetch(API + '/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (data.token) {
      setToken(data.token);
      localStorage.setItem('token', data.token);
      alert('تم تسجيل الدخول');
    } else {
      alert(data.message || 'خطأ');
    }
  };

  const createProduct = async () => {
    const res = await fetch(API + '/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token },
      body: JSON.stringify({ name, price: Number(price), store: storeId })
    });
    const data = await res.json();
    if (res.ok) {
      alert('تم إنشاء المنتج');
      setProducts(prev => [data, ...prev]);
    } else {
      alert(data.message || 'خطأ');
    }
  };

  return (
    <div>
      <h1>Alfalah Market — الواجهة البسيطة</h1>

      <section style={{marginBottom:20}}>
        <h2>عرض المنتجات</h2>
        {products.length === 0 ? <p>لا توجد منتجات حالياً</p> :
          <ul>
            {products.map(p => <li key={p._id || p.id}>{p.name} — {p.price} دينار</li>)}
          </ul>
        }
      </section>

      <section style={{marginBottom:20}}>
        <h2>تسجيل</h2>
        <input placeholder='Username' value={username} onChange={e=>setUsername(e.target.value)} /> <br/>
        <input placeholder='Email' value={email} onChange={e=>setEmail(e.target.value)} /> <br/>
        <input placeholder='Password' type='password' value={password} onChange={e=>setPassword(e.target.value)} /> <br/>
        <button className='btn' onClick={register}>تسجيل</button>
      </section>

      <section style={{marginBottom:20}}>
        <h2>تسجيل دخول</h2>
        <input placeholder='Email' value={email} onChange={e=>setEmail(e.target.value)} /> <br/>
        <input placeholder='Password' type='password' value={password} onChange={e=>setPassword(e.target.value)} /> <br/>
        <button className='btn' onClick={login}>دخول</button>
      </section>

      <section style={{marginBottom:20}}>
        <h2>إنشاء منتج (مطلوب تسجيل دخول)</h2>
        <input placeholder='اسم المنتج' value={name} onChange={e=>setName(e.target.value)} /> <br/>
        <input placeholder='السعر' value={price} onChange={e=>setPrice(e.target.value)} /> <br/>
        <input placeholder='storeId (اختياري)' value={storeId} onChange={e=>setStoreId(e.target.value)} /> <br/>
        <button className='btn' onClick={createProduct}>إنشاء</button>
      </section>

      <section>
        <h2>المعلومات</h2>
        <p>الخادم: <code>{API}</code></p>
        <p>الحالة: {token ? 'مسجل' : 'غير مسجل'}</p>
      </section>
    </div>
  );
}

export default App;
