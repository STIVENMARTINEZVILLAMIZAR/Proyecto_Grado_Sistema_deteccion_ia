# 🔐 Sistema de Detección de Rostros con IA

Este proyecto de grado consiste en un sistema de seguridad inteligente basado en inteligencia artificial para el reconocimiento facial. Su objetivo principal es detectar si una persona que aparece frente a una cámara de seguridad forma parte del personal autorizado de una empresa, comparando su rostro con los registros previamente almacenados en una base de datos.

El sistema está desarrollado con Python y hace uso de la librería DeepFace para el procesamiento y verificación facial, Flask como microframework para la interfaz backend y SQLAlchemy para la gestión de la base de datos. Es ideal para entornos empresariales donde se desea automatizar el control de acceso por medio de cámaras ubicadas en diferentes puntos.

## 🚀 Funcionalidades principales

- Detección y verificación de rostros en tiempo real.
- Comparación automática con base de datos de empleados.
- Registro de accesos y eventos (entrada/salida).
- Integración con cámaras de seguridad.
- API RESTful con Flask para integración externa.
- Control de acceso basado en IA.

## ⚙️ Tecnologías utilizadas

- Python 3.10+
- DeepFace
- OpenCV
- Flask
- SQLAlchemy
- MySQL
- Virtualenv
- Git

## 📦 Instalación rápida

```bash
# Clona el repositorio
git clone https://github.com/STIVENMARTINEZVILLAMIZAR/v0-sistemadedetecccionderostrosconia.git
cd v0-sistemadedetecccionderostrosconia

# Crea entorno virtual
py -3.10 -m venv venv
.\venv\Scripts\activate

# Instala dependencias
pip install --upgrade pip setuptools wheel
pip install -r requirements.txt

# Ejecuta la app
cd backend
python app.py
🧪 ¿Cómo funciona?
El sistema capta una imagen desde una cámara, luego DeepFace verifica si ese rostro coincide con alguno en la base de datos. Si hay coincidencia, se registra el acceso; si no, se alerta sobre un intento no autorizado.

🏢 Casos de uso
Control de acceso empresarial

Registro de personal en áreas restringidas

Automatización del control de asistencia

Detección de intrusos en entornos privados

👨‍💻 Autor
Stiven Martínez Villamizar
Proyecto de grado - Sistema de Detección de Rostros con IA
GitHub: @STIVENMARTINEZVILLAMIZAR

📄 Licencia
Este proyecto está bajo la licencia MIT.