import { useState } from "react";
import Notification from "../../../components/Notification";
import { authService } from "../../../services/authService";
import "./index.css";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({
    message: "",
    type: "success",
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setLoading(true);
    setNotification({ message: "", type: "success" });

    try {
      await authService.create(formData);

      sessionStorage.setItem(
        "flashMessage",
        JSON.stringify({
          message: "Usuário cadastrado com sucesso!",
          type: "success",
        })
      );

      setFormData({
        name: "",
        email: "",
        password: "",
      });

      window.location.href = "/";
    } catch (err) {
      setNotification({
        message: err.response?.data?.message || err.message || "Erro ao cadastrar usuário",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="register-page">
      <Notification
        message={notification.message}
        type={notification.type}
        onClose={() => setNotification({ message: "", type: notification.type })}
      />

      <section className="register-card">
        <div className="register-header">
          <h1>Criar conta</h1>
          <p>Cadastre-se para começar a controlar suas despesas.</p>
        </div>

        <form onSubmit={handleSubmit} className="register-form">
          <div className="form-group">
            <label htmlFor="name">Nome</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Digite seu nome"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Digite seu e-mail"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Digite sua senha"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Cadastrando..." : "Cadastrar"}
          </button>
        </form>

        <p className="login-link">
          Já tem uma conta? <a href="/">Entrar</a>
        </p>
      </section>
    </main>
  );
}

export default Register;
