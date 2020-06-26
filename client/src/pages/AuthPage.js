import React, { useState, useEffect } from 'react'
import { useHttp } from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'

export const AuthPage = () => {
  const message = useMessage()
  const {loading,request,error, clearError} = useHttp()
  const [form, setForm] = useState({
    email: '', password: ''
  })

  const changeHandler = event => {
    setForm({...form, [event.target.name]: event.target.value})
  }

  useEffect(()=>{
    message(error)
    clearError()
  }, [error, message, clearError])

  const requestHandler = async () => {
    try {
      const data = await request('/api/auth/register', 'POST', {...form})
      message(data.message)
    } catch (e) {}
  }

  return (
    <div className="row">
      <div className="col s6 offset-s3">
        <h1>Сократи ссылку</h1>
        <div className="card blue darken-1">
        <div className="card-content white-text">
          <span className="card-title">Авторизация</span>
          <div>
            
            <div className="input-field">
              <input 
                placeholder="Введите email" 
                id="email" 
                type="text" 
                name="email"
                className="yellow-input"
                onChange={changeHandler}
                />
              <label htmlFor="email">Email</label>
            </div>

            <div className="input-field">
              <input 
                placeholder="Введите пароль" 
                id="password" 
                type="password"
                name="password"
                className="yellow-input"
                onChange={changeHandler}
              />
              <label htmlFor="password">Пароль</label>
            </div>

          </div>
        </div>
        <div className="card-action">
          <button 
            className="btn yellow darken-4" 
            disabled={loading}
            style={{marginRight: 10}}>
            Войти
          </button>
          <button
             className="btn grey lighten-1 black-text"
             onClick={requestHandler}
             disabled={loading}
           >
             Регистрация
          </button>
        </div>
      </div>
      </div>
    </div>
  )
}