# alerts.py
import requests
from datetime import datetime

# ⚙️ CONFIGURACIÓN DEL BOT DE TELEGRAM
TOKEN = "8331155786:AAHUzgyMzfi3MkowwyNpWgzvc4FJjx08Cmg"
CHAT_ID = 5309556939  # Se configurará automáticamente

# 🔗 URL DEL BOT PARA QUE LOS USUARIOS SE UNAN
BOT_USERNAME = "seguridadFacialbot"  # Tu usuario de bot en Telegram
BOT_LINK = f"https://t.me/{BOT_USERNAME}"

def enviar_alerta_telegram(nombre_empresa, nombre_camara, similitud, foto_path=None):
    """
    Envía una alerta de seguridad al canal de Telegram
    """
    if not CHAT_ID:
        print("⚠️ CHAT_ID no configurado. El usuario debe unirse al bot primero.")
        return False

    mensaje = (
        f"🚨 *ALERTA DE SEGURIDAD*\n\n"
        f"🏢 Empresa: *{nombre_empresa}*\n"
        f"📹 Cámara: *{nombre_camara}*\n"
        f"👤 Estado: *Persona Desconocida*\n"
        f"📊 Similitud: *{similitud:.1%}*\n"
        f"🕒 Hora: {datetime.now().strftime('%d/%m/%Y %H:%M:%S')}"
    )

    # ✅ URL CORRECTA de la API de Telegram
    url = f"https://api.telegram.org/bot{TOKEN}/sendMessage"
    
    data = {
        "chat_id": CHAT_ID,
        "text": mensaje,
        "parse_mode": "Markdown"
    }

    try:
        response = requests.post(url, data=data, timeout=5)
        
        if response.status_code == 200:
            print("✅ Alerta enviada a Telegram correctamente")
            
            # Si hay foto, enviarla también
            if foto_path:
                enviar_foto_telegram(foto_path, nombre_camara)
            return True
        else:
            print(f"❌ Error al enviar alerta: {response.status_code}")
            print(f"Respuesta: {response.text}")
            return False
            
    except requests.exceptions.Timeout:
        print("⏱️ Timeout al enviar alerta a Telegram")
        return False
    except Exception as e:
        print(f"❌ Error al enviar alerta a Telegram: {e}")
        return False


def enviar_foto_telegram(foto_path, caption=""):
    """Envía una foto al chat de Telegram"""
    if not CHAT_ID:
        return False
        
    url = f"https://api.telegram.org/bot{TOKEN}/sendPhoto"
    
    try:
        with open(foto_path, 'rb') as photo:
            files = {'photo': photo}
            data = {
                'chat_id': CHAT_ID,
                'caption': f"📸 Captura de: {caption}"
            }
            response = requests.post(url, files=files, data=data, timeout=10)
            
            if response.status_code == 200:
                print("✅ Foto enviada a Telegram")
                return True
            else:
                print(f"❌ Error enviando foto: {response.text}")
                return False
                
    except FileNotFoundError:
        print(f"❌ Archivo no encontrado: {foto_path}")
        return False
    except Exception as e:
        print(f"❌ Error al enviar foto: {e}")
        return False


def obtener_chat_id_desde_updates():
    """
    Obtiene el CHAT_ID del último mensaje enviado al bot.
    Ejecuta esta función después de enviar /start al bot.
    """
    url = f"https://api.telegram.org/bot{TOKEN}/getUpdates"
    
    try:
        response = requests.get(url, timeout=5)
        data = response.json()
        
        if data.get('ok') and data.get('result'):
            updates = data['result']
            if updates:
                # Obtener el chat_id del último mensaje
                last_update = updates[-1]
                chat_id = last_update['message']['chat']['id']
                print(f"✅ CHAT_ID obtenido: {chat_id}")
                print(f"📝 Agrega esta línea a tu código:")
                print(f"CHAT_ID = '{chat_id}'")
                return str(chat_id)
            else:
                print("⚠️ No hay mensajes. Envía /start al bot primero.")
                return None
        else:
            print(f"❌ Error obteniendo updates: {data}")
            return None
            
    except Exception as e:
        print(f"❌ Error: {e}")
        return None


def verificar_bot_activo():
    """Verifica si el bot está activo y funcionando"""
    url = f"https://api.telegram.org/bot{TOKEN}/getMe"
    
    try:
        response = requests.get(url, timeout=5)
        data = response.json()
        
        if data.get('ok'):
            bot_info = data['result']
            print(f"✅ Bot activo: @{bot_info['username']}")
            print(f"📝 Nombre: {bot_info['first_name']}")
            return True
        else:
            print(f"❌ Bot no activo: {data}")
            return False
            
    except Exception as e:
        print(f"❌ Error verificando bot: {e}")
        return False