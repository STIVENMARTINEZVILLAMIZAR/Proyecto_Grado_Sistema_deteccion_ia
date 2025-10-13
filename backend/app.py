from flask import Flask, render_template, session, redirect, url_for, request, jsonify
from auth import auth_bp
from routes_people import people_bp
from routes_events import events_bp
from db import engine, Base
from config import SECRET_KEY
from detection import CameraWorker, mjpeg_generator
from functools import wraps
import os

# ------------------------
# Inicialización de la base de datos
# ------------------------
Base.metadata.create_all(bind=engine)

# ------------------------
# Configuración de la aplicación Flask
# ------------------------
app = Flask(
    __name__,
    template_folder=os.path.join(os.path.dirname(__file__), '../templates'),
    static_folder=os.path.join(os.path.dirname(__file__), '../static')
)

app.config.update(
    SECRET_KEY=SECRET_KEY,
    SESSION_PERMANENT=False,
    SESSION_USE_SIGNER=True
)

# ------------------------
# Registro de Blueprints
# ------------------------
app.register_blueprint(auth_bp)
app.register_blueprint(people_bp)
app.register_blueprint(events_bp)

# ------------------------
# Gestión de cámaras activas
# ------------------------
workers = {}

# ------------------------
# Decorador para proteger rutas
# ------------------------
def login_required(view_func):
    @wraps(view_func)
    def wrapper(*args, **kwargs):
        if 'empresa_id' not in session:
            return redirect(url_for('auth.login'))
        return view_func(*args, **kwargs)
    return wrapper

# ------------------------
# Rutas principales
# ------------------------
@app.route('/')
@login_required
def index():
    return render_template('index.html', empresa=session.get('empresa_nombre', ''))

@app.route('/profile')
@login_required
def profile():
    return render_template('profile.html', empresa=session.get('empresa_nombre', ''))

@app.route('/about')
@login_required
def about():
    return render_template('about.html', empresa=session.get('empresa_nombre', ''))

@app.route('/instructions')
@login_required
def instructions():
    return render_template('instructions.html', empresa=session.get('empresa_nombre', ''))

# ------------------------
# Streaming de cámara
# ------------------------
@app.route('/stream/<int:cam_id>')
@login_required
def stream(cam_id):
    worker_key = f"{session['empresa_id']}_{cam_id}"

    # Crear un nuevo worker si no existe
    if worker_key not in workers:
        workers[worker_key] = CameraWorker(
            source=cam_id,
            camera_name=f"CAM{cam_id}",
            empresa_id=session['empresa_id']
        )
        workers[worker_key].start()

    worker = workers[worker_key]

    return app.response_class(
        mjpeg_generator(worker),
        mimetype='multipart/x-mixed-replace; boundary=frame'
    )

# ------------------------
# Endpoint API - Listado de cámaras
# ------------------------
@app.route('/api/cameras')
@login_required
def get_cameras():
    cameras = [
        {'id': 0, 'name': 'Cámara Principal', 'status': 'active'},
        {'id': 1, 'name': 'Cámara Entrada', 'status': 'active'},
        {'id': 2, 'name': 'Cámara Salida', 'status': 'inactive'},
        {'id': 3, 'name': 'Cámara Parking', 'status': 'inactive'}
    ]
    return jsonify(cameras)

# ------------------------
# Manejo de errores
# ------------------------
@app.errorhandler(404)
def page_not_found(e):
    return render_template('404.html'), 404

@app.errorhandler(500)
def internal_error(e):
    return render_template('500.html'), 500

# ------------------------
# Ejecución de la aplicación
# ------------------------
if __name__ == '__main__':
    app.run(
        host='0.0.0.0',
        port=int(os.getenv("PORT", 5000)),
        debug=os.getenv("FLASK_DEBUG", "True").lower() == "true"
    )
