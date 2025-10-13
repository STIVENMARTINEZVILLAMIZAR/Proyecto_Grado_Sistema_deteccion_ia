# alerts.py
import requests

# ⚙️ CONFIGURA ESTOS VALORES CON TU BOT DE TELEGRAM
TOKEN = "TU_TOKEN_DEL_BOT"  # Por ejemplo: "123456789:ABCdefGHIjklMNOpqrSTUvwxYZ"
CHAT_ID = "TU_CHAT_ID"      # Por ejemplo: "987654321"

def enviar_alerta_telegram(nombre_empresa, nombre_camara, similitud):
    mensaje = (
        f"🚨 *Alerta de seguridad en {nombre_empresa}*\n"
        f"Cámara: {nombre_camara}\n"
        f"Persona desconocida detectada.\n"
        f"Similitud: {similitud:.2f}"
    )

    url = f"https://api.telegram.org/bot{TOKEN}/sendMessage"
    data = {"chat_id": CHAT_ID, "text": mensaje, "parse_mode": "Markdown"}

    try:
        requests.post(url, data=data)
        print("✅ Alerta enviada a Telegram")
    except Exception as e:
        print(f"❌ Error al enviar alerta a Telegram: {e}")
