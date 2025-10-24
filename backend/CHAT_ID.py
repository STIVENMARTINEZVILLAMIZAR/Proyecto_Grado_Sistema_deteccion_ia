# get_chat_id.py
from alerts import obtener_chat_id_desde_updates, verificar_bot_activo

print("🔍 Verificando bot...")
verificar_bot_activo()

print("\n🔍 Obteniendo CHAT_ID...")
chat_id = obtener_chat_id_desde_updates()

if chat_id:
    print(f"\n✅ Tu CHAT_ID es: {chat_id}")
    print(f"\n📝 Actualiza alerts.py:")
    print(f"CHAT_ID = '{chat_id}'")
else:
    print("\n❌ No se pudo obtener el CHAT_ID")
    print("Asegúrate de haber enviado /start al bot")